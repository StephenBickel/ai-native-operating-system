import { randomUUID } from "node:crypto";
import type { WorkflowDefinition, WorkflowRun } from "./types";

interface StoredRun extends WorkflowRun {
  approvedSteps: Set<string>;
}

export class LocalWorkflowEngine {
  private readonly byEvent = new Map<string, StoredRun>();
  private readonly byId = new Map<string, StoredRun>();

  async start(workspaceId: string, idempotencyKey: string, definition: WorkflowDefinition): Promise<WorkflowRun> {
    const eventKey = `${workspaceId}:${idempotencyKey}`;
    const existing = this.byEvent.get(eventKey);
    if (existing) return this.publicRun(existing);

    const run: StoredRun = {
      id: randomUUID(),
      workspaceId,
      idempotencyKey,
      status: "running",
      outputs: {},
      approvedSteps: new Set(),
    };
    this.byEvent.set(eventKey, run);
    this.byId.set(run.id, run);
    return this.execute(run, definition);
  }

  async resume(workspaceId: string, idempotencyKey: string, definition: WorkflowDefinition): Promise<WorkflowRun> {
    const run = this.byEvent.get(`${workspaceId}:${idempotencyKey}`);
    if (!run) throw new Error("workflow run not found");
    return this.execute(run, definition);
  }

  async approve(runId: string, stepId: string, approverId: string, definition: WorkflowDefinition): Promise<WorkflowRun> {
    if (!approverId) throw new Error("approver is required");
    const run = this.byId.get(runId);
    if (!run) throw new Error("workflow run not found");
    if (run.waitingStepId !== stepId) throw new Error("approval does not match waiting step");
    run.approvedSteps.add(stepId);
    run.waitingStepId = undefined;
    return this.execute(run, definition);
  }

  private async execute(run: StoredRun, definition: WorkflowDefinition): Promise<WorkflowRun> {
    run.status = "running";
    run.error = undefined;
    for (const step of definition.steps) {
      if (Object.hasOwn(run.outputs, step.id)) continue;
      if (step.approval && !run.approvedSteps.has(step.id)) {
        run.status = "waiting_for_approval";
        run.waitingStepId = step.id;
        return this.publicRun(run);
      }
      try {
        run.outputs[step.id] = await step.run();
      } catch (error) {
        run.status = "failed";
        run.error = error instanceof Error ? error.message : "workflow step failed";
        throw error;
      }
    }
    run.status = "completed";
    return this.publicRun(run);
  }

  private publicRun(run: StoredRun): WorkflowRun {
    return {
      id: run.id,
      workspaceId: run.workspaceId,
      idempotencyKey: run.idempotencyKey,
      status: run.status,
      outputs: { ...run.outputs },
      waitingStepId: run.waitingStepId,
      error: run.error,
    };
  }
}

export interface ApprovalRequirement {
  operation: string;
}

export interface WorkflowStep {
  id: string;
  approval?: ApprovalRequirement;
  run(): Promise<unknown>;
}

export interface WorkflowDefinition {
  id: string;
  steps: WorkflowStep[];
}

export type WorkflowStatus = "running" | "waiting_for_approval" | "failed" | "completed";

export interface WorkflowRun {
  id: string;
  workspaceId: string;
  idempotencyKey: string;
  status: WorkflowStatus;
  outputs: Record<string, unknown>;
  waitingStepId?: string;
  error?: string;
}

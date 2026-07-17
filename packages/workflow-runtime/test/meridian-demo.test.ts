import { describe, expect, it } from "vitest";
import { LocalWorkflowEngine } from "../src/engine";
import { createStaleLeadWorkflow } from "../src/meridian-demo";

describe("Meridian stale-lead workflow", () => {
  it("pauses for Gmail approval, resumes, updates CRM, and audits the run", async () => {
    const effects: string[] = [];
    const definition = createStaleLeadWorkflow({
      onEffect: (effect) => effects.push(effect),
    });
    const engine = new LocalWorkflowEngine();

    const paused = await engine.start("meridian-demo", "weekday-2026-07-17", definition);
    expect(paused.status).toBe("waiting_for_approval");
    expect(paused.waitingStepId).toBe("send-approved-email");
    expect(effects).toEqual(["hubspot:read", "model:draft", "policy:checked"]);

    const completed = await engine.approve(paused.id, "send-approved-email", "jordan-ellis", definition);
    expect(completed.status).toBe("completed");
    expect(effects).toContain("gmail:sent");
    expect(effects).toContain("hubspot:updated");
    expect(effects).toContain("audit:created");
  });
});

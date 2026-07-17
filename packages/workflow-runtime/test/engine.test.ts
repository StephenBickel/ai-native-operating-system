import { describe, expect, it } from "vitest";
import { LocalWorkflowEngine } from "../src/engine";

describe("LocalWorkflowEngine", () => {
  it("deduplicates events by workspace and idempotency key", async () => {
    const engine = new LocalWorkflowEngine();
    const definition = { id: "digest", steps: [{ id: "collect", run: async () => "done" }] };
    const first = await engine.start("workspace-1", "event-1", definition);
    const second = await engine.start("workspace-1", "event-1", definition);
    expect(second.id).toBe(first.id);
  });

  it("does not repeat completed steps when a later step retries", async () => {
    const engine = new LocalWorkflowEngine();
    let firstCalls = 0;
    let secondCalls = 0;
    const definition = {
      id: "retry-example",
      steps: [
        { id: "first", run: async () => { firstCalls += 1; return "first"; } },
        { id: "second", run: async () => { secondCalls += 1; if (secondCalls === 1) throw new Error("temporary"); return "second"; } },
      ],
    };
    await expect(engine.start("workspace-1", "event-2", definition)).rejects.toThrow("temporary");
    const run = await engine.resume("workspace-1", "event-2", definition);
    expect(run.status).toBe("completed");
    expect(firstCalls).toBe(1);
    expect(secondCalls).toBe(2);
  });

  it("pauses at approval and resumes after a human decision", async () => {
    const engine = new LocalWorkflowEngine();
    const definition = {
      id: "approval-example",
      steps: [
        { id: "draft", run: async () => "draft-1" },
        { id: "send", approval: { operation: "gmail.messages.send" }, run: async () => "sent" },
      ],
    };
    const paused = await engine.start("workspace-1", "event-3", definition);
    expect(paused.status).toBe("waiting_for_approval");
    const completed = await engine.approve(paused.id, "send", "approver-1", definition);
    expect(completed.status).toBe("completed");
  });
});

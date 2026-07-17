import { describe, expect, it } from "vitest";
import { z } from "zod";
import { ToolRegistry } from "../src/registry";

const context = { workspaceId: "workspace-1", actorId: "user-1" };

describe("ToolRegistry", () => {
  it("requests approval before a draft-tier write", async () => {
    const registry = new ToolRegistry();
    registry.register({
      name: "gmail.messages.send",
      description: "Send an approved email",
      inputSchema: z.object({ draftId: z.string() }),
      autonomy: "draft",
      effect: "write",
      execute: async () => ({ sent: true }),
    });

    const result = await registry.invoke("gmail.messages.send", { draftId: "draft-1" }, context);
    expect(result).toMatchObject({ status: "approval_required", operation: "gmail.messages.send" });
  });

  it("denies a never-tier operation", async () => {
    const registry = new ToolRegistry();
    registry.register({
      name: "stripe.refunds.create",
      description: "Create a refund",
      inputSchema: z.object({ paymentId: z.string() }),
      autonomy: "never",
      effect: "write",
      execute: async () => ({ refunded: true }),
    });

    await expect(registry.invoke("stripe.refunds.create", { paymentId: "pay-1" }, context))
      .rejects.toThrow("operation denied by governance");
  });

  it("executes an act-tier operation after validating input", async () => {
    const registry = new ToolRegistry();
    registry.register({
      name: "crm.contacts.read",
      description: "Read a contact",
      inputSchema: z.object({ id: z.string() }),
      autonomy: "act",
      effect: "read",
      execute: async ({ id }) => ({ id, name: "Avery Chen" }),
    });

    await expect(registry.invoke("crm.contacts.read", { id: "contact-1" }, context))
      .resolves.toMatchObject({ status: "completed", output: { name: "Avery Chen" } });
  });
});

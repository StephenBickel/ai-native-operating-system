import type { WorkflowDefinition } from "./types";

export function createStaleLeadWorkflow(options: { onEffect(effect: string): void }): WorkflowDefinition {
  const effect = async (name: string, output: unknown) => {
    options.onEffect(name);
    return output;
  };

  return {
    id: "meridian-stale-lead-follow-up",
    steps: [
      { id: "find-stale-leads", run: () => effect("hubspot:read", { count: 48, leadId: "lead_1042" }) },
      { id: "draft-follow-up", run: () => effect("model:draft", { subject: "A practical next step" }) },
      { id: "check-policy", run: () => effect("policy:checked", { allowed: true }) },
      {
        id: "send-approved-email",
        approval: { operation: "gmail.messages.send" },
        run: () => effect("gmail:sent", { messageId: "mock_msg_1042" }),
      },
      { id: "update-hubspot", run: () => effect("hubspot:updated", { leadId: "lead_1042", status: "follow_up_sent" }) },
      { id: "write-audit", run: () => effect("audit:created", { auditId: "audit_meridian_1042" }) },
    ],
  };
}

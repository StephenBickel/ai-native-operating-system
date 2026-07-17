import { createWorkflowClient } from "@anos/workflow-runtime";
import { serve } from "inngest/next";

const client = createWorkflowClient({ id: "ai-native-operating-system" });

const dailyAgencyDigest = client.createFunction(
  { id: "daily-agency-digest", retries: 3 },
  { event: "anos/demo.digest.requested" },
  async ({ event, step }) => {
    const workspaceId = String(event.data.workspaceId ?? "");
    if (!workspaceId) throw new Error("workspaceId is required");
    return step.run("assemble-reviewed-digest", async () => ({
      workspaceId,
      mode: "mock",
      output: "packs/marketing-agency/demo/expected/daily-agency-digest.md",
    }));
  },
);

export const { GET, POST, PUT } = serve({ client, functions: [dailyAgencyDigest] });

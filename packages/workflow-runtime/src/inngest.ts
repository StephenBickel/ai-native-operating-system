import { Inngest } from "inngest";

export function createWorkflowClient(options: { id: string; eventKey?: string; baseUrl?: string }) {
  return new Inngest({
    id: options.id,
    eventKey: options.eventKey,
    baseUrl: options.baseUrl,
  });
}

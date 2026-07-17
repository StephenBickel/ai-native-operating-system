import type { ModelProvider } from "@anos/model-providers";
import type { ToolRegistry } from "@anos/tool-runtime";
import { buildContext } from "./context";

export type AgentEvent =
  | { type: "context.loaded"; count: number }
  | { type: "model.delta"; text: string }
  | { type: "run.completed"; text: string };

export interface AgentRunRequest {
  request: string;
  context: string[];
  model: ModelProvider;
  tools: ToolRegistry;
}

export async function* executeAgentRun(input: AgentRunRequest): AsyncIterable<AgentEvent> {
  yield { type: "context.loaded", count: input.context.length };
  const content: string[] = [];
  for await (const delta of input.model.stream({
    messages: [
      { role: "system", content: buildContext(input.context) },
      { role: "user", content: input.request },
    ],
  })) {
    content.push(delta.text);
    yield { type: "model.delta", text: delta.text };
  }
  yield { type: "run.completed", text: content.join("") };
}

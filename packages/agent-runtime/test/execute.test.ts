import { expect, it } from "vitest";
import { createMockModel } from "@anos/model-providers";
import { ToolRegistry } from "@anos/tool-runtime";
import { executeAgentRun } from "../src/execute";

async function collect<T>(source: AsyncIterable<T>): Promise<T[]> {
  const values: T[] = [];
  for await (const value of source) values.push(value);
  return values;
}

it("emits context, model, and completion events in order", async () => {
  const events = await collect(executeAgentRun({
    request: "Summarize open work",
    context: ["Company policy", "Relevant memory"],
    model: createMockModel({ response: "Two tasks need attention." }),
    tools: new ToolRegistry(),
  }));

  expect(events.map((event) => event.type)).toEqual([
    "context.loaded",
    "model.delta",
    "run.completed",
  ]);
});

import { z } from "zod";
import { ToolRegistry } from "./registry";

export function createMockToolRegistry(): ToolRegistry {
  const registry = new ToolRegistry();
  registry.register({
    name: "system.clock.read",
    description: "Read the workflow-supplied deterministic time",
    inputSchema: z.object({ now: z.string().datetime() }),
    autonomy: "act",
    effect: "read",
    execute: async ({ now }) => ({ now }),
  });
  return registry;
}

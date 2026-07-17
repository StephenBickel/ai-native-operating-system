import { resolveAutonomy } from "@anos/operating-system";
import { redact } from "./redact";
import type { ToolContext, ToolDefinition, ToolResult } from "./types";

export class ToolRegistry {
  private readonly definitions = new Map<string, ToolDefinition<unknown, unknown>>();

  register<TInput, TOutput>(definition: ToolDefinition<TInput, TOutput>): void {
    if (this.definitions.has(definition.name)) {
      throw new Error(`tool already registered: ${definition.name}`);
    }
    this.definitions.set(definition.name, definition as ToolDefinition<unknown, unknown>);
  }

  list(): string[] {
    return [...this.definitions.keys()].sort();
  }

  async invoke(name: string, input: unknown, context: ToolContext): Promise<ToolResult> {
    const definition = this.definitions.get(name);
    if (!definition) throw new Error(`unknown tool operation: ${name}`);

    const parsed = definition.inputSchema.parse(input);
    const autonomy = resolveAutonomy([definition.autonomy, ...(context.autonomyLayers ?? [])]);
    if (autonomy === "never") throw new Error("operation denied by governance");

    const auditInput = redact(parsed, definition.redactFields);
    if (autonomy === "draft" && definition.effect === "write") {
      return { status: "approval_required", operation: name, preview: auditInput };
    }

    const output = await definition.execute(parsed, context);
    return { status: "completed", operation: name, output, auditInput };
  }
}

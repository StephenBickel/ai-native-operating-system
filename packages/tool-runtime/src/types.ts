import type { AutonomyTier } from "@anos/operating-system";
import type { ZodType } from "zod";

export interface ToolContext {
  workspaceId: string;
  actorId: string;
  autonomyLayers?: AutonomyTier[];
}

export interface ToolDefinition<TInput = unknown, TOutput = unknown> {
  name: string;
  description: string;
  inputSchema: ZodType<TInput>;
  autonomy: AutonomyTier;
  effect: "read" | "write";
  redactFields?: string[];
  execute(input: TInput, context: ToolContext): Promise<TOutput>;
}

export interface CompletedToolResult {
  status: "completed";
  operation: string;
  output: unknown;
  auditInput: unknown;
}

export interface ApprovalToolResult {
  status: "approval_required";
  operation: string;
  preview: unknown;
}

export type ToolResult = CompletedToolResult | ApprovalToolResult;

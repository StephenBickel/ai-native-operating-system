import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import type { ModelProvider } from "./types";

export function createOpenAIModel(options: { apiKey: string; model?: string }): ModelProvider {
  if (!options.apiKey) {
    throw new Error("OpenAI API key is required");
  }

  const openai = createOpenAI({ apiKey: options.apiKey });
  return {
    async *stream(request) {
      const result = streamText({
        model: openai(options.model ?? "gpt-5-mini"),
        messages: request.messages,
      });
      for await (const text of result.textStream) {
        yield { type: "text-delta" as const, text };
      }
    },
  };
}

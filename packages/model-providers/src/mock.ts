import type { ModelProvider } from "./types";

export function createMockModel(options: { response: string; chunkSize?: number }): ModelProvider {
  const chunkSize = options.chunkSize ?? options.response.length;

  return {
    async *stream() {
      for (let index = 0; index < options.response.length; index += chunkSize) {
        yield {
          type: "text-delta" as const,
          text: options.response.slice(index, index + chunkSize),
        };
      }
    },
  };
}

export interface ModelMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ModelRequest {
  messages: ModelMessage[];
}

export interface ModelDelta {
  type: "text-delta";
  text: string;
}

export interface ModelProvider {
  stream(request: ModelRequest): AsyncIterable<ModelDelta>;
}

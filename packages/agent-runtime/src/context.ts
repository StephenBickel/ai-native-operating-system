export function buildContext(parts: string[]): string {
  return parts.map((part, index) => `## Context ${index + 1}\n\n${part.trim()}`).join("\n\n");
}

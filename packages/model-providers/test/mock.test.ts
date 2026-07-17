import { describe, expect, it } from "vitest";
import { createMockModel } from "../src/mock";

async function collect<T>(source: AsyncIterable<T>): Promise<T[]> {
  const values: T[] = [];
  for await (const value of source) values.push(value);
  return values;
}

describe("mock model", () => {
  it("streams deterministic text for the same request", async () => {
    const model = createMockModel({ response: "I found three open items." });
    const first = await collect(model.stream({ messages: [{ role: "user", content: "status" }] }));
    const second = await collect(model.stream({ messages: [{ role: "user", content: "status" }] }));
    expect(first).toEqual(second);
    expect(first.map((event) => event.text).join("")).toBe("I found three open items.");
  });
});

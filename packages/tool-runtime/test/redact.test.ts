import { expect, it } from "vitest";
import { redact } from "../src/redact";

it("redacts sensitive fields at every object depth", () => {
  expect(redact({ token: "secret", nested: { apiKey: "key", safe: "visible" } }))
    .toEqual({ token: "[REDACTED]", nested: { apiKey: "[REDACTED]", safe: "visible" } });
});

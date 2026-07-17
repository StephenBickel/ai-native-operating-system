import { describe, expect, it } from "vitest";
import { resolveAutonomy } from "../src/governance";

describe("resolveAutonomy", () => {
  it("uses the strictest layer", () => {
    expect(resolveAutonomy(["act", "draft", "never"])).toBe("never");
  });

  it("does not allow a pack to loosen core", () => {
    expect(resolveAutonomy(["draft", "act"])).toBe("draft");
  });

  it("defaults to act only when no restriction exists", () => {
    expect(resolveAutonomy([])).toBe("act");
  });
});

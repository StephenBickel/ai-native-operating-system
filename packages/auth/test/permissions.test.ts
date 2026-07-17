import { describe, expect, it } from "vitest";
import { can } from "../src/permissions";

describe("workspace role permissions", () => {
  it("keeps viewers read-only", () => {
    expect(can("viewer", "workspace.read")).toBe(true);
    expect(can("viewer", "task.create")).toBe(false);
    expect(can("viewer", "approval.decide")).toBe(false);
  });

  it("lets members coordinate work without managing connections", () => {
    expect(can("member", "task.create")).toBe(true);
    expect(can("member", "approval.decide")).toBe(true);
    expect(can("member", "connection.manage")).toBe(false);
  });

  it("reserves workspace deletion for owners", () => {
    expect(can("admin", "connection.manage")).toBe(true);
    expect(can("admin", "workspace.delete")).toBe(false);
    expect(can("owner", "workspace.delete")).toBe(true);
  });
});

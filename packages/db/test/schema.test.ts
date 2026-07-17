import { describe, expect, it } from "vitest";
import { collaborativeTables, schema } from "../src/schema";

describe("workspace schema", () => {
  it("scopes every collaborative table to a workspace", () => {
    for (const tableName of collaborativeTables) {
      expect(schema[tableName].workspaceId, `${tableName} needs workspaceId`).toBeDefined();
    }
  });

  it("contains the runtime records required by the control plane", () => {
    expect(Object.keys(schema)).toEqual(expect.arrayContaining([
      "workspaces", "memberships", "conversations", "messages", "tasks",
      "memories", "workflowDefinitions", "workflowVersions", "runs", "runSteps",
      "approvals", "connections", "events", "auditRecords"
    ]));
  });
});

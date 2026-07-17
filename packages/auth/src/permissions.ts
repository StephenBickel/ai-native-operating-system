export type WorkspaceRole = "owner" | "admin" | "member" | "viewer";

export type WorkspaceCapability =
  | "workspace.read"
  | "workspace.delete"
  | "task.create"
  | "approval.decide"
  | "connection.manage";

const capabilities: Record<WorkspaceRole, ReadonlySet<WorkspaceCapability>> = {
  viewer: new Set(["workspace.read"]),
  member: new Set(["workspace.read", "task.create", "approval.decide"]),
  admin: new Set([
    "workspace.read",
    "task.create",
    "approval.decide",
    "connection.manage",
  ]),
  owner: new Set([
    "workspace.read",
    "workspace.delete",
    "task.create",
    "approval.decide",
    "connection.manage",
  ]),
};

export function can(role: WorkspaceRole, capability: WorkspaceCapability): boolean {
  return capabilities[role].has(capability);
}

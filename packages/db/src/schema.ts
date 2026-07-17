import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const workspaces = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  activePack: text("active_pack").notNull(),
  ...timestamps,
}, (table) => [uniqueIndex("workspaces_slug_idx").on(table.slug)]);

function workspaceReference() {
  return uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" });
}

export const memberships = pgTable("memberships", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: workspaceReference(),
  userId: text("user_id").notNull(),
  role: text("role").notNull(),
  ...timestamps,
}, (table) => [uniqueIndex("memberships_workspace_user_idx").on(table.workspaceId, table.userId)]);

export const conversations = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: workspaceReference(),
  title: text("title").notNull(),
  visibility: text("visibility").default("workspace").notNull(),
  createdBy: text("created_by").notNull(),
  ...timestamps,
}, (table) => [index("conversations_workspace_idx").on(table.workspaceId)]);

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: workspaceReference(),
  conversationId: uuid("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: jsonb("content").notNull(),
  authorId: text("author_id"),
  ...timestamps,
}, (table) => [index("messages_conversation_idx").on(table.conversationId, table.createdAt)]);

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: workspaceReference(),
  title: text("title").notNull(),
  description: text("description").default("").notNull(),
  status: text("status").default("new").notNull(),
  assigneeId: text("assignee_id"),
  sourceRunId: uuid("source_run_id"),
  ...timestamps,
}, (table) => [index("tasks_workspace_status_idx").on(table.workspaceId, table.status)]);

export const memories = pgTable("memories", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: workspaceReference(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  body: text("body").notNull(),
  supersedesId: uuid("supersedes_id"),
  approved: boolean("approved").default(false).notNull(),
  ...timestamps,
}, (table) => [uniqueIndex("memories_workspace_name_idx").on(table.workspaceId, table.name)]);

export const workflowDefinitions = pgTable("workflow_definitions", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: workspaceReference(),
  name: text("name").notNull(),
  status: text("status").default("draft").notNull(),
  ownerId: text("owner_id").notNull(),
  ...timestamps,
}, (table) => [index("workflow_definitions_workspace_idx").on(table.workspaceId)]);

export const workflowVersions = pgTable("workflow_versions", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: workspaceReference(),
  workflowDefinitionId: uuid("workflow_definition_id").notNull().references(() => workflowDefinitions.id, { onDelete: "cascade" }),
  version: integer("version").notNull(),
  definition: jsonb("definition").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  ...timestamps,
}, (table) => [uniqueIndex("workflow_versions_number_idx").on(table.workflowDefinitionId, table.version)]);

export const runs = pgTable("runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: workspaceReference(),
  workflowVersionId: uuid("workflow_version_id").references(() => workflowVersions.id),
  status: text("status").default("queued").notNull(),
  trigger: jsonb("trigger").notNull(),
  idempotencyKey: text("idempotency_key").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  ...timestamps,
}, (table) => [uniqueIndex("runs_workspace_idempotency_idx").on(table.workspaceId, table.idempotencyKey)]);

export const runSteps = pgTable("run_steps", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: workspaceReference(),
  runId: uuid("run_id").notNull().references(() => runs.id, { onDelete: "cascade" }),
  stepKey: text("step_key").notNull(),
  status: text("status").default("pending").notNull(),
  input: jsonb("input"),
  output: jsonb("output"),
  attempt: integer("attempt").default(0).notNull(),
  ...timestamps,
}, (table) => [uniqueIndex("run_steps_run_key_idx").on(table.runId, table.stepKey)]);

export const approvals = pgTable("approvals", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: workspaceReference(),
  runId: uuid("run_id").notNull().references(() => runs.id, { onDelete: "cascade" }),
  operation: text("operation").notNull(),
  preview: jsonb("preview").notNull(),
  status: text("status").default("pending").notNull(),
  requestedFrom: text("requested_from").notNull(),
  decidedBy: text("decided_by"),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  decidedAt: timestamp("decided_at", { withTimezone: true }),
  ...timestamps,
}, (table) => [index("approvals_workspace_status_idx").on(table.workspaceId, table.status)]);

export const connections = pgTable("connections", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: workspaceReference(),
  name: text("name").notNull(),
  kind: text("kind").notNull(),
  transport: text("transport").notNull(),
  config: jsonb("config").notNull(),
  encryptedSecret: text("encrypted_secret"),
  enabled: boolean("enabled").default(true).notNull(),
  ...timestamps,
}, (table) => [uniqueIndex("connections_workspace_name_idx").on(table.workspaceId, table.name)]);

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: workspaceReference(),
  source: text("source").notNull(),
  type: text("type").notNull(),
  payload: jsonb("payload").notNull(),
  idempotencyKey: text("idempotency_key").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
  ...timestamps,
}, (table) => [uniqueIndex("events_workspace_idempotency_idx").on(table.workspaceId, table.idempotencyKey)]);

export const auditRecords = pgTable("audit_records", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: workspaceReference(),
  actorId: text("actor_id").notNull(),
  action: text("action").notNull(),
  resourceType: text("resource_type").notNull(),
  resourceId: text("resource_id"),
  detail: jsonb("detail").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("audit_records_workspace_created_idx").on(table.workspaceId, table.createdAt)]);

export const schema = {
  workspaces,
  memberships,
  conversations,
  messages,
  tasks,
  memories,
  workflowDefinitions,
  workflowVersions,
  runs,
  runSteps,
  approvals,
  connections,
  events,
  auditRecords,
};

export const collaborativeTables = [
  "memberships",
  "conversations",
  "messages",
  "tasks",
  "memories",
  "workflowDefinitions",
  "workflowVersions",
  "runs",
  "runSteps",
  "approvals",
  "connections",
  "events",
  "auditRecords",
] as const;

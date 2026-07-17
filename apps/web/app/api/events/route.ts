const received = new Set<string>();
export async function POST(request: Request) {
  const body = await request.json() as { workspaceId?: string; idempotencyKey?: string; type?: string };
  if (!body.workspaceId || !body.idempotencyKey || !body.type) return Response.json({ error: "invalid event" }, { status: 400 });
  const key = `${body.workspaceId}:${body.idempotencyKey}`;
  const duplicate = received.has(key); received.add(key);
  return Response.json({ accepted: !duplicate, duplicate }, { status: duplicate ? 200 : 202 });
}

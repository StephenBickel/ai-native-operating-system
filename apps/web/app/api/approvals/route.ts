export async function POST(request: Request) {
  const body = await request.json() as { approvalId?: string; decision?: string; workspaceId?: string };
  if (!body.workspaceId || !body.approvalId || !["approved", "rejected"].includes(body.decision ?? "")) return Response.json({ error: "invalid approval decision" }, { status: 400 });
  return Response.json({ ...body, decidedAt: new Date().toISOString(), mode: "demo" });
}

import { createMockModel } from "@anos/model-providers";

export async function POST(request: Request) {
  const body = await request.json() as { message?: string; workspaceId?: string };
  if (!body.workspaceId || !body.message?.trim()) return Response.json({ error: "workspaceId and message are required" }, { status: 400 });
  const model = createMockModel({ response: "I found three open items. The revised timeline needs approval first." , chunkSize: 18 });
  const encoder = new TextEncoder();
  const stream = new ReadableStream({ async start(controller) { for await (const delta of model.stream({ messages: [{ role: "user", content: body.message! }] })) controller.enqueue(encoder.encode(delta.text)); controller.close(); } });
  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "X-Model-Provider": "mock" } });
}

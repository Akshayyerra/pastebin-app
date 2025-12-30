import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { content, maxViews, expiresAt } = body;

  // ✅ Validation MUST be inside POST()
  if (!content || content.trim().length === 0) {
    return new Response("Content required", { status: 400 });
  }

  const paste = await prisma.paste.create({
    data: {
      content,
      maxViews: maxViews ?? null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  });

  return Response.json({ id: paste.id });
}

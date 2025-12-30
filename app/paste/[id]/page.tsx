import { prisma } from "@/lib/prisma";
import CopyButton from "../../../components/CopyButton";

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ FIX: unwrap params
  const { id } = await params;

  const paste = await prisma.paste.findUnique({
    where: { id },
  });

  if (!paste) {
    return (
      <div className="container">
        <div className="card">Paste not found</div>
      </div>
    );
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const shareUrl = `${baseUrl}/paste/${paste.id}`;

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Paste</h1>
        <p className="subtitle">ID: {paste.id}</p>

        <div className="share-link">
          <a href={shareUrl} className="link">
            {shareUrl}
          </a>
          <CopyButton text={shareUrl} />
        </div>

        <pre className="textarea">{paste.content}</pre>
      </div>
    </div>
  );
}

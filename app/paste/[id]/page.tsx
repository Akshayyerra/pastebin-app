export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";
import CopyButton from "../../../components/CopyButton";

type PastePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PastePage({ params }: PastePageProps) {
  // ✅ REQUIRED IN NEXT.JS 16
  const { id } = await params;

  if (!id) {
    return (
      <div className="container">
        <div className="card">Invalid paste ID</div>
      </div>
    );
  }

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
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const shareUrl = `${baseUrl}/paste/${paste.id}`;

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Paste</h1>
        <p className="subtitle">ID: {paste.id}</p>

        <div className="share-link">
          <a
            href={shareUrl}
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {shareUrl}
          </a>
          <CopyButton text={shareUrl} />
        </div>

        <pre className="textarea">{paste.content}</pre>
      </div>
    </div>
  );
}

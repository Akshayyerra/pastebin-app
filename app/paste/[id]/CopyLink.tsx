import { prisma } from "@/lib/prisma";
import CopyButton from "@/components/CopyButton";

export default async function PastePage({
  params,
}: {
  params: { id: string };
}) {
  const paste = await prisma.paste.findUnique({
    where: { id: params.id },
  });

  if (!paste) {
    return (
      <div className="container">
        <div className="card">Paste not found</div>
      </div>
    );
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/paste/${paste.id}`;

  return (
    <div className="container">
      <div className="card">
        <h2>Paste</h2>
        <p>ID: {paste.id}</p>

        <div className="share-link">
          {shareUrl}
          <CopyButton text={shareUrl} />
        </div>

        <pre className="textarea">{paste.content}</pre>
      </div>
    </div>
  );
}

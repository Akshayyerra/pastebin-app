"use client";

import { useState } from "react";

type CopyLinkProps = {
  id: string;
};

export default function CopyLink({ id }: CopyLinkProps) {
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/paste/${id}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <input
        value={shareUrl}
        readOnly
        onClick={(e) => e.currentTarget.select()}
      />
      <button onClick={copyToClipboard}>
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

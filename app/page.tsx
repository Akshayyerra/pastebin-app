"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [content, setContent] = useState("");
  const router = useRouter();

  async function createPaste() {
    const res = await fetch("/api/paste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();
    router.push(`/paste/${data.id}`);
  }

  return (
    <div className="container">
      <div className="card">
        <div className="title">PASTEBIN</div>

        <textarea
          className="textarea"
          placeholder="Paste your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="button" onClick={createPaste}>
          Create Paste
        </button>
      </div>
    </div>
  );
}

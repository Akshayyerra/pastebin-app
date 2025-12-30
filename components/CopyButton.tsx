"use client";

export default function CopyButton({ text }: { text: string }) {
  function copy() {
    navigator.clipboard.writeText(text);
  }

  return (
    <button className="copy-btn" onClick={copy} title="Copy">
      📋
    </button>
  );
}

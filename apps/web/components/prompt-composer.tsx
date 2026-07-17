"use client";

import { ArrowUp, AtSign, Paperclip } from "lucide-react";
import { useState } from "react";

export function PromptComposer() {
  const [value, setValue] = useState("");
  return (
    <form className="composer" onSubmit={(event) => { event.preventDefault(); setValue(""); }}>
      <label className="sr-only" htmlFor="prompt">Message</label>
      <textarea id="prompt" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Ask Meridian OS to move work forward…" rows={1} />
      <button type="button" aria-label="Attach file"><Paperclip aria-hidden="true" size={18} /></button>
      <button type="button" aria-label="Mention teammate"><AtSign aria-hidden="true" size={18} /></button>
      <button className="send" type="submit" aria-label="Send message"><ArrowUp aria-hidden="true" size={18} /></button>
    </form>
  );
}

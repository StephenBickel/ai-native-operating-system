"use client";

import { ConversationSidebar } from "./conversation-sidebar";
import { ContextPanel } from "./context-panel";
import { MessageStream } from "./message-stream";
import { PromptComposer } from "./prompt-composer";

export function ChatWorkspace() {
  return (
    <div className="chat-layout">
      <ConversationSidebar />
      <section className="chat-canvas">
        <header className="chat-header"><div><h1>Launch readiness</h1><p># launch-readiness · Meridian Creative · Internal</p></div><div className="presence" aria-label="5 teammates active"><span>JE</span><span>TM</span><span>PS</span><b>+2</b></div></header>
        <div className="chat-scroll"><MessageStream /></div>
        <footer className="composer-wrap"><PromptComposer /><div><span>Press ⌘K for shortcuts</span><span>Meridian OS may make mistakes.</span></div></footer>
      </section>
      <ContextPanel />
    </div>
  );
}

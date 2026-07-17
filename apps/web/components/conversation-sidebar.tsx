import { Search, SlidersHorizontal, SquarePen } from "lucide-react";
import { conversations } from "../lib/demo-data";
import { Icon } from "./icon";

export function ConversationSidebar() {
  return (
    <aside className="conversation-rail">
      <header><strong>Meridian Creative</strong><button aria-label="New conversation"><Icon icon={SquarePen} /></button></header>
      <div className="conversation-search"><Search aria-hidden="true" size={15} /><span>Search conversations</span><SlidersHorizontal aria-hidden="true" size={15} /></div>
      <p className="rail-label">Today</p>
      <nav aria-label="Conversations">
        {conversations.map((conversation) => (
          <button className={conversation.active ? "conversation active" : "conversation"} key={conversation.title}>
            <span><strong>{conversation.title}</strong><small>{conversation.preview}</small></span><time>{conversation.time}</time>
          </button>
        ))}
      </nav>
      <button className="archived">View archived</button>
    </aside>
  );
}

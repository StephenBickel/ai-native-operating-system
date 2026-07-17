import { ApprovalCard } from "./approval-card";
import { ToolCallCard } from "./tool-call-card";

export function MessageStream() {
  return (
    <div className="message-stream">
      <article className="message user-message"><span className="avatar">JE</span><div><header><strong>Jordan Ellis</strong><time>9:42 AM</time></header><p>What still needs attention before tomorrow&apos;s client review?</p></div></article>
      <article className="message agent-message">
        <span className="agent-node">✦</span>
        <div><header><strong>Meridian OS</strong><time>9:42 AM</time></header><p>Here&apos;s what still needs attention before tomorrow&apos;s client review.</p>
          <ol><li><strong>Finalize timeline:</strong> The revised timeline is drafted but not sent to Avery Chen.</li><li><strong>Confirm ad creative:</strong> Two variations are pending internal QA.</li><li><strong>Deck Q&amp;A review:</strong> Six open questions were flagged yesterday.</li></ol>
          <p>I can take action on any of these—tell me where to focus.</p><ToolCallCard />
        </div>
      </article>
      <article className="message agent-message">
        <span className="agent-node">✦</span>
        <div><header><strong>Meridian OS</strong><time>9:43 AM</time></header><p>To move this forward, I can send the revised timeline to Avery Chen for visibility.</p><ApprovalCard /></div>
      </article>
    </div>
  );
}

const memories = ["Client review prep notes", "Avery Chen preferences", "Launch Plan v3"];
const tasks = ["Send revised timeline to Avery Chen", "Confirm ad creative (2 variants)", "Review deck Q&A (6 open)"];
const tools = ["Project Tracker", "Asana", "Gmail", "Google Drive"];

export function ContextPanel() {
  return (
    <aside className="context-panel" aria-label="Live context">
      <section><h2>Active pack</h2><div className="pack-row"><span className="folder">▰</span><span><strong>Launch Readiness Pack</strong><small><i /> Running · 4 agents</small></span></div></section>
      <section><h2>Relevant memory</h2>{memories.map((item) => <div className="context-row" key={item}><span className="document">▤</span><span><strong>{item}</strong><small>Updated this week</small></span></div>)}</section>
      <section><h2>Current tasks</h2>{tasks.map((item, index) => <div className="task-row" key={item}><span className="checkbox" /><span>{item}<small>{index === 0 ? "Pending approval" : "In progress"}</small></span></div>)}</section>
      <section><h2>Connected tools</h2>{tools.map((tool) => <div className="connection" key={tool}><span>{tool}</span><small><i /> Connected</small></div>)}</section>
      <section><h2>Autonomy</h2><p className="context-copy">Meridian OS can act freely on safe reads and drafts. External sends require approval.</p></section>
    </aside>
  );
}

import { Check, ChevronDown } from "lucide-react";

export function ToolCallCard() {
  return (
    <div className="tool-call">
      <span className="status-icon success"><Check aria-hidden="true" size={17} /></span>
      <span><strong>Read project status</strong><small>Tool: Project Tracker · Completed · 9:42 AM</small></span>
      <ChevronDown aria-hidden="true" size={16} />
    </div>
  );
}

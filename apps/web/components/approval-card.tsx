"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export type ApprovalDecision = "approved" | "rejected";

export function ApprovalCard({ onDecision }: { onDecision?: (decision: ApprovalDecision) => void }) {
  const [decision, setDecision] = useState<ApprovalDecision | null>(null);

  function decide(next: ApprovalDecision) {
    if (decision) return;
    setDecision(next);
    onDecision?.(next);
  }

  return (
    <section className="approval-card" aria-label="Approval required">
      <div className="approval-title"><span className="send-icon"><Send aria-hidden="true" size={15} /></span><strong>Send revised timeline to Avery Chen</strong><span className="approval-label">Approval required</span></div>
      <dl><div><dt>Details</dt><dd>Share the latest timeline from Launch Plan v3 with Avery Chen.</dd></div><div><dt>Risk</dt><dd>Low — shares a project timeline by email.</dd></div></dl>
      {decision ? (
        <p className="decision-state">{decision === "approved" ? "Approved by you" : "Rejected by you"}</p>
      ) : (
        <div className="approval-actions">
          <button className="primary" onClick={() => decide("approved")} aria-label="Approve send revised timeline">Approve</button>
          <button onClick={() => decide("rejected")} aria-label="Reject send revised timeline">Reject</button>
        </div>
      )}
    </section>
  );
}

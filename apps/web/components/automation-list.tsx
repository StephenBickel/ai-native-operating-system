"use client";

import { Check, Play, Send, ShieldCheck, UserRoundCheck } from "lucide-react";
import { useState } from "react";
import { workflowSteps } from "../lib/demo-data";

const icons = ["◷", "⌕", "✎", "◇", "◎", "➤", "⌘"];

export function AutomationList() {
  const [selected, setSelected] = useState(4);
  const [tested, setTested] = useState(false);
  return (
    <div className="automation-layout">
      <section className="automation-canvas">
        <header className="automation-header"><div><a href="../automations">← Automations</a><h1>Stale lead follow-up <span>Draft</span></h1><p>Every weekday at 8:00 AM, find leads without a reply after 24 hours, draft a follow-up, and ask the account owner to approve it.</p><small>Workflow version <b>v4</b> · Last edited by Taylor Morgan · May 12, 2025 9:41 AM</small></div><div><button className="test-button" onClick={() => setTested(true)}><Play aria-hidden="true" size={16} /> Test run</button><button className="primary">Publish</button></div></header>
        <div className="workflow-frame"><h2>Workflow</h2><div className="workflow-spine">{workflowSteps.map(([title, detail], index) => <button className={selected === index ? "workflow-step selected" : "workflow-step"} onClick={() => setSelected(index)} key={title}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><span className="step-icon">{icons[index]}</span><span><strong>{title}</strong><small>{detail}</small></span>{index === 4 ? <em>Action required</em> : null}<b>›</b></button>)}</div></div>
        <div className="dry-run"><h2>Recent dry-run</h2><div><span className="status-icon success"><Check size={15} /></span><strong>{tested ? "Dry run completed just now" : "Dry run completed"}</strong><span>48 leads found · Completed in 1m 24s</span><button>View details</button></div></div>
      </section>
      <aside className="automation-inspector"><header><h2>Request owner approval</h2><p>Step 5 of 7</p></header><section><h3>Trigger</h3><label>Type<input value="Manual approval" readOnly /></label><label>Approver<select defaultValue="owner"><option value="owner">Account owner</option></select></label><label>Due after<div className="inline-input"><input value="24" readOnly /><span>hours</span></div></label></section><section><h3>Connections</h3><div className="integration-row"><span className="hubspot">H</span><span><strong>HubSpot</strong><small>meridiancreative.com</small></span><em>Connected</em></div><div className="integration-row"><span className="gmail">M</span><span><strong>Gmail</strong><small>taylor@meridian.co</small></span><em>Connected</em></div></section><section><h3>Governance</h3><label>Autonomy<select defaultValue="draft"><option value="draft">Draft for approval</option></select></label></section><section><h3>Failure handling</h3><label>Retry safe reads<div className="inline-input"><input value="3" readOnly /><span>times</span></div></label><label>If step fails<select defaultValue="pause"><option value="pause">Pause workflow</option></select></label></section></aside>
    </div>
  );
}

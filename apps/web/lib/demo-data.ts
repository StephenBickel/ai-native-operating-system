export const conversations = [
  { title: "Launch readiness", preview: "What still needs attention before…", time: "9:42 AM", active: true },
  { title: "Stale lead follow-up", preview: "Draft follow-up sequence for leads…", time: "9:18 AM", active: false },
  { title: "Weekly client report", preview: "Compile highlights and KPIs…", time: "8:51 AM", active: false },
] as const;

export const workflowSteps = [
  ["Weekday schedule", "Runs every weekday at 8:00 AM in account timezone."],
  ["Find stale leads", "Find leads with no reply in the last 24 hours."],
  ["Draft follow-up", "Use AI to draft a personalized follow-up email."],
  ["Check communication policy", "Ensure the draft complies with brand and legal rules."],
  ["Request owner approval", "Ask the account owner to review and approve the draft."],
  ["Send approved email", "Send the email once the owner approves."],
  ["Update HubSpot", "Log activity and update lead status."],
] as const;

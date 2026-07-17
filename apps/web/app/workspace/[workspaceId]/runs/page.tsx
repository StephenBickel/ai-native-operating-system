import { CirclePlay } from "lucide-react";
import { SectionPage } from "../../../../components/section-page";
export default function RunsPage() { return <SectionPage icon={CirclePlay} title="Runs" description="Every agent and automation action, checkpoint, retry, and approval." items={["Daily agency digest — completed", "Stale lead follow-up — waiting for approval", "Weekly status report — completed"]} />; }

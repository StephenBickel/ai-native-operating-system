import { Settings } from "lucide-react";
import { SectionPage } from "../../../../components/section-page";
export default function AdminPage() { return <SectionPage icon={Settings} title="Admin" description="Members, roles, models, packs, secrets, and deployment policy." items={["Members and roles", "Model providers", "Industry pack", "Security and retention", "Deployment settings"]} />; }

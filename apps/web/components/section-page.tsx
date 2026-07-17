import type { LucideIcon } from "lucide-react";
import { Icon } from "./icon";

export function SectionPage({ icon, title, description, items }: { icon: LucideIcon; title: string; description: string; items: readonly string[] }) {
  return <section className="section-page"><header><span><Icon icon={icon} size={22} /></span><h1>{title}</h1><p>{description}</p></header><div className="section-list">{items.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><button>Open</button></div>)}</div></section>;
}

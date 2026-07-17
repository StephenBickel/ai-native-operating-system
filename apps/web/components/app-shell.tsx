"use client";

import {
  BotMessageSquare,
  Cable,
  CheckSquare2,
  CirclePlay,
  Inbox,
  Library,
  Settings,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Icon } from "./icon";

const navigation = [
  ["Chat", BotMessageSquare, ""],
  ["Inbox", Inbox, "/inbox"],
  ["Tasks", CheckSquare2, "/tasks"],
  ["Automations", Workflow, "/automations"],
  ["Knowledge", Library, "/knowledge"],
  ["Integrations", Cable, "/integrations"],
  ["Runs", CirclePlay, "/runs"],
  ["Admin", Settings, "/admin"],
] as const;

export function AppShell({ workspaceId, children }: { workspaceId: string; children: ReactNode }) {
  const pathname = usePathname();
  const active = navigation.find(([, , suffix]) => suffix ? pathname.endsWith(suffix) : pathname === `/workspace/${workspaceId}`)?.[0] ?? "Chat";
  return (
    <div className="app-shell">
      <aside className="product-rail">
        <Link className="brand" href={`/workspace/${workspaceId}`} aria-label="Meridian OS home">
          <span className="brand-mark">M</span><span>Meridian OS</span>
        </Link>
        <nav aria-label="Workspace">
          {navigation.map(([label, icon, suffix]) => (
            <Link className={active === label ? "nav-item active" : "nav-item"} href={`/workspace/${workspaceId}${suffix}`} key={label}>
              <Icon icon={icon} /><span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="rail-footer">
          <div className="workspace-switcher"><span className="monogram">MC</span><span>Meridian Creative</span></div>
          <div className="person"><span className="avatar">JE</span><span><strong>Jordan Ellis</strong><small>jordan@meridian.co</small></span></div>
          <div className="online"><span /> Online</div>
        </div>
      </aside>
      <main className="app-main">{children}</main>
    </div>
  );
}

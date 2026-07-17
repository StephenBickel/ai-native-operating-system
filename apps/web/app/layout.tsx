import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meridian OS — AI-native business operations",
  description: "A governed operating layer for teams, agents, workflows, and tools.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

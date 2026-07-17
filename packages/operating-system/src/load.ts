import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { OperatingSystem } from "./types";

const packNamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function read(root: string, ...segments: string[]): Promise<string> {
  return readFile(resolve(root, ...segments), "utf8");
}

export async function loadOperatingSystem(root: string, packName: string): Promise<OperatingSystem> {
  if (!packNamePattern.test(packName)) {
    throw new Error("invalid pack name");
  }

  const [system, coreGovernance, readme, packGovernance] = await Promise.all([
    read(root, "core", "SYSTEM.md"),
    read(root, "core", "GOVERNANCE.md"),
    read(root, "packs", packName, "README.md"),
    read(root, "packs", packName, "GOVERNANCE.md"),
  ]);

  return {
    core: { system, governance: coreGovernance },
    pack: { name: packName, readme, governance: packGovernance },
  };
}

import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { loadOperatingSystem } from "../src/load";

describe("loadOperatingSystem", () => {
  it("loads core and the selected pack without merging their files", async () => {
    const root = await mkdtemp(join(tmpdir(), "anos-"));
    await mkdir(join(root, "core"));
    await mkdir(join(root, "packs", "sample"), { recursive: true });
    await writeFile(join(root, "core", "SYSTEM.md"), "# Universal\n");
    await writeFile(join(root, "core", "GOVERNANCE.md"), "# Base\n");
    await writeFile(join(root, "packs", "sample", "README.md"), "# Sample\n");
    await writeFile(join(root, "packs", "sample", "GOVERNANCE.md"), "# Restrictive\n");

    const result = await loadOperatingSystem(root, "sample");

    expect(result.core.system).toContain("Universal");
    expect(result.pack.name).toBe("sample");
    expect(result.pack.governance).toContain("Restrictive");
  });

  it("rejects traversal in a pack name", async () => {
    await expect(loadOperatingSystem("/tmp", "../secret")).rejects.toThrow("invalid pack name");
  });
});

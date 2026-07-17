import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { createLocalStorage } from "../src/local";

describe("local storage", () => {
  it("stores and reads an artifact inside its root", async () => {
    const root = await mkdtemp(join(tmpdir(), "anos-storage-"));
    const storage = createLocalStorage(root);
    await storage.put("workspace/report.md", Buffer.from("# Report"));
    await expect(storage.get("workspace/report.md")).resolves.toEqual(Buffer.from("# Report"));
  });

  it("rejects traversal outside its root", async () => {
    const root = await mkdtemp(join(tmpdir(), "anos-storage-"));
    const storage = createLocalStorage(root);
    await expect(storage.put("../secret", Buffer.from("no"))).rejects.toThrow("invalid storage key");
  });
});

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import type { ArtifactStorage } from "./types";

function safePath(root: string, key: string): string {
  if (!key || isAbsolute(key)) throw new Error("invalid storage key");
  const target = resolve(root, key);
  const relation = relative(resolve(root), target);
  if (relation.startsWith("..") || isAbsolute(relation)) throw new Error("invalid storage key");
  return target;
}

export function createLocalStorage(root: string): ArtifactStorage {
  return {
    async put(key, data) {
      const target = safePath(root, key);
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, data);
    },
    async get(key) {
      return readFile(safePath(root, key));
    },
  };
}

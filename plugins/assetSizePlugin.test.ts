import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { oversizedFiles } from "./assetSizePlugin";

let root = "";

afterEach(() => {
  if (root) rmSync(root, { recursive: true, force: true });
});

describe("oversizedFiles", () => {
  it("encuentra los archivos que superan el límite, también en subcarpetas", () => {
    root = mkdtempSync(join(tmpdir(), "asset-size-"));
    mkdirSync(join(root, "media", "audio"), { recursive: true });
    writeFileSync(join(root, "pequeño.jpg"), Buffer.alloc(10));
    writeFileSync(join(root, "media", "audio", "grande.wav"), Buffer.alloc(101));

    expect(oversizedFiles(root, 100)).toEqual([join("media", "audio", "grande.wav")]);
  });
});

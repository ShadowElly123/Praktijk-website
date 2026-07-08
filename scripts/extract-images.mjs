// scripts/extract-images.mjs
// Haalt de 3 goedgekeurde beelden uit de Claude Design-bundle en schrijft ze naar public/images.
// Herhaalbaar: draai `node scripts/extract-images.mjs` vanuit de projectroot.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";

const SRC = "Claude design/Lucas Borghys - website (1).html";
const OUT = "public/images";
const MAP = {
  hero: "98f7df46-b0b8-4b78-96e5-b63766c9a357",
  werkwijze: "841f6898-f4cd-44c0-a5ba-aa14eb2620a7",
  portret: "f8440241-8fba-403e-94c3-b0891635a3d0",
};

const html = readFileSync(SRC, "utf8");
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
const blob = scripts.reduce((a, b) => (b.length > a.length ? b : a), "");
const assets = JSON.parse(blob.trim());

mkdirSync(OUT, { recursive: true });
for (const [name, uuid] of Object.entries(MAP)) {
  const a = assets[uuid];
  if (!a) throw new Error(`asset ${uuid} niet gevonden`);
  writeFileSync(`${OUT}/${name}.jpg`, Buffer.from(a.data, "base64"));
  console.log(`${name}.jpg geschreven (${Math.round((a.data.length * 0.75) / 1024)} KB)`);
}

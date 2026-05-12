import Link from "next/link";
import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";
import WeaponBuilderShell from "../components/WeaponBuilderShell";

async function getAllData() {
  const dataDir = path.join(process.cwd(), "data");

  // Load all weapons
  const weaponFiles = await fs.readdir(path.join(dataDir, "weapons"));
  const weapons = await Promise.all(
    weaponFiles
      .filter((f) => f.endsWith(".json"))
      .map(async (f) => {
        const raw = await fs.readFile(path.join(dataDir, "weapons", f), "utf-8");
        return JSON.parse(raw);
      })
  );

  // Load all attachments dynamically from all category subdirectories
  const attachmentDir = path.join(dataDir, "attachments");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allAttachments: Record<string, any> = {};
  try {
    const categories = await fs.readdir(attachmentDir);
    for (const cat of categories) {
      const filePath = path.join(attachmentDir, cat, "index.json");
      try {
        const raw = await fs.readFile(filePath, "utf-8");
        const items = JSON.parse(raw);
        for (const item of items) {
          allAttachments[item.id] = item;
        }
      } catch { /* category not yet populated */ }
    }
  } catch { /* no attachments dir yet */ }

  // Load all gadgets
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gadgets: any[] = [];
  try {
    const gadgetFiles = await fs.readdir(path.join(dataDir, "gadgets"));
    const loaded = await Promise.all(
      gadgetFiles
        .filter((f) => f.endsWith(".json"))
        .map(async (f) => {
          const raw = await fs.readFile(path.join(dataDir, "gadgets", f), "utf-8");
          return JSON.parse(raw);
        })
    );
    gadgets.push(...loaded);
  } catch { /* no gadgets dir yet */ }

  // Load all headwear
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headwear: any[] = [];
  try {
    const headwearFiles = await fs.readdir(path.join(dataDir, "headwear"));
    const loaded = await Promise.all(
      headwearFiles
        .filter((f) => f.endsWith(".json") && f !== "index.json")
        .map(async (f) => {
          const raw = await fs.readFile(path.join(dataDir, "headwear", f), "utf-8");
          return JSON.parse(raw);
        })
    );
    headwear.push(...loaded);
  } catch { /* no headwear dir yet */ }

  // Load armor items
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const armorItems: any[] = [];
  try {
    const raw = await fs.readFile(path.join(dataDir, "armor", "index.json"), "utf-8");
    armorItems.push(...JSON.parse(raw));
  } catch { /* no armor data yet */ }

  // Load tactical rigs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rigs: any[] = [];
  try {
    const raw = await fs.readFile(path.join(dataDir, "rigs", "index.json"), "utf-8");
    rigs.push(...JSON.parse(raw));
  } catch { /* no rigs data yet */ }

  // Load consumables
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const consumables: any[] = [];
  try {
    const raw = await fs.readFile(path.join(dataDir, "consumables", "index.json"), "utf-8");
    consumables.push(...JSON.parse(raw));
  } catch { /* no consumables data yet */ }

  // Load medical items
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const medicalItems: any[] = [];
  try {
    const raw = await fs.readFile(path.join(dataDir, "medical", "index.json"), "utf-8");
    medicalItems.push(...JSON.parse(raw));
  } catch { /* no medical data yet */ }

  // Load containers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerItems: any[] = [];
  try {
    const raw = await fs.readFile(path.join(dataDir, "containers", "index.json"), "utf-8");
    containerItems.push(...JSON.parse(raw));
  } catch { /* no containers data yet */ }

  // Load keys
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const keyItems: any[] = [];
  try {
    const raw = await fs.readFile(path.join(dataDir, "keys", "index.json"), "utf-8");
    keyItems.push(...JSON.parse(raw));
  } catch { /* no keys data yet */ }

  // Load belts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const beltItems: any[] = [];
  try {
    const raw = await fs.readFile(path.join(dataDir, "belts", "index.json"), "utf-8");
    beltItems.push(...JSON.parse(raw));
  } catch { /* no belts data yet */ }

  return { weapons, allAttachments, gadgets, headwear, armorItems, rigs, consumables, medicalItems, containerItems, keyItems, beltItems };
}

export default async function BuilderPage() {
  const { weapons, allAttachments, gadgets, headwear, armorItems, rigs, consumables, medicalItems, containerItems, keyItems, beltItems } = await getAllData();
  const sortedWeapons = weapons.sort((a, b) => a.name.localeCompare(b.name));
  const sortedGadgets = gadgets.sort((a, b) => a.name.localeCompare(b.name));
  const sortedHeadwear = headwear.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="flex flex-col min-h-screen">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/raven-sigil.png" alt="GZW Armory" width={36} height={36} className="object-contain" />
          <span className="text-2xl font-bold tracking-tight text-white">
            GZW <span className="text-amber-500">Armory</span>
          </span>
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-mono">
            v0.4.0.3
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/builder" className="text-white font-medium">Weapon Builder</Link>
          <Link href="/loadout" className="hover:text-white transition-colors">Loadout Calc</Link>
        </div>
      </nav>

          <div className="flex-1 px-6 py-6 max-w-7xl mx-auto w-full">
              {/* Vendor data disclaimer */}
        <div className="mb-6 flex items-start gap-3 bg-amber-950/40 border border-amber-800/50 rounded-lg px-4 py-3 text-sm text-amber-300/80">
          <span className="text-amber-500 mt-0.5 shrink-0">&#x26A0;</span>
          <span>
            <strong className="text-amber-400">Vendor &amp; rank data may be outdated.</strong>{" "}
            Attachment availability and vendor levels were overhauled in patch 0.4. Stats shown are best-effort — help us verify by{" "}
            <a href="https://github.com/DarkTidings20/gzwarmory/issues" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-200">submitting a correction</a>.
          </span>
        </div>

        <WeaponBuilderShell
          weapons={sortedWeapons}
          allAttachments={allAttachments}
          gadgets={sortedGadgets}
          headwear={sortedHeadwear}
          armorItems={armorItems}
          rigs={rigs}
          consumables={consumables}
          medicalItems={medicalItems}
          containerItems={containerItems}
          keyItems={keyItems}
          beltItems={beltItems}
        />
      </div>

      <footer className="border-t border-gray-800 px-6 py-6 text-center text-xs text-gray-600">
        The Lamang Intelligence Network is not affiliated with or endorsed by MADFINGER Games.
      </footer>
    </main>
  );
}

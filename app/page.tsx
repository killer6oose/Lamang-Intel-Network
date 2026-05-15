import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";
import LoadoutBuilder from "./components/LoadoutBuilder";
import BuilderHeader from "./components/BuilderHeader";
import { assetPath } from "./lib/assetPath";

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

  // Load eyewear
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eyewearItems: any[] = [];
  try {
    const raw = await fs.readFile(path.join(dataDir, "eyewear", "index.json"), "utf-8");
    eyewearItems.push(...JSON.parse(raw));
  } catch { /* no eyewear data yet */ }

  // Load face covers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faceCoverItems: any[] = [];
  try {
    const raw = await fs.readFile(path.join(dataDir, "facecover", "index.json"), "utf-8");
    faceCoverItems.push(...JSON.parse(raw));
  } catch { /* no facecover data yet */ }

  // Load backpacks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const backpackItems: any[] = [];
  try {
    const raw = await fs.readFile(path.join(dataDir, "backpacks", "index.json"), "utf-8");
    backpackItems.push(...JSON.parse(raw));
  } catch { /* no backpacks data yet */ }

  // Load lockboxes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lockboxItems: any[] = [];
  try {
    const raw = await fs.readFile(path.join(dataDir, "lockboxes", "index.json"), "utf-8");
    lockboxItems.push(...JSON.parse(raw));
  } catch { /* no lockboxes data yet */ }

  // Load headsets
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headsetItems: any[] = [];
  try {
    const raw = await fs.readFile(path.join(dataDir, "headsets", "index.json"), "utf-8");
    headsetItems.push(...JSON.parse(raw));
  } catch { /* no headsets data yet */ }

  return {
    weapons, allAttachments, gadgets, headwear, armorItems,
    rigs, consumables, medicalItems, containerItems, keyItems, beltItems,
    eyewearItems, faceCoverItems, backpackItems, lockboxItems, headsetItems,
  };
}

export default async function BuilderPage() {
  const {
    weapons, allAttachments, gadgets, headwear, armorItems,
    rigs, consumables, medicalItems, containerItems, keyItems, beltItems,
    eyewearItems, faceCoverItems, backpackItems, lockboxItems, headsetItems,
  } = await getAllData();

  const sortedWeapons = weapons.sort((a: {name: string}, b: {name: string}) => a.name.localeCompare(b.name));
  const sortedGadgets = gadgets.sort((a: {name: string}, b: {name: string}) => a.name.localeCompare(b.name));
  const sortedHeadwear = headwear.sort((a: {name: string}, b: {name: string}) => a.name.localeCompare(b.name));

  return (
    <main className="flex flex-col min-h-screen">
      <BuilderHeader />

      <div className="flex-1 py-6 w-full" style={{ paddingLeft: "3vw", paddingRight: "3vw" }}>
        <div className="us">
          <span className="us-icon">&#x26A0;</span>
          <div className="us-body">
            <strong>Vendor &amp; rank data may be outdated.</strong>{" "}
            Attachment availability and vendor levels were overhauled in patch 0.4. Stats shown are
            best-effort - help us verify by{" "}
            <a href="https://github.com/killer6oose/GZW-Guides/issues/new/choose" target="_blank" rel="noopener noreferrer">
              submitting a correction
            </a>.
          </div>
        </div>

        <LoadoutBuilder
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
          eyewearItems={eyewearItems}
          faceCoverItems={faceCoverItems}
          backpackItems={backpackItems}
          lockboxItems={lockboxItems}
          headsetItems={headsetItems}
        />
      </div>

      <footer className="ft">
        <div className="ft-i">
          <div className="ft-br">Lamang Intelligence Network</div>
          <div className="ft-disc">
            Unofficial fan tool. Not affiliated with or endorsed by MADFINGER Games.<br />
            Data sourced from the{" "}
            <a href="https://gray-zone-warfare.fandom.com" target="_blank" rel="noopener" style={{ color: "var(--ul)", textDecoration: "underline" }}>
              GZW Community Wiki
            </a>
            {" "}and in-game verification.
          </div>
          <div className="ft-lks" style={{ marginTop: "8px" }}>
            <a href="https://bot.lamangintel.net" target="_blank" rel="noopener" className="ft-lk">Bot Dashboard ↗</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

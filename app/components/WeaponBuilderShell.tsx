"use client";

import { useState, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SlotDef {
  label: string;
  required: boolean;
  compatible: string[];
}
interface Weapon {
  id: string; name: string; type: string; caliber: string;
  manufacturer?: string; vendor: string; vendorRank: number;
  baseStats: Record<string, number>; slots: Record<string, SlotDef>;
  compatibleAmmo?: string[]; notes?: string; verified?: boolean;
  image?: string;
}
interface Attachment {
  id: string; name: string; category: string;
  statModifiers: Record<string, number>; weight: number;
  capacity?: number; vendor: string; vendorRank: number;
}
interface Gadget {
  id: string; name: string; shortName?: string; type: string;
  slot: string; description?: string; manufacturer?: string | null;
  vendor?: string | null; vendorRank?: number | null;
  baseStats: { weight: number | null };
  gridSize?: string | null; notes?: string;
  verified?: boolean; upcoming?: boolean; image?: string | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const VENDORS = ["Gunny", "Artisan", "Turncoat", "Banshee", "Vulture"] as const;

const STAT_ICONS: Record<string, string> = {
  accuracy: "◎", recoilControl: "↩", ergonomics: "✋",
  muzzleDeviceEfficiency: "💨", muzzleVelocity: "⚡",
  loudnessReduction: "🔇", reloadSpeed: "↺", fireRateBonus: "⚙",
};

// Standard slot dimensions
const SLOT_W = 120;
const SLOT_H = 100;

// PMC slot definitions - Equipment (worn on body, around figure)
// Tops evenly distribute 4 slots (100px each) across DOLL_H=700: gaps = (700-400)/5 = 60
const PMC_SLOTS = {
  left: [
    { id: "headwear",  label: "Headwear",   type: "gear",   top: 60,  width: SLOT_W, height: SLOT_H, placeholder: "/HeadgearWeaponPlaceholder.png"  },
    { id: "eyewear",   label: "Eyewear",    type: "gear",   top: 220, width: SLOT_W, height: SLOT_H, placeholder: "/EyewearPlaceholder.png"           },
    { id: "facewear",  label: "Facewear",   type: "gear",   top: 380, width: SLOT_W, height: SLOT_H, placeholder: undefined                           },
    { id: "primary",   label: "Primary",    type: "weapon", top: 540, width: SLOT_W * 2, height: SLOT_H, placeholder: "/PrimaryWeaponPlaceholder.png" },
  ],
  right: [
    { id: "headset",   label: "Headset",    type: "gear",   top: 60,  width: SLOT_W, height: SLOT_H, placeholder: "/HeadsetWeaponPlaceholder.png"     },
    { id: "armor",     label: "Body Armor", type: "gear",   top: 220, width: SLOT_W, height: SLOT_H, placeholder: "/BodyArmorPlaceholder.png"          },
    { id: "melee",     label: "Melee",      type: "locked", top: 380, width: SLOT_W, height: SLOT_H, placeholder: undefined                           },
    { id: "sidearm",   label: "Sidearm",    type: "weapon", top: 540, width: SLOT_W, height: SLOT_H, placeholder: "/SidearmWeaponPlaceholder.png"     },
  ],
};

// Carriers panel slots (right column, next to figure)
const CARRIER_SLOTS = [
  { id: "tacticalRig", label: "Tactical Rig",  type: "gear",   width: SLOT_W, height: SLOT_H, placeholder: "/ChestRigPlaceholder.png"  },
  { id: "backpack",    label: "Backpack",       type: "gear",   width: SLOT_W, height: SLOT_H, placeholder: "/BackpackPlaceholder.png"  },
  { id: "belt",        label: "Belt",           type: "gear",   width: SLOT_W, height: SLOT_H, placeholder: "/BeltPlaceholder.png"      },
  { id: "binos",       label: "Gadgets",        type: "gadget", width: SLOT_W, height: SLOT_H, placeholder: undefined                  },
  { id: "secureCase",  label: "Secure Case",    type: "gear",   width: SLOT_W, height: SLOT_H, placeholder: "/SafePlaceholder.png"     },
  { id: "pockets",     label: "Pockets",        type: "locked", width: SLOT_W, height: SLOT_H, placeholder: undefined                  },
];

// ─── Outline silhouettes for empty slots ──────────────────────────────────────

function WeaponOutlineSVG() {
  return (
    <svg viewBox="0 0 80 36" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Receiver / body */}
      <rect x="8" y="12" width="48" height="10" rx="2"
        fill="none" stroke="#2a3a28" strokeWidth="1.2"/>
      {/* Barrel */}
      <rect x="52" y="14" width="22" height="4" rx="1"
        fill="none" stroke="#2a3a28" strokeWidth="1"/>
      {/* Mag well */}
      <rect x="20" y="22" width="9" height="8" rx="1"
        fill="none" stroke="#2a3a28" strokeWidth="1"/>
      {/* Stock */}
      <path d="M8 12 L2 10 L2 24 L8 22 Z"
        fill="none" stroke="#2a3a28" strokeWidth="1"/>
      {/* Grip */}
      <path d="M30 22 L28 32 L34 32 L34 22"
        fill="none" stroke="#2a3a28" strokeWidth="1"/>
      {/* Optic rail hint */}
      <rect x="18" y="8" width="30" height="4" rx="1"
        fill="none" stroke="#1e2e1c" strokeWidth="0.8" strokeDasharray="3,2"/>
    </svg>
  );
}

function PistolOutlineSVG() {
  return (
    <svg viewBox="0 0 60 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Slide */}
      <rect x="10" y="8" width="38" height="10" rx="2"
        fill="none" stroke="#2a3a28" strokeWidth="1.2"/>
      {/* Barrel */}
      <rect x="44" y="10" width="10" height="6" rx="1"
        fill="none" stroke="#2a3a28" strokeWidth="1"/>
      {/* Frame */}
      <rect x="10" y="18" width="22" height="8" rx="1"
        fill="none" stroke="#2a3a28" strokeWidth="1"/>
      {/* Grip */}
      <rect x="14" y="26" width="14" height="16" rx="2"
        fill="none" stroke="#2a3a28" strokeWidth="1.2"/>
      {/* Trigger guard */}
      <path d="M22 26 Q30 26 30 34 L30 38 L22 38"
        fill="none" stroke="#2a3a28" strokeWidth="1"/>
      {/* Mag */}
      <rect x="16" y="30" width="10" height="10" rx="1"
        fill="none" stroke="#1e2e1c" strokeWidth="0.8" strokeDasharray="2,2"/>
    </svg>
  );
}

// ─── Crosshatch SVG pattern ───────────────────────────────────────────────────

function CrosshatchPattern({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <line x1="0" y1="8" x2="8" y2="0" stroke="#1a2218" strokeWidth="0.8" />
      </pattern>
    </defs>
  );
}

// ─── Equipment Slot Box (GZW-style) ───────────────────────────────────────────

function SlotBox({
  slot, isActive, hasContent, contentLabel, contentSubLabel, contentImage, onClick,
}: {
  slot: { id: string; label: string; type: string; width: number; height: number; placeholder?: string };
  isActive: boolean;
  hasContent: boolean;
  contentLabel?: string;
  contentSubLabel?: string;
  contentImage?: string;
  onClick: () => void;
}) {
  const isLocked = slot.type === "locked";
  const canClick = !isLocked;
  const imgHeight = Math.round(slot.height * 0.55);

  return (
    <button
      onClick={canClick ? onClick : undefined}
      disabled={!canClick}
      className={`
        relative overflow-hidden rounded transition-all duration-150 group
        ${isActive
          ? "ring-1 ring-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.35)]"
          : hasContent
            ? "ring-1 ring-gray-600"
            : isLocked
              ? "ring-1 ring-gray-900 opacity-40"
              : "ring-1 ring-gray-800"
        }
        ${canClick ? "cursor-pointer" : "cursor-not-allowed"}
      `}
      style={{
        width: slot.width, height: slot.height,
        background: isActive
          ? "linear-gradient(135deg,#141e10 0%,#0f1a0d 100%)"
          : hasContent
            ? "linear-gradient(135deg,#111a0e 0%,#0c1309 100%)"
            : "#090e09",
      }}
    >
      {/* Crosshatch background */}
      <svg className={`absolute inset-0 w-full h-full pointer-events-none ${hasContent ? "opacity-15" : isLocked ? "opacity-10" : "opacity-40"}`}
        xmlns="http://www.w3.org/2000/svg">
        <CrosshatchPattern id={`xh-${slot.id}`} />
        <rect width="100%" height="100%" fill={`url(#xh-${slot.id})`}/>
      </svg>

      {/* Amber top border when active */}
      {isActive && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-500"/>
      )}

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full p-1.5 gap-1">
        {hasContent ? (
          <>
            {contentImage ? (
              <div className="w-full flex-1 flex items-center justify-center min-h-0 px-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={contentImage}
                  alt={contentLabel ?? ""}
                  className="w-full h-full object-contain"
                  style={{ filter: "brightness(0.85) saturate(0.7) sepia(0.2)", maxHeight: imgHeight }}
                />
              </div>
            ) : slot.placeholder ? (
              <div className="w-full flex-1 flex items-center justify-center min-h-0 px-2 py-1" style={{ opacity: 0.35 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slot.placeholder} alt="" className="w-full h-full object-contain" />
              </div>
            ) : null}
            <div className="w-full text-center shrink-0">
              <div className="text-white font-medium leading-tight truncate px-0.5"
                style={{ fontSize: "11px" }}>
                {contentLabel}
              </div>
              {contentSubLabel && (
                <div className="text-gray-500 leading-tight truncate"
                  style={{ fontSize: "9px" }}>
                  {contentSubLabel}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Placeholder icon when empty */}
            <div className="w-full flex-1 flex items-center justify-center min-h-0 px-3 py-1">
              {slot.placeholder ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={slot.placeholder} alt="" className="w-full h-full object-contain" style={{ opacity: 0.2 }} />
              ) : null}
            </div>
            <span className={`font-medium leading-tight text-center shrink-0 ${isLocked ? "text-gray-700" : "text-gray-600"}`}
              style={{ fontSize: "10px" }}>
              {slot.label}
            </span>
          </>
        )}
      </div>

      {/* Hover shimmer for clickable slots */}
      {canClick && !isActive && (
        <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors"/>
      )}
    </button>
  );
}

// ─── Attachment Row ───────────────────────────────────────────────────────────

function AttachmentRow({ slotKey, slot, allAttachments, selected, onSelect, vendorRanks }: {
  slotKey: string; slot: SlotDef; allAttachments: Record<string, Attachment>;
  selected: string | null; onSelect: (k: string, id: string | null) => void;
  vendorRanks: Record<string, number>;
}) {
  const [open, setOpen] = useState(false);
  const allCompat = slot.compatible.map(id => allAttachments[id]).filter(Boolean);
  const available = allCompat.filter(a => !a.vendor || !a.vendorRank || (vendorRanks[a.vendor] ?? 0) >= a.vendorRank);
  const locked = allCompat.filter(a => a.vendor && a.vendorRank && (vendorRanks[a.vendor] ?? 0) < a.vendorRank);
  const selectedAtt = selected ? allAttachments[selected] : null;

  const goodDeltas = selectedAtt
    ? Object.entries(selectedAtt.statModifiers).filter(([k,v]) => v !== 0 && (k === "accuracy" ? (v??0)<0 : (v??0)>0)) : [];
  const badDeltas = selectedAtt
    ? Object.entries(selectedAtt.statModifiers).filter(([k,v]) => v !== 0 && (k === "accuracy" ? (v??0)>0 : (v??0)<0)) : [];

  return (
    <div className={`border rounded-lg overflow-hidden transition-colors ${
      selected ? "border-gray-700 bg-gray-900/60"
        : slot.required ? "border-amber-900/40 bg-amber-950/10"
        : "border-gray-800 bg-gray-950"
    }`}>
      <div className="flex items-stretch min-h-10">
        <div className="flex items-center px-3 py-2 min-w-28 border-r border-gray-800 shrink-0">
          <span className="text-xs font-medium text-gray-300">
            {slot.label}{slot.required && <span className="text-amber-500 ml-1">*</span>}
          </span>
        </div>
        <button
          onClick={() => allCompat.length > 0 && setOpen(o => !o)}
          className={`flex-1 flex items-center px-3 py-2 text-left min-w-0 transition-colors ${
            allCompat.length > 0 ? "hover:bg-gray-800/40 cursor-pointer" : "cursor-default"
          }`}
        >
          {selectedAtt ? (
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-100 font-medium truncate">{selectedAtt.name}</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {goodDeltas.map(([k,v]) => (
                  <span key={k} className="text-xs bg-green-900/50 text-green-300 px-1.5 rounded font-mono">
                    {STAT_ICONS[k]??k} +{Math.abs(v??0).toFixed(1)}
                  </span>
                ))}
                {badDeltas.map(([k,v]) => (
                  <span key={k} className="text-xs bg-red-900/50 text-red-300 px-1.5 rounded font-mono">
                    {STAT_ICONS[k]??k} {(v??0).toFixed(1)}
                  </span>
                ))}
                <span className="text-xs bg-gray-800 text-gray-500 px-1.5 rounded font-mono">
                  +{selectedAtt.weight.toFixed(3)}kg
                </span>
              </div>
            </div>
          ) : (
            <span className="text-sm text-gray-600 italic">
              {allCompat.length === 0 ? "No data yet" : `${available.length} available`}
            </span>
          )}
        </button>
        <div className="flex items-center px-2 gap-1 border-l border-gray-800 shrink-0">
          {selectedAtt && (
            <button onClick={() => onSelect(slotKey, null)}
              className="text-gray-600 hover:text-gray-300 text-xs w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition-colors">
              ✕
            </button>
          )}
          {allCompat.length > 0 && (
            <button onClick={() => setOpen(o => !o)}
              className="text-gray-600 hover:text-gray-300 text-xs w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition-colors">
              {open ? "▲" : "▼"}
            </button>
          )}
        </div>
      </div>
      {open && allCompat.length > 0 && (
        <div className="border-t border-gray-800 bg-gray-900/90 max-h-60 overflow-y-auto">
          <button onClick={() => { onSelect(slotKey, null); setOpen(false); }}
            className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-800 transition-colors border-b border-gray-800">
            - None -
          </button>
          {available.map(att => (
            <button key={att.id} onClick={() => { onSelect(slotKey, att.id); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-800 transition-colors border-b border-gray-800/50 last:border-0 ${
                selected === att.id ? "bg-amber-950/30 text-amber-200" : "text-gray-200"
              }`}>
              <div className="font-medium">{att.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {att.vendor} R{att.vendorRank} · {att.weight.toFixed(3)} kg
                {att.capacity ? ` · ${att.capacity}rnd` : ""}
              </div>
            </button>
          ))}
          {locked.length > 0 && (
            <>
              <div className="px-4 py-1.5 text-xs text-gray-600 bg-gray-900 border-t border-gray-800">
                🔒 Rank locked
              </div>
              {locked.map(att => (
                <div key={att.id} className="px-4 py-2 text-sm text-gray-700 border-b border-gray-800/30 last:border-0 opacity-60">
                  <div>{att.name}</div>
                  <div className="text-xs">{att.vendor} R{att.vendorRank}</div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Stat Chip ────────────────────────────────────────────────────────────────

function StatChip({ icon, label, base, delta, isAccuracy = false }: {
  icon: string; label: string; base: number; delta: number; isAccuracy?: boolean;
}) {
  const total = base + delta;
  const effectiveDelta = isAccuracy ? -delta : delta;
  const color = delta === 0 ? "text-gray-400" : effectiveDelta > 0 ? "text-green-400" : "text-red-400";
  return (
    <div className="flex flex-col items-center gap-0.5 px-1">
      <span className="text-gray-500 text-sm">{icon}</span>
      <span className="text-white font-mono text-sm font-bold leading-tight">
        {isAccuracy ? total.toFixed(2) : total > 0 ? `+${total.toFixed(1)}` : total.toFixed(1)}
      </span>
      {delta !== 0 && <span className={`text-xs font-mono leading-tight ${color}`}>{delta > 0 ? "+" : ""}{delta.toFixed(1)}</span>}
      {delta === 0 && <span className="text-xs leading-tight opacity-0">0</span>}
      <span className="text-gray-600 text-xs">{label}</span>
    </div>
  );
}

// ─── Weapon Slot Editor (right panel) ────────────────────────────────────────

function WeaponSlotEditor({ slotLabel, weapons, selectedWeaponId, onSelectWeapon, allAttachments, vendorRanks }: {
  slotLabel: string; weapons: Weapon[]; selectedWeaponId: string | null;
  onSelectWeapon: (id: string | null) => void; allAttachments: Record<string, Attachment>;
  vendorRanks: Record<string, number>;
}) {
  const [showComponents, setShowComponents] = useState(false);
  const [selectedAttachments, setSelectedAttachments] = useState<Record<string, string | null>>({});

  const weapon = weapons.find(w => w.id === selectedWeaponId) ?? null;

  const handleSelectWeapon = (id: string | null) => {
    onSelectWeapon(id);
    setSelectedAttachments({});
    setShowComponents(false);
  };

  const statDeltas = useMemo(() => {
    const d: Record<string, number> = { weight: 0 };
    Object.values(selectedAttachments).forEach(id => {
      if (!id) return;
      const att = allAttachments[id];
      if (!att) return;
      d.weight = (d.weight ?? 0) + att.weight;
      Object.entries(att.statModifiers).forEach(([s, v]) => { d[s] = (d[s] ?? 0) + (v ?? 0); });
    });
    return d;
  }, [selectedAttachments, allAttachments]);

  const totalWeight = (weapon?.baseStats.weight ?? 0) + (statDeltas.weight ?? 0);
  const filledCount = Object.values(selectedAttachments).filter(Boolean).length;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{slotLabel}</span>
        <div className="flex-1 h-px bg-gray-800"/>
      </div>

      <select
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-amber-500 transition-colors mb-4"
        value={selectedWeaponId ?? ""}
        onChange={e => handleSelectWeapon(e.target.value || null)}
      >
        <option value="">- Select a weapon -</option>
        {weapons.map(w => (
          <option key={w.id} value={w.id}>
            {w.name}  ·  {w.caliber}  ·  {w.vendor} R{w.vendorRank}
          </option>
        ))}
      </select>

      {weapon ? (
        <>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 mb-3">
            <div className="flex items-start gap-3">
              {/* Weapon image preview */}
              {weapon.image && (
                <div className="shrink-0 w-24 h-14 bg-black/40 rounded overflow-hidden flex items-center justify-center border border-gray-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={weapon.image}
                    alt={weapon.name}
                    className="w-full h-full object-contain"
                    style={{ filter: "brightness(0.9) saturate(0.6)" }}
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-white leading-tight">{weapon.name}</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {weapon.type} · {weapon.caliber}{weapon.manufacturer ? ` · ${weapon.manufacturer}` : ""}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2 mt-1.5">
                      <span className="text-xs text-amber-500/80">{weapon.vendor} R{weapon.vendorRank}</span>
                      <span className="text-gray-700 text-xs">·</span>
                      <span className="text-xs text-gray-500">{weapon.baseStats.rateOfFire ?? "?"} RPM</span>
                      {!weapon.verified && (
                        <span className="text-xs bg-amber-900/30 text-amber-700 px-1.5 py-0.5 rounded">unverified</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-white font-mono">{totalWeight.toFixed(3)} kg</div>
                    <div className="text-xs text-gray-600">{weapon.baseStats.weight.toFixed(3)} base</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-around bg-gray-900/50 border border-gray-800 rounded-lg px-2 py-3 mb-3">
            <StatChip icon={STAT_ICONS.accuracy} label="MOA" base={weapon.baseStats.accuracy??0} delta={statDeltas.accuracy??0} isAccuracy/>
            <div className="w-px self-stretch bg-gray-800 mx-0.5"/>
            <StatChip icon={STAT_ICONS.recoilControl} label="Recoil" base={weapon.baseStats.recoilControl??0} delta={statDeltas.recoilControl??0}/>
            <div className="w-px self-stretch bg-gray-800 mx-0.5"/>
            <StatChip icon={STAT_ICONS.ergonomics} label="Ergo" base={weapon.baseStats.ergonomics??0} delta={statDeltas.ergonomics??0}/>
            <div className="w-px self-stretch bg-gray-800 mx-0.5"/>
            <StatChip icon={STAT_ICONS.muzzleDeviceEfficiency} label="Muzz." base={weapon.baseStats.muzzleDeviceEfficiency??0} delta={statDeltas.muzzleDeviceEfficiency??0}/>
            <div className="w-px self-stretch bg-gray-800 mx-0.5"/>
            <StatChip icon="⚖" label="kg" base={weapon.baseStats.weight??0} delta={statDeltas.weight??0}/>
          </div>

          <button
            onClick={() => setShowComponents(o => !o)}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border font-medium text-sm transition-all mb-3 ${
              showComponents
                ? "bg-amber-500/15 border-amber-600/60 text-amber-300"
                : "bg-gray-800/80 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-2">
              <span>🔧</span>
              <span>Edit Components</span>
              {filledCount > 0 && (
                <span className="bg-amber-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {filledCount}
                </span>
              )}
            </span>
            <span className="text-gray-500 text-xs">{Object.keys(weapon.slots).length} slots {showComponents ? "▲" : "▼"}</span>
          </button>

          {showComponents && (
            <div className="flex-1 overflow-y-auto space-y-2 pr-0.5 pb-4">
              <p className="text-xs text-gray-700 px-1 mb-2">
                {Object.keys(weapon.slots).length} attachment points · <span className="text-amber-800">* required</span>
              </p>
              {Object.entries(weapon.slots).map(([key, slot]) => (
                <AttachmentRow key={key} slotKey={key} slot={slot} allAttachments={allAttachments}
                  selected={selectedAttachments[key]??null}
                  onSelect={(k,id) => setSelectedAttachments(p => ({...p,[k]:id}))}
                  vendorRanks={vendorRanks}/>
              ))}
              {weapon.compatibleAmmo && weapon.compatibleAmmo.length > 0 && (
                <div className="border border-gray-800 rounded-lg overflow-hidden mt-2">
                  <div className="px-3 py-2 bg-gray-900/60 border-b border-gray-800">
                    <span className="text-xs font-medium text-gray-400">Compatible Ammo</span>
                  </div>
                  <div className="px-3 py-2.5 flex flex-wrap gap-1.5">
                    {weapon.compatibleAmmo.map(a => (
                      <span key={a} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{a}</span>
                    ))}
                  </div>
                </div>
              )}
              {weapon.notes && (
                <p className="text-xs text-gray-600 italic px-1 pt-2 border-t border-gray-900">{weapon.notes}</p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <div className="w-32 h-16 mx-auto mb-4 opacity-20">
            {slotLabel === "Sidearm" ? <PistolOutlineSVG /> : <WeaponOutlineSVG />}
          </div>
          <p className="text-gray-500 text-sm">Select a weapon to begin</p>
          <p className="text-gray-700 text-xs mt-1">
            {slotLabel === "Primary" ? "Assault rifles, DMRs, snipers, shotguns" : "Pistols"}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Vendor Rank Bar ──────────────────────────────────────────────────────────

function VendorRanks({ ranks, setRanks }: {
  ranks: Record<string, number>;
  setRanks: (fn: (p: Record<string, number>) => Record<string, number>) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-800 rounded-lg mb-4 overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-900/60 hover:bg-gray-900 transition-colors text-sm">
        <span className="text-gray-400 font-medium">Vendor Ranks</span>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {VENDORS.map(v => (
              <span key={v} className="text-xs text-gray-500 font-mono">
                {v[0]}<span className="text-amber-400">{ranks[v]}</span>
              </span>
            ))}
          </div>
          <span className="text-gray-700 text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-gray-800 bg-gray-950 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {VENDORS.map(v => (
            <div key={v} className="flex items-center justify-between gap-2">
              <span className="text-gray-300 text-sm">{v}</span>
              <div className="flex gap-1">
                {[1,2,3,4].map(r => (
                  <button key={r} onClick={() => setRanks(p => ({...p,[v]:r}))}
                    className={`w-7 h-7 rounded text-xs font-bold transition-colors ${
                      (ranks[v]??1) >= r ? "bg-amber-500 text-black" : "bg-gray-800 text-gray-600 hover:bg-gray-700"
                    }`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Gadget Slot Editor (right panel) ────────────────────────────────────────

function GadgetSlotEditor({ gadgets, selectedGadgetId, onSelectGadget, vendorRanks }: {
  gadgets: Gadget[];
  selectedGadgetId: string | null;
  onSelectGadget: (id: string | null) => void;
  vendorRanks: Record<string, number>;
}) {
  const selected = gadgets.find(g => g.id === selectedGadgetId) ?? null;

  const available = gadgets.filter(g =>
    !g.upcoming &&
    (!g.vendor || !g.vendorRank || (vendorRanks[g.vendor] ?? 0) >= g.vendorRank)
  );
  const rankLocked = gadgets.filter(g =>
    !g.upcoming &&
    g.vendor && g.vendorRank && (vendorRanks[g.vendor] ?? 0) < g.vendorRank
  );
  const upcoming = gadgets.filter(g => g.upcoming);

  const byType = (list: Gadget[]) =>
    list.reduce<Record<string, Gadget[]>>((acc, g) => {
      (acc[g.type] ??= []).push(g);
      return acc;
    }, {});

  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      {/* Selected gadget summary */}
      <div className="border border-gray-800 rounded-lg p-3 bg-gray-950 min-h-20 flex items-center gap-4">
        {selected ? (
          <>
            {selected.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={selected.image} alt={selected.name}
                className="w-20 h-14 object-contain shrink-0"
                style={{ filter: "brightness(0.85) saturate(0.7) sepia(0.2)" }}
              />
            ) : (
              <div className="w-20 h-14 shrink-0 flex items-center justify-center text-3xl opacity-20">
                🔭
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-semibold text-sm">{selected.name}</span>
                <span className="text-xs bg-gray-800 text-gray-400 px-1.5 rounded">{selected.type}</span>
                {selected.upcoming && (
                  <span className="text-xs bg-amber-950/60 text-amber-400 border border-amber-800/50 px-1.5 rounded">upcoming</span>
                )}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-xs text-gray-500">
                {selected.manufacturer && <span>{selected.manufacturer}</span>}
                {selected.vendor
                  ? <span>{selected.vendor} R{selected.vendorRank}</span>
                  : <span className="italic">vendor unknown</span>
                }
                {selected.baseStats.weight != null
                  ? <span className="font-mono">{selected.baseStats.weight.toFixed(3)} kg</span>
                  : <span className="italic">weight unknown</span>
                }
                {selected.gridSize && <span>{selected.gridSize} grid</span>}
              </div>
              {selected.description && (
                <p className="text-gray-600 text-xs mt-1.5 leading-snug line-clamp-2">{selected.description}</p>
              )}
            </div>
            <button onClick={() => onSelectGadget(null)}
              className="text-gray-600 hover:text-gray-300 text-xs w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition-colors shrink-0">
              ✕
            </button>
          </>
        ) : (
          <span className="text-gray-600 text-sm italic">No gadget selected</span>
        )}
      </div>

      {/* Gadget picker */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3">
        {/* Available */}
        {Object.entries(byType(available)).map(([type, items]) => (
          <div key={type}>
            <div className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1">{type}</div>
            <div className="flex flex-col gap-0.5">
              {items.map(g => (
                <button key={g.id}
                  onClick={() => onSelectGadget(selectedGadgetId === g.id ? null : g.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                    selectedGadgetId === g.id
                      ? "border-amber-700 bg-amber-950/30 text-amber-200"
                      : "border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-200"
                  }`}>
                  <div className="font-medium">{g.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {g.vendor ? `${g.vendor} R${g.vendorRank}` : "vendor TBD"}
                    {g.baseStats.weight != null ? ` · ${g.baseStats.weight.toFixed(3)} kg` : ""}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Rank locked */}
        {rankLocked.length > 0 && (
          <div>
            <div className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1">🔒 Rank locked</div>
            <div className="flex flex-col gap-0.5">
              {rankLocked.map(g => (
                <div key={g.id} className="px-3 py-2 rounded-lg border border-gray-800 text-sm opacity-50">
                  <div className="text-gray-500">{g.name}</div>
                  <div className="text-xs text-gray-600">{g.vendor} R{g.vendorRank}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div>
            <div className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1">Upcoming</div>
            <div className="flex flex-col gap-0.5">
              {upcoming.map(g => (
                <div key={g.id} className="px-3 py-2 rounded-lg border border-gray-800/50 text-sm opacity-40">
                  <div className="text-gray-500">{g.name}
                    <span className="ml-2 text-xs text-gray-700">{g.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function WeaponBuilderShell({
  weapons, allAttachments, gadgets,
}: {
  weapons: Weapon[];
  allAttachments: Record<string, Attachment>;
  gadgets: Gadget[];
}) {
  const [activePMCSlot, setActivePMCSlot] = useState<string | null>("primary");
  const [buildName, setBuildName] = useState("");
  const [selectedWeapons, setSelectedWeapons] = useState<Record<string, string | null>>({
    primary: null, sidearm: null,
  });
  const [selectedGadgets, setSelectedGadgets] = useState<Record<string, string | null>>({
    binos: null,
  });
  const [vendorRanks, setVendorRanks] = useState<Record<string, number>>({
    Gunny: 1, Artisan: 1, Turncoat: 1, Banshee: 1, Vulture: 1,
  });

  const allSlots = [...PMC_SLOTS.left, ...PMC_SLOTS.right, ...CARRIER_SLOTS];

  const handleSlotClick = (slotId: string, type: string) => {
    if (type === "locked") return;
    setActivePMCSlot(prev => prev === slotId ? null : slotId);
  };

  const activeSlot = allSlots.find(s => s.id === activePMCSlot) ?? null;

  const isWeaponSlot = activeSlot?.type === "weapon";
  const isGadgetSlot = activeSlot?.type === "gadget";
  const primaryWeapons = weapons.filter(w => w.type !== "Pistol");
  const sidearmWeapons = weapons.filter(w => w.type === "Pistol");
  const slotWeapons = activePMCSlot === "sidearm" ? sidearmWeapons : primaryWeapons;

  const getWeaponForSlot = (slotId: string) => {
    const weapId = selectedWeapons[slotId];
    return weapId ? weapons.find(w => w.id === weapId) : null;
  };

  const getGadgetForSlot = (slotId: string) => {
    const gadgetId = selectedGadgets[slotId];
    return gadgetId ? gadgets.find(g => g.id === gadgetId) : null;
  };

  const DOLL_W = 460;
  const DOLL_H = 700;

  return (
    <div className="flex flex-col gap-4">
      {/* Build name bar */}
      <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
        <input
          className="flex-1 bg-transparent border-b border-gray-700 focus:border-amber-500 outline-none text-gray-100 text-lg font-medium py-1 placeholder-gray-700 transition-colors"
          placeholder="Name your build..."
          value={buildName}
          onChange={e => setBuildName(e.target.value)}
        />
        <button className="shrink-0 text-xs text-gray-500 hover:text-gray-200 border border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded-lg transition-colors">
          Save Build
        </button>
      </div>

      {/* Main layout: equipment doll | carriers | divider | editor */}
      <div className="flex gap-4" style={{ minHeight: DOLL_H }}>

        {/* PMC Equipment Doll */}
        <div className="shrink-0">
          <p className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-3 text-center">Equipment</p>
          <div className="relative" style={{ width: DOLL_W, height: DOLL_H }}>

            {/* PMC Silhouette background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/PMCSILHOUETTE.png"
                alt=""
                className="w-full h-full"
                style={{ objectFit: "cover", objectPosition: "left top", opacity: 0.35 }}
              />
            </div>

            {/* LEFT SLOTS */}
            {PMC_SLOTS.left.map(slot => {
              const w = slot.type === "weapon" ? getWeaponForSlot(slot.id) : null;
              return (
                <div key={slot.id} className="absolute" style={{ left: 8, top: slot.top }}>
                  <SlotBox
                    slot={slot}
                    isActive={activePMCSlot === slot.id}
                    hasContent={!!w}
                    contentLabel={w?.name}
                    contentSubLabel={w?.caliber}
                    contentImage={w?.image}
                    onClick={() => handleSlotClick(slot.id, slot.type)}
                  />
                </div>
              );
            })}

            {/* RIGHT SLOTS */}
            {PMC_SLOTS.right.map(slot => {
              const w = slot.type === "weapon" ? getWeaponForSlot(slot.id) : null;
              return (
                <div key={slot.id} className="absolute" style={{ right: 8, top: slot.top }}>
                  <SlotBox
                    slot={slot}
                    isActive={activePMCSlot === slot.id}
                    hasContent={!!w}
                    contentLabel={w?.name}
                    contentSubLabel={w?.caliber}
                    contentImage={w?.image}
                    onClick={() => handleSlotClick(slot.id, slot.type)}
                  />
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded ring-1 ring-amber-500 bg-amber-500/10"/>
              <span className="text-xs text-gray-600">active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded ring-1 ring-gray-900 bg-gray-950 opacity-50"/>
              <span className="text-xs text-gray-600">locked</span>
            </div>
          </div>
        </div>

        {/* Carriers Column */}
        <div className="shrink-0 flex flex-col">
          <p className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-3 text-center">Carriers</p>
          <div className="flex flex-col justify-between" style={{ height: DOLL_H }}>
            {CARRIER_SLOTS.map(slot => {
              const g = slot.type === "gadget" ? getGadgetForSlot(slot.id) : null;
              return (
                <SlotBox
                  key={slot.id}
                  slot={slot}
                  isActive={activePMCSlot === slot.id}
                  hasContent={!!g}
                  contentLabel={g?.name}
                  contentSubLabel={g?.type}
                  contentImage={g?.image ?? undefined}
                  onClick={() => handleSlotClick(slot.id, slot.type)}
                />
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-800 shrink-0"/>

        {/* Right: Editor panel */}
        <div className="flex-1 flex flex-col min-h-0" style={{ minHeight: DOLL_H }}>
          {isWeaponSlot && activePMCSlot ? (
            <>
              <VendorRanks ranks={vendorRanks} setRanks={setVendorRanks}/>
              <WeaponSlotEditor
                slotLabel={activeSlot.label}
                weapons={slotWeapons}
                selectedWeaponId={activePMCSlot === "sidearm" ? selectedWeapons.sidearm : selectedWeapons.primary}
                onSelectWeapon={id => setSelectedWeapons(prev => ({
                  ...prev,
                  [activePMCSlot === "sidearm" ? "sidearm" : "primary"]: id,
                }))}
                allAttachments={allAttachments}
                vendorRanks={vendorRanks}
              />
            </>
          ) : isGadgetSlot && activePMCSlot ? (
            <>
              <VendorRanks ranks={vendorRanks} setRanks={setVendorRanks}/>
              <div className="mt-3">
                <p className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-3">
                  {activeSlot?.label}
                </p>
                <GadgetSlotEditor
                  gadgets={gadgets}
                  selectedGadgetId={selectedGadgets[activePMCSlot] ?? null}
                  onSelectGadget={id => setSelectedGadgets(prev => ({
                    ...prev,
                    [activePMCSlot]: id,
                  }))}
                  vendorRanks={vendorRanks}
                />
              </div>
            </>
          ) : activePMCSlot ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <p className="text-gray-400 text-sm font-semibold">{activeSlot?.label}</p>
              <p className="text-gray-700 text-xs mt-2">Gear builder coming soon for this slot</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <p className="text-gray-500 text-sm font-medium">Select a slot to get started</p>
              <p className="text-gray-700 text-xs mt-1">Click any slot on the doll or carriers panel</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

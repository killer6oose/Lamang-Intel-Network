"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { assetPath } from "../lib/assetPath";

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
interface HeadwearItem {
  id: string; name: string; type: string; subtype: string;
  slot: string; manufacturer: string | null;
  vendor: string | null; vendorRank: number | null;
  baseStats: { weight: number | null; rainProtection: number };
  gridSize: string | null; image: string | null;
  armorLevel?: string | null; material?: string | null;
  slots: Record<string, { label: string; required: boolean; compatible: string[] }>;
  verified: boolean;
}
interface ArmorItem {
  id: string; name: string; type: "Plate Carrier" | "Armor Vest";
  nijRating: string; material: string; plates: string;
  weight: number; gridSize?: string; slots?: number;
  vendor: string; vendorRank: number | null; image?: string;
}
interface RigItem {
  id: string; name: string; type: "Tactical Rig";
  slots: number; gridSize?: string; weight: number;
  vendor: string; vendorRank: number | null; image?: string;
}
interface ConsumableItem {
  id: string; name: string; category: "Grenade" | "Medical" | "Ammo";
  weight: number; gridSize?: string;
}
interface MedicalItem {
  id: string; name: string; category: string;
  charges?: number; vendor: string; vendorRank: number | null;
  gridSize: string; weight: number; image?: string | null;
}
interface ContainerItem {
  id: string; name: string; gridSize: string; rigSlots: number;
  internalSlots: number; vendor: string; vendorRank: number | null;
  holds: "keys" | "medical" | "valuables";
  weight: number; image?: string | null;
}
interface KeyItem {
  id: string; name: string; location: string; weight: number; image?: string | null;
}

interface BeltItem {
  id: string; name: string; category: string;
  gridSize: string; slots: number;
  weight: number; vendor: string | null; vendorRank: number | null;
  lootOnly: boolean; image?: string | null;
}
interface EyewearItem {
  id: string; name: string;
  weight: number | null; flashProtection: number | null; rainProtection: number | null;
  vendor: string | null; vendorRank: number | null; source: string; image: string | null;
}
interface FaceCoverItem {
  id: string; name: string;
  weight: number | null; rainProtection: number | null;
  vendor: string | null; vendorRank: number | null; source: string; image: string | null;
}
interface BackpackItem {
  id: string; name: string;
  gridSize: string | null; slots: number | null; hasSling: boolean;
  weight: number | null; vendor: string | null; vendorRank: number | null; source: string; image: string | null;
}
interface LockboxItem {
  id: string; name: string;
  gridSize: string | null; slots: number | null;
  weight: number | null; source: string; image: string | null;
}
interface HeadsetItem {
  id: string; name: string;
  weight: number | null; vendor: string | null; vendorRank: number | null; source: string; image: string | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const VENDORS = ["Gunny", "Artisan", "Turncoat", "Banshee", "Vulture", "Handshake"] as const;

const STAT_ICONS: Record<string, string> = {
  accuracy: "◎", recoilControl: "↩", ergonomics: "✋",
  muzzleDeviceEfficiency: "💨", muzzleVelocity: "⚡",
  loudnessReduction: "🔇", reloadSpeed: "↺", fireRateBonus: "⚙",
};

// Base PMC body weight (before gear). Change this value to adjust the starting total.
const PMC_BASE_WEIGHT = 3; // kg

// Doll layout - absolute positioning
const DOLL_W  = 480;  // container width
const DOLL_H  = 684;  // container height
const SW      = 110;  // standard slot width
const SH      = 90;   // standard slot height
const SWW     = SW * 2 + 16;  // wide (primary) slot width = 236
const SP      = 94;   // pocket slot width
const SPH     = 74;   // pocket slot height
const CX      = Math.round((DOLL_W - SW) / 2);  // 185 - center-aligned left
const RX      = DOLL_W - 8 - SW;               // 362 - right-aligned left

// Pocket spacing: 4 * SP + 3 * gap + 2 * 8 margin = 480  =>  gap ~ 29
const PG = Math.round((DOLL_W - 4 * SP - 16) / 3);

const DOLL_GRID_SLOTS: Array<{
  id: string; label: string; type: string;
  width: number; height: number; left: number; top: number;
  placeholder?: string;
}> = [
  // Head row
  { id: "headset",     label: "Headset",      type: "headset",     width: SW,  height: SH,  left: 8,          top: 12,  placeholder: "/HeadsetWeaponPlaceholder.png"  },
  { id: "headwear",    label: "Headwear",     type: "headwear", width: SW,  height: SH,  left: CX,         top: 12,  placeholder: "/HeadgearWeaponPlaceholder.png" },
  { id: "facewear",    label: "Face Cover",   type: "facecover",     width: SW,  height: SH,  left: RX,         top: 12,  placeholder: undefined                        },
  // Upper body (eyewear/backpack at eye-level, armor lower over chest)
  { id: "eyewear",     label: "Eyewear",      type: "eyewear",     width: SW,  height: SH,  left: 8,          top: 120, placeholder: "/EyewearPlaceholder.png"        },
  { id: "armor",       label: "Body Armor",   type: "armor",     width: SW,  height: SH,  left: CX,         top: 162, placeholder: "/BodyArmorPlaceholder.png"      },
  { id: "backpack",    label: "Backpack",     type: "backpack",     width: SW,  height: SH,  left: RX,         top: 120, placeholder: "/BackpackPlaceholder.png"       },
  // Weapons
  { id: "primary",     label: "Primary",      type: "weapon",   width: SWW, height: SH,  left: 8,          top: 288, placeholder: "/PrimaryWeaponPlaceholder.png"  },
  { id: "sidearm",     label: "Sidearm",      type: "weapon",   width: SW,  height: SH,  left: RX,         top: 288, placeholder: "/SidearmWeaponPlaceholder.png"  },
  // Mid gear
  { id: "tacticalRig", label: "Tactical Rig", type: "rig",     width: SW,  height: SH,  left: 8,          top: 394, placeholder: "/ChestRigPlaceholder.png"       },
  { id: "belt",        label: "Belt",         type: "belt",     width: SW,  height: SH,  left: CX,         top: 394, placeholder: "/BeltPlaceholder.png"           },
  // Lower gear
  { id: "binos",       label: "Gadgets",      type: "gadget",   width: SW,  height: SH,  left: 8,          top: 500, placeholder: undefined                        },
  { id: "secureCase",  label: "Secure Case",  type: "lockbox",     width: SW,  height: SH,  left: RX,         top: 500, placeholder: "/SafePlaceholder.png"           },
  // Pockets row (smaller, evenly spaced)
  { id: "pocket1",     label: "Pocket 1",     type: "pocket",     width: SP,  height: SPH, left: 8,                top: 602, placeholder: undefined },
  { id: "pocket2",     label: "Pocket 2",     type: "pocket",     width: SP,  height: SPH, left: 8 + SP + PG,      top: 602, placeholder: undefined },
  { id: "pocket3",     label: "Pocket 3",     type: "pocket",     width: SP,  height: SPH, left: 8 + 2*(SP + PG),  top: 602, placeholder: undefined },
  { id: "pocket4",     label: "Pocket 4",     type: "pocket",     width: SP,  height: SPH, left: 8 + 3*(SP + PG),  top: 602, placeholder: undefined },
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
          ? "ring-1 ring-[#6b9c5e] shadow-[0_0_12px_rgba(245,158,11,0.35)]"
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
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#6b9c5e]"/>
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
                <img src={assetPath(slot.placeholder)} alt="" className="w-full h-full object-contain" />
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
                <img src={assetPath(slot.placeholder)} alt="" className="w-full h-full object-contain" style={{ opacity: 0.2 }} />
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
        <div className="absolute inset-0 bg-[#6b9c5e]/0 group-hover:bg-[#6b9c5e]/5 transition-colors"/>
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
        : slot.required ? "border-[#2d4220]/40 bg-[#1a2612]/10"
        : "border-gray-800 bg-gray-950"
    }`}>
      <div className="flex items-stretch min-h-10">
        <div className="flex items-center px-3 py-2 min-w-28 border-r border-gray-800 shrink-0">
          <span className="text-xs font-medium text-gray-300">
            {slot.label}{slot.required && <span className="text-[#6b9c5e] ml-1">*</span>}
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
                selected === att.id ? "bg-[#1a2612]/30 text-[#a8c4a0]" : "text-gray-200"
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

// ─── Weapon Dropdown (searchable, grouped) ────────────────────────────────────────────

const WEAPON_TYPE_ORDER = [
  "Assault Rifle",
  "SMG",
  "Bolt-Action Rifle",
  "Sniper Rifle",
  "Shotgun",
];

function WeaponDropdown({ weapons, value, onChange }: {
  weapons: Weapon[];
  value: string | null;
  onChange: (id: string | null) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen]   = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef     = useRef<HTMLInputElement>(null);

  // Filtered, grouped list
  const groups = useMemo(() => {
    const q = query.toLowerCase();
    const filtered = q
      ? weapons.filter(w =>
          w.name.toLowerCase().includes(q) ||
          w.caliber.toLowerCase().includes(q) ||
          w.type.toLowerCase().includes(q) ||
          (w.vendor ?? "").toLowerCase().includes(q)
        )
      : weapons;

    const byType: Record<string, Weapon[]> = {};
    filtered.forEach(w => {
      if (!byType[w.type]) byType[w.type] = [];
      byType[w.type].push(w);
    });

    const ordered = WEAPON_TYPE_ORDER
      .filter(t => byType[t]?.length)
      .map(t => ({ type: t, items: byType[t] }));

    // Append any types not in the order list
    Object.entries(byType)
      .filter(([t]) => !WEAPON_TYPE_ORDER.includes(t))
      .forEach(([t, ws]) => ordered.push({ type: t, items: ws }));

    return ordered;
  }, [weapons, query]);

  const selected = weapons.find(w => w.id === value) ?? null;

  // Focus input when panel opens
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pick = (id: string | null) => {
    onChange(id);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative mb-4">
      {/* Trigger button / search input */}
      <div
        onClick={() => { setOpen(true); inputRef.current?.focus(); }}
        className={`w-full flex items-center gap-2 bg-gray-900 border rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${
          open ? "border-[#6b9c5e]" : "border-gray-700 hover:border-gray-600"
        }`}
      >
        {open ? (
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === "Escape") { setOpen(false); setQuery(""); } }}
            placeholder="Search weapons…"
            className="flex-1 bg-transparent text-sm text-gray-100 outline-none placeholder-gray-600"
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <span className={`flex-1 text-sm truncate ${selected ? "text-gray-100" : "text-gray-500"}`}>
            {selected
              ? <>{selected.name}<span className="text-gray-500">  ·  {selected.caliber}  ·  {selected.vendor}{selected.vendorRank ? ` R${selected.vendorRank}` : ""}</span></>
              : "- Select a weapon -"
            }
          </span>
        )}
        <span className="text-gray-600 text-xs shrink-0 select-none">{open ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-72 overflow-y-auto bg-gray-950 border border-gray-700 rounded-lg shadow-2xl">
          <button
            onClick={() => pick(null)}
            className="w-full text-left px-3 py-2 text-xs text-gray-600 hover:text-gray-400 hover:bg-gray-900 border-b border-gray-800 transition-colors"
          >
            — None —
          </button>

          {groups.length === 0 ? (
            <p className="px-3 py-4 text-sm text-gray-600 text-center">No weapons match &quot;{query}&quot;</p>
          ) : groups.map(g => (
            <div key={g.type}>
              {/* Category header */}
              <div className="sticky top-0 px-3 py-1.5 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 flex items-center gap-2">
                <span className="text-xs font-semibold text-[#4a6741] uppercase tracking-wider">{g.type}</span>
                <span className="text-xs text-gray-700">{g.items.length}</span>
              </div>
              {/* Weapon rows */}
              {g.items.map(w => (
                <button
                  key={w.id}
                  onClick={() => pick(w.id)}
                  className={`w-full text-left px-4 py-2 flex items-center justify-between gap-2 transition-colors ${
                    w.id === value
                      ? "bg-[#6b9c5e]/10 text-[#8db87e]"
                      : "hover:bg-gray-800/70 text-gray-300"
                  }`}
                >
                  <span className="text-sm font-medium leading-tight">{w.name}</span>
                  <span className="text-xs text-gray-600 shrink-0 text-right leading-tight">
                    {w.caliber}<br/>
                    <span className="text-[#2d4220]/80">{w.vendor}{w.vendorRank ? ` R${w.vendorRank}` : ""}</span>
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WeaponSlotEditor({ slotLabel, weapons, selectedWeaponId, onSelectWeapon, allAttachments, vendorRanks, onWeightUpdate, initialAttachments, onAttachmentsChange }: {
  slotLabel: string; weapons: Weapon[]; selectedWeaponId: string | null;
  onSelectWeapon: (id: string | null) => void; allAttachments: Record<string, Attachment>;
  vendorRanks: Record<string, number>;
  onWeightUpdate?: (w: number) => void;
  initialAttachments?: Record<string, string | null>;
  onAttachmentsChange?: (atts: Record<string, string | null>) => void;
}) {
  const [showComponents, setShowComponents] = useState(false);
  const [selectedAttachments, setSelectedAttachments] = useState<Record<string, string | null>>(initialAttachments ?? {});

  const weapon = weapons.find(w => w.id === selectedWeaponId) ?? null;

  const handleSelectWeapon = (id: string | null) => {
    onSelectWeapon(id);
    setSelectedAttachments({});
    onAttachmentsChange?.({});
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

  // Use strippedWeight (bare receiver) when available so attachments aren't double-counted.
  // Falls back to baseStats.weight for weapons not yet measured stripped.
  const baseWeight = weapon?.baseStats.strippedWeight ?? weapon?.baseStats.weight ?? 0;
  const totalWeight = baseWeight + (statDeltas.weight ?? 0);
  // Report weight to parent for breakdown panel
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { onWeightUpdate?.(totalWeight); }, [totalWeight]);
  const filledCount = Object.values(selectedAttachments).filter(Boolean).length;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-400 uppercase tracking-widest font-semibold">{slotLabel}</span>
        <div className="flex-1 h-px bg-gray-800"/>
      </div>

      <WeaponDropdown weapons={weapons} value={selectedWeaponId} onChange={handleSelectWeapon} />

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
                      <span className="text-xs text-[#6b9c5e]/80">{weapon.vendor} R{weapon.vendorRank}</span>
                      <span className="text-gray-700 text-xs">·</span>
                      <span className="text-xs text-gray-500">{weapon.baseStats.rateOfFire ?? "?"} RPM</span>
                      {!weapon.verified && (
                        <span className="text-xs bg-[#1a2612]/30 text-[#4a6741] px-1.5 py-0.5 rounded">unverified</span>
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
                ? "bg-[#6b9c5e]/15 border-[#4a6741]/60 text-[#8db87e]"
                : "bg-gray-800/80 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-2">
              <span>🔧</span>
              <span>Edit Components</span>
              {filledCount > 0 && (
                <span className="bg-[#6b9c5e] text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {filledCount}
                </span>
              )}
            </span>
            <span className="text-gray-500 text-xs">{Object.keys(weapon.slots).length} slots {showComponents ? "▲" : "▼"}</span>
          </button>

          {showComponents && (
            <div className="flex-1 overflow-y-auto space-y-2 pr-0.5 pb-4">
              <p className="text-xs text-gray-700 px-1 mb-2">
                {Object.keys(weapon.slots).length} attachment points · <span className="text-[#2d4220]">* required</span>
              </p>
              {Object.entries(weapon.slots).map(([key, slot]) => (
                <AttachmentRow key={key} slotKey={key} slot={slot} allAttachments={allAttachments}
                  selected={selectedAttachments[key]??null}
                  onSelect={(k,id) => {
                    const next = {...selectedAttachments, [k]: id};
                    setSelectedAttachments(next);
                    onAttachmentsChange?.(next);
                  }}
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
          <p className="text-gray-500 text-base">Select a weapon to begin</p>
          <p className="text-gray-700 text-sm mt-1">
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
                {v[0]}<span className="text-[#8db87e]">{ranks[v]}</span>
              </span>
            ))}
          </div>
          <span className="text-gray-700 text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-gray-800 bg-gray-950 grid grid-cols-2 gap-3">
          {VENDORS.map(v => (
            <div key={v} className="flex items-center justify-between gap-2">
              <span className="text-gray-300 text-sm">{v}</span>
              <div className="flex gap-1">
                {[1,2,3,4].map(r => (
                  <button key={r} onClick={() => setRanks(p => ({...p,[v]:r}))}
                    className={`w-7 h-7 rounded text-xs font-bold transition-colors ${
                      (ranks[v]??1) >= r ? "bg-[#6b9c5e] text-black" : "bg-gray-800 text-gray-600 hover:bg-gray-700"
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
                  <span className="text-xs bg-[#1a2612]/60 text-[#8db87e] border border-[#2d4220]/50 px-1.5 rounded">upcoming</span>
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
                      ? "border-[#4a6741] bg-[#1a2612]/30 text-[#a8c4a0]"
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

// ─── Headwear Slot Editor ─────────────────────────────────────────────────────

function HeadwearSlotEditor({ headwear, selectedId, onSelect, vendorRanks }: {
  headwear: HeadwearItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  vendorRanks: Record<string, number>;
}) {
  const selected = headwear.find(h => h.id === selectedId) ?? null;

  const isAvailable = (h: HeadwearItem) => {
    if (!h.vendor || h.vendor === "Loot only") return true;
    if (!h.vendorRank) return true;
    return (vendorRanks[h.vendor] ?? 0) >= h.vendorRank;
  };

  const available = headwear.filter(isAvailable);
  const rankLocked = headwear.filter(h => !isAvailable(h));
  const helmets = available.filter(h => h.subtype === "Helmet");
  const vanity = available.filter(h => h.subtype === "Vanity");

  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      {/* Selected item summary */}
      <div className="border border-gray-800 rounded-lg p-3 bg-gray-950 min-h-20 flex items-center gap-4">
        {selected ? (
          <>
            {selected.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={selected.image} alt={selected.name}
                className="w-20 h-14 object-contain shrink-0"
                style={{ filter: "brightness(0.85) saturate(0.7) sepia(0.2)" }}
              />
            ) : (
              <div className="w-20 h-14 shrink-0 flex items-center justify-center text-3xl opacity-20">
                🪖
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-semibold text-sm">{selected.name}</span>
                <span className="text-xs bg-gray-800 text-gray-400 px-1.5 rounded">{selected.subtype}</span>
                {selected.armorLevel && (
                  <span className="text-xs bg-green-900/40 text-green-400 border border-green-800/40 px-1.5 rounded">{selected.armorLevel}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-xs text-gray-500">
                {selected.manufacturer && <span>{selected.manufacturer}</span>}
                {selected.vendor === "Loot only"
                  ? <span className="italic">Loot only</span>
                  : selected.vendor
                    ? <span>{selected.vendor} R{selected.vendorRank}</span>
                    : <span className="italic">vendor unknown</span>
                }
                {selected.baseStats.weight != null
                  ? <span className="font-mono">{selected.baseStats.weight.toFixed(3)} kg</span>
                  : <span className="italic">weight unknown</span>
                }
                {selected.baseStats.rainProtection !== 0 && (
                  <span className="text-blue-400">+{selected.baseStats.rainProtection}% rain</span>
                )}
                {selected.material && <span>{selected.material}</span>}
                {selected.gridSize && <span>{selected.gridSize} grid</span>}
              </div>
            </div>
            <button onClick={() => onSelect(null)}
              className="text-gray-600 hover:text-gray-300 text-xs w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition-colors shrink-0">
              ✕
            </button>
          </>
        ) : (
          <span className="text-gray-600 text-sm italic">No headwear selected</span>
        )}
      </div>

      {/* NVG mount slot (if selected helmet has one) */}
      {selected?.slots?.nvgMount && (
        <div className="border border-gray-800 rounded-lg overflow-hidden">
          <div className="flex items-center px-3 py-2 bg-gray-900/60 border-b border-gray-800">
            <span className="text-xs font-medium text-gray-300">NVG Mount</span>
            <span className="ml-2 text-xs text-gray-600 italic">- data coming soon -</span>
          </div>
          <div className="px-3 py-2.5 flex flex-wrap gap-1.5">
            {selected.slots.nvgMount.compatible.map(id => (
              <span key={id} className="text-xs bg-gray-800/40 text-gray-600 px-2 py-0.5 rounded font-mono border border-gray-800">
                {id.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Picker */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3">
        {helmets.length > 0 && (
          <div>
            <div className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1">Combat Helmets</div>
            <div className="flex flex-col gap-0.5">
              {helmets.map(h => (
                <button key={h.id}
                  onClick={() => onSelect(selectedId === h.id ? null : h.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                    selectedId === h.id
                      ? "border-[#4a6741] bg-[#1a2612]/30 text-[#a8c4a0]"
                      : "border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-200"
                  }`}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{h.name}</span>
                    {h.armorLevel && (
                      <span className="text-xs bg-green-900/30 text-green-500 px-1 rounded">{h.armorLevel}</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {h.vendor === "Loot only" ? "Loot only" : h.vendor ? `${h.vendor} R${h.vendorRank}` : "vendor TBD"}
                    {h.baseStats.weight != null ? ` · ${h.baseStats.weight.toFixed(3)} kg` : ""}
                    {h.material ? ` · ${h.material}` : ""}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {vanity.length > 0 && (
          <div>
            <div className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1">Vanity</div>
            <div className="flex flex-col gap-0.5">
              {vanity.map(h => (
                <button key={h.id}
                  onClick={() => onSelect(selectedId === h.id ? null : h.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                    selectedId === h.id
                      ? "border-[#4a6741] bg-[#1a2612]/30 text-[#a8c4a0]"
                      : "border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-200"
                  }`}>
                  <span className="font-medium">{h.name}</span>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {h.vendor === "Loot only" ? "Loot only" : h.vendor ? `${h.vendor} R${h.vendorRank}` : "vendor TBD"}
                    {h.baseStats.weight != null ? ` · ${h.baseStats.weight.toFixed(3)} kg` : ""}
                    {h.baseStats.rainProtection !== 0 ? ` · +${h.baseStats.rainProtection}% rain` : ""}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {rankLocked.length > 0 && (
          <div>
            <div className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1">🔒 Rank locked</div>
            <div className="flex flex-col gap-0.5">
              {rankLocked.map(h => (
                <div key={h.id} className="px-3 py-2 rounded-lg border border-gray-800 text-sm opacity-50">
                  <div className="text-gray-500">{h.name}</div>
                  <div className="text-xs text-gray-600">{h.vendor} R{h.vendorRank}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Weight Breakdown ───────────────────────────────────────────────────────

function WeightBreakdown({ rows }: {
  rows: Array<{ id: string; label: string; weight: number | null }>;
}) {
  const gearTotal = rows.reduce((sum, r) => sum + (r.weight ?? 0), 0);
  const total = PMC_BASE_WEIGHT + gearTotal;
  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-gray-900/60 border-b border-gray-800">
        <span className="text-sm text-gray-400 font-medium uppercase tracking-widest">Weight</span>
      </div>
      <div className="divide-y divide-gray-900">
        {rows.map(r => (
          <div key={r.id} className="flex items-center justify-between px-4 py-2.5">
            <span className="text-sm text-gray-400">{r.label}</span>
            <span className={"text-sm font-mono tabular-nums " + (r.weight != null ? "text-gray-200" : "text-gray-700")}>
              {r.weight != null ? r.weight.toFixed(2) + " kg" : "- -"}
            </span>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-gray-700 bg-gray-900/40 flex items-center justify-between">
        <span className="text-sm text-gray-300 font-medium">Total PMC Weight</span>
        <span className="text-base font-bold font-mono tabular-nums text-[#8db87e]">
          {total.toFixed(2)} kg
        </span>
      </div>
    </div>
  );
}

// ─── Shared helpers ────────────────────────────────────────────────────────────

function GroupedDropdown<T extends { id: string; name: string; vendor: string; vendorRank: number | null }>({
  groups, selectedId, onSelect, placeholder, searchQuery, onSearchChange,
  renderItem, open, onOpen, containerRef,
}: {
  groups: Array<{ label: string; items: T[]; disabledBanner?: string }>;
  selectedId: string | null;
  onSelect: (item: T) => void;
  placeholder: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  renderItem: (item: T, isSelected: boolean) => React.ReactNode;
  open: boolean;
  onOpen: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const hasResults = groups.some(g => g.items.length > 0 && !g.disabledBanner || (g.disabledBanner && g.items.length > 0));
  return (
    <div ref={containerRef} className="relative">
      <div
        className="flex items-center gap-2 border border-gray-700 rounded-lg px-3 py-2 cursor-text bg-gray-950 hover:border-gray-600 transition-colors"
        onClick={onOpen}
      >
        <span className="text-gray-600 text-sm shrink-0">🔍</span>
        <input
          className="flex-1 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-600"
          placeholder={placeholder}
          value={searchQuery}
          onChange={e => { onSearchChange(e.target.value); onOpen(); }}
          onFocus={onOpen}
        />
      </div>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-40 bg-gray-950 border border-gray-700 rounded-lg shadow-xl max-h-80 overflow-y-auto">
          {groups.map(grp => grp.items.length === 0 ? null : (
            <div key={grp.label} className="p-2">
              <div className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1">{grp.label}</div>
              {grp.disabledBanner ? (
                <div className="px-3 py-2 rounded-lg border border-red-900/50 bg-red-950/20 text-xs text-red-400 italic">{grp.disabledBanner}</div>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {grp.items.map(item => renderItem(item, selectedId === item.id))}
                </div>
              )}
            </div>
          ))}
          {!hasResults && (
            <div className="px-3 py-4 text-sm text-gray-600 text-center">No results</div>
          )}
        </div>
      )}
    </div>
  );
}

function ItemSummaryCard({ image, name, badge, badgeClass, subLine, onClear, dimImage }: {
  image?: string | null; name: string; badge?: string; badgeClass?: string;
  subLine?: React.ReactNode; onClear?: () => void; dimImage?: boolean;
}) {
  return (
    <div className="border border-gray-800 rounded-lg p-3 bg-gray-950 flex items-center gap-3 mb-2">
      {image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={image} alt={name} className="w-16 h-12 object-contain shrink-0"
          style={{ filter: dimImage ? "brightness(0.85) saturate(0.7) sepia(0.2)" : undefined }} />
      ) : (
        <div className="w-16 h-12 shrink-0 flex items-center justify-center text-2xl opacity-20">🛡</div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white font-semibold text-sm">{name}</span>
          {badge && <span className={`text-xs px-1.5 rounded ${badgeClass ?? "bg-gray-800 text-gray-400"}`}>{badge}</span>}
        </div>
        {subLine && <div className="mt-1 text-xs text-gray-500">{subLine}</div>}
      </div>
      {onClear && (
        <button onClick={onClear}
          className="text-gray-600 hover:text-gray-300 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition-colors text-xs shrink-0">
          ✕
        </button>
      )}
    </div>
  );
}

// ─── Container Sub-Item Picker ──────────────────────────────────────────────

function ContainerSubPicker({ container, contents, onContentsChange, medical, keys: keyItems }: {
  container: ContainerItem;
  contents: (string | null)[];
  onContentsChange: (index: number, id: string | null) => void;
  medical: MedicalItem[];
  keys: KeyItem[];
}) {
  const maxSlots = Math.min(container.internalSlots, container.holds === "keys" ? 8 : 4);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const optionsByGroup: Record<string, Array<{ id: string; name: string }>> = {};
  if (container.holds === "keys") {
    const byLoc = keyItems.reduce<Record<string, typeof keyItems>>((acc, k) => {
      (acc[k.location] ??= []).push(k);
      return acc;
    }, {});
    for (const [loc, ks] of Object.entries(byLoc)) {
      const filtered = ks.filter(k => k.name.toLowerCase().includes(query.toLowerCase()));
      if (filtered.length) optionsByGroup[loc] = filtered;
    }
  } else if (container.holds === "medical") {
    const byCat = medical.reduce<Record<string, typeof medical>>((acc, m) => {
      (acc[m.category] ??= []).push(m);
      return acc;
    }, {});
    for (const [cat, items] of Object.entries(byCat)) {
      const filtered = items.filter(m => m.name.toLowerCase().includes(query.toLowerCase()));
      if (filtered.length) optionsByGroup[cat] = filtered;
    }
  }

  if (container.holds === "valuables") {
    return <p className="text-xs text-gray-600 italic px-1 mt-1">Holds currency/valuables — not tracked</p>;
  }

  return (
    <div className="mt-1.5 ml-3 pl-3 border-l border-gray-800 flex flex-col gap-1">
      <p className="text-xs text-gray-600 mb-1">
        {container.holds === "keys" ? "Keys stored" : "Medical contents"} ({maxSlots} slots)
      </p>
      {Array.from({ length: maxSlots }).map((_, i) => {
        const filledId = contents[i] ?? null;
        const filledName = container.holds === "keys"
          ? keyItems.find(k => k.id === filledId)?.name
          : medical.find(m => m.id === filledId)?.name;
        return (
          <div key={i} className="relative">
            <div
              className={`flex items-center gap-2 border rounded px-2 py-1 cursor-pointer text-xs transition-colors ${
                filledId ? "border-gray-700 bg-gray-900" : "border-gray-800 bg-gray-950 hover:border-gray-700"
              }`}
              onClick={() => { setOpenIdx(openIdx === i ? null : i); setQuery(""); }}
            >
              <span className="text-gray-600 w-4 font-mono">{i + 1}</span>
              <span className={filledId ? "text-gray-300 flex-1" : "text-gray-600 italic flex-1"}>
                {filledName ?? "Empty"}
              </span>
              {filledId && (
                <button onClick={e => { e.stopPropagation(); onContentsChange(i, null); }}
                  className="text-gray-600 hover:text-red-400 transition-colors">✕</button>
              )}
            </div>
            {openIdx === i && (
              <div className="absolute top-full left-0 right-0 mt-0.5 z-50 bg-gray-950 border border-gray-700 rounded shadow-xl max-h-48 overflow-y-auto">
                <div className="p-1.5 border-b border-gray-800">
                  <input autoFocus className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs text-gray-200 outline-none placeholder-gray-600"
                    placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)}
                    onClick={e => e.stopPropagation()} />
                </div>
                {Object.entries(optionsByGroup).map(([grp, items]) => (
                  <div key={grp} className="p-1.5">
                    <div className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-0.5">{grp}</div>
                    {items.map(item => (
                      <button key={item.id}
                        onClick={() => { onContentsChange(i, item.id); setOpenIdx(null); setQuery(""); }}
                        className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                          filledId === item.id ? "bg-[#1a2612]/30 text-[#a8c4a0]" : "hover:bg-gray-900 text-gray-300"
                        }`}>
                        {item.name}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Rig Slot Row ────────────────────────────────────────────────────────────

function RigSlotRow({ index, slotValue, totalSlots, consumables, medical, containers, keys: keyItems,
  contents, onSelect, onContentsChange }: {
  index: number;
  slotValue: string | null;
  totalSlots: number;
  consumables: ConsumableItem[];
  medical: MedicalItem[];
  containers: ContainerItem[];
  keys: KeyItem[];
  contents: (string | null)[];
  onSelect: (id: string | null, containers: ContainerItem[], medical?: MedicalItem[]) => void;
  onContentsChange: (subIndex: number, id: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Is this slot occupied by a multi-slot item from another slot?
  if (slotValue?.startsWith("__occ:")) {
    const srcIdx = parseInt(slotValue.split(":")[1]);
    return (
      <div className="flex items-center gap-2 border border-gray-800/50 rounded-lg px-3 py-1.5 bg-gray-950/50 opacity-60">
        <span className="text-xs text-gray-600 w-5 font-mono">{index + 1}</span>
        <span className="text-xs text-gray-500 italic flex-1">Occupied by slot {srcIdx + 1} item</span>
      </div>
    );
  }

  // Build picker options
  const grenades = consumables.filter(c => c.category === "Grenade");
  const ammo     = consumables.filter(c => c.category === "Ammo");
  const mags     = [] as Array<{ id: string; name: string; weight: number; category: string }>;

  // Filter options by search
  const filterQ = <T extends { id: string; name: string }>(items: T[]) =>
    items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));

  const groups: Array<{ label: string; items: Array<{ id: string; name: string; weight?: number; gridSize?: string; rigSlots?: number }> }> = [
    { label: "Grenades",   items: filterQ(grenades) },
    { label: "Medical",    items: filterQ(medical) },
    { label: "Ammo",       items: filterQ(ammo) },
    { label: "Containers", items: filterQ(containers) },
  ].filter(g => g.items.length > 0);

  const findItem = (id: string) => {
    const allItems = [
      ...consumables.map(c => ({ ...c, type: "consumable" as const })),
      ...medical.map(m => ({ ...m, type: "medical" as const })),
      ...containers.map(c => ({ ...c, type: "container" as const })),
    ];
    return allItems.find(i => i.id === id) ?? null;
  };

  const filled = slotValue ? findItem(slotValue) : null;
  const filledContainer = slotValue ? containers.find(c => c.id === slotValue) : null;
  const filledWeight = (filled && "weight" in filled) ? (filled as { weight: number }).weight : 0;

  return (
    <div>
      <div ref={ref} className="relative">
        <div
          className={`flex items-center gap-2 border rounded-lg px-3 py-1.5 cursor-pointer bg-gray-950 hover:border-gray-600 transition-colors ${
            filled ? "border-gray-700" : "border-gray-800"
          }`}
          onClick={() => setOpen(o => !o)}
        >
          <span className="text-xs text-gray-600 w-5 shrink-0 font-mono">{index + 1}</span>
          {filled ? (
            <>
              <span className="text-sm text-gray-200 flex-1">{filled.name}</span>
              {filledContainer && (
                <span className="text-xs text-[#4a6741] mr-1">📦 {filledContainer.rigSlots > 1 ? `×${filledContainer.rigSlots}` : ""}</span>
              )}
              <span className="text-xs text-gray-500">{filledWeight.toFixed(3)} kg</span>
              <button onClick={e => { e.stopPropagation(); onSelect(null, containers); }}
                className="text-gray-600 hover:text-gray-300 w-5 h-5 flex items-center justify-center rounded hover:bg-gray-800 transition-colors text-xs">✕</button>
            </>
          ) : (
            <span className="text-sm text-gray-600 flex-1 italic">Empty slot</span>
          )}
        </div>
        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-gray-950 border border-gray-700 rounded-lg shadow-xl max-h-64 overflow-y-auto">
            <div className="p-2 border-b border-gray-800">
              <input autoFocus className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm text-gray-200 outline-none placeholder-gray-600"
                placeholder="Search items..." value={query} onChange={e => setQuery(e.target.value)}
                onClick={e => e.stopPropagation()} />
            </div>
            {groups.map(g => (
              <div key={g.label} className="p-2">
                <div className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1">{g.label}</div>
                {g.items.map(item => {
                  const isCont  = containers.find(c => c.id === item.id);
                  const isMed   = medical.find(m => m.id === item.id);
                  const slotsNeeded = isCont?.rigSlots ?? (isMed?.gridSize === "1x2" ? 2 : 1);
                  const fits = index + slotsNeeded <= totalSlots;
                  return (
                    <button key={item.id}
                      disabled={!fits}
                      onClick={() => { onSelect(item.id, containers); setOpen(false); setQuery(""); }}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                        slotValue === item.id ? "bg-[#1a2612]/30 text-[#a8c4a0]"
                        : fits ? "hover:bg-gray-900 text-gray-300"
                        : "text-gray-600 opacity-40 cursor-not-allowed"
                      }`}>
                      <span>{item.name}</span>
                      {isCont && <span className="ml-2 text-xs text-[#4a6741]">{isCont.gridSize} · {isCont.rigSlots} slots</span>}
                      {isMed && isMed.gridSize === "1x2" && <span className="ml-2 text-xs text-[#4a6741]">1×2</span>}
                      {"weight" in item && <span className="ml-2 text-xs text-gray-600">{(item as { weight: number }).weight.toFixed(3)} kg</span>}
                      {!fits && isCont && <span className="ml-2 text-xs text-red-700">needs {slotsNeeded} slots</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Container sub-item picker */}
      {filledContainer && filledContainer.holds !== "valuables" && (
        <ContainerSubPicker
          container={filledContainer}
          contents={contents}
          onContentsChange={onContentsChange}
          medical={medical}
          keys={keyItems}
        />
      )}
    </div>
  );
}

// ─── Armor Slot Editor ────────────────────────────────────────────────────────

function ArmorSlotEditor({ armorItems, rigs, selectedArmorId, selectedRigId,
  onSelectArmor, onSelectRig, onResetRigSlots, vendorRanks }: {
  armorItems: ArmorItem[];
  rigs: RigItem[];
  selectedArmorId: string | null;
  selectedRigId: string | null;
  onSelectArmor: (id: string | null) => void;
  onSelectRig: (id: string | null) => void;
  onResetRigSlots: () => void;
  vendorRanks: Record<string, number>;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen]   = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const selectedArmor  = armorItems.find(a => a.id === selectedArmorId) ?? null;
  const rigIsStdRig    = selectedRigId !== null && !armorItems.find(a => a.id === selectedRigId);
  const rankOk = (vendor: string, rank: number | null) => !rank || (vendorRanks[vendor] ?? 0) >= rank;

  const pcs   = armorItems.filter(a => a.type === "Plate Carrier" && a.name.toLowerCase().includes(query.toLowerCase()));
  const vests = armorItems.filter(a => a.type === "Armor Vest"    && a.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (item: ArmorItem) => {
    if (item.type === "Plate Carrier") {
      onSelectArmor(item.id);
      onSelectRig(item.id);
      onResetRigSlots();
    } else {
      onSelectArmor(item.id);
      // If rig was a PC, clear it
      if (selectedRigId && armorItems.find(a => a.id === selectedRigId && a.type === "Plate Carrier")) {
        onSelectRig(null);
        onResetRigSlots();
      }
    }
    setOpen(false); setQuery("");
  };

  const pcBanner = rigIsStdRig ? "Cannot equip a Plate Carrier while a Tactical Rig is equipped — remove the rig first" : undefined;

  const renderArmorItem = (item: ArmorItem, isSelected: boolean) => {
    const avail = rankOk(item.vendor, item.vendorRank);
    return (
      <button key={item.id} onClick={() => avail && handleSelect(item)} disabled={!avail}
        className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
          isSelected ? "border-[#4a6741] bg-[#1a2612]/30 text-[#a8c4a0]"
          : avail ? "border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-200"
          : "border-gray-800 text-gray-600 opacity-50 cursor-not-allowed"
        }`}>
        <div className="font-medium flex items-center gap-2">{item.name}
          {!avail && <span className="text-xs text-gray-600">🔒 R{item.vendorRank}</span>}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">
          {item.nijRating} · {item.material} · {item.weight.toFixed(1)} kg
          {item.slots ? ` · ${item.slots} rig slots` : ""}
          {item.vendor ? ` · ${item.vendor}${item.vendorRank ? " R" + item.vendorRank : ""}` : ""}
        </div>
      </button>
    );
  };

  const groups: Array<{ label: string; items: ArmorItem[]; disabledBanner?: string }> = [
    { label: "Plate Carriers", items: pcs, disabledBanner: pcBanner },
    { label: "Armor Vests",    items: vests },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Body Armor</span>
        <div className="flex-1 h-px bg-gray-800"/>
        {selectedArmor && (
          <button onClick={() => { onSelectArmor(null); if (selectedArmorId && armorItems.find(a => a.id === selectedArmorId && a.type === "Plate Carrier")) { onSelectRig(null); onResetRigSlots(); } }}
            className="text-xs text-gray-600 hover:text-gray-300 transition-colors">clear</button>
        )}
      </div>

      {selectedArmor && (
        <ItemSummaryCard
          image={selectedArmor.image} name={selectedArmor.name} dimImage
          badge={selectedArmor.type}
          badgeClass={selectedArmor.type === "Plate Carrier" ? "bg-[#1a2612]/60 text-[#8db87e] border border-[#2d4220]/50" : "bg-gray-800 text-gray-400"}
          subLine={<>
            <span>{selectedArmor.nijRating}</span>
            <span className="mx-1">·</span>
            <span>{selectedArmor.material}</span>
            <span className="mx-1">·</span>
            <span className="font-mono">{selectedArmor.weight.toFixed(1)} kg</span>
            {selectedArmor.slots && <><span className="mx-1">·</span><span>{selectedArmor.slots} rig slots</span></>}
            {selectedArmor.type === "Plate Carrier" && <span className="ml-2 text-[#4a6741]/70">Fills both slots</span>}
          </>}
        />
      )}

      <GroupedDropdown
        groups={groups} selectedId={selectedArmorId}
        onSelect={handleSelect as (item: { id: string; name: string; vendor: string; vendorRank: number | null }) => void}
        placeholder={selectedArmor ? "Change armor..." : "Search armor..."}
        searchQuery={query} onSearchChange={setQuery}
        renderItem={(item, isSelected) => renderArmorItem(item as ArmorItem, isSelected)}
        open={open} onOpen={() => setOpen(true)} containerRef={ref}
      />
    </div>
  );
}

// ─── Rig Slot Editor ──────────────────────────────────────────────────────────

function RigSlotEditor({ armorItems, rigs, consumables, medical, containers, keyItems,
  selectedArmorId, selectedRigId, onSelectArmor, onSelectRig,
  rigSlotItems, onRigSlotChange, containerContents, onContainerContentsChange,
  onResetRigSlots, vendorRanks }: {
  armorItems: ArmorItem[];
  rigs: RigItem[];
  consumables: ConsumableItem[];
  medical: MedicalItem[];
  containers: ContainerItem[];
  keyItems: KeyItem[];
  selectedArmorId: string | null;
  selectedRigId: string | null;
  onSelectArmor: (id: string | null) => void;
  onSelectRig: (id: string | null) => void;
  rigSlotItems: (string | null)[];
  onRigSlotChange: (i: number, id: string | null, containers?: ContainerItem[], medical?: MedicalItem[]) => void;
  containerContents: Record<string, (string | null)[]>;
  onContainerContentsChange: (key: string, subIndex: number, id: string | null) => void;
  onResetRigSlots: () => void;
  vendorRanks: Record<string, number>;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen]   = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const selectedPC  = armorItems.find(a => a.id === selectedArmorId && a.type === "Plate Carrier") ?? null;
  const selectedRig = rigs.find(r => r.id === selectedRigId) ?? null;
  const armorIsVest = selectedArmorId !== null && !selectedPC;
  const rankOk = (vendor: string, rank: number | null) => !rank || (vendorRanks[vendor] ?? 0) >= rank;

  const filteredRigs = rigs.filter(r => r.name.toLowerCase().includes(query.toLowerCase()));
  const filteredPCs  = armorItems.filter(a => a.type === "Plate Carrier" && a.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelectRig = (rig: RigItem) => {
    onSelectRig(rig.id);
    if (selectedPC) { onSelectArmor(null); }
    onResetRigSlots();
    setOpen(false); setQuery("");
  };

  const handleSelectPC = (pc: ArmorItem) => {
    onSelectArmor(pc.id);
    onSelectRig(pc.id);
    onResetRigSlots();
    setOpen(false); setQuery("");
  };

  const pcBanner = armorIsVest ? "Cannot equip a Plate Carrier while an Armor Vest is equipped — remove the vest first" : undefined;

  const renderRigItem = (rig: RigItem, isSelected: boolean) => {
    const avail = rankOk(rig.vendor, rig.vendorRank);
    return (
      <button key={rig.id} onClick={() => avail && handleSelectRig(rig)} disabled={!avail}
        className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
          isSelected ? "border-[#4a6741] bg-[#1a2612]/30 text-[#a8c4a0]"
          : avail ? "border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-200"
          : "border-gray-800 text-gray-600 opacity-50 cursor-not-allowed"
        }`}>
        <div className="font-medium flex items-center gap-2">{rig.name}
          {!avail && <span className="text-xs text-gray-600">🔒 R{rig.vendorRank}</span>}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">
          {rig.slots} slots · {rig.weight.toFixed(2)} kg
          {rig.vendor ? ` · ${rig.vendor}${rig.vendorRank ? " R" + rig.vendorRank : ""}` : ""}
        </div>
      </button>
    );
  };

  const renderPCItem = (pc: ArmorItem, isSelected: boolean) => {
    return (
      <button key={pc.id} onClick={() => !armorIsVest && handleSelectPC(pc)} disabled={armorIsVest}
        className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
          isSelected ? "border-[#4a6741] bg-[#1a2612]/30 text-[#a8c4a0]"
          : armorIsVest ? "border-gray-800 text-gray-600 opacity-40 cursor-not-allowed"
          : "border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-200"
        }`}>
        <div className="font-medium">{pc.name}</div>
        <div className="text-xs text-gray-500 mt-0.5">
          {pc.nijRating} · {pc.slots ?? 0} rig slots · {pc.weight.toFixed(1)} kg
          {pc.vendor ? ` · ${pc.vendor}${pc.vendorRank ? " R" + pc.vendorRank : ""}` : ""}
        </div>
      </button>
    );
  };

  const groups: Array<{ label: string; items: (RigItem | ArmorItem)[]; disabledBanner?: string }> = [
    { label: "Tactical Rigs",  items: filteredRigs },
    { label: "Plate Carriers", items: filteredPCs, disabledBanner: pcBanner },
  ];

  const activeSlots = selectedPC ? (selectedPC.slots ?? 0) : (selectedRig?.slots ?? 0);
  const currentLabel = selectedPC?.name ?? selectedRig?.name;

  const rigContentsWeight = rigSlotItems
    .filter(v => v && !v.startsWith("__occ:"))
    .reduce((sum, id) => {
      const c = consumables.find(x => x.id === id); if (c) return sum + c.weight;
      const m = medical.find(x => x.id === id); if (m) return sum + m.weight;
      const ct = containers.find(x => x.id === id); if (ct) return sum + ct.weight;
      return sum;
    }, 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Tactical Rig</span>
        <div className="flex-1 h-px bg-gray-800"/>
        {(selectedRig || selectedPC) && (
          <button onClick={() => {
            onSelectRig(null);
            if (selectedPC) onSelectArmor(null);
            onResetRigSlots();
          }} className="text-xs text-gray-600 hover:text-gray-300 transition-colors">clear</button>
        )}
      </div>

      {selectedPC && (
        <ItemSummaryCard
          image={selectedPC.image} name={selectedPC.name} dimImage
          badge="Plate Carrier"
          badgeClass="bg-[#1a2612]/60 text-[#8db87e] border border-[#2d4220]/50"
          subLine={<span className="text-gray-600 italic">Equipped via Body Armor slot · {selectedPC.slots ?? 0} slots</span>}
        />
      )}
      {selectedRig && (
        <ItemSummaryCard
          image={selectedRig.image} name={selectedRig.name} dimImage
          subLine={<>{selectedRig.slots} slots · <span className="font-mono">{selectedRig.weight.toFixed(2)} kg</span>
            {selectedRig.vendor ? ` · ${selectedRig.vendor}${selectedRig.vendorRank ? " R" + selectedRig.vendorRank : ""}` : ""}
          </>}
        />
      )}

      <GroupedDropdown
        groups={groups as Parameters<typeof GroupedDropdown>[0]["groups"]}
        selectedId={selectedRigId}
        onSelect={(item) => {
          if (rigs.find(r => r.id === item.id)) handleSelectRig(item as RigItem);
          else handleSelectPC(item as ArmorItem);
        }}
        placeholder={currentLabel ? `Change rig...` : "Search rigs & plate carriers..."}
        searchQuery={query} onSearchChange={setQuery}
        renderItem={(item, isSelected) =>
          rigs.find(r => r.id === item.id)
            ? renderRigItem(item as RigItem, isSelected)
            : renderPCItem(item as ArmorItem, isSelected)
        }
        open={open} onOpen={() => setOpen(true)} containerRef={ref}
      />

      {activeSlots > 0 && (
        <div>
          <div className="flex items-center gap-3 mt-1 mb-2">
            <span className="text-xs text-gray-600 uppercase tracking-widest font-medium">Rig Contents</span>
            <div className="flex-1 h-px bg-gray-800"/>
            <span className="text-xs text-gray-600">{activeSlots} slots</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {Array.from({ length: activeSlots }).map((_, i) => (
              <RigSlotRow key={i} index={i} slotValue={rigSlotItems[i] ?? null}
                totalSlots={activeSlots}
                consumables={consumables} medical={medical} containers={containers} keys={keyItems}
                contents={containerContents[`rig:${i}`] ?? []}
                onSelect={(id, conts) => onRigSlotChange(i, id, conts, medical)}
                onContentsChange={(si, id) => onContainerContentsChange(`rig:${i}`, si, id)}
              />
            ))}
          </div>
          {rigContentsWeight > 0 && (
            <p className="text-xs text-gray-600 text-right mt-1">Contents: {rigContentsWeight.toFixed(3)} kg</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Pocket Slot Editor ───────────────────────────────────────────────────────

function PocketSlotEditor({ pocketIndex, currentItemId, onSelect, containerContents, onContainerContentsChange,
  consumables, medical, containers, keyItems }: {
  pocketIndex: number;
  currentItemId: string | null;
  onSelect: (id: string | null) => void;
  containerContents: (string | null)[];
  onContainerContentsChange: (subIndex: number, id: string | null) => void;
  consumables: ConsumableItem[];
  medical: MedicalItem[];
  containers: ContainerItem[];
  keyItems: KeyItem[];
}) {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Pockets only hold 1x1 items
  const pocketContainers  = containers.filter(c => c.rigSlots === 1);
  const pocketMedical     = medical.filter(m => m.gridSize === "1x1");

  const findFilled = (id: string | null) => {
    if (!id) return null;
    return consumables.find(c => c.id === id)
      ?? pocketMedical.find(m => m.id === id)
      ?? pocketContainers.find(c => c.id === id)
      ?? null;
  };

  const filled = findFilled(currentItemId);
  const filledContainer = currentItemId ? pocketContainers.find(c => c.id === currentItemId) ?? null : null;

  const grenades  = consumables.filter(c => c.category === "Grenade" && c.name.toLowerCase().includes(query.toLowerCase()));
  const ammo      = consumables.filter(c => c.category === "Ammo"    && c.name.toLowerCase().includes(query.toLowerCase()));
  const medItems  = pocketMedical.filter(m => m.name.toLowerCase().includes(query.toLowerCase()));
  const contItems = pocketContainers.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Pocket {pocketIndex + 1}</span>
        <div className="flex-1 h-px bg-gray-800"/>
        {filled && <button onClick={() => onSelect(null)} className="text-xs text-gray-600 hover:text-gray-300 transition-colors">clear</button>}
      </div>
      {filled && (
        <div className="border border-gray-800 rounded-lg p-3 bg-gray-950 flex items-center gap-3">
          {"image" in filled && filled.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={filled.image as string} alt={filled.name} className="w-14 h-10 object-contain shrink-0"
              style={{ filter: "brightness(0.85) saturate(0.7) sepia(0.2)" }} />
          ) : (
            <div className="w-14 h-10 shrink-0 flex items-center justify-center text-xl opacity-20">📦</div>
          )}
          <div className="flex-1 min-w-0">
            <span className="text-white font-semibold text-sm">{filled.name}</span>
            <div className="text-xs text-gray-500 mt-0.5">
              {"weight" in filled ? `${(filled as { weight: number }).weight.toFixed(3)} kg` : ""}
              {"category" in filled ? ` · ${"category" in filled ? (filled as { category: string }).category : ""}` : ""}
            </div>
          </div>
        </div>
      )}
      <div ref={ref} className="relative">
        <div className="flex items-center gap-2 border border-gray-700 rounded-lg px-3 py-2 cursor-text bg-gray-950 hover:border-gray-600 transition-colors"
          onClick={() => setOpen(true)}>
          <span className="text-gray-600 text-sm shrink-0">🔍</span>
          <input className="flex-1 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-600"
            placeholder={filled ? "Change item..." : "Search items (1×1 only)..."}
            value={query} onChange={e => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)} />
        </div>
        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 z-40 bg-gray-950 border border-gray-700 rounded-lg shadow-xl max-h-72 overflow-y-auto">
            {grenades.length > 0 && (
              <div className="p-2">
                <div className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1">Grenades</div>
                <div className="flex flex-col gap-0.5">
                  {grenades.map(g => (
                    <button key={g.id} onClick={() => { onSelect(g.id); setOpen(false); setQuery(""); }}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${currentItemId === g.id ? "bg-[#1a2612]/30 text-[#a8c4a0]" : "hover:bg-gray-900 text-gray-300"}`}>
                      {g.name}<span className="ml-2 text-xs text-gray-600">{g.weight.toFixed(3)} kg</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {medItems.length > 0 && (
              <div className="p-2">
                <div className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1">Medical</div>
                <div className="flex flex-col gap-0.5">
                  {medItems.map(m => (
                    <button key={m.id} onClick={() => { onSelect(m.id); setOpen(false); setQuery(""); }}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${currentItemId === m.id ? "bg-[#1a2612]/30 text-[#a8c4a0]" : "hover:bg-gray-900 text-gray-300"}`}>
                      {m.name}<span className="ml-2 text-xs text-gray-600">{m.category} · {m.weight.toFixed(3)} kg</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {ammo.length > 0 && (
              <div className="p-2">
                <div className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1">Ammo</div>
                <div className="flex flex-col gap-0.5">
                  {ammo.map(a => (
                    <button key={a.id} onClick={() => { onSelect(a.id); setOpen(false); setQuery(""); }}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${currentItemId === a.id ? "bg-[#1a2612]/30 text-[#a8c4a0]" : "hover:bg-gray-900 text-gray-300"}`}>
                      {a.name}<span className="ml-2 text-xs text-gray-600">{a.weight.toFixed(3)} kg</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {contItems.length > 0 && (
              <div className="p-2">
                <div className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1">Containers (1×1)</div>
                <div className="flex flex-col gap-0.5">
                  {contItems.map(c => (
                    <button key={c.id} onClick={() => { onSelect(c.id); setOpen(false); setQuery(""); }}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${currentItemId === c.id ? "bg-[#1a2612]/30 text-[#a8c4a0]" : "hover:bg-gray-900 text-gray-300"}`}>
                      {c.name}<span className="ml-2 text-xs text-gray-600">{c.gridSize} · {c.weight.toFixed(3)} kg</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {grenades.length === 0 && medItems.length === 0 && ammo.length === 0 && contItems.length === 0 && (
              <div className="px-3 py-4 text-sm text-gray-600 text-center">No results</div>
            )}
          </div>
        )}
      </div>
      {filledContainer && filledContainer.holds !== "valuables" && (
        <ContainerSubPicker
          container={filledContainer} contents={containerContents}
          onContentsChange={onContainerContentsChange} medical={medical} keys={keyItems}
        />
      )}
    </div>
  );
}



// ─── Belt Slot Editor ─────────────────────────────────────────────────────────

function BeltSlotEditor({ belts, selectedBeltId, onSelectBelt, slotItems, onSlotChange,
  containerContents, onContainerContentsChange, consumables, medical, containers, keyItems,
  vendorRanks }: {
  belts: BeltItem[];
  selectedBeltId: string | null;
  onSelectBelt: (id: string | null) => void;
  slotItems: (string | null)[];
  onSlotChange: (i: number, id: string | null) => void;
  containerContents: Record<string, (string | null)[]>;
  onContainerContentsChange: (key: string, si: number, id: string | null) => void;
  consumables: ConsumableItem[];
  medical: MedicalItem[];
  containers: ContainerItem[];
  keyItems: KeyItem[];
  vendorRanks: Record<string, number>;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen]   = useState(false);
  const containerRef      = useRef<HTMLDivElement | null>(null);

  const selectedBelt = belts.find(b => b.id === selectedBeltId) ?? null;
  const activeSlots  = selectedBelt?.slots ?? 0;

  const filtered = belts.filter(b => b.name.toLowerCase().includes(query.toLowerCase()));
  const civilian = filtered.filter(b => b.category === "Civilian");
  const military = filtered.filter(b => b.category === "Military");

  const isAvailable = (b: BeltItem) =>
    b.lootOnly || !b.vendor || !b.vendorRank || (vendorRanks[b.vendor] ?? 0) >= b.vendorRank;

  const beltContentsWeight = slotItems
    .filter(v => v && !v.startsWith("__occ:"))
    .reduce((sum, id) => {
      const c = consumables.find(x => x.id === id); if (c) return sum + c.weight;
      const m = medical.find(x => x.id === id); if (m) return sum + m.weight;
      const ct = containers.find(x => x.id === id); if (ct) return sum + ct.weight;
      return sum;
    }, 0);

  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Belt</span>
        <div className="flex-1 h-px bg-gray-800"/>
      </div>

      {/* Belt selector */}
      <div className="relative" ref={containerRef}>
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center gap-3 px-3 py-2 bg-gray-900/60 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors text-left"
        >
          {selectedBelt?.image
            ? <img src={selectedBelt.image} alt="" className="w-12 h-10 object-contain shrink-0"/>
            : <div className="w-12 h-10 shrink-0 flex items-center justify-center text-2xl opacity-20">🎽</div>}
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-200 truncate">{selectedBelt?.name ?? "Select belt..."}</div>
            {selectedBelt && (
              <div className="text-xs text-gray-500">{selectedBelt.gridSize} &middot; {selectedBelt.weight.toFixed(3)} kg</div>
            )}
          </div>
          <span className="text-gray-600 text-xs shrink-0">{open ? "▲" : "▼"}</span>
        </button>

        {open && (
          <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-gray-950 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="p-2 border-b border-gray-800">
              <input
                autoFocus
                className="w-full bg-transparent text-sm text-gray-200 outline-none placeholder-gray-600"
                placeholder="Search belts..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {selectedBeltId && (
                <button
                  className="w-full text-left px-3 py-2 text-xs text-gray-600 hover:text-gray-300 hover:bg-gray-900"
                  onClick={() => { onSelectBelt(null); setOpen(false); }}
                >Clear selection</button>
              )}
              {[{ label: "Civilian", items: civilian }, { label: "Military", items: military }].map(group => (
                group.items.length === 0 ? null : (
                  <div key={group.label}>
                    <div className="px-3 py-1 text-xs text-gray-600 uppercase tracking-widest font-semibold bg-gray-900/40">{group.label}</div>
                    {group.items.map(b => {
                      const avail = isAvailable(b);
                      return (
                        <button
                          key={b.id}
                          className={"w-full flex items-center gap-3 px-3 py-2 text-left transition-colors " + (b.id === selectedBeltId ? "bg-[#1a2612]/30" : "hover:bg-gray-900/60") + (!avail ? " opacity-40" : "")}
                          onClick={() => { onSelectBelt(b.id); setOpen(false); setQuery(""); }}
                        >
                          {b.image
                            ? <img src={b.image} alt="" className="w-10 h-8 object-contain shrink-0"/>
                            : <div className="w-10 h-8 shrink-0"/>}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-gray-200 truncate">{b.name}</div>
                            <div className="text-xs text-gray-500">{b.gridSize} · {b.weight.toFixed(3)} kg{b.vendor ? ` · ${b.vendor}${b.vendorRank ? ` R.${b.vendorRank}` : ""}` : " · Loot"}</div>
                          </div>
                          {!avail && <span className="text-xs text-red-700 shrink-0">locked</span>}
                        </button>
                      );
                    })}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Belt slot rows */}
      {activeSlots > 0 && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 uppercase tracking-widest">Belt Slots</span>
            <span className="text-xs text-gray-600">{activeSlots} slot{activeSlots > 1 ? "s" : ""}</span>
          </div>
          {Array.from({ length: activeSlots }).map((_, i) => (
            <RigSlotRow
              key={i}
              index={i}
              slotValue={slotItems[i] ?? null}
              totalSlots={activeSlots}
              consumables={consumables}
              medical={medical}
              containers={containers}
              keys={keyItems}
              onSelect={(id) => onSlotChange(i, id ?? null)}
              contents={containerContents[`belt:${i}`] ?? []}
              onContentsChange={(si, id) => onContainerContentsChange(`belt:${i}`, si, id)}
            />
          ))}
          {beltContentsWeight > 0 && (
            <p className="text-xs text-gray-600 text-right mt-1">Contents: {beltContentsWeight.toFixed(3)} kg</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── SimpleGearEditor ─────────────────────────────────────────────────────────
// Generic single-select dropdown for simple gear slots (eyewear, headset, etc.)
function SimpleGearEditor<T extends { id: string; name: string; vendor?: string | null; vendorRank?: number | null; weight?: number | null; source?: string; image?: string | null }>({
  label, items, selectedId, onSelect, vendorRanks, subLabel,
}: {
  label: string;
  items: T[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  vendorRanks?: Record<string, number>;
  subLabel?: (item: T) => string | undefined;
}) {
  const filtered = vendorRanks
    ? items.filter(item => {
        if (!item.vendor || item.vendorRank == null) return true;
        const rank = vendorRanks[item.vendor] ?? 0;
        return rank >= (item.vendorRank ?? 0);
      })
    : items;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{label}</span>
        <div className="flex-1 h-px bg-gray-800"/>
        {selectedId && (
          <button
            onClick={() => onSelect(null)}
            className="text-xs text-gray-600 hover:text-red-400 transition-colors"
          >✕ Clear</button>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {filtered.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id === selectedId ? null : item.id)}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-3 transition-colors text-sm border ${
              item.id === selectedId
                ? "border-[#6b9c5e] bg-[#6b9c5e]/10 text-gray-100"
                : "border-transparent bg-gray-900/50 text-gray-300 hover:bg-gray-800 hover:border-gray-700"
            }`}
          >
            {item.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt="" className="w-10 h-10 object-contain flex-shrink-0 rounded bg-black/30" />
            )}
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-medium truncate">{item.name}</span>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5 text-xs text-gray-500">
                {item.weight != null && <span>{item.weight.toFixed(3)} kg</span>}
                {subLabel && subLabel(item) && <span>{subLabel(item)}</span>}
                {item.vendor && item.vendorRank != null && (
                  <span className="text-[#6b9c5e]">{item.vendor} R.{item.vendorRank}</span>
                )}
                {item.source && !item.vendor && (
                  <span className="text-gray-600">{item.source}</span>
                )}
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-xs text-gray-600 italic px-3 py-2">No items match your current vendor ranks.</p>
        )}
      </div>
    </div>
  );
}

// ─── Root Component ────────────────────────────────────────────────────────────

export default function LoadoutBuilder({
  weapons, allAttachments, gadgets, headwear,
  armorItems, rigs, consumables, medicalItems, containerItems, keyItems, beltItems,
  eyewearItems, faceCoverItems, backpackItems, lockboxItems, headsetItems,
}: {
  weapons: Weapon[];
  allAttachments: Record<string, Attachment>;
  gadgets: Gadget[];
  headwear: HeadwearItem[];
  armorItems: ArmorItem[];
  rigs: RigItem[];
  consumables: ConsumableItem[];
  medicalItems: MedicalItem[];
  containerItems: ContainerItem[];
  keyItems: KeyItem[];
  beltItems: BeltItem[];
  eyewearItems: EyewearItem[];
  faceCoverItems: FaceCoverItem[];
  backpackItems: BackpackItem[];
  lockboxItems: LockboxItem[];
  headsetItems: HeadsetItem[];
}) {
  const [activePMCSlot, setActivePMCSlot] = useState<string | null>("primary");
  const [buildName, setBuildName] = useState("");
  const [selectedWeapons, setSelectedWeapons] = useState<Record<string, string | null>>({
    primary: null, sidearm: null,
  });
  // Lifted attachment state so we can serialize to URL
  const [weaponAttachments, setWeaponAttachments] = useState<Record<string, Record<string, string | null>>>({
    primary: {}, sidearm: {},
  });
  const [copied, setCopied] = useState(false);

  // ── Steam auth + saved builds ────────────────────────────────────────────────
  interface SteamUser { id: number; steamId: string; username: string; avatar: string; }
  interface SavedBuild { id: number; name: string; encoded: string; created_at: string; }
  const [steamUser, setSteamUser] = useState<SteamUser | null>(null);
  const [savedBuilds, setSavedBuilds] = useState<SavedBuild[]>([]);
  const [showBuildsMenu, setShowBuildsMenu] = useState(false);
  const [buildSaving, setBuildSaving] = useState(false);
  const [buildSaveMsg, setBuildSaveMsg] = useState('');

  // Check if user is logged in on mount
  useEffect(() => {
    fetch('/steam.php?action=me', { credentials: 'include' })
      .then(r => r.json())
      .then(u => { if (u && u.steamId) setSteamUser(u); })
      .catch(() => {});
  }, []);

  // Load saved builds whenever user logs in
  useEffect(() => {
    if (!steamUser) { setSavedBuilds([]); return; }
    fetch('/steam.php?action=builds', { credentials: 'include' })
      .then(r => r.json())
      .then(b => { if (Array.isArray(b)) setSavedBuilds(b); })
      .catch(() => {});
  }, [steamUser]);

  const handleSaveToAccount = async () => {
    if (!steamUser) { window.location.href = '/steam.php?action=login'; return; }
    const encoded = serializeBuild();
    const name = buildName.trim() || 'Untitled Build';
    setBuildSaving(true);
    try {
      const r = await fetch('/steam.php?action=save', {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, encoded }),
      });
      const data = await r.json();
      if (data.ok) {
        setSavedBuilds(prev => [{ id: data.id, name, encoded, created_at: new Date().toISOString() }, ...prev]);
        setBuildSaveMsg('Saved!');
      } else {
        setBuildSaveMsg(data.error || 'Error saving');
      }
    } catch { setBuildSaveMsg('Error saving'); }
    setBuildSaving(false);
    setTimeout(() => setBuildSaveMsg(''), 3000);
  };

  const handleDeleteBuild = async (id: number) => {
    await fetch('/steam.php?action=delete', {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setSavedBuilds(prev => prev.filter(b => b.id !== id));
  };

  const handleLoadBuild = (encoded: string) => {
    window.location.href = `${window.location.origin}${window.location.pathname}?b=${encoded}`;
  };

  const handleLogout = async () => {
    await fetch('/steam.php?action=logout', { credentials: 'include' });
    setSteamUser(null);
    setSavedBuilds([]);
  };
  // ─────────────────────────────────────────────────────────────────────────────
const [selectedGadgets, setSelectedGadgets] = useState<Record<string, string | null>>({
    binos: null,
  });
  const [selectedHeadwear, setSelectedHeadwear] = useState<string | null>(null);
  const [selectedArmorId, setSelectedArmorId] = useState<string | null>(null);
  const [selectedRigId, setSelectedRigId]     = useState<string | null>(null);
  const [rigSlotItems, setRigSlotItems] = useState<(string | null)[]>([]);
  const handleRigSlotChange = (slotIndex: number, itemId: string | null, allContainers?: ContainerItem[], allMedical?: MedicalItem[]) => {
    setRigSlotItems(prev => {
      const next = [...prev];
      // Determine slot count FIRST so we can extend the array far enough
      const cont  = itemId ? allContainers?.find(c => c.id === itemId) : null;
      const med   = itemId ? allMedical?.find(m => m.id === itemId) : null;
      const slots = cont ? cont.rigSlots : (med?.gridSize === "1x2" ? 2 : 1);
      // Extend to cover the item's primary slot plus any occupied follow-on slots
      while (next.length < slotIndex + slots) next.push(null);
      // Clear old sentinel slots that this slotIndex previously set
      for (let j = slotIndex + 1; j < next.length; j++) {
        if (next[j] === `__occ:${slotIndex}`) next[j] = null;
      }
      // Clear container contents for this slot
      setContainerContents(cc => { const n = {...cc}; delete n[`rig:${slotIndex}`]; return n; });
      next[slotIndex] = itemId;
      // Mark follow-on slots as occupied
      if (itemId && slots > 1) {
        for (let j = 1; j < slots; j++) {
          next[slotIndex + j] = `__occ:${slotIndex}`;
        }
      }
      return next;
    });
  };
  // Pocket slot items (4 pockets, each 1 item)
  const [pocketItems, setPocketItems] = useState<(string | null)[]>([null, null, null, null]);
  // Container sub-items: key = "rig:<slotIndex>" or "pocket:<slotIndex>", value = sub-item IDs array
  const [containerContents, setContainerContents] = useState<Record<string, (string | null)[]>>({});
  const handleContainerContentsChange = (key: string, subIndex: number, itemId: string | null) => {
    setContainerContents(prev => {
      const arr = [...(prev[key] ?? [])];
      while (arr.length <= subIndex) arr.push(null);
      arr[subIndex] = itemId;
      return { ...prev, [key]: arr };
    });
  };
  // Belt
  const [selectedBeltId, setSelectedBeltId] = useState<string | null>(null);
  const [selectedEyewearId, setSelectedEyewearId] = useState<string | null>(null);
  const [selectedFaceCoverId, setSelectedFaceCoverId] = useState<string | null>(null);
  const [selectedBackpackId, setSelectedBackpackId] = useState<string | null>(null);
  const [selectedLockboxId, setSelectedLockboxId] = useState<string | null>(null);
  const [selectedHeadsetId, setSelectedHeadsetId] = useState<string | null>(null);
  const [beltSlotItems, setBeltSlotItems] = useState<(string | null)[]>([]);
  const handleBeltSlotChange = (slotIndex: number, itemId: string | null) => {
    setBeltSlotItems(prev => {
      const next = [...prev];
      while (next.length <= slotIndex) next.push(null);
      const cont = itemId ? containerItems.find(c => c.id === itemId) : null;
      const med  = itemId ? medicalItems.find(m => m.id === itemId) : null;
      const slots = cont ? cont.rigSlots : (med?.gridSize === "1x2" ? 2 : 1);
      while (next.length < slotIndex + slots) next.push(null);
      for (let j = slotIndex + 1; j < next.length; j++) {
        if (next[j] === `__occ:${slotIndex}`) next[j] = null;
      }
      setContainerContents(cc => { const n = {...cc}; delete n[`belt:${slotIndex}`]; return n; });
      next[slotIndex] = itemId;
      if (itemId && slots > 1) {
        for (let j = 1; j < slots; j++) next[slotIndex + j] = `__occ:${slotIndex}`;
      }
      return next;
    });
  };

  const [vendorRanks, setVendorRanks] = useState<Record<string, number>>({
    Gunny: 1, Artisan: 1, Turncoat: 1, Banshee: 1, Vulture: 1, Handshake: 1,
  });
  const [slotWeights, setSlotWeights] = useState<Record<string, number>>({});
  const [drawerExpanded, setDrawerExpanded] = useState(false);
  const mobileEditorRef = useRef<HTMLDivElement>(null);

  // ─── URL Build Sharing ─────────────────────────────────────────────────────
  const serializeBuild = () => {
    const snap: Record<string, unknown> = {
      n:  buildName || undefined,
      pw: selectedWeapons.primary || undefined,
      sw: selectedWeapons.sidearm || undefined,
      pa: Object.keys(weaponAttachments.primary ?? {}).length ? weaponAttachments.primary : undefined,
      sa: Object.keys(weaponAttachments.sidearm ?? {}).length ? weaponAttachments.sidearm : undefined,
      hw: selectedHeadwear || undefined,
      g:  Object.fromEntries(Object.entries(selectedGadgets).filter(([,v]) => v)) || undefined,
      ar: selectedArmorId || undefined,
      rg: selectedRigId   || undefined,
      rs: rigSlotItems.some(Boolean) ? rigSlotItems : undefined,
      bt: selectedBeltId  || undefined,
      bs: beltSlotItems.some(Boolean) ? beltSlotItems : undefined,
      pk: pocketItems.some(Boolean) ? pocketItems : undefined,
      cc: Object.keys(containerContents).length ? containerContents : undefined,
      vr: vendorRanks,
    };
    // Remove undefined keys
    Object.keys(snap).forEach(k => snap[k] === undefined && delete snap[k]);
    const json = JSON.stringify(snap);
    return btoa(unescape(encodeURIComponent(json)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };

  const handleSaveBuild = () => {
    const encoded = serializeBuild();
    const url = `${window.location.origin}${window.location.pathname}?b=${encoded}`;

    // Update the URL bar first - no permissions needed
    window.history.replaceState(null, '', `?b=${encoded}`);

    // Try clipboard, fall back to a prompt so the user can always get the link
    try {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }).catch(() => {
        window.prompt('Copy this link to share your build:', url);
      });
    } catch {
      window.prompt('Copy this link to share your build:', url);
    }
  };

  // On mount: rehydrate state from ?b= URL param
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('b');
    if (!param) return;
    try {
      const json = decodeURIComponent(escape(atob(param.replace(/-/g, '+').replace(/_/g, '/'))));
      const s = JSON.parse(json) as Record<string, unknown>;
      if (s.n)  setBuildName(s.n as string);
      if (s.pw || s.sw) setSelectedWeapons({ primary: (s.pw as string) ?? null, sidearm: (s.sw as string) ?? null });
      if (s.pa || s.sa) setWeaponAttachments({ primary: (s.pa as Record<string, string | null>) ?? {}, sidearm: (s.sa as Record<string, string | null>) ?? {} });
      if (s.hw) setSelectedHeadwear(s.hw as string);
      if (s.g)  setSelectedGadgets(prev => ({ ...prev, ...(s.g as Record<string, string | null>) }));
      if (s.ar) setSelectedArmorId(s.ar as string);
      if (s.rg) setSelectedRigId(s.rg as string);
      if (s.rs) setRigSlotItems(s.rs as (string | null)[]);
      if (s.bt) setSelectedBeltId(s.bt as string);
      if (s.bs) setBeltSlotItems(s.bs as (string | null)[]);
      if (s.pk) setPocketItems(s.pk as (string | null)[]);
      if (s.cc) setContainerContents(s.cc as Record<string, (string | null)[]>);
      if (s.vr) setVendorRanks(s.vr as Record<string, number>);
    } catch { /* malformed param, ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ────────────────────────────────────────────────────────────────────────────

  const handleSlotClick = (slotId: string, type: string) => {
    if (type === "locked") return;
    setActivePMCSlot(prev => prev === slotId ? null : slotId);
  };

  const activeSlot = DOLL_GRID_SLOTS.find(s => s.id === activePMCSlot) ?? null;
  const isWeaponSlot   = activeSlot?.type === "weapon";
  const isGadgetSlot   = activeSlot?.type === "gadget";
  const isHeadwearSlot = activeSlot?.type === "headwear";
  const isArmorOrRigSlot = activeSlot?.type === "armor" || activeSlot?.type === "rig";
  const isPocketSlot = activeSlot?.type === "pocket";
  const isBeltSlot        = activeSlot?.type === "belt";
  const isEyewearSlot     = activeSlot?.type === "eyewear";
  const isFaceCoverSlot   = activeSlot?.type === "facecover";
  const isBackpackSlot    = activeSlot?.type === "backpack";
  const isLockboxSlot     = activeSlot?.type === "lockbox";
  const isHeadsetSlot     = activeSlot?.type === "headset";
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

  const dollW = DOLL_W;
  const dollH = DOLL_H;

  // Doll scaling - measures the doll column width and scales the fixed-pixel
  // doll container proportionally so it always fills exactly 1/3 of the screen.
  const dollColumnRef = useRef<HTMLDivElement>(null);
  const [dollScale, setDollScale] = React.useState(1);
  useEffect(() => {
    const el = dollColumnRef.current;
    if (!el) return;
    const obs = new ResizeObserver(entries => {
      for (const entry of entries) {
        const colW = entry.contentRect.width;
        if (colW > 0) {
          // Scale up to fill the column - removes the 1.0 cap so the doll
          // grows on wide viewports instead of leaving big empty margins.
          // Cap at 1.5 so it doesn't look comically large on ultra-wide screens.
          setDollScale(Math.min(1.5, colW / DOLL_W));
        }
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Weight breakdown data
  const primaryWeapon = getWeaponForSlot("primary");
  const sidearmWeapon = getWeaponForSlot("sidearm");
  const headwearItem = selectedHeadwear ? headwear.find(h => h.id === selectedHeadwear) ?? null : null;
  const gadgetItem = getGadgetForSlot("binos");
  const weightRows = [
    { id: "headwear",    label: "Headwear",    weight: headwearItem?.baseStats.weight ?? null },
    { id: "primary",     label: "Primary",     weight: primaryWeapon ? (slotWeights["primary"] ?? primaryWeapon.baseStats.weight) : null },
    { id: "sidearm",     label: "Sidearm",     weight: sidearmWeapon ? (slotWeights["sidearm"] ?? sidearmWeapon.baseStats.weight) : null },
    { id: "gadgets",     label: "Gadgets",     weight: gadgetItem?.baseStats.weight ?? null },
    { id: "armor",       label: "Body Armor",  weight: (() => {
        const armorData = armorItems.find(a => a.id === selectedArmorId);
        return armorData?.weight ?? null;
      })() },
    { id: "tacticalRig", label: "Tactical Rig",weight: (() => {
        if (selectedArmorId && armorItems.find(a => a.id === selectedArmorId && a.type === "Plate Carrier")) return null;
        const rigData = rigs.find(r => r.id === selectedRigId);
        if (!rigData) return null;
        const contentsWeight = rigSlotItems
          .filter(v => v && !v.startsWith("__occ:"))
          .reduce((sum, id) => {
            const c = consumables.find(x => x.id === id); if (c) return sum + c.weight;
            const m = medicalItems.find(x => x.id === id); if (m) return sum + m.weight;
            const ct = containerItems.find(x => x.id === id); if (ct) return sum + ct.weight;
            return sum;
          }, 0);
        return rigData.weight + contentsWeight;
      })() },
    { id: "backpack",    label: "Backpack",    weight: backpackItems.find(b => b.id === selectedBackpackId)?.weight ?? null },
    { id: "eyewear",     label: "Eyewear",     weight: eyewearItems.find(e => e.id === selectedEyewearId)?.weight ?? null },
    { id: "facecover",   label: "Face Cover",  weight: faceCoverItems.find(f => f.id === selectedFaceCoverId)?.weight ?? null },
    { id: "headset",     label: "Headset",     weight: headsetItems.find(h => h.id === selectedHeadsetId)?.weight ?? null },
    { id: "lockbox",     label: "Secure Case", weight: lockboxItems.find(l => l.id === selectedLockboxId)?.weight ?? null },
    { id: "belt", label: "Belt", weight: (() => {
        const beltData = beltItems.find(b => b.id === selectedBeltId);
        if (!beltData) return null;
        const contentsWeight = beltSlotItems
          .filter(v => v && !v.startsWith("__occ:"))
          .reduce((sum, id) => {
            const c = consumables.find(x => x.id === id); if (c) return sum + c.weight;
            const m = medicalItems.find(x => x.id === id); if (m) return sum + m.weight;
            const ct = containerItems.find(x => x.id === id); if (ct) return sum + ct.weight;
            return sum;
          }, 0);
        return beltData.weight + contentsWeight;
      })() },
  ];
  const pocketWeightRows = [0, 1, 2, 3].map(i => {
    const itemId = pocketItems[i];
    if (!itemId) return { id: `pocket${i + 1}`, label: `Pocket ${i + 1}`, weight: null as number | null };
    const cons  = consumables.find(x => x.id === itemId);
    const med   = medicalItems.find(x => x.id === itemId);
    const cont  = containerItems.find(x => x.id === itemId);
    const baseW = cons?.weight ?? med?.weight ?? cont?.weight ?? 0;
    const subItems = containerContents[`pocket:${i}`] ?? [];
    const subW = subItems.reduce((sum, sid) => {
      if (!sid) return sum;
      const sm  = medicalItems.find(x => x.id === sid);
      const sc  = consumables.find(x => x.id === sid);
      const sct = containerItems.find(x => x.id === sid);
      return sum + (sm?.weight ?? sc?.weight ?? sct?.weight ?? 0);
    }, 0);
    return { id: `pocket${i + 1}`, label: `Pocket ${i + 1}`, weight: baseW + subW };
  });
  const allWeightRows = [...weightRows, ...pocketWeightRows];

  return (
    <div className="flex flex-col gap-4">
      {/* Steam auth bar */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-800">
        {steamUser ? (
          <div className="flex items-center gap-2 relative">
            <img src={steamUser.avatar} alt="" width={24} height={24} className="rounded-full" />
            <span className="text-xs text-gray-400">{steamUser.username}</span>
            <button
              onClick={() => setShowBuildsMenu(v => !v)}
              className="text-xs border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-gray-200 px-2 py-1 rounded-lg transition-colors"
              title="Your saved builds"
            >
              Builds {savedBuilds.length > 0 ? `(${savedBuilds.length})` : ''} ▾
            </button>
            {showBuildsMenu && (
              <div className="absolute top-8 left-0 z-50 bg-[#1a1f1a] border border-gray-700 rounded-lg shadow-xl min-w-[280px] max-h-72 overflow-y-auto">
                {savedBuilds.length === 0 ? (
                  <div className="px-4 py-3 text-xs text-gray-500">No saved builds yet.</div>
                ) : savedBuilds.map(b => (
                  <div key={b.id} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 group">
                    <button
                      onClick={() => { handleLoadBuild(b.encoded); setShowBuildsMenu(false); }}
                      className="flex-1 text-left text-xs text-gray-300 hover:text-white truncate"
                      title={b.name}
                    >
                      {b.name}
                      <span className="ml-2 text-gray-600 text-[10px]">{new Date(b.created_at).toLocaleDateString()}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteBuild(b.id)}
                      className="text-gray-600 hover:text-red-400 text-xs px-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete build"
                    >✕</button>
                  </div>
                ))}
              </div>
            )}
            <button onClick={handleLogout} className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors">Logout</button>
          </div>
        ) : (
          <a
            href="/steam.php?action=login"
            className="flex items-center gap-2 text-xs border border-gray-700 hover:border-[#6b9c5e] text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38l3.01-6.2a3.44 3.44 0 0 1-.42-1.68 3.44 3.44 0 0 1 3.44-3.44 3.44 3.44 0 0 1 3.44 3.44 3.44 3.44 0 0 1-3.44 3.44h-.16l-6.12 3.06C9.15 23.77 10.55 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/></svg>
            Login with Steam to save builds
          </a>
        )}
        {buildSaveMsg && <span className={`text-xs ${buildSaveMsg === 'Saved!' ? 'text-green-400' : 'text-red-400'}`}>{buildSaveMsg}</span>}
      </div>

      {/* Build name + action buttons */}
      <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
        <input
          className="flex-1 bg-transparent border-b border-gray-700 focus:border-[#6b9c5e] outline-none text-gray-100 text-lg font-medium py-1 placeholder-gray-700 transition-colors"
          placeholder="Name your build..."
          value={buildName}
          onChange={e => setBuildName(e.target.value)}
        />
        {/* Share button - always available */}
        <button
          onClick={handleSaveBuild}
          className={"shrink-0 text-xs border px-3 py-1.5 rounded-lg transition-colors " + (copied ? "text-green-400 border-green-700 bg-green-950/30" : "text-gray-500 hover:text-gray-200 border-gray-700 hover:border-gray-500")}
          title="Copy shareable link to clipboard"
        >
          {copied ? "Copied!" : "Share"}
        </button>
        {/* Save to account button */}
        <button
          onClick={handleSaveToAccount}
          disabled={buildSaving}
          className="shrink-0 text-xs border border-[#4a6741] hover:border-[#6b9c5e] text-[#6b9c5e] hover:text-[#8bc47e] px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
          title={steamUser ? 'Save to your account' : 'Login with Steam to save'}
        >
          {buildSaving ? 'Saving...' : (steamUser ? 'Save' : 'Save ⚡')}
        </button>
      </div>

      {/* Main 3-column layout: doll | editor | weight - each column is exactly 1/3 of viewport.
          Using flex with explicit 33.333% widths because CSS grid 1fr was being affected by
          the doll's fixed-pixel inner clip wrapper, causing column auto-sizing. */}
      {/* ── Mobile slot list (hidden on desktop via CSS) ── */}
      <div className="builder-mobile gap-1.5 pb-28">
        {DOLL_GRID_SLOTS.map(slot => {
          let selName: string | null = null;
          if (slot.type === "weapon") {
            const wId = slot.id === "sidearm" ? selectedWeapons.sidearm : selectedWeapons.primary;
            selName = weapons.find(w => w.id === wId)?.name ?? null;
          } else if (slot.type === "headwear") {
            selName = headwear.find(h => h.id === selectedHeadwear)?.name ?? null;
          } else if (slot.type === "gadget") {
            selName = gadgets.find(g => g.id === selectedGadgets[slot.id])?.name ?? null;
          } else if (slot.type === "armor") {
            selName = armorItems.find(a => a.id === selectedArmorId)?.name ?? null;
          } else if (slot.type === "rig") {
            const pc = armorItems.find(a => a.id === selectedArmorId && a.type === "Plate Carrier");
            selName = pc ? pc.name : (rigs.find(r => r.id === selectedRigId)?.name ?? null);
          } else if (slot.type === "belt") {
            selName = beltItems.find(b => b.id === selectedBeltId)?.name ?? null;
          } else if (slot.type === "eyewear") {
            selName = eyewearItems.find(e => e.id === selectedEyewearId)?.name ?? null;
          } else if (slot.type === "facecover") {
            selName = faceCoverItems.find(f => f.id === selectedFaceCoverId)?.name ?? null;
          } else if (slot.type === "backpack") {
            selName = backpackItems.find(b => b.id === selectedBackpackId)?.name ?? null;
          } else if (slot.type === "lockbox") {
            selName = lockboxItems.find(l => l.id === selectedLockboxId)?.name ?? null;
          } else if (slot.type === "headset") {
            selName = headsetItems.find(h => h.id === selectedHeadsetId)?.name ?? null;
          } else if (slot.type === "pocket") {
            const idx = parseInt(slot.id.replace("pocket", "")) - 1;
            const pId = pocketItems[idx] ?? null;
            if (pId) selName = consumables.find(c => c.id === pId)?.name
              ?? medicalItems.find(m => m.id === pId)?.name
              ?? containerItems.find(c => c.id === pId)?.name ?? null;
          }
          const isActive = activePMCSlot === slot.id;
          return (
            <button
              key={slot.id}
              onClick={() => {
                handleSlotClick(slot.id, slot.type);
                setTimeout(() => mobileEditorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
              }}
              className={[
                "w-full flex items-center justify-between px-5 py-5 border rounded-lg transition-colors text-left",
                isActive  ? "border-[#6b9c5e] bg-[#6b9c5e]/10"
                : selName ? "border-gray-700 bg-gray-900/80"
                :           "border-gray-800 bg-gray-950",
              ].join(" ")}
            >
              <span className={`text-sm uppercase tracking-widest font-semibold ${isActive ? "text-[#8db87e]" : "text-gray-400"}`}>
                {slot.label}
              </span>
              <div className="flex items-center gap-2 min-w-0">
                <span className={`text-base font-mono truncate max-w-[180px] ${selName ? "text-gray-100" : "text-gray-600 italic"}`}>
                  {selName ?? "—"}
                </span>
                <span className="text-gray-500 text-xl leading-none shrink-0">›</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="builder-desktop-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr", alignItems: "start" }}>

        {/* PMC Doll - left 1/3, doll scales to fit column width */}
        <div
          ref={dollColumnRef}
          className="builder-doll flex flex-col items-start overflow-hidden px-3 py-2"
        >
          {/* Clip wrapper compensates for scale() not affecting layout flow */}
          <div style={{ width: dollW * dollScale, height: dollH * dollScale, overflow: "hidden", flexShrink: 0 }}>
          <div
            className="relative"
            style={{ width: dollW, height: dollH, transform: `scale(${dollScale})`, transformOrigin: "top left" }}
          >
            {/* Silhouette behind slot grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath("/PMCSILHOUETTE.png")}
                alt=""
                className="w-full h-full"
                style={{ objectFit: "contain", objectPosition: "center", opacity: 0.28 }}
              />
            </div>

            {/* Slot boxes */}
            {DOLL_GRID_SLOTS.map(slot => {
              const w  = slot.type === "weapon"   ? getWeaponForSlot(slot.id) : null;
              const hw = slot.type === "headwear" ? headwear.find(h => h.id === selectedHeadwear) ?? null : null;
              const g  = slot.type === "gadget"   ? getGadgetForSlot(slot.id) : null;
              const armorDoll  = slot.type === "armor" ? armorItems.find(a => a.id === selectedArmorId) ?? null : null;
              const rigDoll    = slot.type === "rig"   ? (
                rigs.find(r => r.id === selectedRigId) ??
                (selectedRigId ? armorItems.find(a => a.id === selectedRigId) : null) ??
                null
              ) : null;
              const pocketIdx  = slot.type === "pocket" ? parseInt(slot.id.replace("pocket", "")) - 1 : -1;
              const pocketItem = pocketIdx >= 0 ? (
                consumables.find(c => c.id === pocketItems[pocketIdx]) ??
                medicalItems.find(m => m.id === pocketItems[pocketIdx]) ??
                containerItems.find(c => c.id === pocketItems[pocketIdx]) ??
                null
              ) : null;
              const beltDoll      = slot.type === "belt"       ? beltItems.find(b => b.id === selectedBeltId)         ?? null : null;
              const eyewearDoll   = slot.type === "eyewear"    ? eyewearItems.find(e => e.id === selectedEyewearId)     ?? null : null;
              const faceCoverDoll = slot.type === "facecover"  ? faceCoverItems.find(f => f.id === selectedFaceCoverId) ?? null : null;
              const backpackDoll  = slot.type === "backpack"   ? backpackItems.find(b => b.id === selectedBackpackId)   ?? null : null;
              const lockboxDoll   = slot.type === "lockbox"    ? lockboxItems.find(l => l.id === selectedLockboxId)     ?? null : null;
              const headsetDoll   = slot.type === "headset"    ? headsetItems.find(h => h.id === selectedHeadsetId)     ?? null : null;
              return (
                <div
                  key={slot.id}
                  style={{
                    position: "absolute",
                    left: slot.left,
                    top: slot.top,
                    zIndex: 1,
                  }}
                >
                  <SlotBox
                    slot={slot}
                    isActive={activePMCSlot === slot.id}
                    hasContent={!!(w || hw || g || armorDoll || rigDoll || pocketItem || beltDoll || eyewearDoll || faceCoverDoll || backpackDoll || lockboxDoll || headsetDoll)}
                    contentLabel={w?.name ?? hw?.name ?? g?.name ?? armorDoll?.name ?? rigDoll?.name ?? pocketItem?.name ?? beltDoll?.name ?? eyewearDoll?.name ?? faceCoverDoll?.name ?? backpackDoll?.name ?? lockboxDoll?.name ?? headsetDoll?.name}
                    contentSubLabel={w?.caliber ?? hw?.armorLevel ?? hw?.subtype ?? g?.type ?? armorDoll?.nijRating ?? beltDoll?.gridSize ?? backpackDoll?.gridSize ?? undefined}
                    contentImage={w?.image ?? hw?.image ?? g?.image ?? armorDoll?.image ?? rigDoll?.image ?? beltDoll?.image ?? eyewearDoll?.image ?? faceCoverDoll?.image ?? backpackDoll?.image ?? lockboxDoll?.image ?? headsetDoll?.image ??
                      (pocketItem && "image" in pocketItem ? (pocketItem as { image?: string | null }).image ?? undefined : undefined)}
                    onClick={() => handleSlotClick(slot.id, slot.type)}
                  />
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded ring-1 ring-[#6b9c5e] bg-[#6b9c5e]/10"/>
              <span className="text-xs text-gray-600">active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded ring-1 ring-gray-900 bg-gray-950 opacity-50"/>
              <span className="text-xs text-gray-600">locked</span>
            </div>
          </div>
          </div>{/* end clip wrapper */}
        </div>

        {/* Divider */}
        <div className="builder-divider bg-gray-800 self-stretch" style={{ width: "1px", flexShrink: 0 }}/>

        {/* Editor panel - middle 1/3 */}
        <div
          ref={mobileEditorRef}
          className="builder-editor flex flex-col min-w-0 px-3"
          style={{ minHeight: dollH * dollScale }}
        >
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
                onWeightUpdate={w => setSlotWeights(prev => ({ ...prev, [activePMCSlot]: w }))}
                initialAttachments={activePMCSlot === "sidearm" ? (weaponAttachments.sidearm ?? {}) : (weaponAttachments.primary ?? {})}
                onAttachmentsChange={atts => setWeaponAttachments(prev => ({
                  ...prev,
                  [activePMCSlot === "sidearm" ? "sidearm" : "primary"]: atts,
                }))}
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
          ) : isHeadwearSlot && activePMCSlot ? (
            <>
              <VendorRanks ranks={vendorRanks} setRanks={setVendorRanks}/>
              <div className="mt-3 flex flex-col flex-1 min-h-0">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Headwear</span>
                  <div className="flex-1 h-px bg-gray-800"/>
                </div>
                <HeadwearSlotEditor
                  headwear={headwear}
                  selectedId={selectedHeadwear}
                  onSelect={setSelectedHeadwear}
                  vendorRanks={vendorRanks}
                />
              </div>
            </>
          ) : activePMCSlot === "armor" ? (
            <>
              <VendorRanks ranks={vendorRanks} setRanks={setVendorRanks}/>
              <div className="mt-3 flex flex-col flex-1 min-h-0 overflow-y-auto">
                <ArmorSlotEditor
                  armorItems={armorItems} rigs={rigs}
                  selectedArmorId={selectedArmorId} selectedRigId={selectedRigId}
                  onSelectArmor={setSelectedArmorId} onSelectRig={setSelectedRigId}
                  onResetRigSlots={() => setRigSlotItems([])}
                  vendorRanks={vendorRanks}
                />
              </div>
            </>
          ) : activePMCSlot === "tacticalRig" ? (
            <>
              <VendorRanks ranks={vendorRanks} setRanks={setVendorRanks}/>
              <div className="mt-3 flex flex-col flex-1 min-h-0 overflow-y-auto">
                <RigSlotEditor
                  armorItems={armorItems} rigs={rigs}
                  consumables={consumables} medical={medicalItems}
                  containers={containerItems} keyItems={keyItems}
                  selectedArmorId={selectedArmorId} selectedRigId={selectedRigId}
                  onSelectArmor={setSelectedArmorId} onSelectRig={setSelectedRigId}
                  rigSlotItems={rigSlotItems}
                  onRigSlotChange={handleRigSlotChange}
                  containerContents={containerContents}
                  onContainerContentsChange={handleContainerContentsChange}
                  onResetRigSlots={() => setRigSlotItems([])}
                  vendorRanks={vendorRanks}
                />
              </div>
            </>
          ) : isBeltSlot && activePMCSlot ? (
            <>
              <VendorRanks ranks={vendorRanks} setRanks={setVendorRanks}/>
              <div className="mt-3 flex flex-col flex-1 min-h-0 overflow-y-auto">
                <BeltSlotEditor
                  belts={beltItems}
                  selectedBeltId={selectedBeltId}
                  onSelectBelt={id => { setSelectedBeltId(id); setBeltSlotItems([]); }}
                  slotItems={beltSlotItems}
                  onSlotChange={handleBeltSlotChange}
                  containerContents={containerContents}
                  onContainerContentsChange={handleContainerContentsChange}
                  consumables={consumables} medical={medicalItems}
                  containers={containerItems} keyItems={keyItems}
                  vendorRanks={vendorRanks}
                />
              </div>
            </>
          ) : isPocketSlot && activePMCSlot ? (
            <>
              <div className="mt-3 flex flex-col flex-1 min-h-0 overflow-y-auto">
                <PocketSlotEditor
                  pocketIndex={parseInt(activePMCSlot.replace("pocket", "")) - 1}
                  currentItemId={pocketItems[parseInt(activePMCSlot.replace("pocket", "")) - 1] ?? null}
                  onSelect={id => setPocketItems(prev => {
                    const n = [...prev]; while (n.length < 4) n.push(null);
                    n[parseInt(activePMCSlot!.replace("pocket", "")) - 1] = id; return n;
                  })}
                  containerContents={containerContents[`pocket:${parseInt(activePMCSlot.replace("pocket", "")) - 1}`] ?? []}
                  onContainerContentsChange={(si, id) => handleContainerContentsChange(
                    `pocket:${parseInt(activePMCSlot!.replace("pocket", "")) - 1}`, si, id
                  )}
                  consumables={consumables} medical={medicalItems}
                  containers={containerItems} keyItems={keyItems}
                />
              </div>
            </>
          ) : isEyewearSlot ? (
            <>
              <VendorRanks ranks={vendorRanks} setRanks={setVendorRanks}/>
              <div className="mt-3 flex flex-col flex-1 min-h-0 overflow-y-auto">
                <SimpleGearEditor
                  label="Eyewear" items={eyewearItems}
                  selectedId={selectedEyewearId} onSelect={setSelectedEyewearId}
                  vendorRanks={vendorRanks}
                  subLabel={item => item.rainProtection != null ? `Rain +${item.rainProtection}%` : undefined}
                />
              </div>
            </>
          ) : isFaceCoverSlot ? (
            <>
              <VendorRanks ranks={vendorRanks} setRanks={setVendorRanks}/>
              <div className="mt-3 flex flex-col flex-1 min-h-0 overflow-y-auto">
                <SimpleGearEditor
                  label="Face Cover" items={faceCoverItems}
                  selectedId={selectedFaceCoverId} onSelect={setSelectedFaceCoverId}
                  vendorRanks={vendorRanks}
                  subLabel={item => item.rainProtection != null ? `Rain +${item.rainProtection}%` : undefined}
                />
              </div>
            </>
          ) : isBackpackSlot ? (
            <>
              <VendorRanks ranks={vendorRanks} setRanks={setVendorRanks}/>
              <div className="mt-3 flex flex-col flex-1 min-h-0 overflow-y-auto">
                <SimpleGearEditor
                  label="Backpack" items={backpackItems}
                  selectedId={selectedBackpackId} onSelect={setSelectedBackpackId}
                  vendorRanks={vendorRanks}
                  subLabel={item => item.gridSize ? `${item.gridSize} · ${item.slots ?? "?"} slots${item.hasSling ? " · sling" : ""}` : undefined}
                />
              </div>
            </>
          ) : isLockboxSlot ? (
            <div className="mt-3 flex flex-col flex-1 min-h-0 overflow-y-auto">
              <SimpleGearEditor
                label="Secure Case" items={lockboxItems}
                selectedId={selectedLockboxId} onSelect={setSelectedLockboxId}
                subLabel={item => item.gridSize ? `${item.gridSize} · ${item.slots ?? "?"} slots` : undefined}
              />
            </div>
          ) : isHeadsetSlot ? (
            <>
              <VendorRanks ranks={vendorRanks} setRanks={setVendorRanks}/>
              <div className="mt-3 flex flex-col flex-1 min-h-0 overflow-y-auto">
                <SimpleGearEditor
                  label="Headset" items={headsetItems}
                  selectedId={selectedHeadsetId} onSelect={setSelectedHeadsetId}
                  vendorRanks={vendorRanks}
                />
              </div>
            </>
          ) : activePMCSlot ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <p className="text-gray-400 text-base font-semibold">{activeSlot?.label}</p>
              <p className="text-gray-700 text-sm mt-2">Gear builder coming soon for this slot</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <p className="text-gray-500 text-base font-medium">Select a slot to get started</p>
              <p className="text-gray-700 text-sm mt-1">Click any slot on the doll to begin</p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="builder-divider bg-gray-800 self-stretch" style={{ width: "1px", flexShrink: 0 }}/>

        {/* Weight breakdown panel - right 1/3 */}
        <div className="builder-weight px-3 min-w-0">
          <WeightBreakdown rows={allWeightRows} />
        </div>

      </div>

      {/* ── Mobile weight drawer (fixed to bottom, hidden on desktop) ── */}
      <div className="builder-drawer">
        <button
          onClick={() => setDrawerExpanded(o => !o)}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#0d1209] border-t-2 border-[#4a6741]"
          style={{ boxShadow: "0 -4px 20px rgba(0,0,0,.6)" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Total Weight</span>
            <span className="text-sm font-bold font-mono text-[#8db87e]">
              {(PMC_BASE_WEIGHT + allWeightRows.reduce((s, r) => s + (r.weight ?? 0), 0)).toFixed(2)} kg
            </span>
          </div>
          <span className="text-gray-500 text-[10px] uppercase tracking-wider">
            {drawerExpanded ? "▼ hide" : "▲ breakdown"}
          </span>
        </button>
        {drawerExpanded && (
          <div className="max-h-64 overflow-y-auto bg-gray-950 border-t border-gray-800">
            <WeightBreakdown rows={allWeightRows} />
          </div>
        )}
      </div>
    </div>
  );
}

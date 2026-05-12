# GZW Armory - Claude Context

## What this project is

A Gray Zone Warfare gun builder webapp, similar to https://www.totovbuilder.com/build (a Tarkov loadout tool).
Forked from the open-source GZW Armory by DarkTidings20 (https://github.com/DarkTidings20/gzwarmory).

**Stack:** Next.js 16.2.4 (App Router), React 19, TypeScript, Tailwind CSS.
**Run dev server:** `npm run dev` from project root.
**Type check:** `npx tsc --noEmit` (should return no output if clean).
Always use the MediaWiki API method to pull data from the GZW wiki
---

## Project structure

```
app/
  builder/page.tsx          - Server component. Reads all weapon + attachment JSON, passes to WeaponBuilderShell
  components/
    WeaponBuilderShell.tsx  - THE main client component (894 lines). All UI logic lives here.
    WeaponBuilder.tsx       - Original slot-selector UI from the fork. NOT used on the main page anymore.
  layout.tsx / page.tsx     - App shell and landing page

data/
  weapons/                  - One JSON file per weapon (13 assault rifles so far)
  attachments/              - Subdirs by category, each with index.json
    barrel/index.json
    bufferTube/index.json
    chargingHandle/index.json
    foregrip/index.json
    gasBlock/index.json
    handguard/index.json
    magazine/index.json
    muzzleDevice/index.json
    optic/index.json
    pistolGrip/index.json
    receiver/index.json
    stock/index.json
  schema.md                 - Defines the JSON schema for weapons and attachments

next.config.ts              - Allows images from static.wikia.nocookie.net (wiki CDN)
```

---

## WeaponBuilderShell.tsx - UI overview

GZW in-game equipment screen style layout:

```
[PMC doll 460x590px] | [divider] | [editor panel flex-1]
```

**PMC doll** is a relative-positioned container with:
- A detailed humanoid SVG figure (`PMCSilhouette`) centered at left offset ~148px
- 5 left slots absolutely positioned at `left: 10`: Headwear (top:24), Eyewear (top:148), Face Cover (top:256), Primary (top:366), Binoculars (top:476)
- 4 right slots at `right: 10`: Earpiece (top:24), Armor/Rig (top:160), Melee (top:310), Holster (top:418)
- Gradient connector lines from each box toward the figure

**SlotBox** (90x82px each):
- Empty weapon slot: shows a rifle/pistol SVG outline silhouette + crosshatch texture
- Empty gear slot: very faint emoji icon + crosshatch
- Filled weapon slot: real wiki inspect PNG image (`contentImage` prop) with `filter: brightness(0.85) saturate(0.7)` + weapon name + caliber
- Active slot: amber ring glow + top border

Only weapon slots (Primary, Holster) are clickable. Gear slots are 'coming soon'.

**Right editor panel:**
- `VendorRanks` - collapsible bar, sets per-vendor rank 1-4 (filters which attachments are available)
- `WeaponSlotEditor` - weapon dropdown, image preview, stat chips (MOA/Recoil/Ergo/Muzz/Weight), 'Edit Components' toggle
- `AttachmentRow` - one per weapon slot, expandable dropdown showing available vs rank-locked attachments

**Key stat note:** accuracy is MOA - lower is better. All other stats: positive delta = good. The `isAccuracy` flag on StatChip handles the display inversion.

---

## Weapon JSON schema

```json
{
  "id": "m4a1",
  "name": "M4A1",
  "type": "Assault Rifle",
  "slot": "Primary",
  "caliber": "5.56x45mm NATO",
  "manufacturer": "Colt",
  "vendor": "Gunny",
  "vendorRank": 2,
  "baseStats": {
    "weight": 3.299,
    "accuracy": 2.15,
    "recoilControl": 0.0,
    "muzzleDeviceEfficiency": 0.0,
    "ergonomics": 0.0,
    "rateOfFire": 800
  },
  "compatibleAmmo": ["5.56x45mm FMJ", "..."],
  "slots": {
    "barrel": { "label": "Barrel", "required": false, "compatible": ["ar-15-barrel-14-5", "..."] }
  },
  "image": "https://static.wikia.nocookie.net/gray-zone-warfare/images/4/43/M4A1_inspect.png/revision/latest",
  "verified": true,
  "verifiedSource": "fandom wiki + in-game",
  "patchVersion": "0.4",
  "lastUpdated": "2026-05-10"
}
```

To find a weapon's wiki inspect image URL use the MediaWiki API:
```
https://gray-zone-warfare.fandom.com/api.php?action=query&titles=File:WEAPONNAME_inspect.png&prop=imageinfo&iiprop=url&format=json
```

---

## Current weapon files (all in data/weapons/)

32 total files. All pass JSON validation with no broken attachment references (435 attachment IDs).

### Assault Rifles (13)

| File | Caliber | Vendor | Rank | Verified | Notes |
|------|---------|--------|------|----------|-------|
| AK-12.json | 5.45x39mm | Turncoat | 2 | YES | Ratnik platform |
| AK-15.json | 7.62x39mm | Artisan | 3 | YES | Ratnik platform, 7.62x39mm variant of AK-12 |
| AK-19.json | 5.56x45mm | Loot only | - | YES | Ratnik + STANAG mags NOT compatible, uses ak19-specific mag |
| AK-308.json | 7.62x51mm | Vulture | 4 | NO | Rate of fire estimated at 600 RPM |
| AK-74M.json | 5.45x39mm | Artisan | 2 | NO | Weight/accuracy/ROF all estimated (wiki blank) |
| AK-74N.json | 5.45x39mm | Turncoat | 1 | YES | AK-74M + side rail optic slot |
| AKM.json | 7.62x39mm | Artisan | 1 | YES | |
| AKMN.json | 7.62x39mm | Turncoat | 2 | YES | AKM + side rail. Uses AKM inspect image (no AKMN-specific image on wiki) |
| AKMSN.json | 7.62x39mm | Loot only | - | NO | AKM folding stock + night rail. Stats estimated (wiki blank) |
| AKS-74U.json | 5.45x39mm | Artisan | 1 | YES | Lightest AR at 2.757kg. Uses AKS-74U-specific parts |
| CQA1.json | 5.56x45mm | Gunny | 1 | YES | |
| DDM4.json | 5.56x45mm | Gunny | 3 | NO | |
| L403A1.json | 5.56x45mm | Gunny | 4 | YES | Best base accuracy of all 5.56 rifles (0.80 MOA) |
| M16A1.json | 5.56x45mm | Gunny | 1 | YES | Uses M16A1 Upper inspect image (no full weapon image on wiki) |
| M4A1.json | 5.56x45mm | Gunny | 2 | YES | |
| SIG-MCX.json | .300 AAC Blackout | Banshee | 3 | YES | STANAG/PMAG magazine compatible |
| SKS.json | 7.62x39mm | Loot only | - | NO | Semi-auto only. Stats estimated (wiki blank) |

### Bolt-Action Rifles / DMRs (5)

| File | Caliber | Vendor | Rank | Verified | Notes |
|------|---------|--------|------|----------|-------|
| M700.json | 7.62x51mm | Gunny | 2 | NO | Weight/accuracy estimated (wiki blank) |
| Mosin-Nagant.json | 7.62x54mm R | Artisan | 1 | YES | 20 RPM bolt-action |
| Mosin-Nagant-Sniper.json | 7.62x54mm R | Artisan | 2 | NO | Sniper variant. Stats estimated |
| SVD.json | 7.62x54mm R | Loot only | - | YES | Best accuracy of 7.62x54R (0.95 MOA). Semi-auto |

### SMGs (5)

| File | Caliber | Vendor | Rank | Verified | Notes |
|------|---------|--------|------|----------|-------|
| MP5.json | 9x19mm | Gunny | 1 | YES | Rich mod ecosystem |
| MP7A1.json | 4.6x30mm | Banshee | 2 | NO | Stats estimated. Uses MP7_inspect.png (shared with MP7A2) |
| MP7A2.json | 4.6x30mm | Vulture | 2 | NO | Adds foregrip slot over MP7A1. Stats estimated |
| Vz-61.json | 7.65mm Browning | Loot only | - | YES | Lightest SMG at 1.375kg. No full inspect image on wiki |

### Handguns (5)

| File | Caliber | Vendor | Rank | Verified | Notes |
|------|---------|--------|------|----------|-------|
| beretta-m9a1.json | 9x19mm | Gunny | 1 | YES | |
| colt-1911.json | .45 ACP | Loot only | - | YES | |
| colt-combat-commander.json | .45 ACP | Vulture | quest | YES | Quest reward |
| glock-17.json | 9x19mm | Loot only | - | YES | |
| type-51.json | 7.62x25mm | Loot only | - | YES | |

### Shotguns (2)

| File | Caliber | Vendor | Rank | Verified | Notes |
|------|---------|--------|------|----------|-------|
| M870.json | 12 Gauge | Gunny | 1 | YES | |
| Mossberg-590.json | 12 Gauge | Loot only | - | YES | Higher MOA (42.1) than M870 |

---

## Attachment index IDs - known gaps / recently added

These were added and are marked `"verified": false`:

- `data/attachments/receiver/index.json` - added `ak-ratnik-dust-cover`, `ak-308-dust-cover`, `mp5-upper-receiver`, `mp5sd-upper-receiver`, `sig-mcx-upper-receiver`
- `data/attachments/bufferTube/index.json` - added `m16a1-buffer-tube`
- `data/attachments/gasBlock/index.json` - added `ratnik-gas-tube` (AK-15)
- `data/attachments/optic/index.json` - added `mosin-nagant-tri-rail-scope-mount`
- `data/attachments/stock/index.json` - added `aks-74u-buffer-tube-adapter`
- `data/attachments/rail/index.json` - added 8 MP7 tactical devices (NcStar laser, Steiner, Surefire, Zenitco items)

Stats on unverified stubs are estimated and need in-game verification.

---

## Pending / known TODOs

1. **Verify unverified weapon stats in-game:** AK-74M, AK-308 (rate of fire), DDM4, AKMSN, SKS, M700, Mosin-Nagant (Sniper), MP7A1, MP7A2
2. **Save Build functionality** - the 'Save Build' button does nothing yet. Needs localStorage or a backend
3. **Gear slots** - Headwear, Eyewear, Face Cover, Armor/Rig, Melee, Earpiece, Binoculars all show 'coming soon'. No gear JSON data exists yet
4. **Holster slot** - filters for `type === "Pistol"` - 5 handgun files exist but the type field is set differently. Verify the type string used in WeaponBuilderShell.tsx matches these files
5. **Weapon type filtering** - builder currently only shows Assault Rifles in the Primary slot dropdown. Needs updating to include SMG, Shotgun, Bolt-Action Rifle, Sniper Rifle types
6. **Attachment stat data** - many attachment index.json files have zero or incomplete statModifiers. The wiki has this data but it requires scraping or manual entry
7. **AKMN image** - reuses AKM inspect image. If wiki ever adds an AKMN-specific image, update `data/weapons/AKMN.json` `"image"` field
8. **Vz. 61 image** - no full weapon inspect image exists on the wiki yet. `image` field is null in Vz-61.json
9. **MP7A1/MP7A2 image** - both use shared `MP7_inspect.png`. If wiki adds variant-specific images, update the JSON files
10. **strippedWeight for all weapons** - `baseStats.strippedWeight` is the bare receiver weight used for accurate attachment-based weight math. Currently only AK-12 has this value (2.456 kg). All other weapons need in-game measurement. The builder falls back to `baseStats.weight` (full default config) for any weapon missing `strippedWeight`.

---

## How data flows

```
data/weapons/*.json  +  data/attachments/*/index.json
        |
        v
app/builder/page.tsx  (server component, reads files at build/request time)
        |
        v  props: { weapons: Weapon[], allAttachments: Record<string, Attachment> }
        v
app/components/WeaponBuilderShell.tsx  (client component, all state/UI)
```

The attachment lookup is a flat Record keyed by `id`, built by iterating all category subdirs. Weapon slot `compatible` arrays reference these IDs directly.

---

## Validation script

Run this to check all weapon files for broken attachment references:

```bash
python3 -c "
import json, os

att_dir = 'data/attachments'
known = set()
for cat in os.listdir(att_dir):
    fp = os.path.join(att_dir, cat, 'index.json')
    if os.path.exists(fp):
        for item in json.load(open(fp)):
            known.add(item['id'])

weap_dir = 'data/weapons'
all_ok = True
for fname in sorted(os.listdir(weap_dir)):
    if not fname.endswith('.json'): continue
    try:
        w = json.load(open(os.path.join(weap_dir, fname)))
    except Exception as e:
        print(f'JSON ERROR: {fname} - {e}')
        all_ok = False
        continue
    broken = [f'  {sk}: {aid}' for sk, sl in w['slots'].items() for aid in sl['compatible'] if aid not in known]
    if broken:
        all_ok = False
        print(f'{fname}:')
        for b in broken: print(b)

if all_ok:
    print('All clean.')
print(f'Total attachment IDs: {len(known)}')
"
```

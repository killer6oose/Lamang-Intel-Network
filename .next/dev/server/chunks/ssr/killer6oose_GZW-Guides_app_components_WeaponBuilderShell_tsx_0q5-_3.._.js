module.exports = [
"[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WeaponBuilderShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/killer6oose/GZW-Guides/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/killer6oose/GZW-Guides/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
// ─── Constants ────────────────────────────────────────────────────────────────
const VENDORS = [
    "Gunny",
    "Artisan",
    "Turncoat",
    "Banshee",
    "Vulture",
    "Handshake"
];
const STAT_ICONS = {
    accuracy: "◎",
    recoilControl: "↩",
    ergonomics: "✋",
    muzzleDeviceEfficiency: "💨",
    muzzleVelocity: "⚡",
    loudnessReduction: "🔇",
    reloadSpeed: "↺",
    fireRateBonus: "⚙"
};
// Base PMC body weight (before gear). Change this value to adjust the starting total.
const PMC_BASE_WEIGHT = 3; // kg
// Doll layout - absolute positioning
const DOLL_W = 480; // container width
const DOLL_H = 684; // container height
const SW = 110; // standard slot width
const SH = 90; // standard slot height
const SWW = SW * 2 + 16; // wide (primary) slot width = 236
const SP = 94; // pocket slot width
const SPH = 74; // pocket slot height
const CX = Math.round((DOLL_W - SW) / 2); // 185 - center-aligned left
const RX = DOLL_W - 8 - SW; // 362 - right-aligned left
// Pocket spacing: 4 * SP + 3 * gap + 2 * 8 margin = 480  =>  gap ~ 29
const PG = Math.round((DOLL_W - 4 * SP - 16) / 3);
const DOLL_GRID_SLOTS = [
    // Head row
    {
        id: "headset",
        label: "Headset",
        type: "gear",
        width: SW,
        height: SH,
        left: 8,
        top: 12,
        placeholder: "/HeadsetWeaponPlaceholder.png"
    },
    {
        id: "headwear",
        label: "Headwear",
        type: "headwear",
        width: SW,
        height: SH,
        left: CX,
        top: 12,
        placeholder: "/HeadgearWeaponPlaceholder.png"
    },
    {
        id: "facewear",
        label: "Face Cover",
        type: "gear",
        width: SW,
        height: SH,
        left: RX,
        top: 12,
        placeholder: undefined
    },
    // Upper body (eyewear/backpack at eye-level, armor lower over chest)
    {
        id: "eyewear",
        label: "Eyewear",
        type: "gear",
        width: SW,
        height: SH,
        left: 8,
        top: 120,
        placeholder: "/EyewearPlaceholder.png"
    },
    {
        id: "armor",
        label: "Body Armor",
        type: "armor",
        width: SW,
        height: SH,
        left: CX,
        top: 162,
        placeholder: "/BodyArmorPlaceholder.png"
    },
    {
        id: "backpack",
        label: "Backpack",
        type: "gear",
        width: SW,
        height: SH,
        left: RX,
        top: 120,
        placeholder: "/BackpackPlaceholder.png"
    },
    // Weapons
    {
        id: "primary",
        label: "Primary",
        type: "weapon",
        width: SWW,
        height: SH,
        left: 8,
        top: 288,
        placeholder: "/PrimaryWeaponPlaceholder.png"
    },
    {
        id: "sidearm",
        label: "Sidearm",
        type: "weapon",
        width: SW,
        height: SH,
        left: RX,
        top: 288,
        placeholder: "/SidearmWeaponPlaceholder.png"
    },
    // Mid gear
    {
        id: "tacticalRig",
        label: "Tactical Rig",
        type: "rig",
        width: SW,
        height: SH,
        left: 8,
        top: 394,
        placeholder: "/ChestRigPlaceholder.png"
    },
    {
        id: "belt",
        label: "Belt",
        type: "belt",
        width: SW,
        height: SH,
        left: CX,
        top: 394,
        placeholder: "/BeltPlaceholder.png"
    },
    // Lower gear
    {
        id: "binos",
        label: "Gadgets",
        type: "gadget",
        width: SW,
        height: SH,
        left: 8,
        top: 500,
        placeholder: undefined
    },
    {
        id: "secureCase",
        label: "Secure Case",
        type: "gear",
        width: SW,
        height: SH,
        left: RX,
        top: 500,
        placeholder: "/SafePlaceholder.png"
    },
    // Pockets row (smaller, evenly spaced)
    {
        id: "pocket1",
        label: "Pocket 1",
        type: "pocket",
        width: SP,
        height: SPH,
        left: 8,
        top: 602,
        placeholder: undefined
    },
    {
        id: "pocket2",
        label: "Pocket 2",
        type: "pocket",
        width: SP,
        height: SPH,
        left: 8 + SP + PG,
        top: 602,
        placeholder: undefined
    },
    {
        id: "pocket3",
        label: "Pocket 3",
        type: "pocket",
        width: SP,
        height: SPH,
        left: 8 + 2 * (SP + PG),
        top: 602,
        placeholder: undefined
    },
    {
        id: "pocket4",
        label: "Pocket 4",
        type: "pocket",
        width: SP,
        height: SPH,
        left: 8 + 3 * (SP + PG),
        top: 602,
        placeholder: undefined
    }
];
// ─── Outline silhouettes for empty slots ──────────────────────────────────────
function WeaponOutlineSVG() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 80 36",
        xmlns: "http://www.w3.org/2000/svg",
        className: "w-full h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "8",
                y: "12",
                width: "48",
                height: "10",
                rx: "2",
                fill: "none",
                stroke: "#2a3a28",
                strokeWidth: "1.2"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "52",
                y: "14",
                width: "22",
                height: "4",
                rx: "1",
                fill: "none",
                stroke: "#2a3a28",
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "20",
                y: "22",
                width: "9",
                height: "8",
                rx: "1",
                fill: "none",
                stroke: "#2a3a28",
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 12 L2 10 L2 24 L8 22 Z",
                fill: "none",
                stroke: "#2a3a28",
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M30 22 L28 32 L34 32 L34 22",
                fill: "none",
                stroke: "#2a3a28",
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "18",
                y: "8",
                width: "30",
                height: "4",
                rx: "1",
                fill: "none",
                stroke: "#1e2e1c",
                strokeWidth: "0.8",
                strokeDasharray: "3,2"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
function PistolOutlineSVG() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 60 48",
        xmlns: "http://www.w3.org/2000/svg",
        className: "w-full h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "10",
                y: "8",
                width: "38",
                height: "10",
                rx: "2",
                fill: "none",
                stroke: "#2a3a28",
                strokeWidth: "1.2"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "44",
                y: "10",
                width: "10",
                height: "6",
                rx: "1",
                fill: "none",
                stroke: "#2a3a28",
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "10",
                y: "18",
                width: "22",
                height: "8",
                rx: "1",
                fill: "none",
                stroke: "#2a3a28",
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "14",
                y: "26",
                width: "14",
                height: "16",
                rx: "2",
                fill: "none",
                stroke: "#2a3a28",
                strokeWidth: "1.2"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M22 26 Q30 26 30 34 L30 38 L22 38",
                fill: "none",
                stroke: "#2a3a28",
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "16",
                y: "30",
                width: "10",
                height: "10",
                rx: "1",
                fill: "none",
                stroke: "#1e2e1c",
                strokeWidth: "0.8",
                strokeDasharray: "2,2"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
// ─── Crosshatch SVG pattern ───────────────────────────────────────────────────
function CrosshatchPattern({ id }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
            id: id,
            x: "0",
            y: "0",
            width: "8",
            height: "8",
            patternUnits: "userSpaceOnUse",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: "8",
                x2: "8",
                y2: "0",
                stroke: "#1a2218",
                strokeWidth: "0.8"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 193,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
            lineNumber: 192,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 191,
        columnNumber: 5
    }, this);
}
// ─── Equipment Slot Box (GZW-style) ───────────────────────────────────────────
function SlotBox({ slot, isActive, hasContent, contentLabel, contentSubLabel, contentImage, onClick }) {
    const isLocked = slot.type === "locked";
    const canClick = !isLocked;
    const imgHeight = Math.round(slot.height * 0.55);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: canClick ? onClick : undefined,
        disabled: !canClick,
        className: `
        relative overflow-hidden rounded transition-all duration-150 group
        ${isActive ? "ring-1 ring-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.35)]" : hasContent ? "ring-1 ring-gray-600" : isLocked ? "ring-1 ring-gray-900 opacity-40" : "ring-1 ring-gray-800"}
        ${canClick ? "cursor-pointer" : "cursor-not-allowed"}
      `,
        style: {
            width: slot.width,
            height: slot.height,
            background: isActive ? "linear-gradient(135deg,#141e10 0%,#0f1a0d 100%)" : hasContent ? "linear-gradient(135deg,#111a0e 0%,#0c1309 100%)" : "#090e09"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: `absolute inset-0 w-full h-full pointer-events-none ${hasContent ? "opacity-15" : isLocked ? "opacity-10" : "opacity-40"}`,
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CrosshatchPattern, {
                        id: `xh-${slot.id}`
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "100%",
                        height: "100%",
                        fill: `url(#xh-${slot.id})`
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, this),
            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 right-0 h-0.5 bg-amber-500"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 250,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex flex-col items-center justify-center h-full p-1.5 gap-1",
                children: hasContent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        contentImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full flex-1 flex items-center justify-center min-h-0 px-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: contentImage,
                                alt: contentLabel ?? "",
                                className: "w-full h-full object-contain",
                                style: {
                                    filter: "brightness(0.85) saturate(0.7) sepia(0.2)",
                                    maxHeight: imgHeight
                                }
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 260,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 258,
                            columnNumber: 15
                        }, this) : slot.placeholder ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full flex-1 flex items-center justify-center min-h-0 px-2 py-1",
                            style: {
                                opacity: 0.35
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: slot.placeholder,
                                alt: "",
                                className: "w-full h-full object-contain"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 270,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 268,
                            columnNumber: 15
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full text-center shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-white font-medium leading-tight truncate px-0.5",
                                    style: {
                                        fontSize: "11px"
                                    },
                                    children: contentLabel
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 274,
                                    columnNumber: 15
                                }, this),
                                contentSubLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-gray-500 leading-tight truncate",
                                    style: {
                                        fontSize: "9px"
                                    },
                                    children: contentSubLabel
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 279,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 273,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full flex-1 flex items-center justify-center min-h-0 px-3 py-1",
                            children: slot.placeholder ? // eslint-disable-next-line @next/next/no-img-element
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: slot.placeholder,
                                alt: "",
                                className: "w-full h-full object-contain",
                                style: {
                                    opacity: 0.2
                                }
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 292,
                                columnNumber: 17
                            }, this) : null
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 289,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `font-medium leading-tight text-center shrink-0 ${isLocked ? "text-gray-700" : "text-gray-600"}`,
                            style: {
                                fontSize: "10px"
                            },
                            children: slot.label
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this),
            canClick && !isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 305,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 217,
        columnNumber: 5
    }, this);
}
// ─── Attachment Row ───────────────────────────────────────────────────────────
function AttachmentRow({ slotKey, slot, allAttachments, selected, onSelect, vendorRanks }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const allCompat = slot.compatible.map((id)=>allAttachments[id]).filter(Boolean);
    const available = allCompat.filter((a)=>!a.vendor || !a.vendorRank || (vendorRanks[a.vendor] ?? 0) >= a.vendorRank);
    const locked = allCompat.filter((a)=>a.vendor && a.vendorRank && (vendorRanks[a.vendor] ?? 0) < a.vendorRank);
    const selectedAtt = selected ? allAttachments[selected] : null;
    const goodDeltas = selectedAtt ? Object.entries(selectedAtt.statModifiers).filter(([k, v])=>v !== 0 && (k === "accuracy" ? (v ?? 0) < 0 : (v ?? 0) > 0)) : [];
    const badDeltas = selectedAtt ? Object.entries(selectedAtt.statModifiers).filter(([k, v])=>v !== 0 && (k === "accuracy" ? (v ?? 0) > 0 : (v ?? 0) < 0)) : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `border rounded-lg overflow-hidden transition-colors ${selected ? "border-gray-700 bg-gray-900/60" : slot.required ? "border-amber-900/40 bg-amber-950/10" : "border-gray-800 bg-gray-950"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-stretch min-h-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center px-3 py-2 min-w-28 border-r border-gray-800 shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-medium text-gray-300",
                            children: [
                                slot.label,
                                slot.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-amber-500 ml-1",
                                    children: "*"
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 338,
                                    columnNumber: 43
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 337,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>allCompat.length > 0 && setOpen((o)=>!o),
                        className: `flex-1 flex items-center px-3 py-2 text-left min-w-0 transition-colors ${allCompat.length > 0 ? "hover:bg-gray-800/40 cursor-pointer" : "cursor-default"}`,
                        children: selectedAtt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-100 font-medium truncate",
                                    children: selectedAtt.name
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 349,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-1 mt-1",
                                    children: [
                                        goodDeltas.map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs bg-green-900/50 text-green-300 px-1.5 rounded font-mono",
                                                children: [
                                                    STAT_ICONS[k] ?? k,
                                                    " +",
                                                    Math.abs(v ?? 0).toFixed(1)
                                                ]
                                            }, k, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 352,
                                                columnNumber: 19
                                            }, this)),
                                        badDeltas.map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs bg-red-900/50 text-red-300 px-1.5 rounded font-mono",
                                                children: [
                                                    STAT_ICONS[k] ?? k,
                                                    " ",
                                                    (v ?? 0).toFixed(1)
                                                ]
                                            }, k, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 357,
                                                columnNumber: 19
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs bg-gray-800 text-gray-500 px-1.5 rounded font-mono",
                                            children: [
                                                "+",
                                                selectedAtt.weight.toFixed(3),
                                                "kg"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 361,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 350,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 348,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-gray-600 italic",
                            children: allCompat.length === 0 ? "No data yet" : `${available.length} available`
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 367,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center px-2 gap-1 border-l border-gray-800 shrink-0",
                        children: [
                            selectedAtt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onSelect(slotKey, null),
                                className: "text-gray-600 hover:text-gray-300 text-xs w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition-colors",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 374,
                                columnNumber: 13
                            }, this),
                            allCompat.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOpen((o)=>!o),
                                className: "text-gray-600 hover:text-gray-300 text-xs w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition-colors",
                                children: open ? "▲" : "▼"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 372,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, this),
            open && allCompat.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-800 bg-gray-900/90 max-h-60 overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            onSelect(slotKey, null);
                            setOpen(false);
                        },
                        className: "w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-800 transition-colors border-b border-gray-800",
                        children: "- None -"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 389,
                        columnNumber: 11
                    }, this),
                    available.map((att)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                onSelect(slotKey, att.id);
                                setOpen(false);
                            },
                            className: `w-full text-left px-4 py-2.5 text-sm hover:bg-gray-800 transition-colors border-b border-gray-800/50 last:border-0 ${selected === att.id ? "bg-amber-950/30 text-amber-200" : "text-gray-200"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-medium",
                                    children: att.name
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 398,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-500 mt-0.5",
                                    children: [
                                        att.vendor,
                                        " R",
                                        att.vendorRank,
                                        " · ",
                                        att.weight.toFixed(3),
                                        " kg",
                                        att.capacity ? ` · ${att.capacity}rnd` : ""
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 399,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, att.id, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 394,
                            columnNumber: 13
                        }, this)),
                    locked.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-1.5 text-xs text-gray-600 bg-gray-900 border-t border-gray-800",
                                children: "🔒 Rank locked"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 407,
                                columnNumber: 15
                            }, this),
                            locked.map((att)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 py-2 text-sm text-gray-700 border-b border-gray-800/30 last:border-0 opacity-60",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: att.name
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 412,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs",
                                            children: [
                                                att.vendor,
                                                " R",
                                                att.vendorRank
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 413,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, att.id, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 411,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 388,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 330,
        columnNumber: 5
    }, this);
}
// ─── Stat Chip ────────────────────────────────────────────────────────────────
function StatChip({ icon, label, base, delta, isAccuracy = false }) {
    const total = base + delta;
    const effectiveDelta = isAccuracy ? -delta : delta;
    const color = delta === 0 ? "text-gray-400" : effectiveDelta > 0 ? "text-green-400" : "text-red-400";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-0.5 px-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-gray-500 text-sm",
                children: icon
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 434,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-white font-mono text-sm font-bold leading-tight",
                children: isAccuracy ? total.toFixed(2) : total > 0 ? `+${total.toFixed(1)}` : total.toFixed(1)
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 435,
                columnNumber: 7
            }, this),
            delta !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-xs font-mono leading-tight ${color}`,
                children: [
                    delta > 0 ? "+" : "",
                    delta.toFixed(1)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 438,
                columnNumber: 23
            }, this),
            delta === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs leading-tight opacity-0",
                children: "0"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 439,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-gray-600 text-xs",
                children: label
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 440,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 433,
        columnNumber: 5
    }, this);
}
// ─── Weapon Slot Editor (right panel) ────────────────────────────────────────
// ─── Weapon Dropdown (searchable, grouped) ────────────────────────────────────────────
const WEAPON_TYPE_ORDER = [
    "Assault Rifle",
    "SMG",
    "Bolt-Action Rifle",
    "Sniper Rifle",
    "Shotgun"
];
function WeaponDropdown({ weapons, value, onChange }) {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Filtered, grouped list
    const groups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const q = query.toLowerCase();
        const filtered = q ? weapons.filter((w)=>w.name.toLowerCase().includes(q) || w.caliber.toLowerCase().includes(q) || w.type.toLowerCase().includes(q) || (w.vendor ?? "").toLowerCase().includes(q)) : weapons;
        const byType = {};
        filtered.forEach((w)=>{
            if (!byType[w.type]) byType[w.type] = [];
            byType[w.type].push(w);
        });
        const ordered = WEAPON_TYPE_ORDER.filter((t)=>byType[t]?.length).map((t)=>({
                type: t,
                items: byType[t]
            }));
        // Append any types not in the order list
        Object.entries(byType).filter(([t])=>!WEAPON_TYPE_ORDER.includes(t)).forEach(([t, ws])=>ordered.push({
                type: t,
                items: ws
            }));
        return ordered;
    }, [
        weapons,
        query
    ]);
    const selected = weapons.find((w)=>w.id === value) ?? null;
    // Focus input when panel opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (open) inputRef.current?.focus();
    }, [
        open
    ]);
    // Close on outside click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = (e)=>{
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
                setQuery("");
            }
        };
        document.addEventListener("mousedown", handler);
        return ()=>document.removeEventListener("mousedown", handler);
    }, []);
    const pick = (id)=>{
        onChange(id);
        setOpen(false);
        setQuery("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative mb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>{
                    setOpen(true);
                    inputRef.current?.focus();
                },
                className: `w-full flex items-center gap-2 bg-gray-900 border rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${open ? "border-amber-500" : "border-gray-700 hover:border-gray-600"}`,
                children: [
                    open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        type: "text",
                        value: query,
                        onChange: (e)=>setQuery(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === "Escape") {
                                setOpen(false);
                                setQuery("");
                            }
                        },
                        placeholder: "Search weapons…",
                        className: "flex-1 bg-transparent text-sm text-gray-100 outline-none placeholder-gray-600",
                        onClick: (e)=>e.stopPropagation()
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 532,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `flex-1 text-sm truncate ${selected ? "text-gray-100" : "text-gray-500"}`,
                        children: selected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                selected.name,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500",
                                    children: [
                                        "  ·  ",
                                        selected.caliber,
                                        "  ·  ",
                                        selected.vendor,
                                        selected.vendorRank ? ` R${selected.vendorRank}` : ""
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 545,
                                    columnNumber: 34
                                }, this)
                            ]
                        }, void 0, true) : "- Select a weapon -"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 543,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-600 text-xs shrink-0 select-none",
                        children: open ? "▲" : "▼"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 550,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 525,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-50 top-full left-0 right-0 mt-1 max-h-72 overflow-y-auto bg-gray-950 border border-gray-700 rounded-lg shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>pick(null),
                        className: "w-full text-left px-3 py-2 text-xs text-gray-600 hover:text-gray-400 hover:bg-gray-900 border-b border-gray-800 transition-colors",
                        children: "— None —"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 556,
                        columnNumber: 11
                    }, this),
                    groups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-3 py-4 text-sm text-gray-600 text-center",
                        children: [
                            'No weapons match "',
                            query,
                            '"'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 564,
                        columnNumber: 13
                    }, this) : groups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sticky top-0 px-3 py-1.5 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-semibold text-amber-600 uppercase tracking-wider",
                                            children: g.type
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 569,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-gray-700",
                                            children: g.items.length
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 570,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 568,
                                    columnNumber: 15
                                }, this),
                                g.items.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>pick(w.id),
                                        className: `w-full text-left px-4 py-2 flex items-center justify-between gap-2 transition-colors ${w.id === value ? "bg-amber-500/10 text-amber-300" : "hover:bg-gray-800/70 text-gray-300"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium leading-tight",
                                                children: w.name
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 583,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-600 shrink-0 text-right leading-tight",
                                                children: [
                                                    w.caliber,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 585,
                                                        columnNumber: 32
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-amber-900/80",
                                                        children: [
                                                            w.vendor,
                                                            w.vendorRank ? ` R${w.vendorRank}` : ""
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 586,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 584,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, w.id, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 574,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, g.type, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 566,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 555,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 523,
        columnNumber: 5
    }, this);
}
function WeaponSlotEditor({ slotLabel, weapons, selectedWeaponId, onSelectWeapon, allAttachments, vendorRanks, onWeightUpdate }) {
    const [showComponents, setShowComponents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedAttachments, setSelectedAttachments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const weapon = weapons.find((w)=>w.id === selectedWeaponId) ?? null;
    const handleSelectWeapon = (id)=>{
        onSelectWeapon(id);
        setSelectedAttachments({});
        setShowComponents(false);
    };
    const statDeltas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const d = {
            weight: 0
        };
        Object.values(selectedAttachments).forEach((id)=>{
            if (!id) return;
            const att = allAttachments[id];
            if (!att) return;
            d.weight = (d.weight ?? 0) + att.weight;
            Object.entries(att.statModifiers).forEach(([s, v])=>{
                d[s] = (d[s] ?? 0) + (v ?? 0);
            });
        });
        return d;
    }, [
        selectedAttachments,
        allAttachments
    ]);
    // Use strippedWeight (bare receiver) when available so attachments aren't double-counted.
    // Falls back to baseStats.weight for weapons not yet measured stripped.
    const baseWeight = weapon?.baseStats.strippedWeight ?? weapon?.baseStats.weight ?? 0;
    const totalWeight = baseWeight + (statDeltas.weight ?? 0);
    // Report weight to parent for breakdown panel
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        onWeightUpdate?.(totalWeight);
    }, [
        totalWeight
    ]);
    const filledCount = Object.values(selectedAttachments).filter(Boolean).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col flex-1 min-h-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-500 uppercase tracking-widest font-semibold",
                        children: slotLabel
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 639,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 h-px bg-gray-800"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 640,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 638,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WeaponDropdown, {
                weapons: weapons,
                value: selectedWeaponId,
                onChange: handleSelectWeapon
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 643,
                columnNumber: 7
            }, this),
            weapon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-900 border border-gray-800 rounded-lg p-3 mb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                weapon.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "shrink-0 w-24 h-14 bg-black/40 rounded overflow-hidden flex items-center justify-center border border-gray-800",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: weapon.image,
                                        alt: weapon.name,
                                        className: "w-full h-full object-contain",
                                        style: {
                                            filter: "brightness(0.9) saturate(0.6)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 653,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 651,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-base font-bold text-white leading-tight",
                                                        children: weapon.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-500 mt-0.5",
                                                        children: [
                                                            weapon.type,
                                                            " · ",
                                                            weapon.caliber,
                                                            weapon.manufacturer ? ` · ${weapon.manufacturer}` : ""
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 665,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-center gap-x-2 mt-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-amber-500/80",
                                                                children: [
                                                                    weapon.vendor,
                                                                    " R",
                                                                    weapon.vendorRank
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                                lineNumber: 669,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-700 text-xs",
                                                                children: "·"
                                                            }, void 0, false, {
                                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                                lineNumber: 670,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-gray-500",
                                                                children: [
                                                                    weapon.baseStats.rateOfFire ?? "?",
                                                                    " RPM"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                                lineNumber: 671,
                                                                columnNumber: 23
                                                            }, this),
                                                            !weapon.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs bg-amber-900/30 text-amber-700 px-1.5 py-0.5 rounded",
                                                                children: "unverified"
                                                            }, void 0, false, {
                                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                                lineNumber: 673,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 668,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 663,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right shrink-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-bold text-white font-mono",
                                                        children: [
                                                            totalWeight.toFixed(3),
                                                            " kg"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 678,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-600",
                                                        children: [
                                                            weapon.baseStats.weight.toFixed(3),
                                                            " base"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 679,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 677,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 662,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 661,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 648,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 647,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-around bg-gray-900/50 border border-gray-800 rounded-lg px-2 py-3 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatChip, {
                                icon: STAT_ICONS.accuracy,
                                label: "MOA",
                                base: weapon.baseStats.accuracy ?? 0,
                                delta: statDeltas.accuracy ?? 0,
                                isAccuracy: true
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 687,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px self-stretch bg-gray-800 mx-0.5"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 688,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatChip, {
                                icon: STAT_ICONS.recoilControl,
                                label: "Recoil",
                                base: weapon.baseStats.recoilControl ?? 0,
                                delta: statDeltas.recoilControl ?? 0
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 689,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px self-stretch bg-gray-800 mx-0.5"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 690,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatChip, {
                                icon: STAT_ICONS.ergonomics,
                                label: "Ergo",
                                base: weapon.baseStats.ergonomics ?? 0,
                                delta: statDeltas.ergonomics ?? 0
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 691,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px self-stretch bg-gray-800 mx-0.5"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 692,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatChip, {
                                icon: STAT_ICONS.muzzleDeviceEfficiency,
                                label: "Muzz.",
                                base: weapon.baseStats.muzzleDeviceEfficiency ?? 0,
                                delta: statDeltas.muzzleDeviceEfficiency ?? 0
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 693,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px self-stretch bg-gray-800 mx-0.5"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 694,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatChip, {
                                icon: "⚖",
                                label: "kg",
                                base: weapon.baseStats.weight ?? 0,
                                delta: statDeltas.weight ?? 0
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 695,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 686,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowComponents((o)=>!o),
                        className: `w-full flex items-center justify-between px-4 py-2.5 rounded-lg border font-medium text-sm transition-all mb-3 ${showComponents ? "bg-amber-500/15 border-amber-600/60 text-amber-300" : "bg-gray-800/80 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "🔧"
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 707,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Edit Components"
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 708,
                                        columnNumber: 15
                                    }, this),
                                    filledCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-amber-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full",
                                        children: filledCount
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 710,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 706,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-500 text-xs",
                                children: [
                                    Object.keys(weapon.slots).length,
                                    " slots ",
                                    showComponents ? "▲" : "▼"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 715,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 698,
                        columnNumber: 11
                    }, this),
                    showComponents && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto space-y-2 pr-0.5 pb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-700 px-1 mb-2",
                                children: [
                                    Object.keys(weapon.slots).length,
                                    " attachment points · ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-amber-800",
                                        children: "* required"
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 721,
                                        columnNumber: 72
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 720,
                                columnNumber: 15
                            }, this),
                            Object.entries(weapon.slots).map(([key, slot])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AttachmentRow, {
                                    slotKey: key,
                                    slot: slot,
                                    allAttachments: allAttachments,
                                    selected: selectedAttachments[key] ?? null,
                                    onSelect: (k, id)=>setSelectedAttachments((p)=>({
                                                ...p,
                                                [k]: id
                                            })),
                                    vendorRanks: vendorRanks
                                }, key, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 724,
                                    columnNumber: 17
                                }, this)),
                            weapon.compatibleAmmo && weapon.compatibleAmmo.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border border-gray-800 rounded-lg overflow-hidden mt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-2 bg-gray-900/60 border-b border-gray-800",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium text-gray-400",
                                            children: "Compatible Ammo"
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 732,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 731,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-2.5 flex flex-wrap gap-1.5",
                                        children: weapon.compatibleAmmo.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded",
                                                children: a
                                            }, a, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 736,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 734,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 730,
                                columnNumber: 17
                            }, this),
                            weapon.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-600 italic px-1 pt-2 border-t border-gray-900",
                                children: weapon.notes
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 742,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 719,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col items-center justify-center text-center py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-32 h-16 mx-auto mb-4 opacity-20",
                        children: slotLabel === "Sidearm" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PistolOutlineSVG, {}, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 750,
                            columnNumber: 40
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WeaponOutlineSVG, {}, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 750,
                            columnNumber: 63
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 749,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 text-sm",
                        children: "Select a weapon to begin"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 752,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-700 text-xs mt-1",
                        children: slotLabel === "Primary" ? "Assault rifles, DMRs, snipers, shotguns" : "Pistols"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 753,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 748,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 637,
        columnNumber: 5
    }, this);
}
// ─── Vendor Rank Bar ──────────────────────────────────────────────────────────
function VendorRanks({ ranks, setRanks }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-gray-800 rounded-lg mb-4 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen((o)=>!o),
                className: "w-full flex items-center justify-between px-4 py-2.5 bg-gray-900/60 hover:bg-gray-900 transition-colors text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-400 font-medium",
                        children: "Vendor Ranks"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 773,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: VENDORS.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-500 font-mono",
                                        children: [
                                            v[0],
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-amber-400",
                                                children: ranks[v]
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 778,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, v, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 777,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 775,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-700 text-xs",
                                children: open ? "▲" : "▼"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 782,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 774,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 771,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 border-t border-gray-800 bg-gray-950 grid grid-cols-2 gap-3",
                children: VENDORS.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-300 text-sm",
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 789,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1",
                                children: [
                                    1,
                                    2,
                                    3,
                                    4
                                ].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setRanks((p)=>({
                                                    ...p,
                                                    [v]: r
                                                })),
                                        className: `w-7 h-7 rounded text-xs font-bold transition-colors ${(ranks[v] ?? 1) >= r ? "bg-amber-500 text-black" : "bg-gray-800 text-gray-600 hover:bg-gray-700"}`,
                                        children: r
                                    }, r, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 792,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 790,
                                columnNumber: 15
                            }, this)
                        ]
                    }, v, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 788,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 786,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 770,
        columnNumber: 5
    }, this);
}
// ─── Gadget Slot Editor (right panel) ────────────────────────────────────────
function GadgetSlotEditor({ gadgets, selectedGadgetId, onSelectGadget, vendorRanks }) {
    const selected = gadgets.find((g)=>g.id === selectedGadgetId) ?? null;
    const available = gadgets.filter((g)=>!g.upcoming && (!g.vendor || !g.vendorRank || (vendorRanks[g.vendor] ?? 0) >= g.vendorRank));
    const rankLocked = gadgets.filter((g)=>!g.upcoming && g.vendor && g.vendorRank && (vendorRanks[g.vendor] ?? 0) < g.vendorRank);
    const upcoming = gadgets.filter((g)=>g.upcoming);
    const byType = (list)=>list.reduce((acc, g)=>{
            (acc[g.type] ??= []).push(g);
            return acc;
        }, {});
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 flex-1 min-h-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border border-gray-800 rounded-lg p-3 bg-gray-950 min-h-20 flex items-center gap-4",
                children: selected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        selected.image ? /* eslint-disable-next-line @next/next/no-img-element */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: selected.image,
                            alt: selected.name,
                            className: "w-20 h-14 object-contain shrink-0",
                            style: {
                                filter: "brightness(0.85) saturate(0.7) sepia(0.2)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 842,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-14 shrink-0 flex items-center justify-center text-3xl opacity-20",
                            children: "🔭"
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 847,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white font-semibold text-sm",
                                            children: selected.name
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 853,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs bg-gray-800 text-gray-400 px-1.5 rounded",
                                            children: selected.type
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 854,
                                            columnNumber: 17
                                        }, this),
                                        selected.upcoming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs bg-amber-950/60 text-amber-400 border border-amber-800/50 px-1.5 rounded",
                                            children: "upcoming"
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 856,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 852,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-xs text-gray-500",
                                    children: [
                                        selected.manufacturer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: selected.manufacturer
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 860,
                                            columnNumber: 43
                                        }, this),
                                        selected.vendor ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                selected.vendor,
                                                " R",
                                                selected.vendorRank
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 862,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "italic",
                                            children: "vendor unknown"
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 863,
                                            columnNumber: 21
                                        }, this),
                                        selected.baseStats.weight != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono",
                                            children: [
                                                selected.baseStats.weight.toFixed(3),
                                                " kg"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 866,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "italic",
                                            children: "weight unknown"
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 867,
                                            columnNumber: 21
                                        }, this),
                                        selected.gridSize && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                selected.gridSize,
                                                " grid"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 869,
                                            columnNumber: 39
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 859,
                                    columnNumber: 15
                                }, this),
                                selected.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 text-xs mt-1.5 leading-snug line-clamp-2",
                                    children: selected.description
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 872,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 851,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onSelectGadget(null),
                            className: "text-gray-600 hover:text-gray-300 text-xs w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition-colors shrink-0",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 875,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-600 text-sm italic",
                    children: "No gadget selected"
                }, void 0, false, {
                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                    lineNumber: 881,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 837,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto flex flex-col gap-3",
                children: [
                    Object.entries(byType(available)).map(([type, items])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1",
                                    children: type
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 890,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-0.5",
                                    children: items.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onSelectGadget(selectedGadgetId === g.id ? null : g.id),
                                            className: `w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${selectedGadgetId === g.id ? "border-amber-700 bg-amber-950/30 text-amber-200" : "border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-200"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-medium",
                                                    children: g.name
                                                }, void 0, false, {
                                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                    lineNumber: 900,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-500 mt-0.5",
                                                    children: [
                                                        g.vendor ? `${g.vendor} R${g.vendorRank}` : "vendor TBD",
                                                        g.baseStats.weight != null ? ` · ${g.baseStats.weight.toFixed(3)} kg` : ""
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                    lineNumber: 901,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, g.id, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 893,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 891,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, type, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 889,
                            columnNumber: 11
                        }, this)),
                    rankLocked.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1",
                                children: "🔒 Rank locked"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 914,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-0.5",
                                children: rankLocked.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-2 rounded-lg border border-gray-800 text-sm opacity-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-500",
                                                children: g.name
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 918,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-600",
                                                children: [
                                                    g.vendor,
                                                    " R",
                                                    g.vendorRank
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 919,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, g.id, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 917,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 915,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 913,
                        columnNumber: 11
                    }, this),
                    upcoming.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1",
                                children: "Upcoming"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 929,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-0.5",
                                children: upcoming.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-2 rounded-lg border border-gray-800/50 text-sm opacity-40",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-gray-500",
                                            children: [
                                                g.name,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 text-xs text-gray-700",
                                                    children: g.type
                                                }, void 0, false, {
                                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                    lineNumber: 934,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 933,
                                            columnNumber: 19
                                        }, this)
                                    }, g.id, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 932,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 930,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 928,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 886,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 835,
        columnNumber: 5
    }, this);
}
// ─── Headwear Slot Editor ─────────────────────────────────────────────────────
function HeadwearSlotEditor({ headwear, selectedId, onSelect, vendorRanks }) {
    const selected = headwear.find((h)=>h.id === selectedId) ?? null;
    const isAvailable = (h)=>{
        if (!h.vendor || h.vendor === "Loot only") return true;
        if (!h.vendorRank) return true;
        return (vendorRanks[h.vendor] ?? 0) >= h.vendorRank;
    };
    const available = headwear.filter(isAvailable);
    const rankLocked = headwear.filter((h)=>!isAvailable(h));
    const helmets = available.filter((h)=>h.subtype === "Helmet");
    const vanity = available.filter((h)=>h.subtype === "Vanity");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 flex-1 min-h-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border border-gray-800 rounded-lg p-3 bg-gray-950 min-h-20 flex items-center gap-4",
                children: selected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        selected.image ? // eslint-disable-next-line @next/next/no-img-element
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: selected.image,
                            alt: selected.name,
                            className: "w-20 h-14 object-contain shrink-0",
                            style: {
                                filter: "brightness(0.85) saturate(0.7) sepia(0.2)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 975,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-14 shrink-0 flex items-center justify-center text-3xl opacity-20",
                            children: "🪖"
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 980,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white font-semibold text-sm",
                                            children: selected.name
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 986,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs bg-gray-800 text-gray-400 px-1.5 rounded",
                                            children: selected.subtype
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 987,
                                            columnNumber: 17
                                        }, this),
                                        selected.armorLevel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs bg-green-900/40 text-green-400 border border-green-800/40 px-1.5 rounded",
                                            children: selected.armorLevel
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 989,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 985,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-xs text-gray-500",
                                    children: [
                                        selected.manufacturer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: selected.manufacturer
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 993,
                                            columnNumber: 43
                                        }, this),
                                        selected.vendor === "Loot only" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "italic",
                                            children: "Loot only"
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 995,
                                            columnNumber: 21
                                        }, this) : selected.vendor ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                selected.vendor,
                                                " R",
                                                selected.vendorRank
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 997,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "italic",
                                            children: "vendor unknown"
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 998,
                                            columnNumber: 23
                                        }, this),
                                        selected.baseStats.weight != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono",
                                            children: [
                                                selected.baseStats.weight.toFixed(3),
                                                " kg"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 1001,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "italic",
                                            children: "weight unknown"
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 1002,
                                            columnNumber: 21
                                        }, this),
                                        selected.baseStats.rainProtection !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-blue-400",
                                            children: [
                                                "+",
                                                selected.baseStats.rainProtection,
                                                "% rain"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 1005,
                                            columnNumber: 19
                                        }, this),
                                        selected.material && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: selected.material
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 1007,
                                            columnNumber: 39
                                        }, this),
                                        selected.gridSize && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                selected.gridSize,
                                                " grid"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 1008,
                                            columnNumber: 39
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 992,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 984,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onSelect(null),
                            className: "text-gray-600 hover:text-gray-300 text-xs w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition-colors shrink-0",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 1011,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-600 text-sm italic",
                    children: "No headwear selected"
                }, void 0, false, {
                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                    lineNumber: 1017,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 970,
                columnNumber: 7
            }, this),
            selected?.slots?.nvgMount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border border-gray-800 rounded-lg overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center px-3 py-2 bg-gray-900/60 border-b border-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium text-gray-300",
                                children: "NVG Mount"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1025,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 text-xs text-gray-600 italic",
                                children: "- data coming soon -"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1026,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1024,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 py-2.5 flex flex-wrap gap-1.5",
                        children: selected.slots.nvgMount.compatible.map((id)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs bg-gray-800/40 text-gray-600 px-2 py-0.5 rounded font-mono border border-gray-800",
                                children: id.replace(/-/g, ' ')
                            }, id, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1030,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1028,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1023,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto flex flex-col gap-3",
                children: [
                    helmets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1",
                                children: "Combat Helmets"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1042,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-0.5",
                                children: helmets.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onSelect(selectedId === h.id ? null : h.id),
                                        className: `w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${selectedId === h.id ? "border-amber-700 bg-amber-950/30 text-amber-200" : "border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-200"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: h.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 1053,
                                                        columnNumber: 21
                                                    }, this),
                                                    h.armorLevel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs bg-green-900/30 text-green-500 px-1 rounded",
                                                        children: h.armorLevel
                                                    }, void 0, false, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 1055,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 1052,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 mt-0.5",
                                                children: [
                                                    h.vendor === "Loot only" ? "Loot only" : h.vendor ? `${h.vendor} R${h.vendorRank}` : "vendor TBD",
                                                    h.baseStats.weight != null ? ` · ${h.baseStats.weight.toFixed(3)} kg` : "",
                                                    h.material ? ` · ${h.material}` : ""
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 1058,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, h.id, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1045,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1043,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1041,
                        columnNumber: 11
                    }, this),
                    vanity.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1",
                                children: "Vanity"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1071,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-0.5",
                                children: vanity.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onSelect(selectedId === h.id ? null : h.id),
                                        className: `w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${selectedId === h.id ? "border-amber-700 bg-amber-950/30 text-amber-200" : "border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-200"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: h.name
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 1081,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 mt-0.5",
                                                children: [
                                                    h.vendor === "Loot only" ? "Loot only" : h.vendor ? `${h.vendor} R${h.vendorRank}` : "vendor TBD",
                                                    h.baseStats.weight != null ? ` · ${h.baseStats.weight.toFixed(3)} kg` : "",
                                                    h.baseStats.rainProtection !== 0 ? ` · +${h.baseStats.rainProtection}% rain` : ""
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 1082,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, h.id, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1074,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1072,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1070,
                        columnNumber: 11
                    }, this),
                    rankLocked.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1",
                                children: "🔒 Rank locked"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1095,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-0.5",
                                children: rankLocked.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-2 rounded-lg border border-gray-800 text-sm opacity-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-500",
                                                children: h.name
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 1099,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-600",
                                                children: [
                                                    h.vendor,
                                                    " R",
                                                    h.vendorRank
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 1100,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, h.id, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1096,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1094,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1039,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 968,
        columnNumber: 5
    }, this);
}
// ─── Weight Breakdown ───────────────────────────────────────────────────────
function WeightBreakdown({ rows }) {
    const gearTotal = rows.reduce((sum, r)=>sum + (r.weight ?? 0), 0);
    const total = PMC_BASE_WEIGHT + gearTotal;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-gray-800 rounded-lg overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-2.5 bg-gray-900/60 border-b border-gray-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs text-gray-400 font-medium uppercase tracking-widest",
                    children: "Weight"
                }, void 0, false, {
                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                    lineNumber: 1121,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "divide-y divide-gray-900",
                children: rows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-4 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-500",
                                children: r.label
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1126,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-mono tabular-nums " + (r.weight != null ? "text-gray-300" : "text-gray-700"),
                                children: r.weight != null ? r.weight.toFixed(2) + " kg" : "- -"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1127,
                                columnNumber: 13
                            }, this)
                        ]
                    }, r.id, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1125,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-2.5 border-t border-gray-700 bg-gray-900/40 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-400 font-medium",
                        children: "Total PMC Weight"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-bold font-mono tabular-nums text-amber-400",
                        children: [
                            total.toFixed(2),
                            " kg"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1133,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 1119,
        columnNumber: 5
    }, this);
}
// ─── Shared helpers ────────────────────────────────────────────────────────────
function GroupedDropdown({ groups, selectedId, onSelect, placeholder, searchQuery, onSearchChange, renderItem, open, onOpen, containerRef }) {
    const hasResults = groups.some((g)=>g.items.length > 0 && !g.disabledBanner || g.disabledBanner && g.items.length > 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 border border-gray-700 rounded-lg px-3 py-2 cursor-text bg-gray-950 hover:border-gray-600 transition-colors",
                onClick: onOpen,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-600 text-sm shrink-0",
                        children: "🔍"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "flex-1 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-600",
                        placeholder: placeholder,
                        value: searchQuery,
                        onChange: (e)=>{
                            onSearchChange(e.target.value);
                            onOpen();
                        },
                        onFocus: onOpen
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1168,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1163,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full left-0 right-0 mt-1 z-40 bg-gray-950 border border-gray-700 rounded-lg shadow-xl max-h-80 overflow-y-auto",
                children: [
                    groups.map((grp)=>grp.items.length === 0 ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1",
                                    children: grp.label
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 1180,
                                    columnNumber: 15
                                }, this),
                                grp.disabledBanner ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-3 py-2 rounded-lg border border-red-900/50 bg-red-950/20 text-xs text-red-400 italic",
                                    children: grp.disabledBanner
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 1182,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-0.5",
                                    children: grp.items.map((item)=>renderItem(item, selectedId === item.id))
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 1184,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, grp.label, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 1179,
                            columnNumber: 13
                        }, this)),
                    !hasResults && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 py-4 text-sm text-gray-600 text-center",
                        children: "No results"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1191,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1177,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 1162,
        columnNumber: 5
    }, this);
}
function ItemSummaryCard({ image, name, badge, badgeClass, subLine, onClear, dimImage }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-gray-800 rounded-lg p-3 bg-gray-950 flex items-center gap-3 mb-2",
        children: [
            image ? /* eslint-disable-next-line @next/next/no-img-element */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: image,
                alt: name,
                className: "w-16 h-12 object-contain shrink-0",
                style: {
                    filter: dimImage ? "brightness(0.85) saturate(0.7) sepia(0.2)" : undefined
                }
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1207,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-16 h-12 shrink-0 flex items-center justify-center text-2xl opacity-20",
                children: "🛡"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1210,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-semibold text-sm",
                                children: name
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1214,
                                columnNumber: 11
                            }, this),
                            badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-xs px-1.5 rounded ${badgeClass ?? "bg-gray-800 text-gray-400"}`,
                                children: badge
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1215,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1213,
                        columnNumber: 9
                    }, this),
                    subLine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 text-xs text-gray-500",
                        children: subLine
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1217,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1212,
                columnNumber: 7
            }, this),
            onClear && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClear,
                className: "text-gray-600 hover:text-gray-300 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition-colors text-xs shrink-0",
                children: "✕"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1220,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 1204,
        columnNumber: 5
    }, this);
}
// ─── Container Sub-Item Picker ──────────────────────────────────────────────
function ContainerSubPicker({ container, contents, onContentsChange, medical, keys: keyItems }) {
    const maxSlots = Math.min(container.internalSlots, container.holds === "keys" ? 8 : 4);
    const [openIdx, setOpenIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const optionsByGroup = {};
    if (container.holds === "keys") {
        const byLoc = keyItems.reduce((acc, k)=>{
            (acc[k.location] ??= []).push(k);
            return acc;
        }, {});
        for (const [loc, ks] of Object.entries(byLoc)){
            const filtered = ks.filter((k)=>k.name.toLowerCase().includes(query.toLowerCase()));
            if (filtered.length) optionsByGroup[loc] = filtered;
        }
    } else if (container.holds === "medical") {
        const byCat = medical.reduce((acc, m)=>{
            (acc[m.category] ??= []).push(m);
            return acc;
        }, {});
        for (const [cat, items] of Object.entries(byCat)){
            const filtered = items.filter((m)=>m.name.toLowerCase().includes(query.toLowerCase()));
            if (filtered.length) optionsByGroup[cat] = filtered;
        }
    }
    if (container.holds === "valuables") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs text-gray-600 italic px-1 mt-1",
            children: "Holds currency/valuables — not tracked"
        }, void 0, false, {
            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
            lineNumber: 1264,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-1.5 ml-3 pl-3 border-l border-gray-800 flex flex-col gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-600 mb-1",
                children: [
                    container.holds === "keys" ? "Keys stored" : "Medical contents",
                    " (",
                    maxSlots,
                    " slots)"
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1269,
                columnNumber: 7
            }, this),
            Array.from({
                length: maxSlots
            }).map((_, i)=>{
                const filledId = contents[i] ?? null;
                const filledName = container.holds === "keys" ? keyItems.find((k)=>k.id === filledId)?.name : medical.find((m)=>m.id === filledId)?.name;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex items-center gap-2 border rounded px-2 py-1 cursor-pointer text-xs transition-colors ${filledId ? "border-gray-700 bg-gray-900" : "border-gray-800 bg-gray-950 hover:border-gray-700"}`,
                            onClick: ()=>{
                                setOpenIdx(openIdx === i ? null : i);
                                setQuery("");
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-600 w-4 font-mono",
                                    children: i + 1
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 1285,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: filledId ? "text-gray-300 flex-1" : "text-gray-600 italic flex-1",
                                    children: filledName ?? "Empty"
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 1286,
                                    columnNumber: 15
                                }, this),
                                filledId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        onContentsChange(i, null);
                                    },
                                    className: "text-gray-600 hover:text-red-400 transition-colors",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 1290,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 1279,
                            columnNumber: 13
                        }, this),
                        openIdx === i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-full left-0 right-0 mt-0.5 z-50 bg-gray-950 border border-gray-700 rounded shadow-xl max-h-48 overflow-y-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-1.5 border-b border-gray-800",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        autoFocus: true,
                                        className: "w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs text-gray-200 outline-none placeholder-gray-600",
                                        placeholder: "Search...",
                                        value: query,
                                        onChange: (e)=>setQuery(e.target.value),
                                        onClick: (e)=>e.stopPropagation()
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1297,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 1296,
                                    columnNumber: 17
                                }, this),
                                Object.entries(optionsByGroup).map(([grp, items])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-0.5",
                                                children: grp
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 1303,
                                                columnNumber: 21
                                            }, this),
                                            items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        onContentsChange(i, item.id);
                                                        setOpenIdx(null);
                                                        setQuery("");
                                                    },
                                                    className: `w-full text-left px-2 py-1 rounded text-xs transition-colors ${filledId === item.id ? "bg-amber-950/30 text-amber-200" : "hover:bg-gray-900 text-gray-300"}`,
                                                    children: item.name
                                                }, item.id, false, {
                                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                    lineNumber: 1305,
                                                    columnNumber: 23
                                                }, this))
                                        ]
                                    }, grp, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1302,
                                        columnNumber: 19
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 1295,
                            columnNumber: 15
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                    lineNumber: 1278,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 1268,
        columnNumber: 5
    }, this);
}
// ─── Rig Slot Row ────────────────────────────────────────────────────────────
function RigSlotRow({ index, slotValue, totalSlots, consumables, medical, containers, keys: keyItems, contents, onSelect, onContentsChange }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const h = (e)=>{
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", h);
        return ()=>document.removeEventListener("mousedown", h);
    }, []);
    // Is this slot occupied by a multi-slot item from another slot?
    if (slotValue?.startsWith("__occ:")) {
        const srcIdx = parseInt(slotValue.split(":")[1]);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 border border-gray-800/50 rounded-lg px-3 py-1.5 bg-gray-950/50 opacity-60",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs text-gray-600 w-5 font-mono",
                    children: index + 1
                }, void 0, false, {
                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                    lineNumber: 1354,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs text-gray-500 italic flex-1",
                    children: [
                        "Occupied by slot ",
                        srcIdx + 1,
                        " item"
                    ]
                }, void 0, true, {
                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                    lineNumber: 1355,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
            lineNumber: 1353,
            columnNumber: 7
        }, this);
    }
    // Build picker options
    const grenades = consumables.filter((c)=>c.category === "Grenade");
    const ammo = consumables.filter((c)=>c.category === "Ammo");
    const mags = [];
    // Filter options by search
    const filterQ = (items)=>items.filter((i)=>i.name.toLowerCase().includes(query.toLowerCase()));
    const groups = [
        {
            label: "Grenades",
            items: filterQ(grenades)
        },
        {
            label: "Medical",
            items: filterQ(medical)
        },
        {
            label: "Ammo",
            items: filterQ(ammo)
        },
        {
            label: "Containers",
            items: filterQ(containers)
        }
    ].filter((g)=>g.items.length > 0);
    const findItem = (id)=>{
        const allItems = [
            ...consumables.map((c)=>({
                    ...c,
                    type: "consumable"
                })),
            ...medical.map((m)=>({
                    ...m,
                    type: "medical"
                })),
            ...containers.map((c)=>({
                    ...c,
                    type: "container"
                }))
        ];
        return allItems.find((i)=>i.id === id) ?? null;
    };
    const filled = slotValue ? findItem(slotValue) : null;
    const filledContainer = slotValue ? containers.find((c)=>c.id === slotValue) : null;
    const filledWeight = filled && "weight" in filled ? filled.weight : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: ref,
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center gap-2 border rounded-lg px-3 py-1.5 cursor-pointer bg-gray-950 hover:border-gray-600 transition-colors ${filled ? "border-gray-700" : "border-gray-800"}`,
                        onClick: ()=>setOpen((o)=>!o),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-600 w-5 shrink-0 font-mono",
                                children: index + 1
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1398,
                                columnNumber: 11
                            }, this),
                            filled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-200 flex-1",
                                        children: filled.name
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1401,
                                        columnNumber: 15
                                    }, this),
                                    filledContainer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-amber-600 mr-1",
                                        children: [
                                            "📦 ",
                                            filledContainer.rigSlots > 1 ? `×${filledContainer.rigSlots}` : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1403,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                            filledWeight.toFixed(3),
                                            " kg"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1405,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            onSelect(null, containers);
                                        },
                                        className: "text-gray-600 hover:text-gray-300 w-5 h-5 flex items-center justify-center rounded hover:bg-gray-800 transition-colors text-xs",
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1406,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-600 flex-1 italic",
                                children: "Empty slot"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1410,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1392,
                        columnNumber: 9
                    }, this),
                    open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-0 right-0 mt-1 z-50 bg-gray-950 border border-gray-700 rounded-lg shadow-xl max-h-64 overflow-y-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2 border-b border-gray-800",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    autoFocus: true,
                                    className: "w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm text-gray-200 outline-none placeholder-gray-600",
                                    placeholder: "Search items...",
                                    value: query,
                                    onChange: (e)=>setQuery(e.target.value),
                                    onClick: (e)=>e.stopPropagation()
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 1416,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1415,
                                columnNumber: 13
                            }, this),
                            groups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1",
                                            children: g.label
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 1422,
                                            columnNumber: 17
                                        }, this),
                                        g.items.map((item)=>{
                                            const isCont = containers.find((c)=>c.id === item.id);
                                            const isMed = medical.find((m)=>m.id === item.id);
                                            const slotsNeeded = isCont?.rigSlots ?? (isMed?.gridSize === "1x2" ? 2 : 1);
                                            const fits = index + slotsNeeded <= totalSlots;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                disabled: !fits,
                                                onClick: ()=>{
                                                    onSelect(item.id, containers);
                                                    setOpen(false);
                                                    setQuery("");
                                                },
                                                className: `w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${slotValue === item.id ? "bg-amber-950/30 text-amber-200" : fits ? "hover:bg-gray-900 text-gray-300" : "text-gray-600 opacity-40 cursor-not-allowed"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 1437,
                                                        columnNumber: 23
                                                    }, this),
                                                    isCont && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-xs text-amber-700",
                                                        children: [
                                                            isCont.gridSize,
                                                            " · ",
                                                            isCont.rigSlots,
                                                            " slots"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 1438,
                                                        columnNumber: 34
                                                    }, this),
                                                    isMed && isMed.gridSize === "1x2" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-xs text-amber-700",
                                                        children: "1×2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 1439,
                                                        columnNumber: 61
                                                    }, this),
                                                    "weight" in item && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-xs text-gray-600",
                                                        children: [
                                                            item.weight.toFixed(3),
                                                            " kg"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 1440,
                                                        columnNumber: 44
                                                    }, this),
                                                    !fits && isCont && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-xs text-red-700",
                                                        children: [
                                                            "needs ",
                                                            slotsNeeded,
                                                            " slots"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 1441,
                                                        columnNumber: 43
                                                    }, this)
                                                ]
                                            }, item.id, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 1429,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    ]
                                }, g.label, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 1421,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1414,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1391,
                columnNumber: 7
            }, this),
            filledContainer && filledContainer.holds !== "valuables" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ContainerSubPicker, {
                container: filledContainer,
                contents: contents,
                onContentsChange: onContentsChange,
                medical: medical,
                keys: keyItems
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1452,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 1390,
        columnNumber: 5
    }, this);
}
// ─── Armor Slot Editor ────────────────────────────────────────────────────────
function ArmorSlotEditor({ armorItems, rigs, selectedArmorId, selectedRigId, onSelectArmor, onSelectRig, onResetRigSlots, vendorRanks }) {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const h = (e)=>{
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", h);
        return ()=>document.removeEventListener("mousedown", h);
    }, []);
    const selectedArmor = armorItems.find((a)=>a.id === selectedArmorId) ?? null;
    const rigIsStdRig = selectedRigId !== null && !armorItems.find((a)=>a.id === selectedRigId);
    const rankOk = (vendor, rank)=>!rank || (vendorRanks[vendor] ?? 0) >= rank;
    const pcs = armorItems.filter((a)=>a.type === "Plate Carrier" && a.name.toLowerCase().includes(query.toLowerCase()));
    const vests = armorItems.filter((a)=>a.type === "Armor Vest" && a.name.toLowerCase().includes(query.toLowerCase()));
    const handleSelect = (item)=>{
        if (item.type === "Plate Carrier") {
            onSelectArmor(item.id);
            onSelectRig(item.id);
            onResetRigSlots();
        } else {
            onSelectArmor(item.id);
            // If rig was a PC, clear it
            if (selectedRigId && armorItems.find((a)=>a.id === selectedRigId && a.type === "Plate Carrier")) {
                onSelectRig(null);
                onResetRigSlots();
            }
        }
        setOpen(false);
        setQuery("");
    };
    const pcBanner = rigIsStdRig ? "Cannot equip a Plate Carrier while a Tactical Rig is equipped — remove the rig first" : undefined;
    const renderArmorItem = (item, isSelected)=>{
        const avail = rankOk(item.vendor, item.vendorRank);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: ()=>avail && handleSelect(item),
            disabled: !avail,
            className: `w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${isSelected ? "border-amber-700 bg-amber-950/30 text-amber-200" : avail ? "border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-200" : "border-gray-800 text-gray-600 opacity-50 cursor-not-allowed"}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-medium flex items-center gap-2",
                    children: [
                        item.name,
                        !avail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-gray-600",
                            children: [
                                "🔒 R",
                                item.vendorRank
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 1521,
                            columnNumber: 22
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                    lineNumber: 1520,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-gray-500 mt-0.5",
                    children: [
                        item.nijRating,
                        " · ",
                        item.material,
                        " · ",
                        item.weight.toFixed(1),
                        " kg",
                        item.slots ? ` · ${item.slots} rig slots` : "",
                        item.vendor ? ` · ${item.vendor}${item.vendorRank ? " R" + item.vendorRank : ""}` : ""
                    ]
                }, void 0, true, {
                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                    lineNumber: 1523,
                    columnNumber: 9
                }, this)
            ]
        }, item.id, true, {
            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
            lineNumber: 1514,
            columnNumber: 7
        }, this);
    };
    const groups = [
        {
            label: "Plate Carriers",
            items: pcs,
            disabledBanner: pcBanner
        },
        {
            label: "Armor Vests",
            items: vests
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-500 uppercase tracking-widest font-semibold",
                        children: "Body Armor"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1540,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 h-px bg-gray-800"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1541,
                        columnNumber: 9
                    }, this),
                    selectedArmor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            onSelectArmor(null);
                            if (selectedArmorId && armorItems.find((a)=>a.id === selectedArmorId && a.type === "Plate Carrier")) {
                                onSelectRig(null);
                                onResetRigSlots();
                            }
                        },
                        className: "text-xs text-gray-600 hover:text-gray-300 transition-colors",
                        children: "clear"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1543,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1539,
                columnNumber: 7
            }, this),
            selectedArmor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemSummaryCard, {
                image: selectedArmor.image,
                name: selectedArmor.name,
                dimImage: true,
                badge: selectedArmor.type,
                badgeClass: selectedArmor.type === "Plate Carrier" ? "bg-amber-950/60 text-amber-400 border border-amber-800/50" : "bg-gray-800 text-gray-400",
                subLine: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: selectedArmor.nijRating
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 1554,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mx-1",
                            children: "·"
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 1555,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: selectedArmor.material
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 1556,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mx-1",
                            children: "·"
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 1557,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono",
                            children: [
                                selectedArmor.weight.toFixed(1),
                                " kg"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 1558,
                            columnNumber: 13
                        }, this),
                        selectedArmor.slots && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mx-1",
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 1559,
                                    columnNumber: 39
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        selectedArmor.slots,
                                        " rig slots"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 1559,
                                    columnNumber: 70
                                }, this)
                            ]
                        }, void 0, true),
                        selectedArmor.type === "Plate Carrier" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ml-2 text-amber-700/70",
                            children: "Fills both slots"
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 1560,
                            columnNumber: 56
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1549,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GroupedDropdown, {
                groups: groups,
                selectedId: selectedArmorId,
                onSelect: handleSelect,
                placeholder: selectedArmor ? "Change armor..." : "Search armor...",
                searchQuery: query,
                onSearchChange: setQuery,
                renderItem: (item, isSelected)=>renderArmorItem(item, isSelected),
                open: open,
                onOpen: ()=>setOpen(true),
                containerRef: ref
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1565,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 1538,
        columnNumber: 5
    }, this);
}
// ─── Rig Slot Editor ──────────────────────────────────────────────────────────
function RigSlotEditor({ armorItems, rigs, consumables, medical, containers, keyItems, selectedArmorId, selectedRigId, onSelectArmor, onSelectRig, rigSlotItems, onRigSlotChange, containerContents, onContainerContentsChange, onResetRigSlots, vendorRanks }) {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const h = (e)=>{
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", h);
        return ()=>document.removeEventListener("mousedown", h);
    }, []);
    const selectedPC = armorItems.find((a)=>a.id === selectedArmorId && a.type === "Plate Carrier") ?? null;
    const selectedRig = rigs.find((r)=>r.id === selectedRigId) ?? null;
    const armorIsVest = selectedArmorId !== null && !selectedPC;
    const rankOk = (vendor, rank)=>!rank || (vendorRanks[vendor] ?? 0) >= rank;
    const filteredRigs = rigs.filter((r)=>r.name.toLowerCase().includes(query.toLowerCase()));
    const filteredPCs = armorItems.filter((a)=>a.type === "Plate Carrier" && a.name.toLowerCase().includes(query.toLowerCase()));
    const handleSelectRig = (rig)=>{
        onSelectRig(rig.id);
        if (selectedPC) {
            onSelectArmor(null);
        }
        onResetRigSlots();
        setOpen(false);
        setQuery("");
    };
    const handleSelectPC = (pc)=>{
        onSelectArmor(pc.id);
        onSelectRig(pc.id);
        onResetRigSlots();
        setOpen(false);
        setQuery("");
    };
    const pcBanner = armorIsVest ? "Cannot equip a Plate Carrier while an Armor Vest is equipped — remove the vest first" : undefined;
    const renderRigItem = (rig, isSelected)=>{
        const avail = rankOk(rig.vendor, rig.vendorRank);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: ()=>avail && handleSelectRig(rig),
            disabled: !avail,
            className: `w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${isSelected ? "border-amber-700 bg-amber-950/30 text-amber-200" : avail ? "border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-200" : "border-gray-800 text-gray-600 opacity-50 cursor-not-allowed"}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-medium flex items-center gap-2",
                    children: [
                        rig.name,
                        !avail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-gray-600",
                            children: [
                                "🔒 R",
                                rig.vendorRank
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 1643,
                            columnNumber: 22
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                    lineNumber: 1642,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-gray-500 mt-0.5",
                    children: [
                        rig.slots,
                        " slots · ",
                        rig.weight.toFixed(2),
                        " kg",
                        rig.vendor ? ` · ${rig.vendor}${rig.vendorRank ? " R" + rig.vendorRank : ""}` : ""
                    ]
                }, void 0, true, {
                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                    lineNumber: 1645,
                    columnNumber: 9
                }, this)
            ]
        }, rig.id, true, {
            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
            lineNumber: 1636,
            columnNumber: 7
        }, this);
    };
    const renderPCItem = (pc, isSelected)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: ()=>!armorIsVest && handleSelectPC(pc),
            disabled: armorIsVest,
            className: `w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${isSelected ? "border-amber-700 bg-amber-950/30 text-amber-200" : armorIsVest ? "border-gray-800 text-gray-600 opacity-40 cursor-not-allowed" : "border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-200"}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-medium",
                    children: pc.name
                }, void 0, false, {
                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                    lineNumber: 1661,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-gray-500 mt-0.5",
                    children: [
                        pc.nijRating,
                        " · ",
                        pc.slots ?? 0,
                        " rig slots · ",
                        pc.weight.toFixed(1),
                        " kg",
                        pc.vendor ? ` · ${pc.vendor}${pc.vendorRank ? " R" + pc.vendorRank : ""}` : ""
                    ]
                }, void 0, true, {
                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                    lineNumber: 1662,
                    columnNumber: 9
                }, this)
            ]
        }, pc.id, true, {
            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
            lineNumber: 1655,
            columnNumber: 7
        }, this);
    };
    const groups = [
        {
            label: "Tactical Rigs",
            items: filteredRigs
        },
        {
            label: "Plate Carriers",
            items: filteredPCs,
            disabledBanner: pcBanner
        }
    ];
    const activeSlots = selectedPC ? selectedPC.slots ?? 0 : selectedRig?.slots ?? 0;
    const currentLabel = selectedPC?.name ?? selectedRig?.name;
    const rigContentsWeight = rigSlotItems.filter((v)=>v && !v.startsWith("__occ:")).reduce((sum, id)=>{
        const c = consumables.find((x)=>x.id === id);
        if (c) return sum + c.weight;
        const m = medical.find((x)=>x.id === id);
        if (m) return sum + m.weight;
        const ct = containers.find((x)=>x.id === id);
        if (ct) return sum + ct.weight;
        return sum;
    }, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-500 uppercase tracking-widest font-semibold",
                        children: "Tactical Rig"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1690,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 h-px bg-gray-800"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1691,
                        columnNumber: 9
                    }, this),
                    (selectedRig || selectedPC) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            onSelectRig(null);
                            if (selectedPC) onSelectArmor(null);
                            onResetRigSlots();
                        },
                        className: "text-xs text-gray-600 hover:text-gray-300 transition-colors",
                        children: "clear"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1693,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1689,
                columnNumber: 7
            }, this),
            selectedPC && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemSummaryCard, {
                image: selectedPC.image,
                name: selectedPC.name,
                dimImage: true,
                badge: "Plate Carrier",
                badgeClass: "bg-amber-950/60 text-amber-400 border border-amber-800/50",
                subLine: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-600 italic",
                    children: [
                        "Equipped via Body Armor slot · ",
                        selectedPC.slots ?? 0,
                        " slots"
                    ]
                }, void 0, true, {
                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                    lineNumber: 1706,
                    columnNumber: 20
                }, this)
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1702,
                columnNumber: 9
            }, this),
            selectedRig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemSummaryCard, {
                image: selectedRig.image,
                name: selectedRig.name,
                dimImage: true,
                subLine: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        selectedRig.slots,
                        " slots · ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono",
                            children: [
                                selectedRig.weight.toFixed(2),
                                " kg"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 1712,
                            columnNumber: 50
                        }, this),
                        selectedRig.vendor ? ` · ${selectedRig.vendor}${selectedRig.vendorRank ? " R" + selectedRig.vendorRank : ""}` : ""
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1710,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GroupedDropdown, {
                groups: groups,
                selectedId: selectedRigId,
                onSelect: (item)=>{
                    if (rigs.find((r)=>r.id === item.id)) handleSelectRig(item);
                    else handleSelectPC(item);
                },
                placeholder: currentLabel ? `Change rig...` : "Search rigs & plate carriers...",
                searchQuery: query,
                onSearchChange: setQuery,
                renderItem: (item, isSelected)=>rigs.find((r)=>r.id === item.id) ? renderRigItem(item, isSelected) : renderPCItem(item, isSelected),
                open: open,
                onOpen: ()=>setOpen(true),
                containerRef: ref
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1718,
                columnNumber: 7
            }, this),
            activeSlots > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mt-1 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-600 uppercase tracking-widest font-medium",
                                children: "Rig Contents"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1738,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 h-px bg-gray-800"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1739,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-600",
                                children: [
                                    activeSlots,
                                    " slots"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1740,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1737,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1.5",
                        children: Array.from({
                            length: activeSlots
                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RigSlotRow, {
                                index: i,
                                slotValue: rigSlotItems[i] ?? null,
                                totalSlots: activeSlots,
                                consumables: consumables,
                                medical: medical,
                                containers: containers,
                                keys: keyItems,
                                contents: containerContents[`rig:${i}`] ?? [],
                                onSelect: (id, conts)=>onRigSlotChange(i, id, conts, medical),
                                onContentsChange: (si, id)=>onContainerContentsChange(`rig:${i}`, si, id)
                            }, i, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1744,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1742,
                        columnNumber: 11
                    }, this),
                    rigContentsWeight > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-600 text-right mt-1",
                        children: [
                            "Contents: ",
                            rigContentsWeight.toFixed(3),
                            " kg"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1754,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1736,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 1688,
        columnNumber: 5
    }, this);
}
// ─── Pocket Slot Editor ───────────────────────────────────────────────────────
function PocketSlotEditor({ pocketIndex, currentItemId, onSelect, containerContents, onContainerContentsChange, consumables, medical, containers, keyItems }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const h = (e)=>{
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", h);
        return ()=>document.removeEventListener("mousedown", h);
    }, []);
    // Pockets only hold 1x1 items
    const pocketContainers = containers.filter((c)=>c.rigSlots === 1);
    const pocketMedical = medical.filter((m)=>m.gridSize === "1x1");
    const findFilled = (id)=>{
        if (!id) return null;
        return consumables.find((c)=>c.id === id) ?? pocketMedical.find((m)=>m.id === id) ?? pocketContainers.find((c)=>c.id === id) ?? null;
    };
    const filled = findFilled(currentItemId);
    const filledContainer = currentItemId ? pocketContainers.find((c)=>c.id === currentItemId) ?? null : null;
    const grenades = consumables.filter((c)=>c.category === "Grenade" && c.name.toLowerCase().includes(query.toLowerCase()));
    const ammo = consumables.filter((c)=>c.category === "Ammo" && c.name.toLowerCase().includes(query.toLowerCase()));
    const medItems = pocketMedical.filter((m)=>m.name.toLowerCase().includes(query.toLowerCase()));
    const contItems = pocketContainers.filter((c)=>c.name.toLowerCase().includes(query.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-500 uppercase tracking-widest font-semibold",
                        children: [
                            "Pocket ",
                            pocketIndex + 1
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1808,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 h-px bg-gray-800"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1809,
                        columnNumber: 9
                    }, this),
                    filled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSelect(null),
                        className: "text-xs text-gray-600 hover:text-gray-300 transition-colors",
                        children: "clear"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1810,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1807,
                columnNumber: 7
            }, this),
            filled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border border-gray-800 rounded-lg p-3 bg-gray-950 flex items-center gap-3",
                children: [
                    "image" in filled && filled.image ? /* eslint-disable-next-line @next/next/no-img-element */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: filled.image,
                        alt: filled.name,
                        className: "w-14 h-10 object-contain shrink-0",
                        style: {
                            filter: "brightness(0.85) saturate(0.7) sepia(0.2)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1816,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-14 h-10 shrink-0 flex items-center justify-center text-xl opacity-20",
                        children: "📦"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1819,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-semibold text-sm",
                                children: filled.name
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1822,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mt-0.5",
                                children: [
                                    "weight" in filled ? `${filled.weight.toFixed(3)} kg` : "",
                                    "category" in filled ? ` · ${"category" in filled ? filled.category : ""}` : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1823,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1821,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1813,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: ref,
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 border border-gray-700 rounded-lg px-3 py-2 cursor-text bg-gray-950 hover:border-gray-600 transition-colors",
                        onClick: ()=>setOpen(true),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600 text-sm shrink-0",
                                children: "🔍"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1833,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "flex-1 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-600",
                                placeholder: filled ? "Change item..." : "Search items (1×1 only)...",
                                value: query,
                                onChange: (e)=>{
                                    setQuery(e.target.value);
                                    setOpen(true);
                                },
                                onFocus: ()=>setOpen(true)
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1834,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1831,
                        columnNumber: 9
                    }, this),
                    open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-0 right-0 mt-1 z-40 bg-gray-950 border border-gray-700 rounded-lg shadow-xl max-h-72 overflow-y-auto",
                        children: [
                            grenades.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1",
                                        children: "Grenades"
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1843,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: grenades.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    onSelect(g.id);
                                                    setOpen(false);
                                                    setQuery("");
                                                },
                                                className: `w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${currentItemId === g.id ? "bg-amber-950/30 text-amber-200" : "hover:bg-gray-900 text-gray-300"}`,
                                                children: [
                                                    g.name,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-xs text-gray-600",
                                                        children: [
                                                            g.weight.toFixed(3),
                                                            " kg"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 1848,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, g.id, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 1846,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1844,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1842,
                                columnNumber: 15
                            }, this),
                            medItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1",
                                        children: "Medical"
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1856,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: medItems.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    onSelect(m.id);
                                                    setOpen(false);
                                                    setQuery("");
                                                },
                                                className: `w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${currentItemId === m.id ? "bg-amber-950/30 text-amber-200" : "hover:bg-gray-900 text-gray-300"}`,
                                                children: [
                                                    m.name,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-xs text-gray-600",
                                                        children: [
                                                            m.category,
                                                            " · ",
                                                            m.weight.toFixed(3),
                                                            " kg"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 1861,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, m.id, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 1859,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1857,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1855,
                                columnNumber: 15
                            }, this),
                            ammo.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1",
                                        children: "Ammo"
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1869,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: ammo.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    onSelect(a.id);
                                                    setOpen(false);
                                                    setQuery("");
                                                },
                                                className: `w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${currentItemId === a.id ? "bg-amber-950/30 text-amber-200" : "hover:bg-gray-900 text-gray-300"}`,
                                                children: [
                                                    a.name,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-xs text-gray-600",
                                                        children: [
                                                            a.weight.toFixed(3),
                                                            " kg"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 1874,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, a.id, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 1872,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1870,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1868,
                                columnNumber: 15
                            }, this),
                            contItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1",
                                        children: "Containers (1×1)"
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1882,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: contItems.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    onSelect(c.id);
                                                    setOpen(false);
                                                    setQuery("");
                                                },
                                                className: `w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${currentItemId === c.id ? "bg-amber-950/30 text-amber-200" : "hover:bg-gray-900 text-gray-300"}`,
                                                children: [
                                                    c.name,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-xs text-gray-600",
                                                        children: [
                                                            c.gridSize,
                                                            " · ",
                                                            c.weight.toFixed(3),
                                                            " kg"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 1887,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, c.id, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 1885,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1883,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1881,
                                columnNumber: 15
                            }, this),
                            grenades.length === 0 && medItems.length === 0 && ammo.length === 0 && contItems.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 py-4 text-sm text-gray-600 text-center",
                                children: "No results"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1894,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1840,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1830,
                columnNumber: 7
            }, this),
            filledContainer && filledContainer.holds !== "valuables" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ContainerSubPicker, {
                container: filledContainer,
                contents: containerContents,
                onContentsChange: onContainerContentsChange,
                medical: medical,
                keys: keyItems
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1900,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 1806,
        columnNumber: 5
    }, this);
}
// ─── Belt Slot Editor ─────────────────────────────────────────────────────────
function BeltSlotEditor({ belts, selectedBeltId, onSelectBelt, slotItems, onSlotChange, containerContents, onContainerContentsChange, consumables, medical, containers, keyItems, vendorRanks }) {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectedBelt = belts.find((b)=>b.id === selectedBeltId) ?? null;
    const activeSlots = selectedBelt?.slots ?? 0;
    const filtered = belts.filter((b)=>b.name.toLowerCase().includes(query.toLowerCase()));
    const civilian = filtered.filter((b)=>b.category === "Civilian");
    const military = filtered.filter((b)=>b.category === "Military");
    const isAvailable = (b)=>b.lootOnly || !b.vendor || !b.vendorRank || (vendorRanks[b.vendor] ?? 0) >= b.vendorRank;
    const beltContentsWeight = slotItems.filter((v)=>v && !v.startsWith("__occ:")).reduce((sum, id)=>{
        const c = consumables.find((x)=>x.id === id);
        if (c) return sum + c.weight;
        const m = medical.find((x)=>x.id === id);
        if (m) return sum + m.weight;
        const ct = containers.find((x)=>x.id === id);
        if (ct) return sum + ct.weight;
        return sum;
    }, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 flex-1 min-h-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-500 uppercase tracking-widest font-semibold",
                        children: "Belt"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1956,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 h-px bg-gray-800"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1957,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1955,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                ref: containerRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setOpen((o)=>!o),
                        className: "w-full flex items-center gap-3 px-3 py-2 bg-gray-900/60 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors text-left",
                        children: [
                            selectedBelt?.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: selectedBelt.image,
                                alt: "",
                                className: "w-12 h-10 object-contain shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1967,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-10 shrink-0 flex items-center justify-center text-2xl opacity-20",
                                children: "🎽"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1968,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-200 truncate",
                                        children: selectedBelt?.name ?? "Select belt..."
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1970,
                                        columnNumber: 13
                                    }, this),
                                    selectedBelt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                            selectedBelt.gridSize,
                                            " · ",
                                            selectedBelt.weight.toFixed(3),
                                            " kg"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1972,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1969,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600 text-xs shrink-0",
                                children: open ? "▲" : "▼"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1975,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1962,
                        columnNumber: 9
                    }, this),
                    open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute z-50 left-0 right-0 top-full mt-1 bg-gray-950 border border-gray-800 rounded-lg shadow-xl overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2 border-b border-gray-800",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    autoFocus: true,
                                    className: "w-full bg-transparent text-sm text-gray-200 outline-none placeholder-gray-600",
                                    placeholder: "Search belts...",
                                    value: query,
                                    onChange: (e)=>setQuery(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 1981,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1980,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-h-64 overflow-y-auto",
                                children: [
                                    selectedBeltId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "w-full text-left px-3 py-2 text-xs text-gray-600 hover:text-gray-300 hover:bg-gray-900",
                                        onClick: ()=>{
                                            onSelectBelt(null);
                                            setOpen(false);
                                        },
                                        children: "Clear selection"
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 1991,
                                        columnNumber: 17
                                    }, this),
                                    [
                                        {
                                            label: "Civilian",
                                            items: civilian
                                        },
                                        {
                                            label: "Military",
                                            items: military
                                        }
                                    ].map((group)=>group.items.length === 0 ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-3 py-1 text-xs text-gray-600 uppercase tracking-widest font-semibold bg-gray-900/40",
                                                    children: group.label
                                                }, void 0, false, {
                                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                    lineNumber: 1999,
                                                    columnNumber: 21
                                                }, this),
                                                group.items.map((b)=>{
                                                    const avail = isAvailable(b);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "w-full flex items-center gap-3 px-3 py-2 text-left transition-colors " + (b.id === selectedBeltId ? "bg-amber-900/30" : "hover:bg-gray-900/60") + (!avail ? " opacity-40" : ""),
                                                        onClick: ()=>{
                                                            onSelectBelt(b.id);
                                                            setOpen(false);
                                                            setQuery("");
                                                        },
                                                        children: [
                                                            b.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: b.image,
                                                                alt: "",
                                                                className: "w-10 h-8 object-contain shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                                lineNumber: 2009,
                                                                columnNumber: 31
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-10 h-8 shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                                lineNumber: 2010,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-200 truncate",
                                                                        children: b.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                                        lineNumber: 2012,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-gray-500",
                                                                        children: [
                                                                            b.gridSize,
                                                                            " · ",
                                                                            b.weight.toFixed(3),
                                                                            " kg",
                                                                            b.vendor ? ` · ${b.vendor}${b.vendorRank ? ` R.${b.vendorRank}` : ""}` : " · Loot"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                                        lineNumber: 2013,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                                lineNumber: 2011,
                                                                columnNumber: 27
                                                            }, this),
                                                            !avail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-red-700 shrink-0",
                                                                children: "locked"
                                                            }, void 0, false, {
                                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                                lineNumber: 2015,
                                                                columnNumber: 38
                                                            }, this)
                                                        ]
                                                    }, b.id, true, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 2003,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            ]
                                        }, group.label, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 1998,
                                            columnNumber: 19
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 1989,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 1979,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 1961,
                columnNumber: 7
            }, this),
            activeSlots > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-600 uppercase tracking-widest",
                                children: "Belt Slots"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 2031,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-600",
                                children: [
                                    activeSlots,
                                    " slot",
                                    activeSlots > 1 ? "s" : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 2032,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 2030,
                        columnNumber: 11
                    }, this),
                    Array.from({
                        length: activeSlots
                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RigSlotRow, {
                            index: i,
                            slotValue: slotItems[i] ?? null,
                            totalSlots: activeSlots,
                            consumables: consumables,
                            medical: medical,
                            containers: containers,
                            keys: keyItems,
                            onSelect: (id)=>onSlotChange(i, id ?? null),
                            contents: containerContents[`belt:${i}`] ?? [],
                            onContentsChange: (si, id)=>onContainerContentsChange(`belt:${i}`, si, id)
                        }, i, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 2035,
                            columnNumber: 13
                        }, this)),
                    beltContentsWeight > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-600 text-right mt-1",
                        children: [
                            "Contents: ",
                            beltContentsWeight.toFixed(3),
                            " kg"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 2050,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 2029,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 1953,
        columnNumber: 5
    }, this);
}
function WeaponBuilderShell({ weapons, allAttachments, gadgets, headwear, armorItems, rigs, consumables, medicalItems, containerItems, keyItems, beltItems }) {
    const [activePMCSlot, setActivePMCSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("primary");
    const [buildName, setBuildName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedWeapons, setSelectedWeapons] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        primary: null,
        sidearm: null
    });
    const [selectedGadgets, setSelectedGadgets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        binos: null
    });
    const [selectedHeadwear, setSelectedHeadwear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedArmorId, setSelectedArmorId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedRigId, setSelectedRigId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rigSlotItems, setRigSlotItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const handleRigSlotChange = (slotIndex, itemId, allContainers, allMedical)=>{
        setRigSlotItems((prev)=>{
            const next = [
                ...prev
            ];
            // Determine slot count FIRST so we can extend the array far enough
            const cont = itemId ? allContainers?.find((c)=>c.id === itemId) : null;
            const med = itemId ? allMedical?.find((m)=>m.id === itemId) : null;
            const slots = cont ? cont.rigSlots : med?.gridSize === "1x2" ? 2 : 1;
            // Extend to cover the item's primary slot plus any occupied follow-on slots
            while(next.length < slotIndex + slots)next.push(null);
            // Clear old sentinel slots that this slotIndex previously set
            for(let j = slotIndex + 1; j < next.length; j++){
                if (next[j] === `__occ:${slotIndex}`) next[j] = null;
            }
            // Clear container contents for this slot
            setContainerContents((cc)=>{
                const n = {
                    ...cc
                };
                delete n[`rig:${slotIndex}`];
                return n;
            });
            next[slotIndex] = itemId;
            // Mark follow-on slots as occupied
            if (itemId && slots > 1) {
                for(let j = 1; j < slots; j++){
                    next[slotIndex + j] = `__occ:${slotIndex}`;
                }
            }
            return next;
        });
    };
    // Pocket slot items (4 pockets, each 1 item)
    const [pocketItems, setPocketItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        null,
        null,
        null,
        null
    ]);
    // Container sub-items: key = "rig:<slotIndex>" or "pocket:<slotIndex>", value = sub-item IDs array
    const [containerContents, setContainerContents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const handleContainerContentsChange = (key, subIndex, itemId)=>{
        setContainerContents((prev)=>{
            const arr = [
                ...prev[key] ?? []
            ];
            while(arr.length <= subIndex)arr.push(null);
            arr[subIndex] = itemId;
            return {
                ...prev,
                [key]: arr
            };
        });
    };
    // Belt
    const [selectedBeltId, setSelectedBeltId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [beltSlotItems, setBeltSlotItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const handleBeltSlotChange = (slotIndex, itemId)=>{
        setBeltSlotItems((prev)=>{
            const next = [
                ...prev
            ];
            while(next.length <= slotIndex)next.push(null);
            const cont = itemId ? containerItems.find((c)=>c.id === itemId) : null;
            const med = itemId ? medicalItems.find((m)=>m.id === itemId) : null;
            const slots = cont ? cont.rigSlots : med?.gridSize === "1x2" ? 2 : 1;
            while(next.length < slotIndex + slots)next.push(null);
            for(let j = slotIndex + 1; j < next.length; j++){
                if (next[j] === `__occ:${slotIndex}`) next[j] = null;
            }
            setContainerContents((cc)=>{
                const n = {
                    ...cc
                };
                delete n[`belt:${slotIndex}`];
                return n;
            });
            next[slotIndex] = itemId;
            if (itemId && slots > 1) {
                for(let j = 1; j < slots; j++)next[slotIndex + j] = `__occ:${slotIndex}`;
            }
            return next;
        });
    };
    const [vendorRanks, setVendorRanks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        Gunny: 1,
        Artisan: 1,
        Turncoat: 1,
        Banshee: 1,
        Vulture: 1,
        Handshake: 1
    });
    const [slotWeights, setSlotWeights] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const handleSlotClick = (slotId, type)=>{
        if (type === "locked") return;
        setActivePMCSlot((prev)=>prev === slotId ? null : slotId);
    };
    const activeSlot = DOLL_GRID_SLOTS.find((s)=>s.id === activePMCSlot) ?? null;
    const isWeaponSlot = activeSlot?.type === "weapon";
    const isGadgetSlot = activeSlot?.type === "gadget";
    const isHeadwearSlot = activeSlot?.type === "headwear";
    const isArmorOrRigSlot = activeSlot?.type === "armor" || activeSlot?.type === "rig";
    const isPocketSlot = activeSlot?.type === "pocket";
    const isBeltSlot = activeSlot?.type === "belt";
    const primaryWeapons = weapons.filter((w)=>w.type !== "Pistol");
    const sidearmWeapons = weapons.filter((w)=>w.type === "Pistol");
    const slotWeapons = activePMCSlot === "sidearm" ? sidearmWeapons : primaryWeapons;
    const getWeaponForSlot = (slotId)=>{
        const weapId = selectedWeapons[slotId];
        return weapId ? weapons.find((w)=>w.id === weapId) : null;
    };
    const getGadgetForSlot = (slotId)=>{
        const gadgetId = selectedGadgets[slotId];
        return gadgetId ? gadgets.find((g)=>g.id === gadgetId) : null;
    };
    const dollW = DOLL_W;
    const dollH = DOLL_H;
    // Weight breakdown data
    const primaryWeapon = getWeaponForSlot("primary");
    const sidearmWeapon = getWeaponForSlot("sidearm");
    const headwearItem = selectedHeadwear ? headwear.find((h)=>h.id === selectedHeadwear) ?? null : null;
    const gadgetItem = getGadgetForSlot("binos");
    const weightRows = [
        {
            id: "headwear",
            label: "Headwear",
            weight: headwearItem?.baseStats.weight ?? null
        },
        {
            id: "primary",
            label: "Primary",
            weight: primaryWeapon ? slotWeights["primary"] ?? primaryWeapon.baseStats.weight : null
        },
        {
            id: "sidearm",
            label: "Sidearm",
            weight: sidearmWeapon ? slotWeights["sidearm"] ?? sidearmWeapon.baseStats.weight : null
        },
        {
            id: "gadgets",
            label: "Gadgets",
            weight: gadgetItem?.baseStats.weight ?? null
        },
        {
            id: "armor",
            label: "Body Armor",
            weight: (()=>{
                const armorData = armorItems.find((a)=>a.id === selectedArmorId);
                return armorData?.weight ?? null;
            })()
        },
        {
            id: "tacticalRig",
            label: "Tactical Rig",
            weight: (()=>{
                if (selectedArmorId && armorItems.find((a)=>a.id === selectedArmorId && a.type === "Plate Carrier")) return null;
                const rigData = rigs.find((r)=>r.id === selectedRigId);
                if (!rigData) return null;
                const contentsWeight = rigSlotItems.filter((v)=>v && !v.startsWith("__occ:")).reduce((sum, id)=>{
                    const c = consumables.find((x)=>x.id === id);
                    if (c) return sum + c.weight;
                    const m = medicalItems.find((x)=>x.id === id);
                    if (m) return sum + m.weight;
                    const ct = containerItems.find((x)=>x.id === id);
                    if (ct) return sum + ct.weight;
                    return sum;
                }, 0);
                return rigData.weight + contentsWeight;
            })()
        },
        {
            id: "backpack",
            label: "Backpack",
            weight: null
        },
        {
            id: "belt",
            label: "Belt",
            weight: (()=>{
                const beltData = beltItems.find((b)=>b.id === selectedBeltId);
                if (!beltData) return null;
                const contentsWeight = beltSlotItems.filter((v)=>v && !v.startsWith("__occ:")).reduce((sum, id)=>{
                    const c = consumables.find((x)=>x.id === id);
                    if (c) return sum + c.weight;
                    const m = medicalItems.find((x)=>x.id === id);
                    if (m) return sum + m.weight;
                    const ct = containerItems.find((x)=>x.id === id);
                    if (ct) return sum + ct.weight;
                    return sum;
                }, 0);
                return beltData.weight + contentsWeight;
            })()
        }
    ];
    const pocketWeightRows = [
        0,
        1,
        2,
        3
    ].map((i)=>{
        const itemId = pocketItems[i];
        if (!itemId) return {
            id: `pocket${i + 1}`,
            label: `Pocket ${i + 1}`,
            weight: null
        };
        const cons = consumables.find((x)=>x.id === itemId);
        const med = medicalItems.find((x)=>x.id === itemId);
        const cont = containerItems.find((x)=>x.id === itemId);
        const baseW = cons?.weight ?? med?.weight ?? cont?.weight ?? 0;
        const subItems = containerContents[`pocket:${i}`] ?? [];
        const subW = subItems.reduce((sum, sid)=>{
            if (!sid) return sum;
            const sm = medicalItems.find((x)=>x.id === sid);
            const sc = consumables.find((x)=>x.id === sid);
            const sct = containerItems.find((x)=>x.id === sid);
            return sum + (sm?.weight ?? sc?.weight ?? sct?.weight ?? 0);
        }, 0);
        return {
            id: `pocket${i + 1}`,
            label: `Pocket ${i + 1}`,
            weight: baseW + subW
        };
    });
    const allWeightRows = [
        ...weightRows,
        ...pocketWeightRows
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 pb-3 border-b border-gray-800",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "flex-1 bg-transparent border-b border-gray-700 focus:border-amber-500 outline-none text-gray-100 text-lg font-medium py-1 placeholder-gray-700 transition-colors",
                        placeholder: "Name your build...",
                        value: buildName,
                        onChange: (e)=>setBuildName(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 2248,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "shrink-0 text-xs text-gray-500 hover:text-gray-200 border border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded-lg transition-colors",
                        children: "Save Build"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 2254,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 2247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                style: {
                                    width: dollW,
                                    height: dollH
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 pointer-events-none",
                                        style: {
                                            zIndex: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/PMCSILHOUETTE.png",
                                            alt: "",
                                            className: "w-full h-full",
                                            style: {
                                                objectFit: "contain",
                                                objectPosition: "center",
                                                opacity: 0.28
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 2274,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 2269,
                                        columnNumber: 13
                                    }, this),
                                    DOLL_GRID_SLOTS.map((slot)=>{
                                        const w = slot.type === "weapon" ? getWeaponForSlot(slot.id) : null;
                                        const hw = slot.type === "headwear" ? headwear.find((h)=>h.id === selectedHeadwear) ?? null : null;
                                        const g = slot.type === "gadget" ? getGadgetForSlot(slot.id) : null;
                                        const armorDoll = slot.type === "armor" ? armorItems.find((a)=>a.id === selectedArmorId) ?? null : null;
                                        const rigDoll = slot.type === "rig" ? rigs.find((r)=>r.id === selectedRigId) ?? (selectedRigId ? armorItems.find((a)=>a.id === selectedRigId) : null) ?? null : null;
                                        const pocketIdx = slot.type === "pocket" ? parseInt(slot.id.replace("pocket", "")) - 1 : -1;
                                        const pocketItem = pocketIdx >= 0 ? consumables.find((c)=>c.id === pocketItems[pocketIdx]) ?? medicalItems.find((m)=>m.id === pocketItems[pocketIdx]) ?? containerItems.find((c)=>c.id === pocketItems[pocketIdx]) ?? null : null;
                                        const beltDoll = slot.type === "belt" ? beltItems.find((b)=>b.id === selectedBeltId) ?? null : null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                left: slot.left,
                                                top: slot.top,
                                                zIndex: 1
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SlotBox, {
                                                slot: slot,
                                                isActive: activePMCSlot === slot.id,
                                                hasContent: !!(w || hw || g || armorDoll || rigDoll || pocketItem || beltDoll),
                                                contentLabel: w?.name ?? hw?.name ?? g?.name ?? armorDoll?.name ?? rigDoll?.name ?? pocketItem?.name ?? beltDoll?.name,
                                                contentSubLabel: w?.caliber ?? hw?.armorLevel ?? hw?.subtype ?? g?.type ?? armorDoll?.nijRating ?? beltDoll?.gridSize ?? undefined,
                                                contentImage: w?.image ?? hw?.image ?? g?.image ?? armorDoll?.image ?? rigDoll?.image ?? beltDoll?.image ?? (pocketItem && "image" in pocketItem ? pocketItem.image ?? undefined : undefined),
                                                onClick: ()=>handleSlotClick(slot.id, slot.type)
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 2311,
                                                columnNumber: 19
                                            }, this)
                                        }, slot.id, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 2302,
                                            columnNumber: 17
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 2264,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-4 mt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-3 h-3 rounded ring-1 ring-amber-500 bg-amber-500/10"
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 2329,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-600",
                                                children: "active"
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 2330,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 2328,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-3 h-3 rounded ring-1 ring-gray-900 bg-gray-950 opacity-50"
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 2333,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-600",
                                                children: "locked"
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 2334,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 2332,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 2327,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 2263,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px bg-gray-800 self-stretch shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 2340,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col min-w-0",
                        style: {
                            minHeight: dollH
                        },
                        children: isWeaponSlot && activePMCSlot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VendorRanks, {
                                    ranks: vendorRanks,
                                    setRanks: setVendorRanks
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2346,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WeaponSlotEditor, {
                                    slotLabel: activeSlot.label,
                                    weapons: slotWeapons,
                                    selectedWeaponId: activePMCSlot === "sidearm" ? selectedWeapons.sidearm : selectedWeapons.primary,
                                    onSelectWeapon: (id)=>setSelectedWeapons((prev)=>({
                                                ...prev,
                                                [activePMCSlot === "sidearm" ? "sidearm" : "primary"]: id
                                            })),
                                    allAttachments: allAttachments,
                                    vendorRanks: vendorRanks,
                                    onWeightUpdate: (w)=>setSlotWeights((prev)=>({
                                                ...prev,
                                                [activePMCSlot]: w
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2347,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : isGadgetSlot && activePMCSlot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VendorRanks, {
                                    ranks: vendorRanks,
                                    setRanks: setVendorRanks
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2362,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-600 uppercase tracking-widest font-medium mb-3",
                                            children: activeSlot?.label
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 2364,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GadgetSlotEditor, {
                                            gadgets: gadgets,
                                            selectedGadgetId: selectedGadgets[activePMCSlot] ?? null,
                                            onSelectGadget: (id)=>setSelectedGadgets((prev)=>({
                                                        ...prev,
                                                        [activePMCSlot]: id
                                                    })),
                                            vendorRanks: vendorRanks
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 2367,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2363,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : isHeadwearSlot && activePMCSlot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VendorRanks, {
                                    ranks: vendorRanks,
                                    setRanks: setVendorRanks
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2380,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 flex flex-col flex-1 min-h-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-500 uppercase tracking-widest font-semibold",
                                                    children: "Headwear"
                                                }, void 0, false, {
                                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                    lineNumber: 2383,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 h-px bg-gray-800"
                                                }, void 0, false, {
                                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                    lineNumber: 2384,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 2382,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadwearSlotEditor, {
                                            headwear: headwear,
                                            selectedId: selectedHeadwear,
                                            onSelect: setSelectedHeadwear,
                                            vendorRanks: vendorRanks
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 2386,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2381,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : activePMCSlot === "armor" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VendorRanks, {
                                    ranks: vendorRanks,
                                    setRanks: setVendorRanks
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2396,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 flex flex-col flex-1 min-h-0 overflow-y-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ArmorSlotEditor, {
                                        armorItems: armorItems,
                                        rigs: rigs,
                                        selectedArmorId: selectedArmorId,
                                        selectedRigId: selectedRigId,
                                        onSelectArmor: setSelectedArmorId,
                                        onSelectRig: setSelectedRigId,
                                        onResetRigSlots: ()=>setRigSlotItems([]),
                                        vendorRanks: vendorRanks
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 2398,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2397,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : activePMCSlot === "tacticalRig" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VendorRanks, {
                                    ranks: vendorRanks,
                                    setRanks: setVendorRanks
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2409,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 flex flex-col flex-1 min-h-0 overflow-y-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RigSlotEditor, {
                                        armorItems: armorItems,
                                        rigs: rigs,
                                        consumables: consumables,
                                        medical: medicalItems,
                                        containers: containerItems,
                                        keyItems: keyItems,
                                        selectedArmorId: selectedArmorId,
                                        selectedRigId: selectedRigId,
                                        onSelectArmor: setSelectedArmorId,
                                        onSelectRig: setSelectedRigId,
                                        rigSlotItems: rigSlotItems,
                                        onRigSlotChange: handleRigSlotChange,
                                        containerContents: containerContents,
                                        onContainerContentsChange: handleContainerContentsChange,
                                        onResetRigSlots: ()=>setRigSlotItems([]),
                                        vendorRanks: vendorRanks
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 2411,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2410,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : isBeltSlot && activePMCSlot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VendorRanks, {
                                    ranks: vendorRanks,
                                    setRanks: setVendorRanks
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2428,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 flex flex-col flex-1 min-h-0 overflow-y-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BeltSlotEditor, {
                                        belts: beltItems,
                                        selectedBeltId: selectedBeltId,
                                        onSelectBelt: (id)=>{
                                            setSelectedBeltId(id);
                                            setBeltSlotItems([]);
                                        },
                                        slotItems: beltSlotItems,
                                        onSlotChange: handleBeltSlotChange,
                                        containerContents: containerContents,
                                        onContainerContentsChange: handleContainerContentsChange,
                                        consumables: consumables,
                                        medical: medicalItems,
                                        containers: containerItems,
                                        keyItems: keyItems,
                                        vendorRanks: vendorRanks
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 2430,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2429,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : isPocketSlot && activePMCSlot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex flex-col flex-1 min-h-0 overflow-y-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PocketSlotEditor, {
                                    pocketIndex: parseInt(activePMCSlot.replace("pocket", "")) - 1,
                                    currentItemId: pocketItems[parseInt(activePMCSlot.replace("pocket", "")) - 1] ?? null,
                                    onSelect: (id)=>setPocketItems((prev)=>{
                                            const n = [
                                                ...prev
                                            ];
                                            while(n.length < 4)n.push(null);
                                            n[parseInt(activePMCSlot.replace("pocket", "")) - 1] = id;
                                            return n;
                                        }),
                                    containerContents: containerContents[`pocket:${parseInt(activePMCSlot.replace("pocket", "")) - 1}`] ?? [],
                                    onContainerContentsChange: (si, id)=>handleContainerContentsChange(`pocket:${parseInt(activePMCSlot.replace("pocket", "")) - 1}`, si, id),
                                    consumables: consumables,
                                    medical: medicalItems,
                                    containers: containerItems,
                                    keyItems: keyItems
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2447,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 2446,
                                columnNumber: 15
                            }, this)
                        }, void 0, false) : activePMCSlot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex flex-col items-center justify-center text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 text-sm font-semibold",
                                    children: activeSlot?.label
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2465,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-700 text-xs mt-2",
                                    children: "Gear builder coming soon for this slot"
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2466,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 2464,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex flex-col items-center justify-center text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 text-sm font-medium",
                                    children: "Select a slot to get started"
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2470,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-700 text-xs mt-1",
                                    children: "Click any slot on the doll to begin"
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 2471,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 2469,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 2343,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px bg-gray-800 self-stretch shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 2477,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px bg-gray-800 self-stretch shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 2480,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-52 shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WeightBreakdown, {
                            rows: allWeightRows
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 2484,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 2483,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 2260,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 2245,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=killer6oose_GZW-Guides_app_components_WeaponBuilderShell_tsx_0q5-_3.._.js.map
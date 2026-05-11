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
    "Vulture"
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
// Standard slot dimensions
const SLOT_W = 120;
const SLOT_H = 100;
// PMC slot definitions - Equipment (worn on body, around figure)
// Tops evenly distribute 4 slots (100px each) across DOLL_H=700: gaps = (700-400)/5 = 60
const PMC_SLOTS = {
    left: [
        {
            id: "headwear",
            label: "Headwear",
            type: "gear",
            top: 60,
            width: SLOT_W,
            height: SLOT_H,
            placeholder: "/HeadgearWeaponPlaceholder.png"
        },
        {
            id: "eyewear",
            label: "Eyewear",
            type: "gear",
            top: 220,
            width: SLOT_W,
            height: SLOT_H,
            placeholder: "/EyewearPlaceholder.png"
        },
        {
            id: "facewear",
            label: "Facewear",
            type: "gear",
            top: 380,
            width: SLOT_W,
            height: SLOT_H,
            placeholder: undefined
        },
        {
            id: "primary",
            label: "Primary",
            type: "weapon",
            top: 540,
            width: SLOT_W * 2,
            height: SLOT_H,
            placeholder: "/PrimaryWeaponPlaceholder.png"
        }
    ],
    right: [
        {
            id: "headset",
            label: "Headset",
            type: "gear",
            top: 60,
            width: SLOT_W,
            height: SLOT_H,
            placeholder: "/HeadsetWeaponPlaceholder.png"
        },
        {
            id: "armor",
            label: "Body Armor",
            type: "gear",
            top: 220,
            width: SLOT_W,
            height: SLOT_H,
            placeholder: "/BodyArmorPlaceholder.png"
        },
        {
            id: "melee",
            label: "Melee",
            type: "locked",
            top: 380,
            width: SLOT_W,
            height: SLOT_H,
            placeholder: undefined
        },
        {
            id: "sidearm",
            label: "Sidearm",
            type: "weapon",
            top: 540,
            width: SLOT_W,
            height: SLOT_H,
            placeholder: "/SidearmWeaponPlaceholder.png"
        }
    ]
};
// Carriers panel slots (right column, next to figure)
const CARRIER_SLOTS = [
    {
        id: "tacticalRig",
        label: "Tactical Rig",
        type: "gear",
        width: SLOT_W,
        height: SLOT_H,
        placeholder: "/ChestRigPlaceholder.png"
    },
    {
        id: "backpack",
        label: "Backpack",
        type: "gear",
        width: SLOT_W,
        height: SLOT_H,
        placeholder: "/BackpackPlaceholder.png"
    },
    {
        id: "belt",
        label: "Belt",
        type: "gear",
        width: SLOT_W,
        height: SLOT_H,
        placeholder: "/BeltPlaceholder.png"
    },
    {
        id: "binos",
        label: "Gadgets",
        type: "gadget",
        width: SLOT_W,
        height: SLOT_H,
        placeholder: undefined
    },
    {
        id: "secureCase",
        label: "Secure Case",
        type: "gear",
        width: SLOT_W,
        height: SLOT_H,
        placeholder: "/SafePlaceholder.png"
    },
    {
        id: "pockets",
        label: "Pockets",
        type: "locked",
        width: SLOT_W,
        height: SLOT_H,
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
                lineNumber: 80,
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
                lineNumber: 83,
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
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 12 L2 10 L2 24 L8 22 Z",
                fill: "none",
                stroke: "#2a3a28",
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M30 22 L28 32 L34 32 L34 22",
                fill: "none",
                stroke: "#2a3a28",
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 92,
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
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 78,
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
                lineNumber: 105,
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
                lineNumber: 108,
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
                lineNumber: 111,
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
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M22 26 Q30 26 30 34 L30 38 L22 38",
                fill: "none",
                stroke: "#2a3a28",
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 117,
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
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 103,
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
                lineNumber: 132,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
            lineNumber: 131,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 130,
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
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "100%",
                        height: "100%",
                        fill: `url(#xh-${slot.id})`
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 right-0 h-0.5 bg-amber-500"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 189,
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
                                lineNumber: 199,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 197,
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
                                lineNumber: 209,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 207,
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
                                    lineNumber: 213,
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
                                    lineNumber: 218,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 212,
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
                                lineNumber: 231,
                                columnNumber: 17
                            }, this) : null
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 228,
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
                            lineNumber: 234,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            canClick && !isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 244,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 156,
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
                                    lineNumber: 277,
                                    columnNumber: 43
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 276,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 275,
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
                                    lineNumber: 288,
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
                                                lineNumber: 291,
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
                                                lineNumber: 296,
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
                                            lineNumber: 300,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 289,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 287,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-gray-600 italic",
                            children: allCompat.length === 0 ? "No data yet" : `${available.length} available`
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 306,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 280,
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
                                lineNumber: 313,
                                columnNumber: 13
                            }, this),
                            allCompat.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOpen((o)=>!o),
                                className: "text-gray-600 hover:text-gray-300 text-xs w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition-colors",
                                children: open ? "▲" : "▼"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 319,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 311,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 274,
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
                        lineNumber: 328,
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
                                    lineNumber: 337,
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
                                    lineNumber: 338,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, att.id, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 333,
                            columnNumber: 13
                        }, this)),
                    locked.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-1.5 text-xs text-gray-600 bg-gray-900 border-t border-gray-800",
                                children: "🔒 Rank locked"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 346,
                                columnNumber: 15
                            }, this),
                            locked.map((att)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 py-2 text-sm text-gray-700 border-b border-gray-800/30 last:border-0 opacity-60",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: att.name
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 351,
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
                                            lineNumber: 352,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, att.id, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 350,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 327,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 269,
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
                lineNumber: 373,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-white font-mono text-sm font-bold leading-tight",
                children: isAccuracy ? total.toFixed(2) : total > 0 ? `+${total.toFixed(1)}` : total.toFixed(1)
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 374,
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
                lineNumber: 377,
                columnNumber: 23
            }, this),
            delta === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs leading-tight opacity-0",
                children: "0"
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 378,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-gray-600 text-xs",
                children: label
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 379,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 372,
        columnNumber: 5
    }, this);
}
// ─── Weapon Slot Editor (right panel) ────────────────────────────────────────
function WeaponSlotEditor({ slotLabel, weapons, selectedWeaponId, onSelectWeapon, allAttachments, vendorRanks }) {
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
    const totalWeight = (weapon?.baseStats.weight ?? 0) + (statDeltas.weight ?? 0);
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
                        lineNumber: 420,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 h-px bg-gray-800"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 421,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 419,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                className: "w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-amber-500 transition-colors mb-4",
                value: selectedWeaponId ?? "",
                onChange: (e)=>handleSelectWeapon(e.target.value || null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        children: "- Select a weapon -"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 429,
                        columnNumber: 9
                    }, this),
                    weapons.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: w.id,
                            children: [
                                w.name,
                                "  ·  ",
                                w.caliber,
                                "  ·  ",
                                w.vendor,
                                " R",
                                w.vendorRank
                            ]
                        }, w.id, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 431,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 424,
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
                                        lineNumber: 445,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 443,
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
                                                        lineNumber: 456,
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
                                                        lineNumber: 457,
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
                                                                lineNumber: 461,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-700 text-xs",
                                                                children: "·"
                                                            }, void 0, false, {
                                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                                lineNumber: 462,
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
                                                                lineNumber: 463,
                                                                columnNumber: 23
                                                            }, this),
                                                            !weapon.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs bg-amber-900/30 text-amber-700 px-1.5 py-0.5 rounded",
                                                                children: "unverified"
                                                            }, void 0, false, {
                                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                                lineNumber: 465,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                        lineNumber: 460,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 455,
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
                                                        lineNumber: 470,
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
                                                        lineNumber: 471,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 469,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 454,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 453,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 440,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 439,
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
                                lineNumber: 479,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px self-stretch bg-gray-800 mx-0.5"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 480,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatChip, {
                                icon: STAT_ICONS.recoilControl,
                                label: "Recoil",
                                base: weapon.baseStats.recoilControl ?? 0,
                                delta: statDeltas.recoilControl ?? 0
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 481,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px self-stretch bg-gray-800 mx-0.5"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 482,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatChip, {
                                icon: STAT_ICONS.ergonomics,
                                label: "Ergo",
                                base: weapon.baseStats.ergonomics ?? 0,
                                delta: statDeltas.ergonomics ?? 0
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 483,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px self-stretch bg-gray-800 mx-0.5"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 484,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatChip, {
                                icon: STAT_ICONS.muzzleDeviceEfficiency,
                                label: "Muzz.",
                                base: weapon.baseStats.muzzleDeviceEfficiency ?? 0,
                                delta: statDeltas.muzzleDeviceEfficiency ?? 0
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 485,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px self-stretch bg-gray-800 mx-0.5"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 486,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatChip, {
                                icon: "⚖",
                                label: "kg",
                                base: weapon.baseStats.weight ?? 0,
                                delta: statDeltas.weight ?? 0
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 487,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 478,
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
                                        lineNumber: 499,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Edit Components"
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 500,
                                        columnNumber: 15
                                    }, this),
                                    filledCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-amber-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full",
                                        children: filledCount
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 502,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 498,
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
                                lineNumber: 507,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 490,
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
                                        lineNumber: 513,
                                        columnNumber: 72
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 512,
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
                                    lineNumber: 516,
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
                                            lineNumber: 524,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 523,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-2.5 flex flex-wrap gap-1.5",
                                        children: weapon.compatibleAmmo.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded",
                                                children: a
                                            }, a, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 528,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 526,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 522,
                                columnNumber: 17
                            }, this),
                            weapon.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-600 italic px-1 pt-2 border-t border-gray-900",
                                children: weapon.notes
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 534,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 511,
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
                            lineNumber: 542,
                            columnNumber: 40
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WeaponOutlineSVG, {}, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 542,
                            columnNumber: 63
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 541,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 text-sm",
                        children: "Select a weapon to begin"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 544,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-700 text-xs mt-1",
                        children: slotLabel === "Primary" ? "Assault rifles, DMRs, snipers, shotguns" : "Pistols"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 545,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 540,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 418,
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
                        lineNumber: 565,
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
                                                lineNumber: 570,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, v, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 569,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 567,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-700 text-xs",
                                children: open ? "▲" : "▼"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 574,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 566,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 563,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 border-t border-gray-800 bg-gray-950 grid grid-cols-2 sm:grid-cols-3 gap-3",
                children: VENDORS.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-300 text-sm",
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 581,
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
                                        lineNumber: 584,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 582,
                                columnNumber: 15
                            }, this)
                        ]
                    }, v, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 580,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 578,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 562,
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
                            lineNumber: 634,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-14 shrink-0 flex items-center justify-center text-3xl opacity-20",
                            children: "🔭"
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 639,
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
                                            lineNumber: 645,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs bg-gray-800 text-gray-400 px-1.5 rounded",
                                            children: selected.type
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 646,
                                            columnNumber: 17
                                        }, this),
                                        selected.upcoming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs bg-amber-950/60 text-amber-400 border border-amber-800/50 px-1.5 rounded",
                                            children: "upcoming"
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 648,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 644,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-xs text-gray-500",
                                    children: [
                                        selected.manufacturer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: selected.manufacturer
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 652,
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
                                            lineNumber: 654,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "italic",
                                            children: "vendor unknown"
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 655,
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
                                            lineNumber: 658,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "italic",
                                            children: "weight unknown"
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 659,
                                            columnNumber: 21
                                        }, this),
                                        selected.gridSize && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                selected.gridSize,
                                                " grid"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 661,
                                            columnNumber: 39
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 651,
                                    columnNumber: 15
                                }, this),
                                selected.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 text-xs mt-1.5 leading-snug line-clamp-2",
                                    children: selected.description
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 664,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 643,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onSelectGadget(null),
                            className: "text-gray-600 hover:text-gray-300 text-xs w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition-colors shrink-0",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 667,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-600 text-sm italic",
                    children: "No gadget selected"
                }, void 0, false, {
                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                    lineNumber: 673,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 629,
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
                                    lineNumber: 682,
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
                                                    lineNumber: 692,
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
                                                    lineNumber: 693,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, g.id, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 685,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 683,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, type, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 681,
                            columnNumber: 11
                        }, this)),
                    rankLocked.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1",
                                children: "🔒 Rank locked"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 706,
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
                                                lineNumber: 710,
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
                                                lineNumber: 711,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, g.id, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 709,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 707,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 705,
                        columnNumber: 11
                    }, this),
                    upcoming.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mb-1",
                                children: "Upcoming"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 721,
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
                                                    lineNumber: 726,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 725,
                                            columnNumber: 19
                                        }, this)
                                    }, g.id, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 724,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 722,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 720,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 678,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 627,
        columnNumber: 5
    }, this);
}
function WeaponBuilderShell({ weapons, allAttachments, gadgets }) {
    const [activePMCSlot, setActivePMCSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("primary");
    const [buildName, setBuildName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedWeapons, setSelectedWeapons] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        primary: null,
        sidearm: null
    });
    const [selectedGadgets, setSelectedGadgets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        binos: null
    });
    const [vendorRanks, setVendorRanks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        Gunny: 1,
        Artisan: 1,
        Turncoat: 1,
        Banshee: 1,
        Vulture: 1
    });
    const allSlots = [
        ...PMC_SLOTS.left,
        ...PMC_SLOTS.right,
        ...CARRIER_SLOTS
    ];
    const handleSlotClick = (slotId, type)=>{
        if (type === "locked") return;
        setActivePMCSlot((prev)=>prev === slotId ? null : slotId);
    };
    const activeSlot = allSlots.find((s)=>s.id === activePMCSlot) ?? null;
    const isWeaponSlot = activeSlot?.type === "weapon";
    const isGadgetSlot = activeSlot?.type === "gadget";
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
    const DOLL_W = 460;
    const DOLL_H = 700;
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
                        lineNumber: 791,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "shrink-0 text-xs text-gray-500 hover:text-gray-200 border border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded-lg transition-colors",
                        children: "Save Build"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 797,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 790,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4",
                style: {
                    minHeight: DOLL_H
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-600 uppercase tracking-widest font-medium mb-3 text-center",
                                children: "Equipment"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 807,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                style: {
                                    width: DOLL_W,
                                    height: DOLL_H
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 pointer-events-none overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/PMCSILHOUETTE.png",
                                            alt: "",
                                            className: "w-full h-full",
                                            style: {
                                                objectFit: "cover",
                                                objectPosition: "left top",
                                                opacity: 0.35
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 813,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 811,
                                        columnNumber: 13
                                    }, this),
                                    PMC_SLOTS.left.map((slot)=>{
                                        const w = slot.type === "weapon" ? getWeaponForSlot(slot.id) : null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute",
                                            style: {
                                                left: 8,
                                                top: slot.top
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SlotBox, {
                                                slot: slot,
                                                isActive: activePMCSlot === slot.id,
                                                hasContent: !!w,
                                                contentLabel: w?.name,
                                                contentSubLabel: w?.caliber,
                                                contentImage: w?.image,
                                                onClick: ()=>handleSlotClick(slot.id, slot.type)
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 826,
                                                columnNumber: 19
                                            }, this)
                                        }, slot.id, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 825,
                                            columnNumber: 17
                                        }, this);
                                    }),
                                    PMC_SLOTS.right.map((slot)=>{
                                        const w = slot.type === "weapon" ? getWeaponForSlot(slot.id) : null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute",
                                            style: {
                                                right: 8,
                                                top: slot.top
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SlotBox, {
                                                slot: slot,
                                                isActive: activePMCSlot === slot.id,
                                                hasContent: !!w,
                                                contentLabel: w?.name,
                                                contentSubLabel: w?.caliber,
                                                contentImage: w?.image,
                                                onClick: ()=>handleSlotClick(slot.id, slot.type)
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 844,
                                                columnNumber: 19
                                            }, this)
                                        }, slot.id, false, {
                                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                            lineNumber: 843,
                                            columnNumber: 17
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 808,
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
                                                lineNumber: 861,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-600",
                                                children: "active"
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 862,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 860,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-3 h-3 rounded ring-1 ring-gray-900 bg-gray-950 opacity-50"
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 865,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-600",
                                                children: "locked"
                                            }, void 0, false, {
                                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                                lineNumber: 866,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 864,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 859,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 806,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shrink-0 flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-600 uppercase tracking-widest font-medium mb-3 text-center",
                                children: "Carriers"
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 873,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col justify-between",
                                style: {
                                    height: DOLL_H
                                },
                                children: CARRIER_SLOTS.map((slot)=>{
                                    const g = slot.type === "gadget" ? getGadgetForSlot(slot.id) : null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SlotBox, {
                                        slot: slot,
                                        isActive: activePMCSlot === slot.id,
                                        hasContent: !!g,
                                        contentLabel: g?.name,
                                        contentSubLabel: g?.type,
                                        contentImage: g?.image ?? undefined,
                                        onClick: ()=>handleSlotClick(slot.id, slot.type)
                                    }, slot.id, false, {
                                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                        lineNumber: 878,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                lineNumber: 874,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 872,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px bg-gray-800 shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 894,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col min-h-0",
                        style: {
                            minHeight: DOLL_H
                        },
                        children: isWeaponSlot && activePMCSlot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VendorRanks, {
                                    ranks: vendorRanks,
                                    setRanks: setVendorRanks
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 900,
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
                                    vendorRanks: vendorRanks
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 901,
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
                                    lineNumber: 915,
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
                                            lineNumber: 917,
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
                                            lineNumber: 920,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 916,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : activePMCSlot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex flex-col items-center justify-center text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 text-sm font-semibold",
                                    children: activeSlot?.label
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 933,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-700 text-xs mt-2",
                                    children: "Gear builder coming soon for this slot"
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 934,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 932,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex flex-col items-center justify-center text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 text-sm font-medium",
                                    children: "Select a slot to get started"
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 938,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-700 text-xs mt-1",
                                    children: "Click any slot on the doll or carriers panel"
                                }, void 0, false, {
                                    fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                                    lineNumber: 939,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                            lineNumber: 937,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                        lineNumber: 897,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
                lineNumber: 803,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/WeaponBuilderShell.tsx",
        lineNumber: 788,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=killer6oose_GZW-Guides_app_components_WeaponBuilderShell_tsx_0q5-_3.._.js.map
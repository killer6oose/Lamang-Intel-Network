(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/killer6oose/GZW-Guides/app/components/RavenQuote.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RavenQuote
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/killer6oose/GZW-Guides/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/killer6oose/GZW-Guides/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const QUOTES = [
    "The dead don't optimize. You should.",
    "Every gram you carry is a decision. Make it count.",
    "Information is the only armor that doesn't slow you down.",
    "They came prepared. They left anyway.",
    "The Raven doesn't rush. The Raven doesn't miss.",
    "Preparation is violence you commit before the fight.",
    "Your enemy has a plan. Build a better one.",
    "In Gray Zone, the margin between alive and extracted is measured in grams."
];
function RavenQuote() {
    _s();
    const [quote, setQuote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RavenQuote.useEffect": ()=>{
            setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
        }
    }["RavenQuote.useEffect"], []);
    if (!quote) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "text-gray-500 text-sm italic mt-4 mb-2",
        children: [
            "“",
            quote,
            "”"
        ]
    }, void 0, true, {
        fileName: "[project]/killer6oose/GZW-Guides/app/components/RavenQuote.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(RavenQuote, "5dMXsGVSJyMiqBXtvqhGbwvmLe8=");
_c = RavenQuote;
var _c;
__turbopack_context__.k.register(_c, "RavenQuote");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=killer6oose_GZW-Guides_app_components_RavenQuote_tsx_09f13f~._.js.map
module.exports = [
"[project]/killer6oose/GZW-Guides/app/components/RavenQuote.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RavenQuote
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/killer6oose/GZW-Guides/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/killer6oose/GZW-Guides/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
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
    const [quote, setQuote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, []);
    if (!quote) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$killer6oose$2f$GZW$2d$Guides$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
}),
];

//# sourceMappingURL=killer6oose_GZW-Guides_app_components_RavenQuote_tsx_0lc0p.-._.js.map
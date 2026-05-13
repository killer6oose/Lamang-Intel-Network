// Prefixes a public asset path with the configured Next.js basePath.
//
// Why this exists: Next.js does NOT automatically prefix `basePath` onto raw
// <img> src attributes OR onto the next/image <Image> component's src prop
// when referencing files in the /public folder. Without manual prefixing,
// requests like /raven-sigil.png hit the site root instead of /builder/raven-sigil.png
// and return 404 on the deployed static site.
//
// Usage:
//   <img src={assetPath("/PMCSILHOUETTE.png")} />
//   <Image src={assetPath("/raven-sigil.png")} ... />
//
// The basePath is exposed via NEXT_PUBLIC_BASE_PATH in next.config.ts so this
// works both during `npm run dev` and in the static `out/` export.
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : "/" + path;
  return `${base}${normalized}`;
}

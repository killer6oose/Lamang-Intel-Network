// The builder has moved to the app root (app/page.tsx).
// With basePath "/builder" in next.config.ts, it is served at /builder.
// This file redirects any legacy /builder/builder requests.
import { redirect } from "next/navigation";

export default function BuilderRedirect() {
  redirect("/");
}

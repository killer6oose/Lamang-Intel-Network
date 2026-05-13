import type { Metadata } from "next";
import "./globals.css";
import { assetPath } from "./lib/assetPath";

export const metadata: Metadata = {
  title: "Loadout Builder | Lamang Intelligence Network",
  description:
    "Interactive Gray Zone Warfare weapon builder and PMC loadout calculator. Slot attachments, track carry weight, and share builds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href={assetPath("/assets/favicon.ico")} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}

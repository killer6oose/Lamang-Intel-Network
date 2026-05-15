"use client";
import { useState } from "react";

export default function BuilderHeader() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/",                label: "Home" },
    { href: "/tracker.html",    label: "Vulture Tracking" },
    { href: "/bosses.html",     label: "Bosses" },
    { href: "/ammo.html",       label: "Ammo Chart" },
    { href: "/blueprints.html", label: "Blueprints" },
    { href: "/builder",         label: "Loadout Builder", active: true },
    { href: "https://map.lamangintel.net", label: "Tac Map ↗", external: true },
    { href: "https://gray-zone-warfare.fandom.com", label: "Wiki ↗", external: true },
  ];

  return (
    <header className="sh">
      <div className="shi">
        <a href="/" className="logo">
          <img src="/logo.png" alt="Lamang Intelligence Network" width={36} height={36} style={{ objectFit: "contain" }} />
          <div>
            <div className="lm">Lamang Intelligence Network</div>
            <div className="ls">Gray Zone Warfare Operator Hub</div>
          </div>
        </a>

        <nav className="hnav" aria-label="Main navigation">
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              className={"nl" + (l.active ? " active" : "")}
              {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className={"hbtn" + (open ? " open" : "")}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <nav className="mnav open" aria-label="Mobile navigation">
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              className={"nl" + (l.active ? " active" : "")}
              {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

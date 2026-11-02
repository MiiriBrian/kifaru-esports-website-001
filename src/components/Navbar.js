"use client";
import Link from "next/link";
import { useState } from "react";
import { nav, team } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={`${team.name} logo`} className="h-10 w-10 object-contain" />
          <span className="font-display text-xl uppercase tracking-widest">
            {team.name}
          </span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="font-display text-sm uppercase tracking-widest text-muted transition hover:text-brown"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded border border-line px-3 py-1 font-display text-sm uppercase tracking-widest"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-line px-4 py-2 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="py-3 font-display uppercase tracking-widest text-muted hover:text-brown"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
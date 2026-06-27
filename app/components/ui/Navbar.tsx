"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Heart } from "lucide-react";

import type { Dictionary } from "@/app/lib/types";

export default function Navbar({
  locale,
  dict,
}: {
  locale: string;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState(false);
  const otherLocale = locale === "bn" ? "en" : "bn";

  const links = [
    { href: "#why", label: dict.nav.why },
    { href: "#vision", label: dict.nav.vision },
    { href: "#roadmap", label: dict.nav.roadmap },
    { href: "#impact", label: dict.nav.impact },
    { href: "#donate", label: dict.nav.donate },
    { href: "#transparency", label: dict.nav.transparency },
    { href: "#faq", label: dict.nav.faq },
    { href: "#volunteer", label: dict.nav.volunteer },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              Digital Future Initiative
            </span>
            <span className="hidden sm:inline text-xs text-muted-foreground">
              আলোর পথ
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={`/${otherLocale}`}
              className="hidden sm:inline-flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md border border-border"
            >
              {otherLocale.toUpperCase()}
            </Link>
            <a
              href="#donate"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Heart className="h-4 w-4" />
              {dict.nav.donate}
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-md text-foreground"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background px-4 pb-4">
          <nav className="flex flex-col gap-2 pt-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              >
                {l.label}
              </a>
            ))}
            <Link
              href={`/${otherLocale}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {locale === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
            </Link>
            <a
              href="#donate"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors mt-2"
            >
              <Heart className="h-4 w-4" />
              {dict.nav.donate}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

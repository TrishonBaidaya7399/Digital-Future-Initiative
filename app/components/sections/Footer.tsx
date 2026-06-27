import Link from "next/link";

import type { Dictionary } from "@/app/lib/types";

export default function Footer({
  locale,
  dict,
}: {
  locale: string;
  dict: Dictionary;
}) {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              {dict.footer.rights}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {dict.footer.initiated}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale === "bn" ? "en" : "bn"}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {locale === "bn" ? "English" : "বাংলা"}
            </Link>
            <a
              href="#donate"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {dict.nav.donate}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

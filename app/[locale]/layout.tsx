import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/sections/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Dictionary } from "../lib/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ locale: "bn" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = (await getDictionary(locale)) as Dictionary;

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      locale: locale === "bn" ? "bn_BD" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        bn: "/bn",
        en: "/en",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = (await getDictionary(locale)) as Dictionary;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Digital Future Initiative",
        url: `https://alor-pothe.org/${locale}`,
        logo: "https://alor-pothe.org/logo.png",
        founder: {
          "@type": "Organization",
          name: "Sanatani SSC 91",
        },
      },
      {
        "@type": "WebSite",
        name: dict.meta.title,
        url: `https://alor-pothe.org/${locale}`,
        inLanguage: locale === "bn" ? "bn" : "en",
      },
      {
        "@type": "DonateAction",
        name: dict.hero.donateBtn,
        description: dict.meta.description,
        url: `https://alor-pothe.org/${locale}#donate`,
        recipient: {
          "@type": "Organization",
          name: "Digital Future Initiative",
        },
      },
    ],
  };

  return (
    <html
      lang={locale === "bn" ? "bn" : "en"}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

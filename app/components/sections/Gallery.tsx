"use client";

import { FocusCards } from "../ui/FocusCards";
import AnimatedSection from "../ui/AnimatedSection";
import SectionTitle from "../ui/SectionTitle";

import type { Dictionary } from "@/app/lib/types";

// Gallery images - place your images in public/gallery/ folder and update paths here
const galleryCards = [
  {
    title: "কম্পিউটার ক্লাস শুরু",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "শিক্ষার্থীদের সাথে সাক্ষাৎ",
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "কম্পিউটার ল্যাব সেটআপ",
    src: "https://images.unsplash.com/photo-1529390079861-5919fd96830d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "নতুন ল্যাপটপ হস্তান্তর",
    src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "শিক্ষার্থীরা শিখছে",
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "স্বেচ্ছাসেবকদের কার্যক্রম",
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Gallery({ dict }: { dict: Dictionary }) {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle title={dict.gallery.title} />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <FocusCards cards={galleryCards} />
        </AnimatedSection>

        <p className="text-center text-sm text-muted-foreground mt-6">
          ছবিগুলো public/gallery/ ফোল্ডার থেকে আপডেট করা যাবে
        </p>
      </div>
    </section>
  );
}

"use client";

import { FocusCards } from "../ui/FocusCards";
import AnimatedSection from "../ui/AnimatedSection";
import SectionTitle from "../ui/SectionTitle";

import type { Dictionary } from "@/app/lib/types";

// Gallery images from public/gallery/ folder
const galleryCards = [
  {
    title: "কম্পিউটার ক্লাস শুরু",
    src: "/gallery/image1.jpg",
  },
  {
    title: "শিক্ষার্থীদের সাথে সাক্ষাৎ",
    src: "/gallery/image2.jpeg",
  },
  {
    title: "কম্পিউটার ল্যাব সেটআপ",
    src: "/gallery/image3.jpg",
  },
  {
    title: "নতুন ল্যাপটপ হস্তান্তর",
    src: "/gallery/image4.jpg",
  },
  {
    title: "শিক্ষার্থীরা শিখছে",
    src: "/gallery/image5.jpg",
  },
  {
    title: "স্বেচ্ছাসেবকদের কার্যক্রম",
    src: "/gallery/image6.jpg",
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
      </div>
    </section>
  );
}

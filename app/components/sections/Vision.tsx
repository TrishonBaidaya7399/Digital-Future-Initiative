import AnimatedSection from "../ui/AnimatedSection";
import SectionTitle from "../ui/SectionTitle";
import { Check } from "lucide-react";

import type { Dictionary } from "@/app/lib/types";

export default function Vision({ dict }: { dict: Dictionary }) {
  return (
    <section id="vision" className="py-20 md:py-28 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle title={dict.vision.title} />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-secondary to-teal-700 p-8 md:p-12 text-white shadow-xl">
            <p className="text-lg md:text-xl leading-relaxed mb-8 text-white/95">
              {dict.vision.content}
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {dict.vision.items.map((item: string) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3"
                >
                  <Check className="h-5 w-5 shrink-0 text-amber-300" />
                  <span className="font-medium text-white/95">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

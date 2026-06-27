import AnimatedSection from "../ui/AnimatedSection";
import SectionTitle from "../ui/SectionTitle";
import { Monitor, Laptop, Compass, GraduationCap, Wifi } from "lucide-react";

const icons = [Monitor, Laptop, Compass, GraduationCap, Wifi];

import type { Dictionary } from "@/app/lib/types";

export default function WhyWeStarted({
  dict,
}: {
  dict: Dictionary;
}) {
  return (
    <section id="why" className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle title={dict.whyWeStarted.title} />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=1000&auto=format&fit=crop"
                alt="Children learning"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {dict.whyWeStarted.content}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {dict.whyWeStarted.items.map((item, idx: number) => {
                const Icon = icons[idx] || Monitor;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {item.label}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

import AnimatedSection from "../ui/AnimatedSection";
import SectionTitle from "../ui/SectionTitle";
import { BookOpen, Wrench, Briefcase, Sun, SmilePlus, Globe } from "lucide-react";

const icons = [BookOpen, Wrench, Briefcase, Sun, SmilePlus, Globe];

import type { Dictionary } from "@/app/lib/types";

export default function WhyDonate({ dict }: { dict: Dictionary }) {
  return (
    <section id="why-donate" className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle title={dict.whyDonate.title} />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.whyDonate.items.map((item, idx: number) => {
            const Icon = icons[idx] || BookOpen;
            return (
              <AnimatedSection key={item.title} delay={idx * 0.1}>
                <div className="flex flex-col items-center text-center rounded-2xl border border-border bg-card p-6 hover:shadow-md transition-shadow">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

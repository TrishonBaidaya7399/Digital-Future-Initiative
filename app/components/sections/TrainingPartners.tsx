import AnimatedSection from "../ui/AnimatedSection";
import SectionTitle from "../ui/SectionTitle";
import { AlertCircle } from "lucide-react";

import type { Dictionary } from "@/app/lib/types";

export default function TrainingPartners({ dict }: { dict: Dictionary }) {
  return (
    <section id="partners" className="py-20 md:py-28 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle title={dict.partners.title} />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {dict.partners.names.map((name: string) => (
              <div
                key={name}
                className="flex items-center justify-center rounded-xl border border-border bg-card px-4 py-6 text-center hover:shadow-md transition-shadow"
              >
                <span className="text-sm font-semibold text-foreground">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-900">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
            <p className="text-sm leading-relaxed">{dict.partners.disclaimer}</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

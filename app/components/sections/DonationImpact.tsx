import AnimatedSection from "../ui/AnimatedSection";
import SectionTitle from "../ui/SectionTitle";

import type { Dictionary } from "@/app/lib/types";

export default function DonationImpact({ dict }: { dict: Dictionary }) {
  return (
    <section id="impact" className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle title={dict.donationImpact.title} />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {dict.donationImpact.cards.map((card, idx: number) => (
            <AnimatedSection key={idx} delay={idx * 0.1}>
              <div className="group relative rounded-2xl border border-border bg-card p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">৳</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {card.amount}
                </h3>
                {card.unit && (
                  <p className="text-sm text-muted-foreground mb-2">{card.unit}</p>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

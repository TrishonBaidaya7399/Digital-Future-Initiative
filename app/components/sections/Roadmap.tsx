import AnimatedSection from "../ui/AnimatedSection";
import SectionTitle from "../ui/SectionTitle";

import type { Dictionary } from "@/app/lib/types";

export default function Roadmap({ dict }: { dict: Dictionary }) {
  const phases = dict.roadmap.phases;

  return (
    <section id="roadmap" className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle title={dict.roadmap.title} />
        </AnimatedSection>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {phases.map((phase, idx: number) => {
              const isLeft = idx % 2 === 0;
              return (
                <AnimatedSection key={phase.name} delay={idx * 0.1}>
                  <div
                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10" />

                    {/* Card */}
                    <div
                      className={`ml-12 md:ml-0 md:w-1/2 ${
                        isLeft ? "md:pr-12" : "md:pl-12"
                      }`}
                    >
                      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                              {phase.name}
                            </span>
                            <h3 className="text-lg font-bold text-foreground">
                              {phase.title}
                            </h3>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {phase.items.map((item: string) => (
                            <span
                              key={item}
                              className="inline-flex rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

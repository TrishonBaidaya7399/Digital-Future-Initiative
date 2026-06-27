"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";
import SectionTitle from "../ui/SectionTitle";
import {
  Monitor,
  Wallet,
  Users,
  GraduationCap,
  Target,
  CheckCircle2,
  BarChart3,
  Calculator,
  ImageIcon,
  FileCheck,
  Package,
  ExternalLink,
  TrendingUp,
  Clock,
} from "lucide-react";

import type { Dictionary } from "@/app/lib/types";

function CountUp({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isInView ? (
        <CounterValue target={target} suffix={suffix} duration={duration} />
      ) : (
        `0${suffix}`
      )}
    </motion.span>
  );
}

function CounterValue({
  target,
  suffix,
  duration,
}: {
  target: number;
  suffix: string;
  duration: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return `${display.toLocaleString()}${suffix}`;
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  color: string;
  delay?: number;
}) {
  return (
    <AnimatedSection delay={delay}>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
            <p className="text-2xl md:text-3xl font-bold text-foreground">{value}</p>
          </div>
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ProgressCard({
  label,
  collected,
  goal,
  need,
  collectedLabel,
  goalLabel,
  needLabel,
  color,
  icon: Icon,
  delay = 0,
}: {
  label: string;
  collected: number;
  goal: number;
  need: number;
  collectedLabel: string;
  goalLabel: string;
  needLabel: string;
  color: string;
  icon: React.ElementType;
  delay?: number;
}) {
  const percentage = Math.min((collected / goal) * 100, 100);

  return (
    <AnimatedSection delay={delay}>
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center gap-3 mb-6">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-foreground">{label}</h3>
        </div>

        <div className="space-y-6">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">
                <CountUp target={collected} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">{collectedLabel}</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-2xl font-bold text-muted-foreground">
                <CountUp target={goal} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">{goalLabel}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">
                <CountUp target={need} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">{needLabel}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">{collectedLabel}</span>
              <span className="font-semibold">{percentage.toFixed(0)}%</span>
            </div>
            <div className="h-4 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`h-full rounded-full ${color}`}
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Progress({ dict }: { dict: Dictionary }) {
  const computerGoal = 20;
  const computerCollected = 7;
  const computerNeed = computerGoal - computerCollected;
  const moneyGoal = 500000;
  const moneyCollected = 85000;
  const moneyNeed = moneyGoal - moneyCollected;

  // Dashboard stat cards data
  const stats = [
    {
      icon: Monitor,
      label: dict.progress.computers.collected,
      value: computerCollected,
      color: "bg-blue-600",
    },
    {
      icon: Wallet,
      label: dict.progress.money.collected,
      value: `৳${moneyCollected.toLocaleString()}`,
      color: "bg-emerald-600",
    },
    {
      icon: Users,
      label: "স্বেচ্ছাসেবক",
      value: 12,
      color: "bg-violet-600",
    },
    {
      icon: GraduationCap,
      label: "শিক্ষার্থী",
      value: 25,
      color: "bg-amber-600",
    },
  ];

  const transparencyItems = [
    { icon: BarChart3, label: dict.progress.transparency.reports, color: "bg-blue-500" },
    { icon: Calculator, label: dict.progress.transparency.expenses, color: "bg-emerald-500" },
    { icon: ImageIcon, label: dict.progress.transparency.photos, color: "bg-pink-500" },
    { icon: FileCheck, label: dict.progress.transparency.invoices, color: "bg-amber-500" },
    { icon: Package, label: dict.progress.transparency.equipment, color: "bg-violet-500" },
    { icon: ExternalLink, label: dict.progress.transparency.drive, color: "bg-sky-500" },
  ];

  return (
    <section id="transparency" className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle title={dict.progress.title} />
        </AnimatedSection>

        {/* Top Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              icon={stat.icon}
              label={stat.label}
              value={typeof stat.value === "number" ? <CountUp target={stat.value} /> : stat.value}
              color={stat.color}
              delay={idx * 0.08}
            />
          ))}
        </div>

        {/* Progress Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ProgressCard
            label={dict.progress.computers.label}
            collected={computerCollected}
            goal={computerGoal}
            need={computerNeed}
            collectedLabel={dict.progress.computers.collected}
            goalLabel={dict.progress.computers.goal}
            needLabel={dict.progress.computers.need}
            color="bg-blue-600"
            icon={Monitor}
            delay={0.1}
          />

          <ProgressCard
            label={dict.progress.money.label}
            collected={moneyCollected}
            goal={moneyGoal}
            need={moneyNeed}
            collectedLabel={dict.progress.money.collected}
            goalLabel={dict.progress.money.goal}
            needLabel={dict.progress.computers.need}
            color="bg-emerald-600"
            icon={Wallet}
            delay={0.2}
          />
        </div>

        {/* Transparency Dashboard */}
        <AnimatedSection delay={0.3}>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {dict.progress.transparency.title}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {transparencyItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    viewport={{ once: true }}
                    className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-5 text-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color} shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-foreground leading-tight">
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Last Updated */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>সর্বশেষ আপডেট: জুন ২০২৬</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

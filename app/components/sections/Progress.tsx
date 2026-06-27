"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";
import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";
import {
  Monitor,
  Wallet,
  Users,
  GraduationCap,
  BarChart3,
  Calculator,
  ImageIcon,
  FileCheck,
  Package,
  ExternalLink,
  TrendingUp,
  Clock,
  ChevronDown,
  Download,
  CheckCircle2,
  CircleDollarSign,
  CalendarDays,
  User,
  Building,
  Hash,
  FileText,
  FolderOpen,
} from "lucide-react";

import type { Dictionary } from "@/app/lib/types";
import { mockTransparencyData } from "@/app/lib/mockData";

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

// ─── Transparency Item Component ───
function TransparencyItem({
  icon: Icon,
  label,
  color,
  isOpen,
  onClick,
  children,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color} shadow-md`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <span className="text-base font-bold text-foreground">{label}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-muted-foreground"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-5 pb-5 pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Data Views ───
function ReportsView() {
  return (
    <div className="space-y-4">
      {mockTransparencyData.reports.map((report, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-border bg-background p-5 hover:shadow-sm transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span className="font-bold text-foreground">{report.month}</span>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                {report.status === "published" ? "প্রকাশিত" : "Draft"}
              </span>
            </div>
            <button className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              <Download className="h-4 w-4" />
              PDF ডাউনলোড
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{report.summary}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-lg bg-muted p-3 text-center">
              <p className="text-lg font-bold text-emerald-600">৳{report.totalDonation.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">মোট অনুদান</p>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <p className="text-lg font-bold text-red-500">৳{report.totalExpense.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">মোট ব্যয়</p>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <p className="text-lg font-bold text-blue-600">{report.computersBought}</p>
              <p className="text-xs text-muted-foreground">কম্পিউটার ক্রয়</p>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <p className="text-lg font-bold text-violet-600">{report.studentsTrained}</p>
              <p className="text-xs text-muted-foreground">শিক্ষার্থী প্রশিক্ষণ</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExpensesView() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-foreground">তারিখ</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">বিবরণ</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">ক্যাটাগরি</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">বিক্রেতা</th>
            <th className="px-4 py-3 text-right font-semibold text-foreground">পরিমাণ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {mockTransparencyData.expenses.map((exp, idx) => (
            <tr key={idx} className="bg-card hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{exp.date}</td>
              <td className="px-4 py-3 text-foreground font-medium">{exp.item}</td>
              <td className="px-4 py-3">
                <span className="inline-flex rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                  {exp.category}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{exp.vendor}</td>
              <td className="px-4 py-3 text-right font-bold text-foreground">৳{exp.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-muted">
          <tr>
            <td colSpan={4} className="px-4 py-3 text-right font-bold text-foreground">মোট ব্যয়</td>
            <td className="px-4 py-3 text-right font-bold text-red-500">
              ৳{mockTransparencyData.expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function PhotosView() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {mockTransparencyData.photos.map((photo, idx) => (
        <div
          key={idx}
          className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-all"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="p-4">
            <p className="text-sm font-bold text-foreground mb-1">{photo.title}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
              <CalendarDays className="h-3 w-3" />
              {photo.date}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{photo.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function InvoicesView() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-foreground">ইনভয়েস নং</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">তারিখ</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">বিক্রেতা</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">আইটেম</th>
            <th className="px-4 py-3 text-right font-semibold text-foreground">পরিমাণ</th>
            <th className="px-4 py-3 text-center font-semibold text-foreground">স্ট্যাটাস</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {mockTransparencyData.invoices.map((inv, idx) => (
            <tr key={idx} className="bg-card hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 font-mono text-xs text-primary font-bold">{inv.invoiceNo}</td>
              <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{inv.date}</td>
              <td className="px-4 py-3 text-muted-foreground">{inv.vendor}</td>
              <td className="px-4 py-3 text-foreground">{inv.items}</td>
              <td className="px-4 py-3 text-right font-bold text-foreground">৳{inv.amount.toLocaleString()}</td>
              <td className="px-4 py-3 text-center">
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  <CheckCircle2 className="h-3 w-3" />
                  Paid
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EquipmentView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mockTransparencyData.equipment.map((eq, idx) => (
        <div
          key={idx}
          className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Package className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-sm font-bold text-foreground truncate">{eq.name}</h4>
              <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 shrink-0">
                {eq.condition}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{eq.specs}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Hash className="h-3 w-3" />
                {eq.quantity}টি
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {eq.donatedBy}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {eq.date}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DriveView() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
              <FolderOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-foreground">Google Drive Folder</p>
              <p className="text-xs text-muted-foreground">সর্বশেষ আপডেট: {mockTransparencyData.drive.lastUpdated}</p>
            </div>
          </div>
          <a
            href={mockTransparencyData.drive.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            খুলুন
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {mockTransparencyData.drive.folders.map((folder, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 text-center hover:shadow-sm transition-shadow cursor-pointer"
            >
              <FolderOpen className="h-8 w-8 text-sky-500" />
              <span className="text-xs font-semibold text-foreground leading-tight">{folder.name}</span>
              <span className="text-xs text-muted-foreground">{folder.count}টি ফাইল</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <p className="flex items-center gap-2">
          <FileText className="h-4 w-4 shrink-0" />
          সব ডকুমেন্ট, রিপোর্ট এবং ছবি Google Drive-এ নিয়মিত আপডেট করা হয়।
        </p>
      </div>
    </div>
  );
}

export default function Progress({ dict }: { dict: Dictionary }) {
  const computerGoal = 20;
  const computerCollected = 7;
  const computerNeed = computerGoal - computerCollected;
  const moneyGoal = 500000;
  const moneyCollected = 85000;
  const moneyNeed = moneyGoal - moneyCollected;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const stats = [
    { icon: Monitor, label: dict.progress.computers.collected, value: computerCollected, color: "bg-blue-600" },
    { icon: Wallet, label: dict.progress.money.collected, value: `৳${moneyCollected.toLocaleString()}`, color: "bg-emerald-600" },
    { icon: Users, label: "স্বেচ্ছাসেবক", value: 12, color: "bg-violet-600" },
    { icon: GraduationCap, label: "শিক্ষার্থী", value: 25, color: "bg-amber-600" },
  ];

  const transparencyItems = [
    { icon: BarChart3, label: dict.progress.transparency.reports, color: "bg-blue-500", view: <ReportsView /> },
    { icon: Calculator, label: dict.progress.transparency.expenses, color: "bg-emerald-500", view: <ExpensesView /> },
    { icon: ImageIcon, label: dict.progress.transparency.photos, color: "bg-pink-500", view: <PhotosView /> },
    { icon: FileCheck, label: dict.progress.transparency.invoices, color: "bg-amber-500", view: <InvoicesView /> },
    { icon: Package, label: dict.progress.transparency.equipment, color: "bg-violet-500", view: <EquipmentView /> },
    { icon: ExternalLink, label: dict.progress.transparency.drive, color: "bg-sky-500", view: <DriveView /> },
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

            <div className="space-y-4">
              {transparencyItems.map((item, idx) => (
                <TransparencyItem
                  key={idx}
                  icon={item.icon}
                  label={item.label}
                  color={item.color}
                  isOpen={openIndex === idx}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  {item.view}
                </TransparencyItem>
              ))}
            </div>

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

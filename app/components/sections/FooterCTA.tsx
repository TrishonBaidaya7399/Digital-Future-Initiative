"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import type { Dictionary } from "@/app/lib/types";

export default function FooterCTA({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-secondary to-teal-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
            {dict.footerCTA.text}
          </h2>
          <a
            href="#donate"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-xl shadow-black/20"
          >
            <Heart className="h-5 w-5" />
            {dict.footerCTA.button}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

export default function Overview() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left — heading block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            {/* <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full mb-5">
              The Context
            </span> */}
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight mb-6">
              Navigate the Complexities of Gulf Supply Chain & Logistics
            </h2>
            <div className="w-10 h-[3px] bg-amber-400 rounded-none" />
          </motion.div>

          {/* Right — body text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
              The Gulf's supply chains are under pressure from rising costs, geopolitical instability, and shifting sustainability mandates.
            </p>
            <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              This environment forces CFOs, COOs, and logistics leaders to quickly minimize overheads, maximize resilience, and implement sustainable practices without losing operational momentum. Incorporating AI-driven SCM and adaptive WMS models is no longer optional — it is critical to future-proofing operations.
            </p>
            <div className="border-l-[3px] border-blue-700 dark:border-blue-500 pl-5 py-1 bg-slate-50 dark:bg-slate-900 rounded-r-lg">
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                This exclusive event, hosted by{' '}
                <span className="font-semibold text-slate-900 dark:text-white">Accelalpha & Oracle</span>
                , offers highly strategic real-world solutions to keep operations agile, competitive, and fully volatile-proof in an evolving ecosystem.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
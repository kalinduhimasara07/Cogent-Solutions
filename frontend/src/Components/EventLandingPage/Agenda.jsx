import React from 'react';
import { motion } from 'framer-motion';

export default function Agenda() {
  const agendaData = [
    { time: "9.30 AM - 10.00 AM", title: "Registrations", desc: "Welcome coffee & attendee badge collections." },
    { time: "10.00 AM - 10.10 AM", title: "Welcome Note", desc: "By Richard Buxton (VP EMEA, Accelalpha) & Rohan Chitnis (Sales Director Applications, Oracle)." },
    { time: "10.10 AM - 10.40 AM", title: "Industry Keynote", subtitle: "Outlook & Challenges on Digital Logistics & Supply Chain", desc: "By Srivatsav Sarvepalli (Regional Director, Supply Chain Solutions, ECEMEA, Oracle)." },
    { time: "10.40 AM - 11.10 AM", title: "A Practical Guide to Successful Implementation", desc: "By Joe Spear (Partner, Accelalpha)." },
    { time: "11.10 AM - 11.30 AM", title: "The Resilient Supply Chain & SCM Innovations", desc: "By Ujjwal Kumar (Principal Domain Lead, ECEMEA, Oracle)." },
    { time: "11.30 AM - 11.50 AM", title: "Coffee Break", desc: "Mid-morning refreshments and match-making networking." },
    { time: "11.50 AM - 12.10 PM", title: "Insights from Digital Evolution", desc: "By Dr. Raman Kumar (CEO, Al-Futtaim Logistics)." },
    { time: "12.10 PM - 12.40 PM", title: "Strategies in Action: Insights from Industry Leaders", subtitle: "Panel Discussion with Weatherford & Ducab", desc: "By David Moono (Global Logistics Manager, Weatherford) & Tamer Hamed (CIO, Dubai Cable Company)." },
    { time: "12.40 PM - 01.00 PM", title: "Q&A and Closing Remarks", desc: "Synthesizing regional frameworks by Accelalpha." },
    { time: "01.00 PM - Onwards", title: "Lunch & Networking", desc: "Exclusive 5-star executive lunch layout at the resort." }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">The Briefing Agenda</h2>
          <p className="text-slate-400 text-sm mt-2">Engineered strictly for actionable insight and strategic networking</p>
        </div>

        <div className="relative border-l border-slate-700/80 ml-4 sm:ml-32 space-y-12">
          {agendaData.map((slot, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 sm:pl-10 group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[6px] top-1.5 w-3 h-3 bg-slate-900 border-2 border-amber-400 rounded-full group-hover:bg-amber-400 transition-colors" />
              
              {/* Responsive Absolute/Inline Time Display */}
              <div className="absolute left-[-140px] top-1 w-28 text-right hidden sm:block text-xs font-bold text-slate-400 tracking-wider">
                {slot.time}
              </div>

              <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all">
                <span className="inline-block text-xs font-bold text-amber-400 sm:hidden mb-2">{slot.time}</span>
                <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors tracking-tight">{slot.title}</h3>
                {slot.subtitle && <p className="text-xs font-medium text-slate-300 mt-1 italic">{slot.subtitle}</p>}
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">{slot.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

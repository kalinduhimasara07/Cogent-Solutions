import React from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from './constants';

export default function Speakers() {
  const speakersData = [
    { name: "Dr Raman Kumar", role: "CEO", comp: "Al-Futtaim Logistics", img: IMAGES.speakers.raman },
    { name: "David Moono", role: "Global Logistics Manager", comp: "Weatherford", img: IMAGES.speakers.david },
    { name: "Tamer Hamed", role: "CIO", comp: "Dubai Cable Company", img: IMAGES.speakers.tamer },
    { name: "Richard Buxton", role: "VP EMEA", comp: "Accelalpha", img: IMAGES.speakers.richard },
    { name: "Joe Spear", role: "Partner", comp: "Accelalpha", img: IMAGES.speakers.joe },
    { name: "Srivatsav Sarvepalli", role: "Regional Director Supply Chain Solutions, ECEMEA", comp: "Oracle", img: IMAGES.speakers.srivatsav },
    { name: "Rohan Chitnis", role: "Sales Director Applications", comp: "Oracle", img: IMAGES.speakers.rohan },
    { name: "Ujjwal Kumar", role: "Principal Domain Lead, ECEMEA", comp: "Oracle", img: IMAGES.speakers.ujjwal },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Our Speakers</h2>
        <div className="w-10 h-0.5 bg-slate-300 dark:bg-slate-700 mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-14">
        {speakersData.map((speaker, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ y: -8, scale: 1.04, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
            className="flex flex-col items-center text-center cursor-default group"
          >
            {/* Circular image */}
            <motion.div
              className="w-36 h-36 rounded-full overflow-hidden border-[3px] border-slate-200 dark:border-slate-800 group-hover:border-red-500 transition-colors duration-300"
              whileHover={{ boxShadow: '0 0 0 6px rgba(239,68,68,0.15)' }}
            >
              <img
                src={speaker.img}
                alt={speaker.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const initials = speaker.name.split(' ').map(w => w[0]).filter((_, j, a) => j === 0 || j === a.length - 1).join('');
                  e.target.parentNode.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-2xl font-semibold">${initials}</div>`;
                }}
              />
            </motion.div>

            {/* Text */}
            <h4 className="mt-4 font-bold text-slate-900 dark:text-white text-base leading-tight">{speaker.name}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">{speaker.role}</p>
            <p className="text-sm font-semibold text-red-600 dark:text-red-500 mt-1">{speaker.comp}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
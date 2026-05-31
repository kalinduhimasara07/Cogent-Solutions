import React from 'react';

const reasons = [
  {
    title: "Oracle's Gen AI SCM Platform Unveiled",
    desc: "Explore how Oracle's AI-powered SCM innovations offer predictive analytics, automation, improved visibility, and sustainability into Supply Chains such as yours.",
    img: "https://cogentsolutions.ae/events/upcoming-physical-events/accelalpha-oracle/images/resource/image-1.jpg",
  },
  {
    title: "Customer Success Stories That Deliver Results",
    desc: "Hear how companies partnered with Oracle and Accelalpha to optimize logistics flows, cut costs, and improve resilience while reducing their environmental impact through smarter inventory management and automation.",
    img: "https://cogentsolutions.ae/events/upcoming-physical-events/accelalpha-oracle/images/resource/image-2.jpg",
  },
  {
    title: "Practical Solutions for Green and Resilient Operations",
    desc: "Learn how to navigate geopolitical risks, last-mile delivery challenges, and integrate eco-friendly practices — keeping operations agile and competitive in an evolving Gulf market.",
    img: "https://cogentsolutions.ae/events/upcoming-physical-events/accelalpha-oracle/images/resource/image-3.jpg",
  },
];

export default function ReasonsToAttend() {
  return (
    <section className="py-20 bg-slate-100 dark:bg-slate-900 border-y border-slate-200/60 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading — same center position, bigger & sharper */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Top 3 Reasons to Attend
          </h2>
          <div className="w-12 h-[3px] bg-amber-400 mx-auto mt-4" />
        </div>

        <div className="flex flex-col gap-0">
          {reasons.map((reason, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <div key={idx}>
                <div className={`flex flex-col md:flex-row items-center gap-10 py-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>

                  {/* Text — same flex-1 position */}
                  <div className="flex-1 space-y-3">
                    {/* Counter — slightly larger, bolder */}
                    <p className="text-sm font-bold text-slate-300 dark:text-slate-600 tracking-[0.2em] uppercase">
                      0{idx + 1}
                    </p>
                    {/* Title — up from text-xl to text-2xl/3xl with tighter tracking */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight">
                      {reason.title}
                    </h3>
                    {/* Body — up from text-sm to text-base, looser line-height */}
                    <p className="text-base text-slate-500 dark:text-slate-400 leading-[1.8]">
                      {reason.desc}
                    </p>
                  </div>

                  {/* Image — same w-72 position, taller for presence */}
                  <div className="w-full md:w-72 shrink-0">
                    <img
                      src={reason.img}
                      alt={reason.title}
                      className="w-full h-56 object-cover rounded-2xl"
                    />
                  </div>

                </div>
                {idx < reasons.length - 1 && (
                  <hr className="border-slate-200 dark:border-slate-800" />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
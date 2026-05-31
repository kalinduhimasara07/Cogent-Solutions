import React, { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const eventDate = new Date('November 13, 2024 09:30:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-900 to-slate-900 text-white py-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold tracking-tight">Count Every Second Until the Event</h3>
          <p className="text-xs text-blue-300 mt-1">Exclusive physical networking & intelligence session</p>
        </div>
        <div className="flex gap-4 sm:gap-6">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="bg-slate-800/80 border border-slate-700 w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs uppercase font-semibold tracking-wider text-slate-400 mt-2">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

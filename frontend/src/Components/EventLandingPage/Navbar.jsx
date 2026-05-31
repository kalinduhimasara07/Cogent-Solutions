import React, { useState, useEffect } from 'react';
import { IMAGES } from './constants';

export default function Navbar({ onRegisterClick }) {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Left — main logo */}
        <div className="flex items-center gap-4">
          <img
            src={IMAGES.logo}
            alt="Cogent Solutions Logo"
            className="h-12 w-auto object-contain dark:invert"
            onError={(e) => { e.target.src = 'https://placehold.co/180x50?text=Cogent+Solutions'; }}
          />
        </div>

        {/* Right — Oracle logo + toggle + CTA */}
        <div className="flex items-center gap-4">
          <img
            src={IMAGES.oracleLogo}
            alt="Oracle"
            className="h-8 w-auto object-contain hidden sm:block dark:invert"
            onError={(e) => { e.target.style.display = 'none'; }}
          />

          {/* Dark / light toggle */}
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
          >
            {dark ? (
              /* Sun icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="4" />
                <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              /* Moon icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          {/* CTA */}
          <button
            onClick={onRegisterClick}
            className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900 transition duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            Request Invitation
          </button>
        </div>

      </div>
    </nav>
  );
}
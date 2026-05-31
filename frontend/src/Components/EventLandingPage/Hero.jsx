import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { IMAGES } from './constants';

export default function Hero({ onRegisterClick }) {
  return (
    <header className="relative bg-slate-900 text-white overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGES.heroBg} 
          alt="Supply Chain Background" 
          className="w-full h-full object-cover opacity-25 mix-blend-luminosity" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            Exclusive Invitation
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Troubled Waters: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
              Sailing with AI in Supply Chain
            </span>
          </h1>
          
          <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
            Unlock structural agility. Join Accelalpha & Oracle to capture real-world strategies designed to streamline volatile operations, conquer last-mile complexity, and secure sustainability goals.
          </p>

          {/* Event Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Date</p>
                <p className="text-sm font-semibold text-white">13th November 2024</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-x border-slate-700/50 pt-4 sm:pt-0 sm:px-6">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Time</p>
                <p className="text-sm font-semibold text-white">09:30 AM - 01:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 sm:pl-2">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Location</p>
                <p className="text-sm font-semibold text-white">Marriott Resort, The Palm</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <button 
              onClick={onRegisterClick}
              className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-4 rounded-xl font-bold transition duration-300 shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5"
            >
              Personalize Your Invitation
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

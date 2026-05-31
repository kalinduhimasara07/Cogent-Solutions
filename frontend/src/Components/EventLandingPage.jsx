import React from 'react';
import Navbar from './EventLandingPage/Navbar';
import Hero from './EventLandingPage/Hero';
import CountdownTimer from './EventLandingPage/CountdownTimer';
import Overview from './EventLandingPage/Overview';
import ReasonsToAttend from './EventLandingPage/ReasonsToAttend';
import Speakers from './EventLandingPage/Speakers';
import Agenda from './EventLandingPage/Agenda';
import RegistrationForm from './EventLandingPage/RegistrationForm';
import Footer from './EventLandingPage/Footer';

export default function EventLandingPage() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-white transition-colors duration-300">
      <Navbar onRegisterClick={() => scrollToSection('register')} />
      <Hero onRegisterClick={() => scrollToSection('register')} />
      <CountdownTimer />
      <Overview />
      <ReasonsToAttend />
      <Speakers />
      <Agenda />
      <RegistrationForm />
      <Footer />
    </div>
  );
}
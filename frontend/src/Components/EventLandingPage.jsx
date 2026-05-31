import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
//   ChevronLeft,
  User, 
//   Briefcase, 
//   Building2, 
  Phone, 
  Mail, 
//   Globe,
//   Award,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';

// --- PLACEHOLDER IMAGE URL CONFIG ---
const IMAGES = {
  logo: "https://cogentsolutions.ae/wp-content/uploads/2022/07/cogent-logo.png", 
  heroBg: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000", 
  oracleLogo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
  accelalphaLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300&h=100", 
  speakers: {
    raman: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
    david: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
    tamer: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400",
    richard: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    joe: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    srivatsav: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400",
    rohan: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400&h=400",
    ujjwal: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400&h=400"
  }
};

export default function EventLandingPage() {
  // Countdown Timer State
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

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    priorities: ''
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [matchedSession, setMatchedSession] = useState(null);
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [generationError, setGenerationError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateInvitation = async (e) => {
    e.preventDefault();
    if (formData.priorities.length < 20) return;

    setIsGenerating(true);
    setIsGenerated(false);
    setMatchedSession(null);
    setGeneratedDraft('');
    setGenerationError('');
    setCopied(false);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiBaseUrl}/api/generate-invitation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          priorities: formData.priorities,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to generate invitation.');
      }

      setMatchedSession(data.matched_session);
      setGeneratedDraft(data.invitation_draft);
      setIsGenerated(true);
    } catch (error) {
      setGenerationError(error.message || 'Unable to generate invitation at this time.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-amber-500 selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={IMAGES.logo} alt="Cogent Solutions Logo" className="h-10 w-auto object-contain" onError={(e)=>{e.target.src='https://placehold.co/180x50?text=Cogent+Solutions'}} />
          </div>
          <div className="flex items-center gap-6">
            <img src={IMAGES.oracleLogo} alt="Oracle" className="h-4 sm:h-5 w-auto object-contain hidden sm:block" />
            <button 
              onClick={() => scrollToSection('register')} 
              className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:shadow-lg hover:shadow-indigo-200 transition duration-300 transform hover:-translate-y-0.5"
            >
              Request Invitation
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative bg-slate-900 text-white overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.heroBg} alt="Supply Chain Background" className="w-full h-full object-cover opacity-25 mix-blend-luminosity" />
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
                onClick={() => scrollToSection('register')}
                className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-4 rounded-xl font-bold transition duration-300 shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5"
              >
                Personalize Your Invitation
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- COUNTDOWN TIMER STRIP --- */}
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

      {/* --- OVERVIEW / VALUE PROP --- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <span className="text-blue-700 font-bold uppercase tracking-wider text-xs">The Context</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-6 leading-tight">
              Navigate the Complexities of Gulf Supply Chain & Logistics
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6 text-slate-600 text-base leading-relaxed"
          >
            <p className="font-medium text-slate-900 text-lg">
              The Gulf's supply chains are under pressure from rising costs, geopolitical instability, and shifting sustainability mandates.
            </p>
            <p>
              This environment forces CFOs, COOs, and logistics leaders to quickly minimize overheads, maximize resilience, and implement sustainable practices without losing operational momentum. Incorporating AI-driven SCM and adaptive WMS models is no longer optional—it is critical to future-proofing operations.
            </p>
            <p className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-r-xl text-indigo-950 font-medium">
              This exclusive event, hosted by <strong className="text-blue-900">Accelalpha & Oracle</strong>, offers highly strategic real-world solutions to keep operations agile, competitive, and fully volatile-proof in an evolving ecosystem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- TOP 3 REASONS TO ATTEND --- */}
      <section className="py-20 bg-slate-100 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Top 3 Reasons to Attend</h2>
            <p className="text-slate-500 mt-2">Why industry leaders are convening at this exclusive session</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Oracle's Gen AI SCM Platform Unveiled",
                desc: "Explore how Oracle's AI-powered SCM innovations unlock real-time predictive analytics, native automation, complete multi-echelon visibility, and embedded sustainability into enterprise architecture."
              },
              {
                title: "Customer Success Stories That Deliver Results",
                desc: "Hear exactly how regional enterprises partnered with Oracle and Accelalpha to optimize intricate logistics flows, curb volatile structural costs, and execute smarter automated inventory placement."
              },
              {
                title: "Practical Solutions for Green and Resilient Operations",
                desc: "Learn to tactically bypass expanding geopolitical risks, optimize complex last-mile routes, and systematically integrate green corporate initiatives tailored natively to the evolving Gulf markets."
              }
            ].map((reason, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-700 font-bold text-lg">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight leading-snug">{reason.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{reason.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-indigo-600 group cursor-pointer">
                  Learn more <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SPEAKERS SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Distinguished Panel</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">Meet Our Expert Speakers</h2>
          <p className="text-slate-500 mt-2 text-sm">Visionaries and execution strategists driving change across the Gulf ecosystem</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Dr Raman Kumar", role: "CEO", comp: "Al-Futtaim Logistics", img: IMAGES.speakers.raman },
            { name: "David Moono", role: "Global Logistics Manager", comp: "Weatherford", img: IMAGES.speakers.david },
            { name: "Tamer Hamed", role: "CIO", comp: "Dubai Cable Company", img: IMAGES.speakers.tamer },
            { name: "Richard Buxton", role: "VP EMEA", comp: "Accelalpha", img: IMAGES.speakers.richard },
            { name: "Joe Spear", role: "Partner", comp: "Accelalpha", img: IMAGES.speakers.joe },
            { name: "Srivatsav Sarvepalli", role: "Regional Director Supply Chain Solutions, ECEMEA", comp: "Oracle", img: IMAGES.speakers.srivatsav },
            { name: "Rohan Chitnis", role: "Sales Director Applications", comp: "Oracle", img: IMAGES.speakers.rohan },
            { name: "Ujjwal Kumar", role: "Principal Domain Lead, ECEMEA", comp: "Oracle", img: IMAGES.speakers.ujjwal },
          ].map((speaker, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/70 text-center group shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="relative overflow-hidden bg-slate-100 aspect-square">
                <img 
                  src={speaker.img} 
                  alt={speaker.name} 
                  className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${speaker.name}` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
              <div className="p-6">
                <h4 className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-blue-700 transition-colors">{speaker.name}</h4>
                <p className="text-xs font-semibold text-amber-600 mt-1 uppercase tracking-wider">{speaker.role}</p>
                <p className="text-sm font-medium text-slate-500 mt-1 line-clamp-1">{speaker.comp}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- AGENDA SECTION --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">The Briefing Agenda</h2>
            <p className="text-slate-400 text-sm mt-2">Engineered strictly for actionable insight and strategic networking</p>
          </div>

          <div className="relative border-l border-slate-700/80 ml-4 sm:ml-32 space-y-12">
            {[
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
            ].map((slot, idx) => (
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

      {/* --- REGISTRATION FORM / INVITATION SECTION --- */}
      <section id="register" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: Form Intake */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" /> Customized Access
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
                  Request a Personalized Invitation
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  Share your details to receive a session recommendation and a personalized B2B invitation draft.
                </p>

                <form onSubmit={handleGenerateInvitation} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                      <input 
                        required 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleInputChange} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden transition" 
                        placeholder="John Doe" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Business Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                      <input 
                        required 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden transition" 
                        placeholder="corporate@company.com" 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Professional Priorities / Challenges</label>
                      <span className={`text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-sm ${formData.priorities.length >= 20 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {formData.priorities.length}/20 chars min
                      </span>
                    </div>
                    <textarea 
                      required
                      name="priorities"
                      rows={3}
                      value={formData.priorities}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden transition resize-none"
                      placeholder="e.g., Optimizing fleet routing overheads and adding visibility infrastructure..."
                    />
                    <p className="text-slate-400 text-[11px] mt-1.5">
                      Minimum 20 characters to improve session matching accuracy.
                    </p>
                  </div>

                  <button 
                    type="submit"
                    disabled={formData.priorities.length < 20 || !formData.fullName || !formData.email || isGenerating}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-3.5 px-6 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-100 transition disabled:opacity-40 disabled:cursor-not-allowed transform active:scale-[0.99]"
                  >
                    {isGenerating ? "Analyzing Priorities..." : "Generate Personalized Invitation"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              <p className="text-[11px] text-slate-400 leading-normal mt-6 border-t border-slate-100 pt-4">
                By submitting this form, you consent to the use of your details solely for session matching and invitation drafting related to this event. We do not use this information for unrelated marketing communications.
              </p>
            </div>

            {/* Right Column: Dynamic Session Preview Box */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full relative border border-slate-800 shadow-inner overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
                
                <div>
                  <h3 className="text-base font-bold text-amber-400 tracking-tight flex items-center gap-2 border-b border-slate-800 pb-4 mb-6">
                    <MessageSquare className="w-4 h-4 text-indigo-400" /> Your Recommended Session
                  </h3>

                  <AnimatePresence mode="wait">
                    {generationError && !isGenerating && (
                      <motion.div 
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4 py-8 text-center sm:text-left"
                      >
                        <div className="w-12 h-12 rounded-xl bg-red-950/70 border border-red-500/40 flex items-center justify-center mx-auto sm:mx-0 text-red-300">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div className="bg-red-950/60 border border-red-500/30 text-red-100 p-4 rounded-xl text-sm leading-relaxed">
                          {generationError}
                        </div>
                      </motion.div>
                    )}

                    {!isGenerated && !isGenerating && !generationError && (
                      <motion.div 
                        key="awaiting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4 py-8 text-center sm:text-left"
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto sm:mx-0">
                          <Clock className="w-5 h-5 text-slate-400 animate-pulse" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-200">Awaiting registration details.</p>
                          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                            Submit your details to receive a recommended session and a personalized invitation draft.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {isGenerating && (
                      <motion.div 
                        key="generating"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4 py-12 text-center"
                      >
                        <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-xs text-slate-400 tracking-wider uppercase font-semibold">Running matching matrix...</p>
                      </motion.div>
                    )}

                    {isGenerated && !isGenerating && (
                      <motion.div 
                        key="results"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-5"
                      >
                        {generationError ? (
                          <div className="bg-red-950/60 border border-red-500/30 text-red-100 p-4 rounded-xl text-sm leading-relaxed">
                            {generationError}
                          </div>
                        ) : null}

                        {/* Session Card Match */}
                        <div className="bg-slate-950/80 border border-indigo-500/20 p-5 rounded-xl">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 block mb-2">Invitation generated. Matched Session</span>
                          <h4 className="font-bold text-sm text-white leading-snug mb-1">{matchedSession?.title}</h4>
                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-400" /> {matchedSession?.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-3 border-t border-slate-900 pt-2 leading-relaxed">
                            <strong>Speaker:</strong> {matchedSession?.speaker}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            <strong>Session ID:</strong> {matchedSession?.session_id}
                          </p>
                        </div>

                        {/* Text Copy Area */}
                        <div>
                          <div className="flex flex-col mb-2 gap-1.5">
                            <span className="text-[10px] font-medium text-slate-400 leading-normal">Your invitation draft is based on verified session details from the official agenda.</span>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Invitation Draft</span>
                              <button 
                                type="button"
                                onClick={() => copyToClipboard(generatedDraft)}
                                className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 transition"
                              >
                                {copied ? (
                                  <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!</>
                                ) : (
                                  <><Copy className="w-3.5 h-3.5" /> Copy Draft</>
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="w-full bg-slate-950 rounded-xl p-4 text-[11px] font-mono text-slate-300 min-h-[250px] h-auto overflow-y-auto border border-slate-800 leading-relaxed scrollbar-thin whitespace-pre-wrap select-all">
                            {generatedDraft}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {isGenerated && (
                  <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-emerald-400 font-medium flex items-center gap-1.5 justify-center sm:justify-start">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> Track & Invite generation complete.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CORPORATE FOOTER --- */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-white font-black text-lg tracking-wider">Cogent Solutions™</h3>
            <p className="leading-relaxed">
              We engineer specialized analytical testing instances and corporate assessment deployments targeting structural clarity, continuous alignment matrices, and streamlined validation for premium enterprise operators globally.
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider">Global Operational Hubs</h4>
            <p className="leading-relaxed">
              Middle East: Metropolis Tower, Business Bay, Dubai, UAE <br />
              Asia Pacific: Green Lanka Tower, Colombo, Sri Lanka
            </p>
            <div className="flex gap-4 pt-1 font-semibold text-slate-300">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +971 4 576 1039</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider">Administrative Contacts</h4>
            <p className="text-blue-400 font-mono select-all">assessments@cogentsolutions.ae</p>
            <p className="text-slate-600 pt-6">
              © {new Date().getFullYear()} Cogent Solutions LLC. <br />All deployment layouts reserved.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
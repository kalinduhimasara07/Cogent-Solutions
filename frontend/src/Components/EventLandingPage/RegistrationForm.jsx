import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  ChevronRight, 
  Clock, 
  Sparkles, 
  MessageSquare, 
  Copy, 
  Check, 
  CheckCircle2 
} from 'lucide-react';

export default function RegistrationForm() {
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

  return (
    <section id="register" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Form Intake */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" /> Customized Access
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                Request a Personalized Invitation
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
                Share your details to receive a session recommendation and a personalized B2B invitation draft.
              </p>
 
              <form onSubmit={handleGenerateInvitation} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                    <input 
                      required 
                      type="text" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleInputChange} 
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden transition" 
                      placeholder="John Doe" 
                    />
                  </div>
                </div>
 
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Business Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                    <input 
                      required 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden transition" 
                      placeholder="corporate@company.com" 
                    />
                  </div>
                </div>
 
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Professional Priorities / Challenges</label>
                    <span className={`text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-sm ${formData.priorities.length >= 20 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'}`}>
                      {formData.priorities.length}/20 chars min
                    </span>
                  </div>
                  <textarea 
                    required
                    name="priorities"
                    rows={3}
                    value={formData.priorities}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden transition resize-none"
                    placeholder="e.g., Optimizing fleet routing overheads and adding visibility infrastructure..."
                  />
                  <p className="text-slate-400 dark:text-slate-500 text-[11px] mt-1.5">
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
 
            <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-normal mt-6 border-t border-slate-100 dark:border-slate-800 pt-4">
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
  );
}

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/layout/Navbar';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import {
  Sparkles,
  Check,
  X,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Heart,
  Bot
} from 'lucide-react';

export const PremiumPage: React.FC = () => {
  const { isLoggedIn, isPremium, togglePremium } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);

  const handleUpgrade = () => {
    togglePremium(!isPremium);
    setUpgradeSuccess(true);
    setTimeout(() => setUpgradeSuccess(false), 4000);
  };

  const faqs = [
    {
      q: 'What is included in the Gold Premium plan?',
      a: 'Gold Premium members receive extended 45-minute virtual video teleconsultations, priority booking slots with top specialists, 24/7 access to Personal Therapist bookings, advanced clinical AI diagnostic queries, and predictive health risk forecasting.'
    },
    {
      q: 'Can I cancel my subscription at any time?',
      a: 'Yes! You can cancel or pause your subscription anytime from your Profile & Settings page with zero cancellation fees.'
    },
    {
      q: 'Are virtual consultations with Gold doctors fully covered?',
      a: 'Gold members receive 2 free virtual consultations per month and a 30% discount on all subsequent specialist OPD visits and teleconsults.'
    },
    {
      q: 'How does the Personal Therapist booking work?',
      a: 'Gold members get direct access to our licensed psychotherapists for 1-on-1 virtual mental health sessions, stress reduction programs, and mood logging tools.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {isLoggedIn ? <Header /> : <Navbar />}

      <div className="flex-1 flex overflow-hidden">
        {isLoggedIn && <Sidebar />}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-10 bg-slate-950">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Sparkles className="w-4 h-4 fill-amber-400" />
              <span>LuminaCare Gold Tier</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Upgrade Your Family's Healthcare Experience
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unlock extended teleconsultations, priority appointment queues, clinical AI assistant queries, and personal therapist mental wellness access.
            </p>

            {/* Monthly / Yearly Toggle */}
            <div className="pt-4 flex items-center justify-center gap-3 text-xs">
              <span className={`font-semibold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>Monthly Billing</span>
              <button
                type="button"
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-12 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 p-0.5 transition"
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-amber-400 transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : ''
                  }`}
                />
              </button>
              <span className={`font-semibold flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-amber-300' : 'text-slate-400'}`}>
                Yearly Billing
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-slate-950">Save 35%</span>
              </span>
            </div>
          </div>

          {/* Upgrade Success Notification */}
          {upgradeSuccess && (
            <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs text-center font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              <span>{isPremium ? 'Congratulations! Gold Premium Subscription Active!' : 'Subscription switched back to Standard Free Tier.'}</span>
            </div>
          )}

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Free Tier */}
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Basic Tier</span>
                <div className="text-3xl font-extrabold text-white">
                  $0 <span className="text-xs font-normal text-slate-400">/ forever</span>
                </div>
                <p className="text-xs text-slate-400">Standard OPD scheduling and basic health logging.</p>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Standard OPD Appointment Scheduling</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> 15-Minute Virtual Video Consults</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Basic AI Health Assistant Chat</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Daily Vitals Tracker</li>
                  <li className="flex items-center gap-2 text-slate-500 line-through"><X className="w-4 h-4 shrink-0" /> Personal Therapist Access</li>
                  <li className="flex items-center gap-2 text-slate-500 line-through"><X className="w-4 h-4 shrink-0" /> Clinical AI Risk Diagnostics</li>
                </ul>
              </div>

              <button
                disabled={!isPremium}
                onClick={handleUpgrade}
                className="w-full py-3 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800 disabled:opacity-50"
              >
                {!isPremium ? 'Current Plan' : 'Downgrade to Free'}
              </button>
            </div>

            {/* Gold Premium Tier */}
            <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/40 border-2 border-amber-500/60 p-8 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                MOST POPULAR
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 fill-amber-400" />
                  Gold Membership
                </span>

                <div className="text-3xl font-extrabold text-white">
                  {billingCycle === 'monthly' ? '$19' : '$149'}
                  <span className="text-xs font-normal text-slate-400">
                    {billingCycle === 'monthly' ? ' / month' : ' / year'}
                  </span>
                </div>
                <p className="text-xs text-amber-200/80">Complete family health ecosystem with zero waiting times.</p>

                <ul className="space-y-2.5 text-xs text-slate-200 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> <strong>Extended 45-Minute</strong> Virtual Consults</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> <strong>2 Free Teleconsults</strong> Every Month</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> <strong>Personal Therapist</strong> 1-on-1 Access</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> <strong>Advanced AI Mode</strong> with Literature Refs</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> <strong>Predictive Risk Analytics</strong> & PDF Exports</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> <strong>Priority 24/7</strong> Specialist Queue</li>
                </ul>
              </div>

              <button
                onClick={handleUpgrade}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>{isPremium ? 'Active Gold Member (Click to Toggle)' : 'Upgrade to Gold Now'}</span>
              </button>
            </div>

          </div>

          {/* Feature Comparison Matrix */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
            <h3 className="font-bold text-white text-base text-center">Free vs Gold Feature Comparison</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-4">Feature</th>
                    <th className="py-3 px-4 text-center">Basic (Free)</th>
                    <th className="py-3 px-4 text-center text-amber-400 font-bold">Gold Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">OPD Booking</td>
                    <td className="text-center">Standard Queue</td>
                    <td className="text-center font-bold text-amber-400">Priority Pass</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Virtual Video Consult Duration</td>
                    <td className="text-center">15 Minutes</td>
                    <td className="text-center font-bold text-amber-400">45 Minutes</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Monthly Included Teleconsults</td>
                    <td className="text-center">0</td>
                    <td className="text-center font-bold text-amber-400">2 Free / Month</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Personal Therapy Booking Portal</td>
                    <td className="text-center text-slate-600"><X className="w-4 h-4 mx-auto" /></td>
                    <td className="text-center font-bold text-amber-400"><Check className="w-4 h-4 mx-auto text-amber-400" /></td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Advanced AI Clinical Mode</td>
                    <td className="text-center text-slate-600"><X className="w-4 h-4 mx-auto" /></td>
                    <td className="text-center font-bold text-amber-400"><Check className="w-4 h-4 mx-auto text-amber-400" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="font-bold text-white text-base text-center">Frequently Asked Questions</h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left font-semibold text-xs text-white flex items-center justify-between hover:bg-slate-800/50 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <p className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>

      {!isLoggedIn && <Footer />}
    </div>
  );
};

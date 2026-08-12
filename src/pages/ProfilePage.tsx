import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import {
  User,
  Mail,
  Phone,
  FileText,
  Shield,
  Sparkles,
  Bell,
  CheckCircle2,
  Save,
  AlertCircle
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { isLoggedIn, user, isPremium, togglePremium, updateProfile } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [medicalHistory, setMedicalHistory] = useState(user?.medicalHistory || '');
  const [allergies, setAllergies] = useState(user?.allergies || '');
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Notification toggles UI
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [reminderNotif, setReminderNotif] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      medicalHistory,
      allergies,
      emergencyContact
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {isLoggedIn ? <Header /> : <Navbar />}

      <div className="flex-1 flex overflow-hidden">
        {isLoggedIn && <Sidebar />}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-8 bg-slate-950">
          
          <div>
            <h1 className="text-2xl font-extrabold text-white">Patient Profile & Settings</h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage personal details, medical records, emergency contacts, and notifications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 8 cols: Profile Form */}
            <div className="lg:col-span-8 space-y-6">
              
              <form onSubmit={handleSave} className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h2 className="font-bold text-white text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>Personal & Contact Information</span>
                  </h2>

                  {savedSuccess && (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Profile Updated
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Emergency Contact</label>
                    <input
                      type="text"
                      value={emergencyContact}
                      onChange={e => setEmergencyContact(e.target.value)}
                      placeholder="Name (Relationship) - Phone"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <h3 className="font-bold text-white text-xs flex items-center gap-2">
                    <FileText className="w-4 h-4 text-teal-400" />
                    <span>Medical Profile & Allergies</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Known Allergies</label>
                      <input
                        type="text"
                        value={allergies}
                        onChange={e => setAllergies(e.target.value)}
                        placeholder="e.g., Penicillin, Peanuts, Pollen"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Past Medical History / Conditions</label>
                      <textarea
                        rows={3}
                        value={medicalHistory}
                        onChange={e => setMedicalHistory(e.target.value)}
                        placeholder="e.g., Mild asthma, seasonal allergies, hypertension"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold text-xs shadow-md hover:from-cyan-400 hover:to-teal-500 transition flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>

              </form>

            </div>

            {/* Right 4 cols: Subscription & Notification Toggles */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Subscription Card */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">Active Plan</h3>
                  {isPremium ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Gold
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      Standard
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {isPremium
                    ? 'You have full access to Gold Telehealth, Personal Therapy, and Advanced Clinical AI.'
                    : 'Basic Free plan with standard OPD appointment booking.'}
                </p>

                <button
                  onClick={() => togglePremium()}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
                >
                  {isPremium ? 'Cancel Gold Plan (Switch to Free)' : 'Upgrade to Gold Plan ($19/mo)'}
                </button>
              </div>

              {/* Notification Preferences */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cyan-400" />
                  <span>Notification Preferences</span>
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Appointment Reminders (SMS)</span>
                    <input
                      type="checkbox"
                      checked={smsNotif}
                      onChange={e => setSmsNotif(e.target.checked)}
                      className="w-4 h-4 accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Email Consult Receipts</span>
                    <input
                      type="checkbox"
                      checked={emailNotif}
                      onChange={e => setEmailNotif(e.target.checked)}
                      className="w-4 h-4 accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Daily Vitals Log Reminders</span>
                    <input
                      type="checkbox"
                      checked={reminderNotif}
                      onChange={e => setReminderNotif(e.target.checked)}
                      className="w-4 h-4 accent-cyan-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

      {!isLoggedIn && <Footer />}
    </div>
  );
};

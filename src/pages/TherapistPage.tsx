import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/layout/Navbar';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { mockTherapists } from '../data/mockData';
import {
  HeartHandshake,
  Sparkles,
  Lock,
  Star,
  Calendar,
  Clock,
  CheckCircle2,
  Smile,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const TherapistPage: React.FC = () => {
  const { isLoggedIn, isPremium, therapistBookings, bookTherapistSession } = useApp();
  const navigate = useNavigate();

  const [selectedTherapistId, setSelectedTherapistId] = useState<string>(mockTherapists[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-18');
  const [selectedTime, setSelectedTime] = useState<string>('03:00 PM');
  const [sessionNotes, setSessionNotes] = useState<string>('');
  const [bookedSuccess, setBookedSuccess] = useState<boolean>(false);

  const selectedTherapist = mockTherapists.find(t => t.id === selectedTherapistId) || mockTherapists[0];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    bookTherapistSession(
      selectedTherapist.id,
      selectedTherapist.name,
      selectedDate,
      selectedTime,
      sessionNotes || 'Mental wellness & stress management'
    );
    setBookedSuccess(true);
    setTimeout(() => setBookedSuccess(false), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {isLoggedIn ? <Header /> : <Navbar />}

      <div className="flex-1 flex overflow-hidden">
        {isLoggedIn && <Sidebar />}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-8 bg-slate-950">
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">Personal Therapist Portal</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Gold Exclusive
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Connect 1-on-1 with licensed psychotherapists for cognitive behavioral therapy, anxiety reduction, and personal stress coaching.
            </p>
          </div>

          {/* IF NOT PREMIUM: LOCKED UPSELL STATE */}
          {!isPremium ? (
            <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-slate-900 border-2 border-amber-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 mx-auto flex items-center justify-center">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white">Personal Therapy Access is Locked</h2>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Mental health support is available exclusively for Gold Premium members. Upgrade today to book 1-on-1 virtual sessions with licensed psychologists.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 text-left space-y-2 max-w-md mx-auto">
                <p className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Gold Therapy Highlights:
                </p>
                <ul className="space-y-1.5 text-slate-400 text-[11px]">
                  <li>• Licensed Psychologists & LMFT Counselors</li>
                  <li>• Confidential 45-Minute Encrypted Teletherapy</li>
                  <li>• Stress, Anxiety, Burnout & Relationship Coaching</li>
                </ul>
              </div>

              <button
                onClick={() => navigate('/premium')}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 transition inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Upgrade to Gold Premium ($19/mo)</span>
              </button>
            </div>
          ) : (
            
            /* UNLOCKED THERAPIST BOOKING VIEW */
            <div className="space-y-8">
              
              {/* Therapists Selector */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockTherapists.map(t => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTherapistId(t.id)}
                    className={`p-6 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-4 ${
                      selectedTherapistId === t.id
                        ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/40"
                      />
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {t.specialty}
                        </span>
                        <h3 className="font-bold text-white text-base">{t.name}</h3>
                        <p className="text-xs text-slate-400">{t.title}</p>
                        <div className="flex items-center gap-1 text-amber-400 font-bold text-xs pt-0.5">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{t.rating} ({t.reviewCount} sessions)</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{t.bio}</p>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Session Fee: <strong className="text-amber-300">$0 (Covered by Gold)</strong></span>
                      <span className="text-xs font-bold text-cyan-400">
                        {selectedTherapistId === t.id ? 'Selected Therapist ✓' : 'Click to Select'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Session Booking Form */}
              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="pb-3 border-b border-slate-800">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Schedule 1-on-1 Session with {selectedTherapist.name}</span>
                  </h3>
                </div>

                {bookedSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Therapy Session confirmed! Reminder sent to your notification center.</span>
                  </div>
                )}

                <form onSubmit={handleBook} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Session Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Available Time Slot</label>
                      <select
                        value={selectedTime}
                        onChange={e => setSelectedTime(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                      >
                        {selectedTherapist.availableSlots.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Session Notes / Focus Area</label>
                    <textarea
                      rows={3}
                      value={sessionNotes}
                      onChange={e => setSessionNotes(e.target.value)}
                      placeholder="e.g., Stress management, work-life balance, mindfulness exercises..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-extrabold text-xs shadow-md hover:brightness-110 transition flex items-center justify-center gap-2"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>Confirm Therapy Session</span>
                  </button>
                </form>
              </div>

              {/* Past Therapy History */}
              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
                <h3 className="font-bold text-white text-sm">Your Scheduled & Past Therapy Sessions</h3>

                {therapistBookings.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No therapy sessions booked yet. Schedule your first session above!</p>
                ) : (
                  <div className="space-y-3">
                    {therapistBookings.map(b => (
                      <div key={b.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <h4 className="font-bold text-white">{b.therapistName}</h4>
                          <p className="text-[11px] text-amber-400">{b.date} at {b.time}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{b.notes}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {b.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </main>
      </div>

      {!isLoggedIn && <Footer />}
    </div>
  );
};

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import {
  Calendar,
  Bot,
  Activity,
  Sparkles,
  Video,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Heart,
  Droplet,
  Moon,
  XCircle,
  Plus
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, isPremium, appointments, healthEntries, cancelAppointment } = useApp();
  const navigate = useNavigate();

  // Upcoming appointments
  const upcomingAppts = appointments.filter(a => a.status === 'Upcoming');
  const pastAppts = appointments.filter(a => a.status !== 'Upcoming');

  // Recent health entry
  const latestVitals = healthEntries[0] || {
    weightKg: 64.5,
    bpSystolic: 118,
    bpDiastolic: 76,
    bloodSugarMgDl: 95,
    sleepHours: 7.5,
    waterIntakeLiters: 2.8,
    mood: 'Good'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-8 bg-slate-950">
          
          {/* Welcome Header */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-full bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'}
                  alt={user?.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-cyan-500/30"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                      Hello, {user?.name || 'Sarah Jenkins'} 👋
                    </h1>
                    {isPremium ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Gold Plan
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        Standard Plan
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    Patient ID: <span className="font-mono text-slate-300">LUM-77291</span> • Blood Type: {user?.bloodType || 'O+'}
                  </p>
                  <p className="text-xs text-slate-300">
                    Medical Note: {user?.medicalHistory || 'No major acute conditions logged.'}
                  </p>
                </div>
              </div>

              {!isPremium && (
                <button
                  onClick={() => navigate('/premium')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 transition flex items-center gap-2 shrink-0"
                >
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>Unlock Gold Subscription</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <button
              onClick={() => navigate('/book-appointment')}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left transition space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Book Appointment</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">OPD & Virtual Consultations</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/ai-assistant')}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-left transition space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Start AI Health Chat</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Instant Symptom Analysis</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/health-tracker')}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-left transition space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Log Daily Vitals</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">BP, Sugar, Sleep & Water</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/premium')}
              className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 hover:border-amber-400 text-left transition space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-amber-300 text-sm">Gold Membership</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Therapy & Extended Consults</p>
              </div>
            </button>

          </div>

          {/* Main Grid Section: Upcoming Appointments + Vitals Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 cols: Upcoming Appointments */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">Upcoming Appointments</h2>
                  <p className="text-xs text-slate-400">Scheduled consultations and doctor visits</p>
                </div>
                <Link
                  to="/book-appointment"
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Book New</span>
                </Link>
              </div>

              {upcomingAppts.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
                  <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm font-semibold text-slate-300">No upcoming consultations scheduled.</p>
                  <p className="text-xs text-slate-500">Select a specialist and pick your preferred time slot.</p>
                  <button
                    onClick={() => navigate('/doctors')}
                    className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-semibold text-xs"
                  >
                    Find Doctor & Schedule
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingAppts.map(appt => (
                    <div
                      key={appt.id}
                      className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={appt.doctorPhoto}
                          alt={appt.doctorName}
                          className="w-12 h-12 rounded-xl object-cover ring-2 ring-cyan-500/40"
                        />
                        <div className="space-y-0.5">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400">
                            {appt.type === 'online' ? 'Virtual Video Consult' : 'In-Person OPD'}
                          </span>
                          <h4 className="font-bold text-white text-sm">{appt.doctorName}</h4>
                          <p className="text-xs text-slate-400">{appt.doctorSpecialty}</p>
                          <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-1">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{appt.date} at {appt.time}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                        {appt.type === 'online' ? (
                          <button
                            onClick={() => navigate(`/consultation/${appt.id}`)}
                            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white text-xs font-bold shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-teal-500 transition flex items-center justify-center gap-1.5"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Join Video Call</span>
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                            Branch: {appt.hospitalBranch || 'Central Pavilion'}
                          </span>
                        )}

                        <button
                          onClick={() => cancelAppointment(appt.id)}
                          className="text-[11px] text-rose-400 hover:underline flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          <span>Cancel Booking</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right 5 cols: Health Summary Widget */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">Health Score & Vitals</h2>
                <Link to="/health-tracker" className="text-xs text-cyan-400 hover:underline">
                  View Analytics
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                
                {/* Score Ring Simulation */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Overall Health Score</span>
                    <div className="text-3xl font-extrabold text-white flex items-center gap-2">
                      92 <span className="text-xs font-normal text-emerald-400 font-mono">/ 100</span>
                    </div>
                    <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> Optimal Condition
                    </p>
                  </div>

                  <div className="w-16 h-16 rounded-full border-4 border-cyan-500 border-t-emerald-400 flex items-center justify-center font-bold text-cyan-300 text-sm bg-cyan-950/20">
                    92%
                  </div>
                </div>

                {/* Vitals Breakdown */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
                      <Heart className="w-3.5 h-3.5" />
                      <span>Blood Pressure</span>
                    </div>
                    <p className="text-base font-bold text-white">{latestVitals.bpSystolic}/{latestVitals.bpDiastolic} <span className="text-[10px] text-slate-400 font-normal">mmHg</span></p>
                    <p className="text-[10px] text-emerald-400">Normal Range</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-400 font-semibold">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Blood Sugar</span>
                    </div>
                    <p className="text-base font-bold text-white">{latestVitals.bloodSugarMgDl} <span className="text-[10px] text-slate-400 font-normal">mg/dL</span></p>
                    <p className="text-[10px] text-emerald-400">Fasting Normal</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                      <Moon className="w-3.5 h-3.5" />
                      <span>Sleep Quality</span>
                    </div>
                    <p className="text-base font-bold text-white">{latestVitals.sleepHours} <span className="text-[10px] text-slate-400 font-normal">hrs</span></p>
                    <p className="text-[10px] text-emerald-400">Restful</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                      <Droplet className="w-3.5 h-3.5" />
                      <span>Water Intake</span>
                    </div>
                    <p className="text-base font-bold text-white">{latestVitals.waterIntakeLiters} <span className="text-[10px] text-slate-400 font-normal">L</span></p>
                    <p className="text-[10px] text-cyan-400">Hydrated</p>
                  </div>

                </div>

                <button
                  onClick={() => navigate('/health-tracker')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
                >
                  Log New Vitals Entry
                </button>

              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

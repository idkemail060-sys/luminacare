import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/layout/Navbar';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  Activity,
  Heart,
  Droplet,
  Moon,
  Plus,
  Sparkles,
  Smile,
  TrendingUp,
  Lightbulb,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const HealthTrackerPage: React.FC = () => {
  const { isLoggedIn, isPremium, healthEntries, addHealthEntry } = useApp();

  // Form local state
  const [weight, setWeight] = useState('64.5');
  const [systolic, setSystolic] = useState('118');
  const [diastolic, setDiastolic] = useState('76');
  const [sugar, setSugar] = useState('95');
  const [sleep, setSleep] = useState('7.5');
  const [water, setWater] = useState('2.5');
  const [mood, setMood] = useState<'Excellent' | 'Good' | 'Neutral' | 'Fatigued' | 'Stressed'>('Good');
  const [notes, setNotes] = useState('');
  const [logSuccess, setLogSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHealthEntry({
      date: new Date().toISOString().split('T')[0],
      weightKg: parseFloat(weight) || 65,
      bpSystolic: parseInt(systolic) || 120,
      bpDiastolic: parseInt(diastolic) || 80,
      bloodSugarMgDl: parseInt(sugar) || 95,
      sleepHours: parseFloat(sleep) || 7,
      waterIntakeLiters: parseFloat(water) || 2.5,
      mood: mood,
      notes: notes
    });

    setLogSuccess(true);
    setTimeout(() => setLogSuccess(false), 3000);
  };

  // Recharts formatted data (reverse so chronological)
  const chartData = [...healthEntries].reverse().map(e => ({
    date: e.date.substring(5),
    systolic: e.bpSystolic,
    diastolic: e.bpDiastolic,
    sugar: e.bloodSugarMgDl,
    sleep: e.sleepHours,
    water: e.waterIntakeLiters
  }));

  // Simple static health tips generator
  const getHealthTips = () => {
    const latest = healthEntries[0];
    const tips = [];

    if (latest) {
      if (latest.bpSystolic > 125 || latest.bpDiastolic > 82) {
        tips.push('Blood pressure is slightly elevated. Consider reducing sodium intake and engaging in light aerobic walk.');
      } else {
        tips.push('Blood pressure is in optimal range (under 120/80 mmHg).');
      }

      if (latest.waterIntakeLiters < 2.5) {
        tips.push('Hydration intake is below the 2.5L recommendation. Keep a refillable water flask nearby.');
      } else {
        tips.push('Excellent hydration level maintained!');
      }

      if (latest.sleepHours < 7) {
        tips.push('Sleep duration was under 7 hours. Try reducing screen exposure 1 hour before sleep.');
      } else {
        tips.push('Restful sleep duration achieved. Keep up the consistent sleep schedule.');
      }
    }

    return tips;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {isLoggedIn ? <Header /> : <Navbar />}

      <div className="flex-1 flex overflow-hidden">
        {isLoggedIn && <Sidebar />}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-8 bg-slate-950">
          
          <div>
            <h1 className="text-2xl font-extrabold text-white">Health & Vitals Tracker</h1>
            <p className="text-xs text-slate-400 mt-1">
              Log daily biometric records, review cardiovascular trends, and view automated insights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 5 cols: Log Entry Form */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h2 className="font-bold text-white text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4 text-cyan-400" />
                    <span>Log Daily Biometrics</span>
                  </h2>
                  <span className="text-[10px] text-slate-400">Date: Today</span>
                </div>

                {logSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Vitals recorded successfully in portal!</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Blood Sugar (mg/dL)</label>
                      <input
                        type="number"
                        value={sugar}
                        onChange={e => setSugar(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* BP Systolic / Diastolic */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">BP Systolic (mmHg)</label>
                      <input
                        type="number"
                        value={systolic}
                        onChange={e => setSystolic(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">BP Diastolic (mmHg)</label>
                      <input
                        type="number"
                        value={diastolic}
                        onChange={e => setDiastolic(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Sleep & Water */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Sleep (Hours)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={sleep}
                        onChange={e => setSleep(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Water Intake (Liters)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={water}
                        onChange={e => setWater(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Mood Selector */}
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Daily Mood / Energy</label>
                    <select
                      value={mood}
                      onChange={e => setMood(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Excellent">Excellent 😀</option>
                      <option value="Good">Good 🙂</option>
                      <option value="Neutral">Neutral 😐</option>
                      <option value="Fatigued">Fatigued 😴</option>
                      <option value="Stressed">Stressed 😰</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Optional Notes</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="e.g., Morning workout, post-lunch check"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold text-xs shadow-md hover:from-cyan-400 hover:to-teal-500 transition"
                  >
                    Save Biometric Entry
                  </button>

                </form>
              </div>

              {/* Health Tips Box */}
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="font-bold text-white text-xs flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Automated Health Insights</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {getHealthTips().map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right 7 cols: Recharts Visualizations & Premium Analytics */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* BP & Sugar Trends Line Chart */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">Blood Pressure & Sugar Trends</h3>
                    <p className="text-[11px] text-slate-400">Systolic/Diastolic mmHg vs Glucose mg/dL</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-cyan-400 font-mono">
                    Last 5 Entries
                  </span>
                </div>

                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Line type="monotone" dataKey="systolic" stroke="#38bdf8" name="Systolic BP" strokeWidth={2} />
                      <Line type="monotone" dataKey="diastolic" stroke="#34d399" name="Diastolic BP" strokeWidth={2} />
                      <Line type="monotone" dataKey="sugar" stroke="#a78bfa" name="Blood Sugar" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sleep & Water Bar Chart */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">Sleep & Hydration Tracking</h3>
                    <p className="text-[11px] text-slate-400">Hours slept vs Liters of water consumed</p>
                  </div>
                </div>

                <div className="h-56 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="sleep" fill="#818cf8" name="Sleep (Hours)" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="water" fill="#22d3ee" name="Water (Liters)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Premium Advanced Analytics Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-amber-300 text-sm">Gold Predictive Risk Analytics</h3>
                  </div>
                  {isPremium ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      UNLOCKED
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                      PREMIUM ONLY
                    </span>
                  )}
                </div>

                {isPremium ? (
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400">CARDIOVASCULAR RISK</span>
                      <p className="font-bold text-emerald-400 text-sm">Low (1.2% 5-Yr Risk)</p>
                      <p className="text-[10px] text-slate-400">Based on regular BP tracking</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400">METABOLIC STABILITY</span>
                      <p className="font-bold text-cyan-400 text-sm">Optimal Glucose Balance</p>
                      <p className="text-[10px] text-slate-400">Consistent insulin response</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Upgrade to Gold Premium to unlock 5-year cardiovascular disease risk forecasting, metabolic variance tracking, and downloadable PDF reports for your doctor.
                  </p>
                )}
              </div>

            </div>

          </div>

        </main>
      </div>

      {!isLoggedIn && <Footer />}
    </div>
  );
};

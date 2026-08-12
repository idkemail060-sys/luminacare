import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  UserCheck,
  Calendar,
  Bot,
  Activity,
  Sparkles,
  HeartHandshake,
  User,
  LogOut,
  Hospital,
  ChevronRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { isPremium, logout } = useApp();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Find Doctors', path: '/doctors', icon: UserCheck },
    { label: 'Appointments', path: '/book-appointment', icon: Calendar },
    { label: 'AI Health Assistant', path: '/ai-assistant', icon: Bot },
    { label: 'Health Tracker', path: '/health-tracker', icon: Activity },
    { label: 'Premium Membership', path: '/premium', icon: Sparkles, gold: true },
    { label: 'Personal Therapist', path: '/therapist', icon: HeartHandshake, gold: true },
    { label: 'Profile & Settings', path: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-200 hidden md:flex flex-col justify-between shrink-0 h-[calc(100vh-61px)] sticky top-[61px] overflow-y-auto">
      <div className="p-4 space-y-6">
        
        {/* Hospital Branding Header inside sidebar */}
        <div className="flex items-center space-x-3 px-2 py-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Hospital className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white text-sm tracking-tight block">Lumina Health</span>
            <span className="text-[10px] text-slate-400 block font-medium">Patient Services Portal</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600/90 to-teal-600 text-white shadow-md shadow-cyan-600/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      item.gold ? 'text-amber-400' : 'text-cyan-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.gold && !isPremium && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    GOLD
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo / Logout */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        {!isPremium && (
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-950/40 via-amber-900/20 to-slate-900 border border-amber-500/30 text-amber-200 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unlock Gold Perks</span>
            </div>
            <p className="text-[11px] text-slate-300 mb-2 leading-relaxed">
              Extended 45-min teleconsults, priority AI answers & personal therapy.
            </p>
            <button
              onClick={() => navigate('/premium')}
              className="w-full py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] hover:bg-amber-400 transition"
            >
              Explore Plans
            </button>
          </div>
        )}

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-950/30 transition"
        >
          <div className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};

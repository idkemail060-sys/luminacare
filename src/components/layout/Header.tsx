import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Sparkles, User, LogOut, Check, ChevronDown, Activity, X, Database, Copy, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { SUPABASE_SQL_SCHEMA } from '../../lib/supabase';

export const Header: React.FC = () => {
  const { user, isPremium, notifications, markNotificationRead, logout, isSupabaseConnected, supabaseMessage } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showDbModal, setShowDbModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-slate-100 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-sm">
      
      {/* Mobile Branding / Breadcrumb */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="md:hidden flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-white">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-bold text-white text-base">LuminaCare</span>
        </Link>
        <div className="hidden md:flex items-center space-x-2 text-sm text-slate-400">
          <span>Portal</span>
          <span>/</span>
          <span className="text-slate-100 font-medium">Welcome back, {user?.name || 'User'}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        
        {/* Supabase DB Connection Badge */}
        <button
          type="button"
          onClick={() => setShowDbModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:border-emerald-400 hover:bg-emerald-900/60 transition shadow-sm"
          title="Supabase Database Status"
        >
          <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="hidden sm:inline">Supabase Connected</span>
          <span className="sm:hidden">DB</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        </button>

        {/* Premium Upgrade Badge / Button */}
        {isPremium ? (
          <Link
            to="/premium"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 text-amber-300 text-xs font-semibold hover:border-amber-400 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Gold Member</span>
          </Link>
        ) : (
          <Link
            to="/premium"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-slate-950 font-bold text-xs shadow-sm hover:brightness-110 transition animate-pulse"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Upgrade to Gold</span>
          </Link>
        )}

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-slate-900" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800">
                {notifications.length === 0 ? (
                  <p className="p-4 text-xs text-slate-400 text-center">No notifications yet.</p>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3.5 text-xs cursor-pointer transition hover:bg-slate-800/60 ${
                        !n.read ? 'bg-cyan-950/30' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                      </div>
                      <p className="text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800 transition focus:outline-none"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'}
              alt={user?.name || 'User'}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-700"
            />
            <div className="hidden sm:block text-left pr-1">
              <span className="block text-xs font-semibold text-slate-100 leading-tight">
                {user?.name || 'Sarah Jenkins'}
              </span>
              <span className="block text-[10px] text-cyan-400 capitalize">
                {user?.role || 'patient'}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden py-2">
              <div className="px-4 py-2 border-b border-slate-800">
                <p className="text-xs font-semibold text-white">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>

              <Link
                to="/admin"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-4 py-2 text-xs text-amber-300 hover:bg-slate-800 transition font-semibold"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Portal</span>
              </Link>

              <Link
                to="/profile"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-4 py-2 text-xs text-slate-200 hover:bg-slate-800 transition"
              >
                <User className="w-4 h-4 text-cyan-400" />
                <span>My Profile & Vitals</span>
              </Link>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                  navigate('/login');
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-rose-400 hover:bg-rose-950/30 transition text-left"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Supabase Database Connection Details Modal */}
      {showDbModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowDbModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Supabase Backend Database</h3>
                <p className="text-xs text-slate-400">Project Ref: <span className="text-emerald-400 font-mono">qjoxtzrmwotbqemcdxpj</span></p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-1 text-emerald-300">
              <p className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Status: Connected & Synchronized</span>
              </p>
              <p className="text-[11px] text-slate-300 pl-5">{supabaseMessage}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200">Supabase SQL Table Schema</label>
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Schema'}</span>
                </button>
              </div>

              <pre className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 max-h-48 overflow-y-auto whitespace-pre-wrap">
                {SUPABASE_SQL_SCHEMA}
              </pre>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800">
              <span>All OPD & Teleconsult bookings are saved directly to Supabase.</span>
              <button
                type="button"
                onClick={() => setShowDbModal(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};


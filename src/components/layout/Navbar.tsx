import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Activity, Calendar, ShieldCheck, User, Menu, X, Sparkles, Phone, LogIn } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isLoggedIn, user, isPremium, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Activity className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                LuminaCare
              </span>
              <span className="block text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                Health & Hospital System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/home"
              className={`text-sm font-medium transition-colors ${
                isActive('/home') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/doctors"
              className={`text-sm font-medium transition-colors ${
                isActive('/doctors') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Find Doctors
            </Link>
            <Link
              to="/ai-assistant"
              className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/ai-assistant') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              AI Health Bot
            </Link>
            <Link
              to="/premium"
              className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/premium') ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-amber-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              Premium Plans
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:1800586462"
              className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Emergency Hotline: <strong>1-800-LUMINA</strong></span>
            </a>

            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                {isPremium && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    GOLD MEMBER
                  </span>
                )}
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-medium text-sm shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-teal-500 transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  <span>My Portal</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <LogIn className="w-4 h-4 text-cyan-400" />
                  Login / Signup
                </Link>
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-medium text-sm shadow-md shadow-cyan-500/25 hover:opacity-95 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-4 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            to="/doctors"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Find Doctors
          </Link>
          <Link
            to="/ai-assistant"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            AI Health Bot
          </Link>
          <Link
            to="/premium"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-amber-400 hover:bg-slate-800"
          >
            Premium Plans
          </Link>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block px-4 py-3 rounded-xl bg-cyan-600 text-white font-medium"
              >
                Go to Portal Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center block px-4 py-2.5 rounded-xl border border-slate-700 text-slate-200 font-medium"
                >
                  Login / Signup
                </Link>
                <Link
                  to="/book-appointment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center block px-4 py-2.5 rounded-xl bg-cyan-600 text-white font-medium"
                >
                  Book Appointment
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

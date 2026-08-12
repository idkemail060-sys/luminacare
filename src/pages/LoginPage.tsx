import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { UserRole } from '../types';
import {
  Activity,
  Lock,
  Mail,
  Phone,
  User as UserIcon,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Sparkles,
  Compass,
  X
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<UserRole>('patient');
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [showGoogleModal, setShowGoogleModal] = useState<boolean>(false);
  const [googleEmailInput, setGoogleEmailInput] = useState<string>('idkemail060@gmail.com');

  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [forgotSuccess, setForgotSuccess] = useState<boolean>(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (isSignup) {
      if (!name || !phone) {
        setError('Please provide your full name and phone number.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    // Perform email login
    login(
      {
        name: name || (activeTab === 'doctor' ? 'Dr. Evelyn Vance' : 'Sarah Jenkins'),
        email: email,
        phone: phone || '+1 (555) 234-5678'
      },
      activeTab
    );
    navigate('/dashboard');
  };

  const handleGoogleLoginSubmit = (selectedEmail?: string) => {
    const finalEmail = selectedEmail || googleEmailInput || 'idkemail060@gmail.com';
    const googleName = finalEmail.split('@')[0].replace('.', ' ');
    const formattedName = googleName.charAt(0).toUpperCase() + googleName.slice(1);

    login(
      {
        name: formattedName || 'Google User',
        email: finalEmail,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
      },
      activeTab
    );
    setShowGoogleModal(false);
    navigate('/dashboard');
  };

  const handleDemoLogin = (role: UserRole) => {
    login({}, role);
    navigate('/dashboard');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setShowForgotModal(false);
      setForgotEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-500 mx-auto flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 mb-3">
              <Activity className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              {isSignup ? 'Create Lumina Account' : 'Welcome to LuminaCare'}
            </h1>
            <p className="text-xs text-slate-400">
              {isSignup
                ? 'Register with Email or Google to access medical records & OPD services'
                : 'Sign in with your Email or Google account to access your portal'}
            </p>
          </div>

          {/* Patient vs Doctor Tab Switch */}
          <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-slate-950 border border-slate-800 mb-5">
            <button
              type="button"
              onClick={() => setActiveTab('patient')}
              className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'patient'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Patient Login</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('doctor')}
              className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'doctor'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Doctor Portal</span>
            </button>
          </div>

          {/* Quick Reviewer Demo Shortcuts */}
          <div className="mb-5 p-3 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs space-y-2">
            <div className="flex items-center justify-between text-cyan-300 font-semibold">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Quick Reviewer Demo Mode
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('patient')}
                className="py-1.5 px-2 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-500/30 font-semibold text-[11px] transition text-center"
              >
                Demo Patient
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('doctor')}
                className="py-1.5 px-2 rounded-xl bg-teal-600/30 hover:bg-teal-600/50 text-teal-200 border border-teal-500/30 font-semibold text-[11px] transition text-center"
              >
                Demo Doctor
              </button>
            </div>
          </div>

          {/* GOOGLE SIGN-IN OPTION */}
          <div className="space-y-3 mb-5">
            <button
              type="button"
              onClick={() => setShowGoogleModal(true)}
              className="w-full py-3 px-4 rounded-2xl bg-slate-950 border border-slate-700 hover:border-slate-500 text-slate-100 font-semibold text-xs shadow-md transition-all duration-200 flex items-center justify-center gap-3 hover:bg-slate-800/80 group"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* DIVIDER */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-900 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
                Or Continue with Email
              </span>
              <div className="border-t border-slate-800 w-full" />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {/* EMAIL LOGIN / SIGNUP FORM */}
          <form onSubmit={handleEmailSubmit} className="space-y-3.5 text-xs">
            {isSignup && (
              <>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder={activeTab === 'doctor' ? 'Dr. Jane Doe' : 'Sarah Jenkins'}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-slate-300 font-medium mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={activeTab === 'doctor' ? 'doctor@lumina.health' : 'patient@example.com'}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-medium">Password</label>
                {!isSignup && (
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {isSignup && (
              <div>
                <label className="block text-slate-300 font-medium mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-teal-500 transition flex items-center justify-center gap-2"
            >
              <span>{isSignup ? 'Register with Email' : `Sign In as ${activeTab === 'doctor' ? 'Doctor' : 'Patient'}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Signup/Login */}
          <div className="mt-5 pt-3 border-t border-slate-800 text-center space-y-2">
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
              }}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              {isSignup ? (
                <>Already have an account? <span className="text-cyan-400 font-bold">Log in with Email</span></>
              ) : (
                <>New to Lumina Health? <span className="text-cyan-400 font-bold">Create account with Email</span></>
              )}
            </button>

            {/* Link to Home page */}
            <div>
              <Link
                to="/home"
                className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition"
              >
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Explore Hospital Homepage first →</span>
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Google Account Selection Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-sm space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <h3 className="font-bold text-white text-base">Sign in with Google</h3>
              <p className="text-xs text-slate-400">Choose an account to continue to LuminaCare</p>
            </div>

            {/* Suggested Google Account option */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleGoogleLoginSubmit('idkemail060@gmail.com')}
                className="w-full p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between transition text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-xs">
                    I
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white group-hover:text-cyan-300">idkemail060@gmail.com</p>
                    <p className="text-[10px] text-slate-400">Connected Google Account</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
              </button>
            </div>

            {/* Custom Google Email Option */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="block text-[11px] text-slate-400">Or use another Google email address:</label>
              <input
                type="email"
                value={googleEmailInput}
                onChange={e => setGoogleEmailInput(e.target.value)}
                placeholder="you@gmail.com"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => handleGoogleLoginSubmit(googleEmailInput)}
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition"
              >
                Continue as {googleEmailInput || 'Google User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-sm space-y-4">
            <h3 className="font-bold text-white text-base">Reset Your Password</h3>
            <p className="text-xs text-slate-400">
              Enter your registered email address to receive password reset instructions.
            </p>

            {forgotSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Reset link dispatched to {forgotEmail}!</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import {
  Calendar,
  Video,
  Bot,
  Activity,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Star,
  Heart,
  Stethoscope
} from 'lucide-react';
import { mockDoctors } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'OPD Appointment Booking',
      description: 'Schedule in-person consultations with world-class specialists with zero queue waiting time.',
      icon: Calendar,
      color: 'from-cyan-500/20 to-teal-500/20 text-cyan-400 border-cyan-500/30',
      link: '/book-appointment'
    },
    {
      title: 'HD Teleconsultation',
      description: 'Connect via end-to-end encrypted video calls with top physicians from the comfort of home.',
      icon: Video,
      color: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30',
      link: '/consultation'
    },
    {
      title: '24/7 AI Health Assistant',
      description: 'Get instant, evidence-backed preliminary symptom insights and wellness guidance anytime.',
      icon: Bot,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      link: '/ai-assistant'
    },
    {
      title: 'Daily Vitals Tracker',
      description: 'Log BP, blood sugar, sleep, and water intake with interactive trend charts and automated tips.',
      icon: Activity,
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
      link: '/health-tracker'
    },
    {
      title: 'Gold Premium Subscription',
      description: 'Enjoy extended 45-minute virtual consults, priority doctor slots, and Personal Therapy access.',
      icon: Sparkles,
      color: 'from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30',
      link: '/premium'
    },
    {
      title: 'Personal Therapy Portal',
      description: 'Book 1-on-1 sessions with licensed psychotherapists for stress, anxiety, and mental wellness.',
      icon: Heart,
      color: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30',
      link: '/therapist'
    }
  ];

  const stats = [
    { label: 'Specialist Doctors', value: '500+', icon: Users },
    { label: 'Patients Served', value: '150,000+', icon: Heart },
    { label: 'Years of Service', value: '25+', icon: Award },
    { label: 'Patient Satisfaction', value: '99.2%', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Next-Generation Healthcare Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Compassionate Care Powered by <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Medical Innovation</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Experience seamless hospital visits, instant HD virtual consultations, 24/7 AI health assistant guidance, and personal vitals tracking — all under one unified healthcare portal.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => navigate('/book-appointment')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold text-base shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-teal-500 transition-all duration-200"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book OPD Appointment</span>
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 font-semibold text-base hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span>Login / Signup Portal</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 border-t border-slate-800/80">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  No Long OPD Waiting Lines
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  Encrypted Video Consultations
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  Board-Certified Doctors
                </span>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl p-6 space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
                      alt="Dr. Evelyn Vance"
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-cyan-500"
                    />
                    <div>
                      <h3 className="font-bold text-white text-sm">Dr. Evelyn Vance</h3>
                      <p className="text-xs text-cyan-400">Cardiology Specialist</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Available Now
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Next Video Consultation:</span>
                    <span className="font-semibold text-cyan-300">Today @ 10:30 AM</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Lumina AI Symptom Analysis:</span>
                    <span className="font-semibold text-emerald-400">Optimal Vitals</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/doctors/doc-1')}
                  className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>View Doctor Profile & Book</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-16 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Our Aim & Philosophy</h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Transforming Healthcare Access with Technology & Empathy
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              At Lumina Health System, our mission is to eliminate barriers to quality medical care. We integrate world-class clinical expertise with state-of-the-art telehealth, smart diagnostic AI, and continuous vitals tracking to ensure every patient receives prompt, accurate, and personalized healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-base">Uncompromised Clinical Quality</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every doctor in our network undergoes rigorous credentialing and peer reviews to deliver internationally recognized standards of medical care.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-base">24/7 Digital Accessibility</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Whether you need a late-night AI symptom query or an urgent morning OPD slot, our platform operates round-the-clock for your convenience.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-base">Holistic Mind & Body Care</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We treat the whole person — combining physical specialists, cardiology, neurology, and continuous mental health therapy support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2 hover:border-cyan-500/50 transition">
                  <Icon className="w-8 h-8 text-cyan-400 mx-auto" />
                  <div className="text-3xl font-extrabold text-white">{st.value}</div>
                  <div className="text-xs font-medium text-slate-400">{st.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Comprehensive Hospital Portal</h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Our Core Healthcare Modules</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-cyan-500/40 transition group"
                >
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.color} border flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                      {svc.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  <Link
                    to={svc.link}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    <span>Explore Module</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED DOCTORS PREVIEW */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Top Specialists</h2>
              <h3 className="text-2xl font-bold text-white">Consult Our Renowned Physicians</h3>
            </div>
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800"
            >
              <span>View All 500+ Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockDoctors.slice(0, 4).map(doc => (
              <div key={doc.id} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 transition">
                <div>
                  <img src={doc.photo} alt={doc.name} className="w-full h-48 object-cover" />
                  <div className="p-4 space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {doc.specialization}
                    </span>
                    <h4 className="font-bold text-white text-base leading-snug">{doc.name}</h4>
                    <p className="text-xs text-slate-400">{doc.qualification}</p>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {doc.rating} ({doc.reviewCount})
                      </span>
                      <span className="text-slate-300 font-semibold">${doc.fee} / consult</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => navigate(`/doctors/${doc.id}`)}
                    className="w-full py-2.5 rounded-xl bg-cyan-600/90 hover:bg-cyan-500 text-white font-semibold text-xs transition"
                  >
                    View Availability & Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMERGENCY BANNER */}
      <section className="py-12 bg-gradient-to-r from-cyan-950 via-teal-950 to-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold">
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>24/7 Trauma & Emergency Helpline</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">In Need of Immediate Medical Attention?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Our trauma team and emergency ambulances are available round the clock. Call our direct hotline or visit our Central Pavilion.
          </p>
          <div className="pt-2">
            <a
              href="tel:1800586462"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-base shadow-lg shadow-rose-600/30 transition"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Call Emergency: 1-800-LUMINA</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

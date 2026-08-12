import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Phone, Mail, MapPin, Shield, Clock, Heart, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                LuminaCare Health System
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Delivering patient-centric, technology-driven medical care. From OPD scheduling to virtual teleconsultations and intelligent AI diagnostics, we ensure comprehensive care for every family.
            </p>
            <div className="flex items-center gap-4 text-slate-300 font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>JCI Accredited</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/book-appointment" className="hover:text-cyan-400 transition">OPD Appointments</Link></li>
              <li><Link to="/consultation" className="hover:text-cyan-400 transition">Online Video Consult</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-cyan-400 transition">AI Health Assistant</Link></li>
              <li><Link to="/health-tracker" className="hover:text-cyan-400 transition">Vitals Health Tracker</Link></li>
              <li><Link to="/therapist" className="hover:text-amber-400 transition">Personal Therapy</Link></li>
            </ul>
          </div>

          {/* Col 3: Departments */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm">Specialties</h4>
            <ul className="space-y-2">
              <li><Link to="/doctors?specialty=Cardiology" className="hover:text-cyan-400 transition">Cardiology & Heart</Link></li>
              <li><Link to="/doctors?specialty=Neurology" className="hover:text-cyan-400 transition">Neurology & Brain</Link></li>
              <li><Link to="/doctors?specialty=Pediatrics" className="hover:text-cyan-400 transition">Pediatrics & Child Care</Link></li>
              <li><Link to="/doctors?specialty=Dermatology" className="hover:text-cyan-400 transition">Dermatology & Skin</Link></li>
              <li><Link to="/doctors?specialty=Orthopedics" className="hover:text-cyan-400 transition">Orthopedics & Joint</Link></li>
            </ul>
          </div>

          {/* Col 4: Emergency & Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm">Emergency & Contact</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Emergency: <strong>1-800-LUMINA (586462)</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>support@lumina.health</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>750 Medical Center Boulevard, Metro Science District</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>24/7 Trauma & Emergency OPD Open</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} LuminaCare Health System. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-slate-200">Privacy Policy</a>
            <a href="#" className="hover:text-slate-200">Terms of Service</a>
            <a href="#" className="hover:text-slate-200">Patient Rights</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

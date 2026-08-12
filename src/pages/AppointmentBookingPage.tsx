import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/layout/Navbar';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { mockDoctors } from '../data/mockData';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  UserCheck,
  CheckCircle2,
  FileText,
  Building2,
  QrCode,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const AppointmentBookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isLoggedIn, addAppointment } = useApp();
  const navigate = useNavigate();

  const docIdParam = searchParams.get('doctorId');
  const slotParam = searchParams.get('slot');

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(docIdParam || mockDoctors[0].id);
  const [consultType, setConsultType] = useState<'in-person' | 'online'>('online');
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-16');
  const [selectedSlot, setSelectedSlot] = useState<string>(slotParam || '10:30 AM');
  const [symptoms, setSymptoms] = useState<string>('');
  const [confirmedApptId, setConfirmedApptId] = useState<string | null>(null);

  const selectedDoctor = mockDoctors.find(d => d.id === selectedDoctorId) || mockDoctors[0];

  useEffect(() => {
    if (docIdParam) {
      setSelectedDoctorId(docIdParam);
    }
    if (slotParam) {
      setSelectedSlot(slotParam);
    }
  }, [docIdParam, slotParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const apptId = addAppointment({
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialization,
      doctorPhoto: selectedDoctor.photo,
      date: selectedDate,
      time: selectedSlot,
      type: consultType,
      symptoms: symptoms || 'General routine consultation.',
      status: 'Upcoming',
      hospitalBranch: selectedDoctor.hospitalBranch,
      consultationFee: selectedDoctor.fee
    });

    setConfirmedApptId(apptId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {isLoggedIn ? <Header /> : <Navbar />}

      <div className="flex-1 flex overflow-hidden">
        {isLoggedIn && <Sidebar />}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-8 bg-slate-950">
          
          {confirmedApptId ? (
            /* CONFIRMATION SCREEN / DIGITAL PASS */
            <div className="max-w-2xl mx-auto space-y-6">
              
              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl text-center">
                
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Appointment Confirmed</span>
                  <h1 className="text-2xl font-extrabold text-white">Digital Pass Issued</h1>
                  <p className="text-xs text-slate-400">Your consultation slip has been registered in the hospital system.</p>
                </div>

                {/* Slip Details Box */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-left text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-slate-400 block text-[10px]">APPOINTMENT REFERENCE ID</span>
                      <span className="font-mono font-bold text-cyan-400 text-sm">{confirmedApptId}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 uppercase">
                      {consultType === 'online' ? 'Virtual Consultation' : 'In-Person OPD'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400 block text-[10px]">DOCTOR</span>
                      <span className="font-bold text-white text-xs">{selectedDoctor.name}</span>
                      <span className="text-[10px] text-slate-400 block">{selectedDoctor.specialization}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">DATE & TIME</span>
                      <span className="font-bold text-white text-xs">{selectedDate}</span>
                      <span className="text-[10px] text-slate-400 block">{selectedSlot}</span>
                    </div>
                  </div>

                  {consultType === 'in-person' ? (
                    <div>
                      <span className="text-slate-400 block text-[10px]">LOCATION / WING</span>
                      <span className="font-semibold text-slate-200">{selectedDoctor.hospitalBranch}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-slate-400 block text-[10px]">TELEHEALTH MEETING ROOM</span>
                      <span className="font-mono text-cyan-400 text-[11px]">https://lumina.health/consultation/{confirmedApptId}</span>
                    </div>
                  )}

                  {/* QR Code Placeholder */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-400 font-medium">PRESENT QR AT HOSPITAL ENTRY / RECEPTION</span>
                      <p className="text-[10px] text-slate-500">Includes verified digital signature</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-white p-1.5 flex items-center justify-center text-slate-950">
                      <QrCode className="w-9 h-9" />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {consultType === 'online' && (
                    <button
                      onClick={() => navigate(`/consultation/${confirmedApptId}`)}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-teal-500 transition flex items-center justify-center gap-2"
                    >
                      <Video className="w-4 h-4" />
                      <span>Test Video Telehealth Room</span>
                    </button>
                  )}

                  <button
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
                  >
                    Go to Dashboard
                  </button>
                </div>

              </div>

            </div>
          ) : (
            
            /* BOOKING FORM */
            <div className="max-w-3xl mx-auto space-y-6">
              
              <div>
                <h1 className="text-2xl font-extrabold text-white">Schedule Hospital Consultation</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Pick your specialist, choose between in-person or telehealth, and reserve your time.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
                
                {/* 1. Doctor Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                    1. Select Specialist
                  </label>
                  <select
                    value={selectedDoctorId}
                    onChange={e => setSelectedDoctorId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    {mockDoctors.map(doc => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} — {doc.specialization} (${doc.fee})
                      </option>
                    ))}
                  </select>

                  {/* Doctor Snapshot Card */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center space-x-3 text-xs">
                    <img
                      src={selectedDoctor.photo}
                      alt={selectedDoctor.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-cyan-500/30"
                    />
                    <div>
                      <h4 className="font-bold text-white">{selectedDoctor.name}</h4>
                      <p className="text-[11px] text-cyan-400">{selectedDoctor.qualification}</p>
                      <p className="text-[10px] text-slate-400">{selectedDoctor.hospitalBranch}</p>
                    </div>
                  </div>
                </div>

                {/* 2. Consultation Type */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                    2. Consultation Mode
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setConsultType('online')}
                      className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                        consultType === 'online'
                          ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300 shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Video className="w-4 h-4 text-cyan-400" />
                      <span>HD Video Telehealth</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setConsultType('in-person')}
                      className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                        consultType === 'in-person'
                          ? 'bg-teal-600/20 border-teal-500 text-teal-300 shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-teal-400" />
                      <span>In-Person OPD Visit</span>
                    </button>
                  </div>
                </div>

                {/* 3. Date & Time Slot Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                      3. Preferred Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      min="2026-08-12"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Available Time Slots
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.availableSlots.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                            selectedSlot === slot
                              ? 'bg-cyan-600 text-white border-cyan-500'
                              : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Symptoms / Notes */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                    4. Reason for Consultation / Symptoms
                  </label>
                  <textarea
                    rows={3}
                    value={symptoms}
                    onChange={e => setSymptoms(e.target.value)}
                    placeholder="Briefly describe your symptoms, current medications, or specific questions for the doctor..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-teal-500 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm Booking (${selectedDoctor.fee})</span>
                </button>

              </form>

            </div>
          )}

        </main>
      </div>

      {!isLoggedIn && <Footer />}
    </div>
  );
};

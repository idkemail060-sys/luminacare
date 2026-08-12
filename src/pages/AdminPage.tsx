import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/layout/Navbar';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { Appointment, Doctor, HealthEntry } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  Calendar,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Database,
  Download,
  Activity,
  DollarSign,
  User,
  Stethoscope,
  Check,
  Sparkles,
  AlertCircle,
  Building,
  RefreshCw,
  X,
  FileText
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    user,
    appointments,
    doctors,
    healthEntries,
    isSupabaseConnected,
    supabaseMessage,
    updateAppointmentStatus,
    updateAppointment,
    addAppointment,
    addDoctor,
    updateDoctor,
    deleteDoctor
  } = useApp();

  const [activeTab, setActiveTab] = useState<'appointments' | 'doctors' | 'health' | 'database'>('appointments');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [showAddDoctorModal, setShowAddDoctorModal] = useState<boolean>(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const [showAddApptModal, setShowAddApptModal] = useState<boolean>(false);
  const [editingAppt, setEditingAppt] = useState<Appointment | null>(null);

  // New doctor form
  const [docName, setDocName] = useState('');
  const [docTitle, setDocTitle] = useState('Consultant Specialist');
  const [docSpec, setDocSpec] = useState('General Medicine');
  const [docQual, setDocQual] = useState('MD, Harvard Medical School');
  const [docExp, setDocExp] = useState(10);
  const [docFee, setDocFee] = useState(100);
  const [docPhoto, setDocPhoto] = useState('https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400');
  const [docBio, setDocBio] = useState('Experienced medical professional dedicated to evidence-based healthcare.');
  const [docBranch, setDocBranch] = useState('Central Pavilion - Building A');

  // New appointment form
  const [patientName, setPatientName] = useState('Sarah Jenkins');
  const [selectedDocId, setSelectedDocId] = useState(doctors[0]?.id || 'doc-1');
  const [apptDate, setApptDate] = useState(new Date().toISOString().split('T')[0]);
  const [apptTime, setApptTime] = useState('10:00 AM');
  const [apptType, setApptType] = useState<'in-person' | 'online'>('online');
  const [symptoms, setSymptoms] = useState('General checkup & routine follow-up');
  const [wing, setWing] = useState('OPD Wing - Room 204');

  // Stats calculation
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(a => a.status === 'Pending' || a.status === 'Upcoming');
  const acceptedAppointments = appointments.filter(a => a.status === 'Accepted' || a.status === 'Completed');
  const totalRevenue = appointments.reduce((sum, a) => sum + (a.consultationFee || 100), 0);

  // Filtered appointments
  const filteredAppointments = appointments.filter(appt => {
    const matchesSearch =
      appt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.symptoms.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'pending') return matchesSearch && (appt.status === 'Pending' || appt.status === 'Upcoming');
    if (statusFilter === 'accepted') return matchesSearch && (appt.status === 'Accepted');
    if (statusFilter === 'completed') return matchesSearch && (appt.status === 'Completed');
    if (statusFilter === 'cancelled') return matchesSearch && (appt.status === 'Cancelled');
    return matchesSearch;
  });

  const handleCreateDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    addDoctor({
      name: docName,
      title: docTitle,
      specialization: docSpec,
      qualification: docQual,
      experienceYears: Number(docExp),
      rating: 4.9,
      reviewCount: 12,
      fee: Number(docFee),
      photo: docPhoto || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
      bio: docBio,
      hospitalBranch: docBranch,
      availableDays: ['Monday', 'Wednesday', 'Friday'],
      availableSlots: ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'],
      languages: ['English']
    });
    setShowAddDoctorModal(false);
    setDocName('');
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = doctors.find(d => d.id === selectedDocId) || doctors[0];
    addAppointment({
      doctorId: doc.id,
      doctorName: doc.name,
      doctorSpecialty: doc.specialization,
      doctorPhoto: doc.photo,
      date: apptDate,
      time: apptTime,
      type: apptType,
      symptoms: symptoms,
      status: 'Accepted',
      consultationFee: doc.fee,
      hospitalBranch: wing
    });
    setShowAddApptModal(false);
  };

  const exportCsv = () => {
    const headers = ['ID', 'Patient Name', 'Doctor', 'Specialty', 'Date', 'Time', 'Type', 'Status', 'Fee'];
    const rows = appointments.map(a => [
      a.id,
      `"${a.patientName}"`,
      `"${a.doctorName}"`,
      `"${a.doctorSpecialty}"`,
      a.date,
      a.time,
      a.type,
      a.status,
      a.consultationFee
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LuminaCare_Bookings_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-7xl mx-auto w-full">
          <Header />

          {/* Admin Welcome Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/40 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Hospital Admin Control Center</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Welcome, Administrator
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  Manage patient bookings, accept or modify OPD appointments, oversee medical staff, and sync records directly with your Supabase backend.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={exportCsv}
                  className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-2 shadow-md"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Export CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddApptModal(true)}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Plus className="w-4 h-4 text-slate-950" />
                  <span>Create Booking</span>
                </button>
              </div>
            </div>
          </div>

          {/* Admin KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">Total Bookings</p>
                <p className="text-2xl font-black text-white mt-1">{totalAppointments}</p>
                <span className="text-[10px] text-emerald-400 font-semibold">Synced in Supabase</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Calendar className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">Pending Approvals</p>
                <p className="text-2xl font-black text-amber-400 mt-1">{pendingAppointments.length}</p>
                <span className="text-[10px] text-amber-300 font-semibold">Awaiting Acceptance</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">Accepted Bookings</p>
                <p className="text-2xl font-black text-emerald-400 mt-1">{acceptedAppointments.length}</p>
                <span className="text-[10px] text-emerald-300 font-semibold">Confirmed / Active</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">Active Doctors</p>
                <p className="text-2xl font-black text-white mt-1">{doctors.length}</p>
                <span className="text-[10px] text-slate-400 font-semibold">Staff Specialists</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Stethoscope className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Module Tab Navigation */}
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 overflow-x-auto">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'appointments'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Patient Bookings ({appointments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'doctors'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Doctor Roster ({doctors.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('health')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'health'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Patient Vitals ({healthEntries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'database'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Supabase DB Sync</span>
            </button>
          </div>

          {/* TAB 1: PATIENT BOOKINGS MANAGEMENT */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              
              {/* Filter and Search Controls */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by patient, doctor, or ID..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1 shrink-0">
                    <Filter className="w-3.5 h-3.5" />
                    Status:
                  </span>
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'pending', label: 'Pending' },
                    { id: 'accepted', label: 'Accepted' },
                    { id: 'completed', label: 'Completed' },
                    { id: 'cancelled', label: 'Cancelled' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setStatusFilter(f.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
                        statusFilter === f.id
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings Table / List */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 font-bold">
                      <tr>
                        <th className="p-4">Appt ID & Date</th>
                        <th className="p-4">Patient Name</th>
                        <th className="p-4">Assigned Doctor</th>
                        <th className="p-4">Type & Branch</th>
                        <th className="p-4">Symptoms / Reason</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Admin Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {filteredAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-500">
                            No appointments found matching your search or status filter.
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map(appt => (
                          <tr key={appt.id} className="hover:bg-slate-800/40 transition">
                            <td className="p-4 font-mono">
                              <span className="text-white font-bold block">{appt.id}</span>
                              <span className="text-slate-400 text-[11px]">{appt.date} at {appt.time}</span>
                            </td>

                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-7 h-7 rounded-full bg-cyan-600/30 text-cyan-300 flex items-center justify-center font-bold text-[11px]">
                                  {appt.patientName.charAt(0)}
                                </div>
                                <div>
                                  <span className="font-bold text-white block">{appt.patientName}</span>
                                  <span className="text-[10px] text-slate-400">ID: {appt.patientId || 'p1'}</span>
                                </div>
                              </div>
                            </td>

                            <td className="p-4">
                              <span className="font-semibold text-slate-200 block">{appt.doctorName}</span>
                              <span className="text-[10px] text-slate-400">{appt.doctorSpecialty}</span>
                            </td>

                            <td className="p-4">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                appt.type === 'online'
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              }`}>
                                {appt.type}
                              </span>
                              <span className="text-[10px] text-slate-400 block mt-1 truncate max-w-[140px]">
                                {appt.hospitalBranch || 'Main OPD Pavilion'}
                              </span>
                            </td>

                            <td className="p-4 max-w-xs">
                              <p className="truncate text-slate-300" title={appt.symptoms}>
                                {appt.symptoms || 'General OPD consultation'}
                              </p>
                              <span className="text-[10px] text-slate-500">Fee: ${appt.consultationFee || 100}</span>
                            </td>

                            <td className="p-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                appt.status === 'Accepted'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : appt.status === 'Completed'
                                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                  : appt.status === 'Cancelled'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                              }`}>
                                {appt.status === 'Accepted' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                                {appt.status === 'Cancelled' && <XCircle className="w-3 h-3 text-rose-400" />}
                                {(appt.status === 'Pending' || appt.status === 'Upcoming') && <Clock className="w-3 h-3 text-amber-400" />}
                                {appt.status}
                              </span>
                            </td>

                            <td className="p-4 text-right space-x-1 whitespace-nowrap">
                              {/* ACCEPT / CONFIRM BOOKING BUTTON */}
                              {appt.status !== 'Accepted' && appt.status !== 'Completed' && (
                                <button
                                  type="button"
                                  onClick={() => updateAppointmentStatus(appt.id, 'Accepted')}
                                  className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition inline-flex items-center gap-1 shadow-sm"
                                  title="Accept & Confirm Patient Booking into Supabase"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Accept</span>
                                </button>
                              )}

                              {/* MARK COMPLETED */}
                              {appt.status === 'Accepted' && (
                                <button
                                  type="button"
                                  onClick={() => updateAppointmentStatus(appt.id, 'Completed')}
                                  className="px-2.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] transition inline-flex items-center gap-1 shadow-sm"
                                  title="Mark as Completed"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Complete</span>
                                </button>
                              )}

                              {/* REJECT / CANCEL */}
                              {appt.status !== 'Cancelled' && (
                                <button
                                  type="button"
                                  onClick={() => updateAppointmentStatus(appt.id, 'Cancelled')}
                                  className="px-2 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-bold text-[11px] transition inline-flex items-center gap-1"
                                  title="Cancel or Reject Booking"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  <span>Reject</span>
                                </button>
                              )}

                              {/* EDIT DETAILS */}
                              <button
                                type="button"
                                onClick={() => setEditingAppt(appt)}
                                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition inline-block ml-1"
                                title="Edit Booking Details"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCTOR ROSTER MANAGEMENT */}
          {activeTab === 'doctors' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Medical Staff & Doctor Roster</h3>
                  <p className="text-xs text-slate-400">Manage hospital specialists, consultation fees, and working schedules.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddDoctorModal(true)}
                  className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4 text-slate-950" />
                  <span>Add New Doctor</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map(doc => (
                  <div key={doc.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 relative group hover:border-slate-700 transition shadow-lg">
                    <div className="flex items-start space-x-3">
                      <img
                        src={doc.photo}
                        alt={doc.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm truncate">{doc.name}</h4>
                        <p className="text-xs text-amber-400 font-semibold">{doc.specialization}</p>
                        <p className="text-[11px] text-slate-400 truncate">{doc.qualification}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Experience:</span>
                        <span className="font-bold text-slate-200">{doc.experienceYears} Years</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Consultation Fee:</span>
                        <span className="font-extrabold text-emerald-400">${doc.fee}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Hospital Branch:</span>
                        <span className="font-semibold text-slate-300 text-[10px] truncate max-w-[130px]">{doc.hospitalBranch}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-400">
                        ⭐ {doc.rating} ({doc.reviewCount} reviews)
                      </span>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => deleteDoctor(doc.id)}
                          className="px-2.5 py-1 rounded-xl bg-rose-950/50 hover:bg-rose-900 border border-rose-500/30 text-rose-300 text-[11px] font-semibold transition flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PATIENT HEALTH RECORDS */}
          {activeTab === 'health' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Patient Biometric Logs</h3>
                <p className="text-xs text-slate-400">Recent health records and vitals logged by patients in the database.</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 font-bold">
                      <tr>
                        <th className="p-4">Date</th>
                        <th className="p-4">Weight (kg)</th>
                        <th className="p-4">Blood Pressure</th>
                        <th className="p-4">Blood Sugar</th>
                        <th className="p-4">Sleep / Water</th>
                        <th className="p-4">Mood</th>
                        <th className="p-4">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {healthEntries.map((h, idx) => (
                        <tr key={h.id || idx} className="hover:bg-slate-800/40 transition">
                          <td className="p-4 font-mono font-bold text-white">{h.date}</td>
                          <td className="p-4 font-bold text-cyan-400">{h.weightKg} kg</td>
                          <td className="p-4">{h.bpSystolic}/{h.bpDiastolic} mmHg</td>
                          <td className="p-4 font-bold text-emerald-400">{h.bloodSugarMgDl} mg/dL</td>
                          <td className="p-4">{h.sleepHours} hrs | {h.waterIntakeLiters} L</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 text-[10px] font-semibold">
                              {h.mood}
                            </span>
                          </td>
                          <td className="p-4 text-slate-400 italic max-w-xs truncate">{h.notes || 'None'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SUPABASE DATABASE SYNC */}
          {activeTab === 'database' && (
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Supabase Live Database Connection</h3>
                    <p className="text-xs text-slate-400">Project Reference ID: <span className="text-emerald-400 font-mono font-bold">qjoxtzrmwotbqemcdxpj</span></p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-2 text-emerald-300">
                  <p className="font-bold text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Database Status: Active & Synced</span>
                  </p>
                  <p className="text-slate-300 leading-relaxed">{supabaseMessage}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-200">Supabase Table Schema Reference:</label>
                  <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto">
{`-- Supabase PostgreSQL Schema
-- Project: qjoxtzrmwotbqemcdxpj

CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY,
  doctor_id TEXT,
  doctor_name TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'online',
  status TEXT NOT NULL DEFAULT 'Confirmed',
  symptoms TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`}
                  </pre>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: ADD NEW DOCTOR */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddDoctorModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-bold text-white text-lg">Add New Doctor to Roster</h3>
              <p className="text-xs text-slate-400">Fill in specialist credentials and hospital details.</p>
            </div>

            <form onSubmit={handleCreateDoctor} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Doctor Name</label>
                <input
                  type="text"
                  required
                  value={docName}
                  onChange={e => setDocName(e.target.value)}
                  placeholder="Dr. Alexander Vance"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Specialization</label>
                  <input
                    type="text"
                    required
                    value={docSpec}
                    onChange={e => setDocSpec(e.target.value)}
                    placeholder="Cardiology / Neurology"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Consultation Fee ($)</label>
                  <input
                    type="number"
                    required
                    value={docFee}
                    onChange={e => setDocFee(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Qualifications</label>
                <input
                  type="text"
                  value={docQual}
                  onChange={e => setDocQual(e.target.value)}
                  placeholder="MD, FACC, Johns Hopkins"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Photo Image URL</label>
                <input
                  type="url"
                  value={docPhoto}
                  onChange={e => setDocPhoto(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Hospital Pavilion/Branch</label>
                <input
                  type="text"
                  value={docBranch}
                  onChange={e => setDocBranch(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
              >
                Add Doctor to System
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE MANUAL APPOINTMENT */}
      {showAddApptModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddApptModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-bold text-white text-lg">Create New Patient Booking</h3>
              <p className="text-xs text-slate-400">Book an OPD or telehealth consultation directly into Supabase.</p>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={e => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Assigned Doctor</label>
                <select
                  value={selectedDocId}
                  onChange={e => setSelectedDocId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                >
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.specialization}) - ${d.fee}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={apptDate}
                    onChange={e => setApptDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    value={apptTime}
                    onChange={e => setApptTime(e.target.value)}
                    placeholder="10:00 AM"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Type</label>
                  <select
                    value={apptType}
                    onChange={e => setApptType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="online">Online Video Consult</option>
                    <option value="in-person">In-Person OPD Visit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Hospital Wing</label>
                  <input
                    type="text"
                    value={wing}
                    onChange={e => setWing(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Symptoms / Chief Complaint</label>
                <textarea
                  rows={2}
                  value={symptoms}
                  onChange={e => setSymptoms(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
              >
                Save & Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT APPOINTMENT */}
      {editingAppt && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl relative">
            <button
              onClick={() => setEditingAppt(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-bold text-white text-base">Edit Booking Details ({editingAppt.id})</h3>
              <p className="text-xs text-slate-400">Update appointment schedule or symptoms for {editingAppt.patientName}.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={editingAppt.date}
                  onChange={e => setEditingAppt({ ...editingAppt, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Time</label>
                <input
                  type="text"
                  value={editingAppt.time}
                  onChange={e => setEditingAppt({ ...editingAppt, time: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Symptoms / Notes</label>
                <textarea
                  rows={2}
                  value={editingAppt.symptoms}
                  onChange={e => setEditingAppt({ ...editingAppt, symptoms: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  updateAppointment(editingAppt.id, editingAppt);
                  setEditingAppt(null);
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

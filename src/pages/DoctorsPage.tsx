import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { useApp } from '../context/AppContext';
import { mockDoctors } from '../data/mockData';
import { Doctor } from '../types';
import {
  Search,
  Filter,
  Star,
  Clock,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  Video,
  Languages,
  Award,
  DollarSign,
  MessageSquare
} from 'lucide-react';

export const DoctorsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { isLoggedIn } = useApp();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  // Extract unique specialties
  const specialties = ['All', ...Array.from(new Set(mockDoctors.map(d => d.specialization)))];

  // Filter doctors
  const filteredDoctors = mockDoctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialization === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const selectedDoctor = mockDoctors.find(d => d.id === id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {isLoggedIn ? <Header /> : <Navbar />}

      <div className="flex-1 flex overflow-hidden">
        {isLoggedIn && <Sidebar />}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-8 bg-slate-950">
          
          {/* IF DOCTOR DETAIL VIEW */}
          {id && selectedDoctor ? (
            <div className="max-w-5xl mx-auto space-y-6">
              
              <button
                onClick={() => navigate('/doctors')}
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Doctors Directory</span>
              </button>

              {/* Main Doctor Header Card */}
              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-800 pb-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedDoctor.photo}
                      alt={selectedDoctor.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-cyan-500/30"
                    />
                    <div className="space-y-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                        {selectedDoctor.specialization}
                      </span>
                      <h1 className="text-xl sm:text-2xl font-extrabold text-white">{selectedDoctor.name}</h1>
                      <p className="text-xs text-slate-300 font-medium">{selectedDoctor.title}</p>
                      <p className="text-xs text-slate-400">{selectedDoctor.qualification}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <div className="flex items-center gap-1 text-amber-400 font-bold text-base">
                      <Star className="w-5 h-5 fill-amber-400" />
                      <span>{selectedDoctor.rating}</span>
                      <span className="text-xs text-slate-400 font-normal">({selectedDoctor.reviewCount} reviews)</span>
                    </div>
                    <div className="text-lg font-bold text-white">
                      ${selectedDoctor.fee} <span className="text-xs text-slate-400 font-normal">/ consultation</span>
                    </div>
                  </div>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                      <Award className="w-4 h-4" />
                      <span>Experience</span>
                    </div>
                    <p className="text-sm font-bold text-white">{selectedDoctor.experienceYears} Years Clinical Excellence</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <MapPin className="w-4 h-4" />
                      <span>Hospital Pavilion</span>
                    </div>
                    <p className="text-sm font-bold text-white">{selectedDoctor.hospitalBranch}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-purple-400 font-semibold">
                      <Languages className="w-4 h-4" />
                      <span>Languages Spoken</span>
                    </div>
                    <p className="text-sm font-bold text-white">{selectedDoctor.languages.join(', ')}</p>
                  </div>
                </div>

                {/* Doctor Bio */}
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-sm">Biography & Special Interests</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{selectedDoctor.bio}</p>
                </div>

                {/* Available Slots & Booking Trigger */}
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Select Available Time Slot Today</span>
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {selectedDoctor.availableSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                          selectedSlot === slot
                            ? 'bg-cyan-600 text-white border-cyan-500 shadow-md'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => navigate(`/book-appointment?doctorId=${selectedDoctor.id}&slot=${selectedSlot}`)}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-teal-500 transition flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Proceed to Book Consultation</span>
                    </button>
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="space-y-4 pt-6 border-t border-slate-800">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    <span>Verified Patient Reviews</span>
                  </h3>

                  <div className="space-y-3">
                    {selectedDoctor.reviews.map(rev => (
                      <div key={rev.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{rev.patientName}</span>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-slate-300">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            
            /* DOCTORS DIRECTORY LIST VIEW */
            <div className="space-y-6">
              
              <div>
                <h1 className="text-2xl font-extrabold text-white">Find Hospital Doctors & Specialists</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Browse board-certified doctors, filter by department, and schedule OPD or video appointments.
                </p>
              </div>

              {/* Search and Filters Bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search doctor by name, specialty, or condition..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Specialty Dropdown */}
                <div className="w-full sm:w-64 relative">
                  <Filter className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <select
                    value={selectedSpecialty}
                    onChange={e => setSelectedSpecialty(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
                  >
                    {specialties.map(sp => (
                      <option key={sp} value={sp}>
                        Specialty: {sp}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Doctors Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDoctors.length === 0 ? (
                  <div className="col-span-full p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
                    No doctors found matching your search criteria.
                  </div>
                ) : (
                  filteredDoctors.map(doc => (
                    <div
                      key={doc.id}
                      className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 transition group"
                    >
                      <div>
                        <img
                          src={doc.photo}
                          alt={doc.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-4 space-y-2">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            {doc.specialization}
                          </span>
                          <h3 className="font-bold text-white text-base leading-snug">{doc.name}</h3>
                          <p className="text-xs text-slate-400 truncate">{doc.qualification}</p>
                          <p className="text-[11px] text-slate-300 font-medium">{doc.experienceYears} Years Exp.</p>

                          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                            <span className="flex items-center gap-1 text-amber-400 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              {doc.rating}
                            </span>
                            <span className="text-white font-bold">${doc.fee} / consult</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 pt-0">
                        <button
                          onClick={() => navigate(`/doctors/${doc.id}`)}
                          className="w-full py-2.5 rounded-xl bg-cyan-600/90 hover:bg-cyan-500 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5"
                        >
                          <span>View Profile & Slots</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

        </main>
      </div>

      {!isLoggedIn && <Footer />}
    </div>
  );
};

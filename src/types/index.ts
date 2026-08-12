export type UserRole = 'patient' | 'doctor';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  medicalHistory?: string;
  allergies?: string;
  emergencyContact?: string;
  bloodType?: string;
  age?: number;
  gender?: string;
  doctorSpecialization?: string;
}

export interface Review {
  id: string;
  patientName: string;
  patientAvatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  fee: number;
  photo: string;
  bio: string;
  hospitalBranch: string;
  availableDays: string[];
  availableSlots: string[];
  reviews: Review[];
  languages: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorPhoto: string;
  date: string;
  time: string;
  type: 'in-person' | 'online';
  symptoms: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  hospitalBranch?: string;
  consultationFee: number;
  createdAt: string;
  meetingLink?: string;
}

export interface HealthEntry {
  id: string;
  date: string;
  weightKg: number;
  bpSystolic: number;
  bpDiastolic: number;
  bloodSugarMgDl: number;
  sleepHours: number;
  waterIntakeLiters: number;
  mood: 'Excellent' | 'Good' | 'Neutral' | 'Fatigued' | 'Stressed';
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'appointment' | 'system' | 'health' | 'premium';
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  specialty: string;
  photo: string;
  rating: number;
  reviewCount: number;
  bio: string;
  sessionFee: number;
  availableSlots: string[];
}

export interface TherapistBooking {
  id: string;
  therapistId: string;
  therapistName: string;
  date: string;
  time: string;
  notes: string;
  status: 'Confirmed' | 'Completed';
}

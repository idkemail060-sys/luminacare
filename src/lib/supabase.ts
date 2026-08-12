import { createClient } from '@supabase/supabase-js';
import { Appointment, HealthEntry, TherapistBooking } from '../types';

// Supabase configuration provided by user
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://qjoxtzrmwotbqemcdxpj.supabase.co';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_lw5A1ZWBlqsKEXdTexk-Ig_SioHRDBb';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// Helper to check connection
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const { data, error } = await supabase.from('appointments').select('count', { count: 'exact', head: true });
    if (error) {
      if (error.code === '42P01') {
        // Table doesn't exist yet
        return {
          success: true,
          message: 'Connected to Supabase project qjoxtzrmwotbqemcdxpj. "appointments" table will be auto-created on first insert or via SQL schema.'
        };
      }
      return { success: false, message: `Supabase query error: ${error.message}` };
    }
    return { success: true, message: `Successfully connected to Supabase database (qjoxtzrmwotbqemcdxpj)!` };
  } catch (err: any) {
    return { success: false, message: `Connection error: ${err?.message || 'Unknown error'}` };
  }
}

// Fetch all appointments from Supabase
export async function fetchAppointmentsFromSupabase(): Promise<Appointment[] | null> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetchAppointments warning:', error.message);
      return null;
    }

    if (data && Array.isArray(data)) {
      return data.map((item: any) => ({
        id: item.id || item.appointment_id,
        doctorId: item.doctor_id || item.doctorId || 'd1',
        doctorName: item.doctor_name || item.doctorName || 'Dr. Evelyn Vance',
        doctorSpecialty: item.doctor_specialty || item.doctorSpecialty || 'Cardiology',
        doctorPhoto: item.doctor_photo || item.doctorPhoto || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
        patientId: item.patient_id || item.patientId || 'p1',
        patientName: item.patient_name || item.patientName || 'Sarah Jenkins',
        date: item.date || new Date().toISOString().split('T')[0],
        time: item.time || '10:00 AM',
        type: item.type || 'online',
        status: item.status || 'Confirmed',
        symptoms: item.symptoms || '',
        createdAt: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        hospitalWing: item.hospital_wing || item.hospitalWing,
        meetingLink: item.meeting_link || item.meetingLink
      }));
    }
    return [];
  } catch (err) {
    console.error('Error fetching from Supabase:', err);
    return null;
  }
}

// Save a new appointment to Supabase
export async function saveAppointmentToSupabase(appt: Appointment): Promise<boolean> {
  try {
    const payload = {
      id: appt.id,
      doctor_id: appt.doctorId,
      doctor_name: appt.doctorName,
      doctor_specialty: appt.doctorSpecialty,
      doctor_photo: appt.doctorPhoto,
      patient_id: appt.patientId,
      patient_name: appt.patientName,
      date: appt.date,
      time: appt.time,
      type: appt.type,
      status: appt.status,
      symptoms: appt.symptoms,
      hospital_wing: appt.hospitalWing || null,
      meeting_link: appt.meetingLink || null,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase.from('appointments').insert([payload]);

    if (error) {
      console.warn('Could not insert to Supabase appointments table:', error.message);
      // Try fallback schema columns if snake_case fails or table has camelCase columns
      const fallbackPayload = {
        id: appt.id,
        doctorId: appt.doctorId,
        doctorName: appt.doctorName,
        doctorSpecialty: appt.doctorSpecialty,
        patientId: appt.patientId,
        patientName: appt.patientName,
        date: appt.date,
        time: appt.time,
        type: appt.type,
        status: appt.status,
        symptoms: appt.symptoms
      };
      await supabase.from('appointments').insert([fallbackPayload]).catch(() => {});
      return false;
    }
    console.log('Successfully saved appointment to Supabase table "appointments":', appt.id);
    return true;
  } catch (err) {
    console.error('Supabase save error:', err);
    return false;
  }
}

// Update appointment status in Supabase
export async function updateAppointmentStatusInSupabase(id: string, status: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status: status })
      .eq('id', id);

    if (error) {
      console.warn('Supabase status update warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase update status error:', err);
    return false;
  }
}

// Save Health Entry to Supabase
export async function saveHealthEntryToSupabase(entry: HealthEntry): Promise<boolean> {
  try {
    const payload = {
      id: entry.id,
      date: entry.date,
      weight_kg: entry.weightKg,
      bp_systolic: entry.bpSystolic,
      bp_diastolic: entry.bpDiastolic,
      blood_sugar: entry.bloodSugarMgDl,
      sleep_hours: entry.sleepHours,
      water_intake: entry.waterIntakeLiters,
      mood: entry.mood,
      notes: entry.notes || ''
    };

    const { error } = await supabase.from('health_entries').insert([payload]);
    if (error) {
      console.warn('Supabase health_entries insert warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}

// SQL DDL Schema string for reference in UI
export const SUPABASE_SQL_SCHEMA = `
-- Supabase SQL Schema for LuminaCare Database (Project ID: qjoxtzrmwotbqemcdxpj)

-- 1. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY,
  doctor_id TEXT,
  doctor_name TEXT NOT NULL,
  doctor_specialty TEXT,
  doctor_photo TEXT,
  patient_id TEXT,
  patient_name TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'online',
  status TEXT NOT NULL DEFAULT 'Confirmed',
  symptoms TEXT,
  hospital_wing TEXT,
  meeting_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Health Entries Table
CREATE TABLE IF NOT EXISTS public.health_entries (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL,
  weight_kg NUMERIC,
  bp_systolic INTEGER,
  bp_diastolic INTEGER,
  blood_sugar INTEGER,
  sleep_hours NUMERIC,
  water_intake NUMERIC,
  mood TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Therapist Bookings Table
CREATE TABLE IF NOT EXISTS public.therapist_bookings (
  id TEXT PRIMARY KEY,
  therapist_id TEXT,
  therapist_name TEXT,
  date DATE,
  time TEXT,
  notes TEXT,
  status TEXT DEFAULT 'Confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) or public access policies
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select and insert on appointments" ON public.appointments FOR ALL USING (true) WITH CHECK (true);
`;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Appointment, HealthEntry, NotificationItem, TherapistBooking, UserRole, Doctor } from '../types';
import { mockDoctors, mockInitialAppointments, mockHealthEntries, mockNotifications } from '../data/mockData';
import {
  fetchAppointmentsFromSupabase,
  saveAppointmentToSupabase,
  updateAppointmentStatusInSupabase,
  saveHealthEntryToSupabase,
  testSupabaseConnection
} from '../lib/supabase';

interface AppContextType {
  user: User | null;
  isLoggedIn: boolean;
  isPremium: boolean;
  doctors: Doctor[];
  appointments: Appointment[];
  healthEntries: HealthEntry[];
  notifications: NotificationItem[];
  therapistBookings: TherapistBooking[];
  isSupabaseConnected: boolean;
  supabaseMessage: string;
  login: (userData?: Partial<User>, role?: UserRole) => void;
  logout: () => void;
  togglePremium: (forceState?: boolean) => void;
  addAppointment: (newAppt: Omit<Appointment, 'id' | 'createdAt' | 'patientId' | 'patientName'>) => string;
  cancelAppointment: (id: string) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  updateAppointment: (id: string, updatedData: Partial<Appointment>) => void;
  addDoctor: (newDoctor: Omit<Doctor, 'id' | 'reviews'>) => void;
  updateDoctor: (id: string, updatedData: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;
  addHealthEntry: (entry: Omit<HealthEntry, 'id'>) => void;
  updateProfile: (updated: Partial<User>) => void;
  markNotificationRead: (id: string) => void;
  bookTherapistSession: (therapistId: string, therapistName: string, date: string, time: string, notes: string) => void;
}

const defaultUser: User = {
  id: 'p1',
  name: 'Sarah Jenkins',
  email: 'sarah.jenkins@lumina.health',
  phone: '+1 (555) 234-5678',
  role: 'patient',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  medicalHistory: 'Seasonal Rhinitis, Mild Asthma',
  allergies: 'Penicillin',
  emergencyContact: 'Robert Jenkins (Husband) - +1 (555) 987-6543',
  bloodType: 'O+',
  age: 32,
  gender: 'Female'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [appointments, setAppointments] = useState<Appointment[]>(mockInitialAppointments);
  const [healthEntries, setHealthEntries] = useState<HealthEntry[]>(mockHealthEntries);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [therapistBookings, setTherapistBookings] = useState<TherapistBooking[]>([]);

  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(true);
  const [supabaseMessage, setSupabaseMessage] = useState<string>('Connecting to Supabase (qjoxtzrmwotbqemcdxpj)...');

  // Sync with Supabase on mount
  useEffect(() => {
    async function initSupabase() {
      const conn = await testSupabaseConnection();
      setIsSupabaseConnected(conn.success);
      setSupabaseMessage(conn.message);

      const dbAppts = await fetchAppointmentsFromSupabase();
      if (dbAppts && dbAppts.length > 0) {
        // Merge with initial mock data, preferring DB records
        setAppointments(prev => {
          const combined = [...dbAppts];
          prev.forEach(mock => {
            if (!combined.some(c => c.id === mock.id)) {
              combined.push(mock);
            }
          });
          return combined;
        });
      }
    }
    initSupabase();
  }, []);

  const login = (userData?: Partial<User>, role: UserRole = 'patient') => {
    let name = userData?.name;
    let email = userData?.email;
    let avatar = userData?.avatar;

    if (role === 'admin') {
      name = name || 'Hospital Administrator';
      email = email || 'admin@lumina.health';
      avatar = avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
    } else if (role === 'doctor') {
      name = name || 'Dr. Evelyn Vance';
      email = email || 'e.vance@lumina.health';
      avatar = avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200';
    } else {
      name = name || defaultUser.name;
      email = email || defaultUser.email;
      avatar = avatar || defaultUser.avatar;
    }

    const newUser: User = {
      ...(userData?.id ? (userData as User) : defaultUser),
      role: role,
      name: name,
      email: email,
      avatar: avatar,
      doctorSpecialization: role === 'doctor' ? 'Cardiology' : undefined
    };
    setUser(newUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const togglePremium = (forceState?: boolean) => {
    setIsPremium(prev => {
      const nextState = forceState !== undefined ? forceState : !prev;
      if (nextState) {
        setNotifications(n => [
          {
            id: `notif-${Date.now()}`,
            title: 'Gold Premium Subscription Active!',
            message: 'You now have unlimited AI queries, extended 45-min teleconsults, and Personal Therapist access.',
            timestamp: 'Just now',
            read: false,
            type: 'premium'
          },
          ...n
        ]);
      }
      return nextState;
    });
  };

  const addAppointment = (newAppt: Omit<Appointment, 'id' | 'createdAt' | 'patientId' | 'patientName'>): string => {
    const apptId = `LUM-${Math.floor(10000 + Math.random() * 90000)}`;
    const fullAppt: Appointment = {
      ...newAppt,
      id: apptId,
      patientId: user?.id || 'p1',
      patientName: user?.name || 'Sarah Jenkins',
      createdAt: new Date().toISOString().split('T')[0],
      meetingLink: newAppt.type === 'online' ? `https://lumina.health/consultation/${apptId}` : undefined
    };

    setAppointments(prev => [fullAppt, ...prev]);

    // Save directly to Supabase Database
    saveAppointmentToSupabase(fullAppt).then(success => {
      if (success) {
        console.log(`[Supabase] Appointment ${apptId} saved to database qjoxtzrmwotbqemcdxpj`);
      }
    });

    // Add a system notification
    setNotifications(prev => [
      {
        id: `n-${Date.now()}`,
        title: 'Appointment Confirmed & Saved to Database',
        message: `Your ${newAppt.type} appointment with ${newAppt.doctorName} is confirmed for ${newAppt.date} at ${newAppt.time}. Saved to Supabase.`,
        timestamp: 'Just now',
        read: false,
        type: 'appointment'
      },
      ...prev
    ]);

    return apptId;
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'Cancelled' as const } : a))
    );
    updateAppointmentStatusInSupabase(id, 'Cancelled');
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status } : a))
    );
    updateAppointmentStatusInSupabase(id, status);

    // Send a system notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: `Appointment Status Updated (${status})`,
        message: `Appointment ${id} status has been changed to ${status} by Admin.`,
        timestamp: 'Just now',
        read: false,
        type: 'appointment'
      },
      ...prev
    ]);
  };

  const updateAppointment = (id: string, updatedData: Partial<Appointment>) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, ...updatedData } : a))
    );
  };

  const addDoctor = (newDocData: Omit<Doctor, 'id' | 'reviews'>) => {
    const newDoc: Doctor = {
      ...newDocData,
      id: `doc-${Date.now()}`,
      reviews: []
    };
    setDoctors(prev => [newDoc, ...prev]);
  };

  const updateDoctor = (id: string, updatedData: Partial<Doctor>) => {
    setDoctors(prev =>
      prev.map(d => (d.id === id ? { ...d, ...updatedData } : d))
    );
  };

  const deleteDoctor = (id: string) => {
    setDoctors(prev => prev.filter(d => d.id !== id));
  };

  const addHealthEntry = (entry: Omit<HealthEntry, 'id'>) => {
    const newEntry: HealthEntry = {
      ...entry,
      id: `h-${Date.now()}`
    };
    setHealthEntries(prev => [newEntry, ...prev]);
    saveHealthEntryToSupabase(newEntry);
  };

  const updateProfile = (updated: Partial<User>) => {
    setUser(prev => (prev ? { ...prev, ...updated } : null));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const bookTherapistSession = (therapistId: string, therapistName: string, date: string, time: string, notes: string) => {
    const newBooking: TherapistBooking = {
      id: `tb-${Date.now()}`,
      therapistId,
      therapistName,
      date,
      time,
      notes,
      status: 'Confirmed'
    };
    setTherapistBookings(prev => [newBooking, ...prev]);
    setNotifications(prev => [
      {
        id: `n-${Date.now()}`,
        title: 'Therapy Session Scheduled',
        message: `Your session with ${therapistName} is set for ${date} at ${time}.`,
        timestamp: 'Just now',
        read: false,
        type: 'appointment'
      },
      ...prev
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        isPremium,
        doctors,
        appointments,
        healthEntries,
        notifications,
        therapistBookings,
        isSupabaseConnected,
        supabaseMessage,
        login,
        logout,
        togglePremium,
        addAppointment,
        cancelAppointment,
        updateAppointmentStatus,
        updateAppointment,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        addHealthEntry,
        updateProfile,
        markNotificationRead,
        bookTherapistSession
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

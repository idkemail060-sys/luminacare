import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Appointment, HealthEntry, NotificationItem, TherapistBooking, UserRole } from '../types';
import { mockDoctors, mockInitialAppointments, mockHealthEntries, mockNotifications } from '../data/mockData';

interface AppContextType {
  user: User | null;
  isLoggedIn: boolean;
  isPremium: boolean;
  appointments: Appointment[];
  healthEntries: HealthEntry[];
  notifications: NotificationItem[];
  therapistBookings: TherapistBooking[];
  login: (userData?: Partial<User>, role?: UserRole) => void;
  logout: () => void;
  togglePremium: (forceState?: boolean) => void;
  addAppointment: (newAppt: Omit<Appointment, 'id' | 'createdAt' | 'patientId' | 'patientName'>) => string;
  cancelAppointment: (id: string) => void;
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
  const [appointments, setAppointments] = useState<Appointment[]>(mockInitialAppointments);
  const [healthEntries, setHealthEntries] = useState<HealthEntry[]>(mockHealthEntries);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [therapistBookings, setTherapistBookings] = useState<TherapistBooking[]>([]);

  const login = (userData?: Partial<User>, role: UserRole = 'patient') => {
    const newUser: User = {
      ...(userData?.id ? (userData as User) : defaultUser),
      role: role,
      name: userData?.name || (role === 'doctor' ? 'Dr. Evelyn Vance' : defaultUser.name),
      email: userData?.email || (role === 'doctor' ? 'e.vance@lumina.health' : defaultUser.email),
      avatar: role === 'doctor' 
        ? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200' 
        : defaultUser.avatar,
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
        // Add a notification about premium activation
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

    // Add a system notification
    setNotifications(prev => [
      {
        id: `n-${Date.now()}`,
        title: 'Appointment Confirmed',
        message: `Your ${newAppt.type} appointment with ${newAppt.doctorName} is confirmed for ${newAppt.date} at ${newAppt.time}.`,
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
  };

  const addHealthEntry = (entry: Omit<HealthEntry, 'id'>) => {
    const newEntry: HealthEntry = {
      ...entry,
      id: `h-${Date.now()}`
    };
    setHealthEntries(prev => [newEntry, ...prev]);
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
        appointments,
        healthEntries,
        notifications,
        therapistBookings,
        login,
        logout,
        togglePremium,
        addAppointment,
        cancelAppointment,
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

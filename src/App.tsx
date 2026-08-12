import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { AppointmentBookingPage } from './pages/AppointmentBookingPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { HealthTrackerPage } from './pages/HealthTrackerPage';
import { PremiumPage } from './pages/PremiumPage';
import { TherapistPage } from './pages/TherapistPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';

function AppRoutes() {
  const { isLoggedIn } = useApp();

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/doctors/:id" element={<DoctorsPage />} />
      <Route path="/book-appointment" element={<AppointmentBookingPage />} />
      <Route path="/consultation" element={<ConsultationPage />} />
      <Route path="/consultation/:appointmentId" element={<ConsultationPage />} />
      <Route path="/ai-assistant" element={<AIAssistantPage />} />
      <Route path="/health-tracker" element={<HealthTrackerPage />} />
      <Route path="/premium" element={<PremiumPage />} />
      <Route path="/therapist" element={<TherapistPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

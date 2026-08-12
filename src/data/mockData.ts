import { Doctor, Appointment, HealthEntry, NotificationItem, Therapist } from '../types';

export const mockDoctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Evelyn Vance',
    title: 'Senior Consultant Cardiologist',
    specialization: 'Cardiology',
    qualification: 'MD, FACC, Harvard Medical School',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 328,
    fee: 120,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    bio: 'Dr. Evelyn Vance is a world-renowned cardiologist specializing in preventive cardiology, heart failure management, and advanced echocardiography with over 16 years of clinical excellence.',
    hospitalBranch: 'Central Pavilion - Building A',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'],
    languages: ['English', 'Spanish'],
    reviews: [
      {
        id: 'r1',
        patientName: 'Marcus Brody',
        rating: 5,
        date: '2026-07-28',
        comment: 'Dr. Vance explained my cardiac test results thoroughly. Extremely reassuring and highly competent.'
      },
      {
        id: 'r2',
        patientName: 'Elena Rostova',
        rating: 5,
        date: '2026-07-15',
        comment: 'Punctual, empathetic, and truly cares about holistic cardiovascular health.'
      }
    ]
  },
  {
    id: 'doc-2',
    name: 'Dr. Aris Thorne',
    title: 'Head of Neurology',
    specialization: 'Neurology',
    qualification: 'MD, PhD, Johns Hopkins University',
    experienceYears: 18,
    rating: 4.8,
    reviewCount: 245,
    fee: 140,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    bio: 'Specialist in migraine disorders, neuro-rehabilitation, and epilepsy management. Leading research in cognitive health and nerve stimulation therapy.',
    hospitalBranch: 'Neuroscience Wing - Floor 4',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    availableSlots: ['10:00 AM', '11:30 AM', '03:00 PM', '05:00 PM'],
    languages: ['English', 'German'],
    reviews: [
      {
        id: 'r3',
        patientName: 'David K.',
        rating: 5,
        date: '2026-08-02',
        comment: 'Solved my chronic migraines after years of misdiagnosis. Best neurologist in the region.'
      }
    ]
  },
  {
    id: 'doc-3',
    name: 'Dr. Sophia Patel',
    title: 'Lead Pediatrician',
    specialization: 'Pediatrics',
    qualification: 'MD, DCH, Stanford Children Health',
    experienceYears: 12,
    rating: 4.95,
    reviewCount: 412,
    fee: 90,
    photo: 'https://images.unsplash.com/photo-1594824813566-7885a3977336?auto=format&fit=crop&q=80&w=400',
    bio: 'Compassionate pediatric specialist dedicated to child nutrition, growth milestones, and early adolescent care in a warm and child-friendly environment.',
    hospitalBranch: 'Children’s & Family Health Center',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableSlots: ['08:30 AM', '11:00 AM', '01:30 PM', '03:30 PM'],
    languages: ['English', 'Hindi', 'Gujarati'],
    reviews: [
      {
        id: 'r4',
        patientName: 'Jessica Miller',
        rating: 5,
        date: '2026-08-05',
        comment: 'My kids love Dr. Patel! She makes checkups fun and stress-free.'
      }
    ]
  },
  {
    id: 'doc-4',
    name: 'Dr. Jonathan Chen',
    title: 'Consultant Dermatologist',
    specialization: 'Dermatology',
    qualification: 'MD, FAAD, Yale School of Medicine',
    experienceYears: 10,
    rating: 4.7,
    reviewCount: 189,
    fee: 110,
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    bio: 'Expert in medical dermatology, laser treatments, eczema management, and skin cancer screenings using state-of-the-art dermatoscopy.',
    hospitalBranch: 'Aesthetic & Skin Care Clinic',
    availableDays: ['Monday', 'Wednesday', 'Saturday'],
    availableSlots: ['09:30 AM', '01:00 PM', '02:30 PM', '04:30 PM'],
    languages: ['English', 'Mandarin'],
    reviews: [
      {
        id: 'r5',
        patientName: 'Hannah Abbott',
        rating: 5,
        date: '2026-07-20',
        comment: 'Clear diagnosis and great skin regimen prescribed. Highly recommended.'
      }
    ]
  },
  {
    id: 'doc-5',
    name: 'Dr. Maya Lin',
    title: 'Chief Orthopedic Surgeon',
    specialization: 'Orthopedics',
    qualification: 'MS, FRCS, Oxford University',
    experienceYears: 20,
    rating: 4.9,
    reviewCount: 290,
    fee: 150,
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
    bio: 'Pioneer in minimally invasive joint replacements, sports injuries, and spine stabilization with quick recovery protocols.',
    hospitalBranch: 'Surgical & Trauma Tower',
    availableDays: ['Tuesday', 'Friday'],
    availableSlots: ['08:00 AM', '10:00 AM', '02:00 PM'],
    languages: ['English', 'Cantonese'],
    reviews: [
      {
        id: 'r6',
        patientName: 'Robert Lang',
        rating: 5,
        date: '2026-06-18',
        comment: 'Knee replacement surgery went smoothly and rehabilitation guidance was superb.'
      }
    ]
  },
  {
    id: 'doc-6',
    name: 'Dr. Marcus Sterling',
    title: 'Consultant Psychiatrist',
    specialization: 'Psychiatry',
    qualification: 'MD, Dip Psych, Columbia University',
    experienceYears: 14,
    rating: 4.85,
    reviewCount: 210,
    fee: 130,
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    bio: 'Specializing in mood disorders, adult ADHD, mindfulness-based stress reduction, and holistic mental wellness.',
    hospitalBranch: 'Mind & Wellness Institute',
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    availableSlots: ['11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'],
    languages: ['English'],
    reviews: [
      {
        id: 'r7',
        patientName: 'Sarah W.',
        rating: 5,
        date: '2026-08-01',
        comment: 'Incredibly empathetic listener. Helped me navigate burnout and workplace stress.'
      }
    ]
  },
  {
    id: 'doc-7',
    name: 'Dr. Beatrice Kim',
    title: 'Senior General Physician',
    specialization: 'General Medicine',
    qualification: 'MD, ABIM, UCLA Health',
    experienceYears: 11,
    rating: 4.88,
    reviewCount: 520,
    fee: 80,
    photo: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400',
    bio: 'Primary care specialist focusing on chronic disease management, diabetes care, annual physical checkups, and preventive wellness.',
    hospitalBranch: 'Outpatient Pavilion - Floor 1',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
    languages: ['English', 'Korean'],
    reviews: [
      {
        id: 'r8',
        patientName: 'Tom Higgins',
        rating: 5,
        date: '2026-07-30',
        comment: 'Thorough, kind, and always listens attentively to all concerns.'
      }
    ]
  },
  {
    id: 'doc-8',
    name: 'Dr. Gabriel Rossi',
    title: 'Consultant Obstetrician & Gynecologist',
    specialization: 'Gynecology',
    qualification: 'MD, FACOG, University of Milan',
    experienceYears: 15,
    rating: 4.92,
    reviewCount: 310,
    fee: 115,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    bio: 'Dedicated women’s health expert providing high-risk pregnancy care, fertility consultations, and minimally invasive gynecological care.',
    hospitalBranch: 'Women’s Health Pavilion',
    availableDays: ['Wednesday', 'Thursday', 'Friday'],
    availableSlots: ['09:00 AM', '11:30 AM', '02:30 PM', '04:00 PM'],
    languages: ['English', 'Italian'],
    reviews: [
      {
        id: 'r9',
        patientName: 'Claire Bennet',
        rating: 5,
        date: '2026-08-08',
        comment: 'Extremely professional and made me feel completely comfortable during pregnancy.'
      }
    ]
  }
];

export const mockInitialAppointments: Appointment[] = [
  {
    id: 'LUM-88421',
    patientId: 'p1',
    patientName: 'Sarah Jenkins',
    doctorId: 'doc-1',
    doctorName: 'Dr. Evelyn Vance',
    doctorSpecialty: 'Cardiology',
    doctorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    date: '2026-08-15',
    time: '10:30 AM',
    type: 'online',
    symptoms: 'Mild chest heaviness after cardio, routine heart health follow-up.',
    status: 'Upcoming',
    consultationFee: 120,
    createdAt: '2026-08-10',
    meetingLink: 'https://lumina.health/consultation/LUM-88421'
  },
  {
    id: 'LUM-73109',
    patientId: 'p1',
    patientName: 'Sarah Jenkins',
    doctorId: 'doc-7',
    doctorName: 'Dr. Beatrice Kim',
    doctorSpecialty: 'General Medicine',
    doctorPhoto: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400',
    date: '2026-08-22',
    time: '02:00 PM',
    type: 'in-person',
    symptoms: 'Annual health checkup and routine blood work.',
    status: 'Upcoming',
    hospitalBranch: 'Outpatient Pavilion - Floor 1',
    consultationFee: 80,
    createdAt: '2026-08-08'
  },
  {
    id: 'LUM-61024',
    patientId: 'p1',
    patientName: 'Sarah Jenkins',
    doctorId: 'doc-4',
    doctorName: 'Dr. Jonathan Chen',
    doctorSpecialty: 'Dermatology',
    doctorPhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    date: '2026-07-20',
    time: '01:00 PM',
    type: 'online',
    symptoms: 'Skin rash on left arm.',
    status: 'Completed',
    consultationFee: 110,
    createdAt: '2026-07-15'
  }
];

export const mockHealthEntries: HealthEntry[] = [
  {
    id: 'h1',
    date: '2026-08-11',
    weightKg: 64.5,
    bpSystolic: 118,
    bpDiastolic: 76,
    bloodSugarMgDl: 95,
    sleepHours: 7.5,
    waterIntakeLiters: 2.8,
    mood: 'Good',
    notes: 'Morning run completed. Feeling energetic.'
  },
  {
    id: 'h2',
    date: '2026-08-10',
    weightKg: 64.8,
    bpSystolic: 122,
    bpDiastolic: 80,
    bloodSugarMgDl: 98,
    sleepHours: 6.8,
    waterIntakeLiters: 2.2,
    mood: 'Neutral',
    notes: 'Busy workday, slight evening headache.'
  },
  {
    id: 'h3',
    date: '2026-08-09',
    weightKg: 65.0,
    bpSystolic: 120,
    bpDiastolic: 78,
    bloodSugarMgDl: 92,
    sleepHours: 8.0,
    waterIntakeLiters: 3.0,
    mood: 'Excellent',
    notes: 'Weekend relaxation, good hydrations.'
  },
  {
    id: 'h4',
    date: '2026-08-08',
    weightKg: 65.2,
    bpSystolic: 125,
    bpDiastolic: 82,
    bloodSugarMgDl: 104,
    sleepHours: 6.0,
    waterIntakeLiters: 1.8,
    mood: 'Fatigued',
    notes: 'Late night project deadline.'
  },
  {
    id: 'h5',
    date: '2026-08-07',
    weightKg: 65.1,
    bpSystolic: 119,
    bpDiastolic: 77,
    bloodSugarMgDl: 94,
    sleepHours: 7.2,
    waterIntakeLiters: 2.5,
    mood: 'Good'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Upcoming Video Consult Today',
    message: 'Your teleconsultation with Dr. Evelyn Vance is scheduled for 10:30 AM today.',
    timestamp: '10 mins ago',
    read: false,
    type: 'appointment'
  },
  {
    id: 'n2',
    title: 'Vitals Goal Achieved',
    message: 'Congratulations! You logged 8.0 hours of sleep and hit your hydration target.',
    timestamp: '2 hours ago',
    read: false,
    type: 'health'
  },
  {
    id: 'n3',
    title: 'Welcome to Lumina Health',
    message: 'Explore your health portal, schedule consultations, and chat with AI Assistant anytime.',
    timestamp: '1 day ago',
    read: true,
    type: 'system'
  }
];

export const mockTherapists: Therapist[] = [
  {
    id: 't-1',
    name: 'Dr. Clara Oswald, PsyD',
    title: 'Licensed Personal Psychotherapist',
    specialty: 'Cognitive Behavioral Therapy (CBT), Anxiety & Burnout',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    rating: 4.96,
    reviewCount: 142,
    bio: 'Dedicated personal therapist with 12+ years guiding individuals through executive stress, relationship challenges, and life transitions.',
    sessionFee: 140,
    availableSlots: ['Today 03:00 PM', 'Tomorrow 10:00 AM', 'Friday 02:00 PM']
  },
  {
    id: 't-2',
    name: 'Dr. Nathan Vance, LMFT',
    title: 'Holistic Mind-Body Counselor',
    specialty: 'Mindfulness, Trauma Recovery & Sleep Psychology',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviewCount: 98,
    bio: 'Integrating somatic therapy and mindfulness techniques for deep stress relief and mental clarity.',
    sessionFee: 130,
    availableSlots: ['Tomorrow 01:00 PM', 'Thursday 11:00 AM', 'Saturday 04:00 PM']
  }
];

export const cannedAIResponses: Record<string, string> = {
  fever: "Fever is often your body's immune response to infection. Ensure you rest adequately, stay well-hydrated with fluids/electrolytes, and monitor your temperature with a thermometer. If your fever exceeds 103°F (39.4°C), lasts longer than 3 days, or is accompanied by difficulty breathing or severe neck stiffness, please seek immediate emergency medical care.",
  headache: "Headaches can stem from hydration deficits, stress, eye strain, or tension. Try resting in a quiet, darkened room, drink a glass of water, and apply a cool compress to your forehead. If you experience sudden 'thunderclap' headache pain, vision changes, or numbness, please consult a physician immediately.",
  'blood pressure': "Optimal blood pressure is generally around 120/80 mmHg. To support healthy cardiovascular function, maintain a low-sodium balanced diet, exercise regularly, manage stress, and avoid smoking. Always consult your cardiologist for personalized medication management.",
  sleep: "Healthy sleep hygiene includes maintaining a consistent sleep schedule, keeping your bedroom dark and cool (around 65°F / 18°C), avoiding screen time 1 hour before bed, and limiting caffeine after 2:00 PM.",
  anxiety: "When feeling anxious, try the 4-7-8 deep breathing technique: inhale deeply through your nose for 4 seconds, hold for 7 seconds, and exhale slowly through your mouth for 8 seconds. If stress persists, our Premium Personal Therapist booking is available.",
  diet: "A heart-healthy nutrition plan emphasizes whole plant foods, lean proteins (fish, legumes), olive oil, nuts, and high-fiber vegetables while minimizing ultra-processed sugars and saturated fats.",
  default: "Thank you for sharing your health query with LuminaCare AI. I can assist with general medical information, symptom guidance, and wellness tips. For a definitive medical diagnosis and treatment plan, we strongly recommend booking a direct consultation with one of our board-certified doctors."
};

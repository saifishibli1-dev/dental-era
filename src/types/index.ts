export type Page =
  | 'home'
  | 'about'
  | 'treatments'
  | 'treatment-detail'
  | 'doctors'
  | 'gallery'
  | 'contact'
  | 'book';

export interface Treatment {
  id: string;
  name: string;
  tagline: string;
  category: 'Restorative' | 'Cosmetic' | 'Orthodontics' | 'Preventive' | 'Surgical';
  shortDescription: string;
  fullDescription: string;
  duration: string;
  sessions: string;
  anesthesia: string;
  recoveryTime: string;
  technology: string[];
  benefits: string[];
  steps: {
    number: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  image: string;
  beforeAfterImage?: {
    before: string;
    after: string;
    caseTitle: string;
  };
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  degrees: string;
  experienceYears: number;
  specialties: string[];
  education: string[];
  bio: string;
  quote: string;
  image: string;
  opdDays: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  treatment: string;
  rating: number;
  quote: string;
  verified: boolean;
  avatarText: string;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  treatmentName: string;
  patientProfile: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
  clinicalNotes: string;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  treatmentId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  notes: string;
  isFirstVisit: boolean;
}

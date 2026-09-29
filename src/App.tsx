import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { DentalChatBot } from './components/DentalChatBot';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { TreatmentDetailPage } from './pages/TreatmentDetailPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('dental-implants');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>(undefined);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      const parts = hash.split('/');
      const route = parts[0] as Page;

      if (
        [
          'home',
          'about',
          'treatments',
          'treatment-detail',
          'doctors',
          'gallery',
          'contact',
          'book',
        ].includes(route)
      ) {
        setCurrentPage(route);
        if (route === 'treatment-detail' && parts[1]) {
          setSelectedTreatmentId(parts[1]);
        } else if (route === 'book') {
          if (parts[1]) setSelectedTreatmentId(parts[1]);
          if (parts[2]) setSelectedDoctorId(parts[2]);
        }
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: Page, treatmentId?: string, doctorId?: string) => {
    if (treatmentId) setSelectedTreatmentId(treatmentId);
    if (doctorId !== undefined) {
      setSelectedDoctorId(doctorId);
    } else if (page !== 'book') {
      setSelectedDoctorId(undefined);
    }

    setCurrentPage(page);

    let newHash = `#/${page}`;
    if (page === 'treatment-detail' && treatmentId) {
      newHash = `#/${page}/${treatmentId}`;
    } else if (page === 'book') {
      if (treatmentId && doctorId) {
        newHash = `#/${page}/${treatmentId}/${doctorId}`;
      } else if (treatmentId) {
        newHash = `#/${page}/${treatmentId}`;
      }
    }
    window.location.hash = newHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE7] text-[#202423] antialiased selection:bg-[#006B68] selection:text-white">
      {/* Subtle Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Strict Top Bar Contract Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Multi-Page Content with smooth transition container */}
      <main className="flex-1 w-full animate-in fade-in-30 duration-200">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'treatments' && <TreatmentsPage onNavigate={handleNavigate} />}
        {currentPage === 'treatment-detail' && (
          <TreatmentDetailPage
            treatmentId={selectedTreatmentId}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'doctors' && <DoctorsPage onNavigate={handleNavigate} />}
        {currentPage === 'gallery' && <GalleryPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
        {currentPage === 'book' && (
          <BookAppointmentPage
            initialTreatmentId={selectedTreatmentId}
            initialDoctorId={selectedDoctorId}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Quiet Luxury Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Sticky Bar (<15% viewport height) */}
      <MobileStickyBar onNavigate={handleNavigate} />

      {/* Clinical Concierge AI Dental Chatbot */}
      <DentalChatBot onNavigate={handleNavigate} />
    </div>
  );
}

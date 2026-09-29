import React, { useState, useEffect } from 'react';
import { Page, AppointmentFormData } from '../types';
import { TREATMENTS } from '../data/treatments';
import { DOCTORS } from '../data/doctors';
import { CLINIC_INFO } from '../data/clinicData';

interface BookAppointmentPageProps {
  initialTreatmentId?: string;
  initialDoctorId?: string;
  onNavigate: (page: Page, treatmentId?: string, doctorId?: string) => void;
}

const DOCTOR_DEFAULT_TREATMENT: Record<string, string> = {
  'dr-arjun-mehta': 'dental-implants',
  'dr-ananya-roy': 'invisalign-aligners',
  'dr-aditya-sharma': 'root-canal-treatment',
  'dr-priyanka-sen': 'pediatric-dentistry',
};

export const BookAppointmentPage: React.FC<BookAppointmentPageProps> = ({
  initialTreatmentId,
  initialDoctorId,
  onNavigate
}) => {
  const defaultTreatment = initialTreatmentId || (initialDoctorId ? DOCTOR_DEFAULT_TREATMENT[initialDoctorId] : 'dental-implants') || 'dental-implants';

  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    treatmentId: defaultTreatment,
    doctorId: initialDoctorId || 'any',
    date: '',
    timeSlot: '11:00 AM',
    notes: '',
    isFirstVisit: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    referenceNumber: string;
    bookingDetails: AppointmentFormData;
  } | null>(null);

  useEffect(() => {
    if (initialTreatmentId) {
      setFormData((prev) => ({ ...prev, treatmentId: initialTreatmentId }));
    } else if (initialDoctorId && DOCTOR_DEFAULT_TREATMENT[initialDoctorId]) {
      setFormData((prev) => ({ ...prev, treatmentId: DOCTOR_DEFAULT_TREATMENT[initialDoctorId] }));
    }

    if (initialDoctorId) {
      setFormData((prev) => ({ ...prev, doctorId: initialDoctorId }));
    }
  }, [initialTreatmentId, initialDoctorId]);

  // Set default minimum date to tomorrow
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '01:00 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM',
    '07:15 PM'
  ];

  const handleInputChange = (field: keyof AppointmentFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Valid 10-digit mobile number is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Valid email address is required (e.g. name@domain.com)';
    }
    if (!formData.date) {
      errs.date = 'Please select your preferred date';
    }
    if (!formData.treatmentId) {
      errs.treatmentId = 'Please select a treatment';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate swift confirmation
    setTimeout(() => {
      const refCode = `LUM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedBooking({
        referenceNumber: refCode,
        bookingDetails: { ...formData }
      });
      setIsSubmitting(false);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 400);
  };

  const selectedTreatmentObj = TREATMENTS.find((t) => t.id === formData.treatmentId);
  const selectedDoctorObj = DOCTORS.find((d) => d.id === formData.doctorId);

  return (
    <div className="space-y-16 pb-24">
      {/* 1. Header Banner */}
      <section className="pt-8 sm:pt-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
            Concierge Consultation
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#202423] mt-2 tracking-tight">
            Reserve Your Appointment.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#59615F] leading-relaxed max-w-2xl mx-auto">
            Take the first step toward enduring oral health. Select your preferred discipline, specialist, and time. Our concierge will confirm within two hours.
          </p>
        </div>
      </section>

      {/* 2. Main Booking Area */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {confirmedBooking ? (
          /* SUCCESS STATE - White Card Container */
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#D8D5CC] shadow-2xs overflow-hidden p-6 sm:p-10 animate-in fade-in-50 duration-300">
            <div className="text-center max-w-xl mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#006B68] text-white flex items-center justify-center mx-auto text-2xl font-bold shadow-xs">
                ✓
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#006B68] block">
                Appointment Requested & Confirmed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#202423]">
                We Look Forward to Welcoming You.
              </h2>
              <p className="text-[#59615F] text-sm leading-relaxed">
                Your consultation request has been reserved in our clinical schedule. A confirmation SMS and email have been dispatched to <strong>{confirmedBooking.bookingDetails.email}</strong>.
              </p>
            </div>

            {/* Confirmed Ticket Receipt - Warm Ivory background */}
            <div className="mt-8 bg-[#F3EFE7] rounded-xl p-6 border border-[#D8D5CC] max-w-xl mx-auto space-y-4 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#D8D5CC]">
                <span className="text-[#59615F] font-medium">Booking Reference</span>
                <span className="font-mono font-bold text-[#006B68] tracking-wider">
                  {confirmedBooking.referenceNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[#59615F] block text-xs">Patient Name</span>
                  <span className="font-semibold text-[#202423] block">
                    {confirmedBooking.bookingDetails.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-[#59615F] block text-xs">Contact Phone</span>
                  <span className="font-semibold text-[#202423] block">
                    {confirmedBooking.bookingDetails.phone}
                  </span>
                </div>
                <div>
                  <span className="text-[#59615F] block text-xs">Treatment Discipline</span>
                  <span className="font-semibold text-[#202423] block">
                    {TREATMENTS.find((t) => t.id === confirmedBooking.bookingDetails.treatmentId)?.name || 'General Examination'}
                  </span>
                </div>
                <div>
                  <span className="text-[#59615F] block text-xs">Attending Specialist</span>
                  <span className="font-semibold text-[#202423] block">
                    {DOCTORS.find((d) => d.id === confirmedBooking.bookingDetails.doctorId)?.name || 'First Available Specialist'}
                  </span>
                </div>
                <div>
                  <span className="text-[#59615F] block text-xs">Preferred Date</span>
                  <span className="font-semibold text-[#202423] block">
                    {confirmedBooking.bookingDetails.date}
                  </span>
                </div>
                <div>
                  <span className="text-[#59615F] block text-xs">Preferred Time</span>
                  <span className="font-semibold text-[#202423] block">
                    {confirmedBooking.bookingDetails.timeSlot}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D8D5CC] text-[#59615F] text-xs">
                <strong>Studio Location:</strong> {CLINIC_INFO.address.line1}, {CLINIC_INFO.address.area}, New Delhi 110057 (Complimentary Valet at porch).
              </div>
            </div>

            {/* Post-confirmation actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
              <a
                href={`https://wa.me/919811054321?text=Hi%20Lumina%20Dental%2C%20I%20have%20submitted%20booking%20reference%20${confirmedBooking.referenceNumber}%20for%20${confirmedBooking.bookingDetails.fullName}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#202423] hover:bg-[#006B68] rounded-md transition-colors text-center shadow-xs"
              >
                Send WhatsApp Confirmation
              </a>
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  setFormData({
                    fullName: '',
                    phone: '',
                    email: '',
                    treatmentId: 'dental-implants',
                    doctorId: 'any',
                    date: '',
                    timeSlot: '11:00 AM',
                    notes: '',
                    isFirstVisit: true
                  });
                }}
                className="w-full sm:w-auto px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#202423] bg-[#F3EFE7] hover:bg-[#FAF9F5] border border-[#202423] rounded-md transition-colors text-center cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* FORM STATE - White Card Container */
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#D8D5CC] shadow-2xs overflow-hidden p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Visit Type Segmented Buttons */}
              <div>
                <label className="block text-xs font-semibold text-[#202423] uppercase tracking-wider mb-2">
                  Have You Visited Lumina Before?
                </label>
                <div className="flex gap-2 max-w-sm">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isFirstVisit: true })}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      formData.isFirstVisit
                        ? 'bg-[#202423] border-[#202423] text-white font-semibold shadow-xs'
                        : 'bg-[#F3EFE7] border-[#D8D5CC] text-[#59615F] hover:text-[#202423]'
                    }`}
                  >
                    New Patient (First Visit)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isFirstVisit: false })}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      !formData.isFirstVisit
                        ? 'bg-[#202423] border-[#202423] text-white font-semibold shadow-xs'
                        : 'bg-[#F3EFE7] border-[#D8D5CC] text-[#59615F] hover:text-[#202423]'
                    }`}
                  >
                    Existing Patient (Follow-up)
                  </button>
                </div>
              </div>

              {/* Patient Contact Details */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#202423] border-b border-[#D8D5CC]/60 pb-2">
                  1. Patient Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-[#202423] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="e.g. Vikramaditya Sethi"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F3EFE7] border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#006B68] text-[#202423] placeholder:text-[#59615F]/60 ${
                        errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-[#D8D5CC]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-[#202423] uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 98110 00000"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F3EFE7] border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#006B68] text-[#202423] placeholder:text-[#59615F]/60 ${
                        errors.phone ? 'border-red-400 bg-red-50/30' : 'border-[#D8D5CC]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-[#202423] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="vikram@example.com"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F3EFE7] border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#006B68] text-[#202423] placeholder:text-[#59615F]/60 ${
                        errors.email ? 'border-red-400 bg-red-50/30' : 'border-[#D8D5CC]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Treatment & Specialist Selection */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#202423] border-b border-[#D8D5CC]/60 pb-2">
                  2. Clinical Service & Doctor
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202423] uppercase tracking-wider mb-1">
                      Treatment / Concern *
                    </label>
                    <select
                      value={formData.treatmentId}
                      onChange={(e) => handleInputChange('treatmentId', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F3EFE7] border border-[#D8D5CC] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#006B68] text-[#202423]"
                    >
                      {TREATMENTS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.category})
                        </option>
                      ))}
                    </select>
                    {selectedTreatmentObj && (
                      <p className="text-[11px] text-[#59615F] mt-1">
                        Est. duration: {selectedTreatmentObj.duration} · {selectedTreatmentObj.anesthesia}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202423] uppercase tracking-wider mb-1">
                      Preferred Specialist
                    </label>
                    <select
                      value={formData.doctorId}
                      onChange={(e) => {
                        const newDocId = e.target.value;
                        handleInputChange('doctorId', newDocId);
                        // If user selects a specialist and current treatment is default or unselected, optionally align
                        if (newDocId !== 'any' && DOCTOR_DEFAULT_TREATMENT[newDocId]) {
                          handleInputChange('treatmentId', DOCTOR_DEFAULT_TREATMENT[newDocId]);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F3EFE7] border border-[#D8D5CC] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#006B68] text-[#202423]"
                    >
                      <option value="any">First Available Specialist</option>
                      {DOCTORS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} – {d.role.split('&')[0]}
                        </option>
                      ))}
                    </select>
                    {selectedDoctorObj && (
                      <p className="text-[11px] text-[#006B68] font-medium mt-1">
                        OPD Days: {selectedDoctorObj.opdDays}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Schedule Timing */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#202423] border-b border-[#D8D5CC]/60 pb-2">
                  3. Preferred Schedule
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#202423] uppercase tracking-wider mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      min={getTomorrowDate()}
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F3EFE7] border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#006B68] text-[#202423] ${
                        errors.date ? 'border-red-400 bg-red-50/30' : 'border-[#D8D5CC]'
                      }`}
                    />
                    {errors.date && <p className="text-[11px] text-red-600 mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202423] uppercase tracking-wider mb-1">
                      Preferred Time Window
                    </label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F3EFE7] border border-[#D8D5CC] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#006B68] text-[#202423]"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Message / Symptoms Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#202423] uppercase tracking-wider mb-1">
                  Additional Notes or Symptoms (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Tooth sensitivity to cold water, wedding in 3 months, or previous dental anxiety..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F3EFE7] border border-[#D8D5CC] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#006B68] text-[#202423] placeholder:text-[#59615F]/60"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#D8D5CC]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#59615F]">
                  <span>Patient confidentiality maintained under NABH privacy guidelines.</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202423] hover:bg-[#006B68] active:scale-[0.98] rounded-md shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirming Reservation...' : 'Submit Appointment Request'}
                </button>
              </div>

            </form>
          </div>
        )}
      </section>

      {/* 3. Assurance Footer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-[#59615F]">
          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#D8D5CC] shadow-2xs">
            <span className="font-semibold text-[#202423] block mb-1">
              Zero Waiting Time Policy
            </span>
            Patients are greeted and escorted directly to their operatory upon scheduled arrival.
          </div>
          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#D8D5CC] shadow-2xs">
            <span className="font-semibold text-[#202423] block mb-1">
              Complimentary Valet
            </span>
            Covered drop-off and parking at our Vasant Vihar clinic porch.
          </div>
          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#D8D5CC] shadow-2xs">
            <span className="font-semibold text-[#202423] block mb-1">
              Transparent Estimates
            </span>
            Written transparent pricing prior to any procedure. No surprise add-ons.
          </div>
        </div>
      </section>
    </div>
  );
};


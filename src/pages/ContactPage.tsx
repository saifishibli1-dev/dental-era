import React, { useState } from 'react';
import { Page } from '../types';
import { CLINIC_INFO } from '../data/clinicData';

interface ContactPageProps {
  onNavigate: (page: Page) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name';
    
    // Clean phone number to check digits
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Valid 10-digit phone number is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Valid email address is required (e.g. name@domain.com)';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please include a brief message or question';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Header Banner */}
      <section className="pt-8 sm:pt-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
            Reach Our Concierge
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#202423] mt-2 tracking-tight">
            Visit Our Vasant Vihar Studio.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#59615F] leading-relaxed max-w-2xl mx-auto">
            Conveniently situated in the diplomatic heart of South Delhi, Lumina Dental Studio offers private parking, seamless metro connectivity, and a soothing clinical sanctuary.
          </p>
        </div>
      </section>

      {/* 2. Contact Information & Interactive Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Clinic Coordinates & Transit Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#D8D5CC] shadow-2xs space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#202423]">
                Studio Coordinates
              </h2>

              <div className="space-y-4 text-sm text-[#59615F]">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#006B68] mb-1">
                    Address:
                  </div>
                  <p className="text-[#202423] font-medium">{CLINIC_INFO.address.line1}</p>
                  <p>{CLINIC_INFO.address.area}, {CLINIC_INFO.address.city} – {CLINIC_INFO.address.pincode}</p>
                  <p className="text-xs text-[#59615F] mt-1 italic">
                    Landmark: {CLINIC_INFO.address.landmark}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#D8D5CC]/60">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#006B68] mb-1">
                    Direct Telephones:
                  </div>
                  <p className="font-medium text-[#202423]">
                    <a href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-[#006B68] transition-colors">
                      Landline: {CLINIC_INFO.phone}
                    </a>
                  </p>
                  <p className="font-medium text-[#202423] mt-0.5">
                    <a href={`tel:${CLINIC_INFO.mobile.replace(/\s+/g, '')}`} className="hover:text-[#006B68] transition-colors">
                      Mobile & Emergency: {CLINIC_INFO.mobile}
                    </a>
                  </p>
                  <p className="text-xs text-[#006B68] font-medium mt-1">
                    <a
                      href="https://wa.me/919811054321?text=Hello%20Lumina%20Dental%20Studio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-[#202423] transition-colors"
                    >
                      Instant WhatsApp Chat: +91 98110 54321
                    </a>
                  </p>
                </div>

                <div className="pt-2 border-t border-[#D8D5CC]/60">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#006B68] mb-1">
                    Consultation & OPD Timings:
                  </div>
                  {CLINIC_INFO.hours.map((h, idx) => (
                    <div key={idx} className="flex justify-between text-xs py-0.5">
                      <span>{h.days}</span>
                      <span className="font-semibold text-[#202423] tabular-nums">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transit and Access Guide */}
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#D8D5CC] space-y-4 shadow-2xs">
              <h3 className="font-serif text-xl font-bold text-[#202423]">
                How to Reach Us
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#59615F]">
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[#202423] min-w-28 shrink-0">Delhi Metro:</span>
                  <span>{CLINIC_INFO.transitInfo.metro}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[#202423] min-w-28 shrink-0">From Airport T3:</span>
                  <span>{CLINIC_INFO.transitInfo.airport}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[#202423] min-w-28 shrink-0">From Gurgaon:</span>
                  <span>{CLINIC_INFO.transitInfo.gurgaon}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[#202423] min-w-28 shrink-0">Valet Service:</span>
                  <span>{CLINIC_INFO.transitInfo.parking}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Inquiry Form or Map Representation (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Interactive Inquiry Form */}
            <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-2xl border border-[#D8D5CC] shadow-2xs">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#202423] mb-2">
                Send an Inquiry to Our Clinical Team
              </h2>
              <p className="text-xs sm:text-sm text-[#59615F] mb-6">
                Have a clinical question or require a second opinion? Write to our patient concierge. We respond within 2 working hours.
              </p>

              {submitted ? (
                <div className="bg-[#F3EFE7] border border-[#006B68]/30 rounded-xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#006B68] text-white flex items-center justify-center mx-auto text-xl font-bold shadow-xs">
                    ✓
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#202423]">
                    Message Successfully Received
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59615F] max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Our clinical coordinator in Vasant Vihar has received your inquiry and will reach out to you via phone or email shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          subject: 'General Inquiry',
                          message: ''
                        });
                      }}
                      className="text-xs text-[#006B68] font-semibold underline cursor-pointer hover:text-[#202423]"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#202423] uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="e.g. Radhika Kapoor"
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F3EFE7] border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#006B68] text-[#202423] placeholder:text-[#59615F]/60 ${
                          errors.name ? 'border-red-400 bg-red-50/30' : 'border-[#D8D5CC]'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#202423] uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="radhika@example.com"
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F3EFE7] border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#006B68] text-[#202423] placeholder:text-[#59615F]/60 ${
                          errors.email ? 'border-red-400 bg-red-50/30' : 'border-[#D8D5CC]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#202423] uppercase tracking-wider mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F3EFE7] border border-[#D8D5CC] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#006B68] text-[#202423]"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Dental Implants Consultation">Dental Implants Consultation</option>
                        <option value="Invisalign Aligners Price & Timeline">Invisalign Aligners Price & Timeline</option>
                        <option value="Porcelain Veneers / Smile Makeover">Porcelain Veneers / Smile Makeover</option>
                        <option value="Emergency Toothache / RCT">Emergency Toothache / RCT</option>
                        <option value="Second Medical Opinion">Second Medical Opinion</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202423] uppercase tracking-wider mb-1">
                      Your Message or Dental History *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please share any symptoms, preferred consultation timing, or existing X-rays you might have..."
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F3EFE7] border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#006B68] text-[#202423] placeholder:text-[#59615F]/60 ${
                        errors.message ? 'border-red-400 bg-red-50/30' : 'border-[#D8D5CC]'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202423] hover:bg-[#006B68] rounded-md transition-colors cursor-pointer shadow-xs text-center"
                    >
                      Send Message
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('book')}
                      className="text-xs text-[#006B68] font-semibold hover:underline cursor-pointer text-center"
                    >
                      Need an appointment slot? Book directly →
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Visual Location Card / Architectural Map Representation */}
            <div className="bg-[#202423] text-white p-6 sm:p-8 rounded-2xl border border-[#D8D5CC]/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#8FA9A1] font-semibold">
                  Location Map Guide
                </span>
                <span className="text-xs bg-white/10 text-[#D8D5CC] px-2 py-1 rounded border border-[#D8D5CC]/20">
                  28.5601° N, 77.1610° E
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-white">
                Vasant Vihar Embassy & Diplomatic Belt
              </h3>
              <p className="text-xs sm:text-sm text-[#D8D5CC]/80 leading-relaxed">
                Located on Poorvi Marg, Lumina Dental Studio is easily accessible from all of South Delhi (Chanakyapuri, Shanti Niketan, Westend, Anand Niketan, Hauz Khas, and Greater Kailash). Complimentary covered valet parking is available right at our entrance.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs">
                <a
                  href="https://maps.google.com/?q=Vasant+Vihar+New+Delhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white border border-[#D8D5CC]/20 rounded-md transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>Open in Google Maps</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="tel:+911149876500"
                  className="px-4 py-2 bg-[#FAF9F5] hover:bg-[#F3EFE7] text-[#202423] rounded-md transition-colors font-semibold"
                >
                  Call Reception For Directions
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};


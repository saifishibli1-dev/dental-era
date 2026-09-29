import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import { CLINIC_INFO } from '../data/clinicData';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  recommendedTreatmentId?: string;
  suggestedActions?: Array<{
    label: string;
    action: 'book' | 'treatment-detail' | 'call' | 'whatsapp';
    treatmentId?: string;
  }>;
  isEmergency?: boolean;
}

interface DentalChatBotProps {
  onNavigate: (page: Page, treatmentId?: string) => void;
}

const INITIAL_GREETING: Message = {
  id: 'msg-init',
  role: 'model',
  content: `Hello, I am the Lumina Dental Studio Clinical Concierge. 

Whether you are considering dental implants, Invisalign aligners, single-sitting root canals, or have questions about painless anesthesia and procedure costs, I am here to assist you.

How can I help you today?`,
  timestamp: 'Just now',
  suggestedActions: [
    { label: 'Missing Tooth / Implants', action: 'treatment-detail', treatmentId: 'dental-implants' },
    { label: 'Invisalign Pricing', action: 'treatment-detail', treatmentId: 'invisalign-aligners' },
    { label: 'Book Consultation', action: 'book' },
  ],
};

const QUICK_PROMPTS = [
  'Do Straumann® implants hurt?',
  'How much does Invisalign cost?',
  'I have a severe toothache',
  'Painless anesthesia protocol',
  'First visit what to expect',
];

export const DentalChatBot: React.FC<DentalChatBotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when chat opens and handle Escape key to close
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 150);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build history payload for the backend
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/dental-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: historyPayload,
          message: text,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg: Message = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.reply || "I'm having a brief connection issue. Please contact our concierge directly at +91 11 4987 6500.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedTreatmentId: data.recommendedTreatmentId,
        suggestedActions: data.suggestedActions,
        isEmergency: data.isEmergency,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error('[DentalChatBot] Network or server error:', error);
      const fallbackMsg: Message = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `I apologize, our direct connection experienced a momentary delay. 

Our clinical team is on standby at our Vasant Vihar studio. You may reach our concierge at **${CLINIC_INFO.phone}** or send us a WhatsApp message at **${CLINIC_INFO.whatsapp}**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: 'Book Appointment', action: 'book' },
          { label: 'Call Clinic Concierge', action: 'call' },
          { label: 'WhatsApp Inquiry', action: 'whatsapp' },
        ],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: {
    label: string;
    action: 'book' | 'treatment-detail' | 'call' | 'whatsapp';
    treatmentId?: string;
  }) => {
    if (action.action === 'book') {
      onNavigate('book', action.treatmentId);
      setIsOpen(false);
    } else if (action.action === 'treatment-detail') {
      onNavigate('treatment-detail', action.treatmentId || 'dental-implants');
      setIsOpen(false);
    } else if (action.action === 'call') {
      window.location.href = `tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`;
    } else if (action.action === 'whatsapp') {
      window.open(
        `https://wa.me/919811054321?text=Hello%20Lumina%20Dental%20Studio%2C%20I%20have%20an%20inquiry.`,
        '_blank'
      );
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_GREETING]);
    setInputMessage('');
  };

  return (
    <>
      {/* Floating Trigger Button (Positioned comfortably above mobile sticky bar) */}
      {!isOpen && (
        <aside
          aria-label="Dental concierge chat launcher"
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 animate-in fade-in-50 duration-300"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-[#202423] hover:bg-[#006B68] text-white pl-4 pr-5 py-3 rounded-full shadow-lg border border-[#D8D5CC]/30 transition-all duration-300 cursor-pointer active:scale-95"
            aria-label="Open Lumina Dental Studio Clinical Concierge Chatbot"
          >
            {/* Tooth / Stethoscope Icon with status indicator */}
            <div className="relative flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#8FA9A1] group-hover:text-white transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C7.5 2 4 4.5 4 8c0 2.2 1.3 4.2 3.3 5.4L6.5 20c-.1.8.6 1.5 1.4 1.3l4.1-1 4.1 1c.8.2 1.5-.5 1.4-1.3l-.8-6.6c2-1.2 3.3-3.2 3.3-5.4 0-3.5-3.5-6-8-6z" />
                <path d="M9 10h.01M15 10h.01" />
              </svg>
              {/* Online pulse dot */}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8FA9A1] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006B68]"></span>
              </span>
            </div>

            <div className="text-left">
              <div className="text-xs font-semibold tracking-wide uppercase">
                Dental Concierge
              </div>
              <div className="text-[10px] text-[#D8D5CC]/80">
                Dr. Advisor · Online
              </div>
            </div>

            {unreadCount > 0 && (
              <span className="bg-[#006B68] text-white text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
                {unreadCount}
              </span>
            )}
          </button>
        </aside>
      )}

      {/* Backdrop for mobile to dismiss by tapping outside */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-45 bg-black/25 backdrop-blur-2xs md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <aside
          aria-label="Lumina Dental Studio Clinical Concierge Chat Window"
          className="fixed bottom-20 md:bottom-8 right-2 sm:right-6 md:right-8 z-50 w-[calc(100vw-1rem)] sm:w-[420px] max-h-[640px] h-[82vh] md:h-[600px] bg-[#F3EFE7] rounded-2xl border border-[#D8D5CC] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        >
          {/* Header Bar */}
          <div className="bg-[#FAF9F5] px-4 py-3.5 border-b border-[#D8D5CC] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#202423] text-white flex items-center justify-center font-serif font-bold text-sm shadow-2xs">
                L
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#202423] leading-none">
                  Lumina Clinical Concierge
                </h3>
                <span className="text-[11px] text-[#59615F] flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006B68]" />
                  AI Triage & Practice Assistant · Vasant Vihar
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Restart Conversation"
                className="p-1.5 text-[#59615F] hover:text-[#202423] rounded-md transition-colors cursor-pointer"
                aria-label="Restart chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Concierge"
                className="p-1.5 text-[#59615F] hover:text-[#202423] rounded-md transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips (Horizontal scrollable) */}
          <div className="bg-[#FAF9F5]/70 border-b border-[#D8D5CC]/80 px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="text-[11px] whitespace-nowrap bg-[#FFFFFF] hover:bg-[#F3EFE7] text-[#202423] border border-[#D8D5CC] px-2.5 py-1 rounded-full transition-colors cursor-pointer shadow-2xs shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  {/* Emergency Alert Banner if detected */}
                  {!isUser && msg.isEmergency && (
                    <div className="mb-2 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 space-y-1 w-full max-w-sm">
                      <div className="font-bold flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Urgent Dental Care Recommended</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        For acute pain, bleeding, or trauma, please reach our on-call dentist directly:
                      </p>
                      <a
                        href={`tel:${CLINIC_INFO.mobile.replace(/\s+/g, '')}`}
                        className="inline-block font-bold text-red-900 underline mt-0.5"
                      >
                        Call Emergency Desk: {CLINIC_INFO.mobile}
                      </a>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-2xs ${
                      isUser
                        ? 'bg-[#202423] text-white rounded-br-xs'
                        : 'bg-[#FFFFFF] text-[#202423] border border-[#D8D5CC] rounded-bl-xs'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Action suggestions attached to model messages */}
                  {!isUser && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                      {msg.suggestedActions.map((action, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleActionClick(action)}
                          className="px-3 py-1.5 text-xs font-semibold text-[#202423] bg-[#FFFFFF] hover:bg-[#202423] hover:text-white border border-[#202423]/60 rounded-md transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                        >
                          <span>{action.label}</span>
                          <span>→</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-[#59615F]/70 px-1 mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Typing / Thinking Indicator */}
            {isLoading && (
              <div className="flex flex-col items-start space-y-1">
                <div className="bg-[#FFFFFF] border border-[#D8D5CC] rounded-2xl rounded-bl-xs px-4 py-2.5 shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006B68] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006B68] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006B68] animate-bounce" />
                  <span className="text-xs text-[#59615F] ml-1.5 italic font-serif">
                    Consulting clinical database...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form Area */}
          <div className="p-3 bg-[#FAF9F5] border-t border-[#D8D5CC] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about implants, toothache, or pricing..."
                disabled={isLoading}
                className="flex-1 bg-[#FFFFFF] border border-[#D8D5CC] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#202423] placeholder:text-[#59615F]/60 focus:outline-hidden focus:ring-1 focus:ring-[#006B68] focus:border-[#006B68] shadow-2xs"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2.5 rounded-lg bg-[#202423] hover:bg-[#006B68] text-white disabled:opacity-40 transition-colors shadow-2xs cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

            <div className="text-[10px] text-[#59615F]/80 text-center mt-2 leading-tight">
              Educational advisory from Lumina Dental Studio. For emergencies call{' '}
              <a href={`tel:${CLINIC_INFO.mobile}`} className="font-semibold text-[#006B68] underline">
                {CLINIC_INFO.mobile}
              </a>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

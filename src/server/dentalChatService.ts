import { GoogleGenAI } from '@google/genai';
import { TREATMENTS } from '../data/treatments';
import { CLINIC_INFO } from '../data/clinicData';
import { DOCTORS } from '../data/doctors';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface ChatResponsePayload {
  reply: string;
  recommendedTreatmentId?: string;
  suggestedActions?: Array<{
    label: string;
    action: 'book' | 'treatment-detail' | 'call' | 'whatsapp';
    treatmentId?: string;
  }>;
  isEmergency?: boolean;
}

// Prepare comprehensive clinical system context
const CLINICAL_KNOWLEDGE_BASE = `
You are the Lumina Dental Studio Virtual Clinical Concierge & Dental Advisor.
Lumina Dental Studio is a high-end, patient-centric dental boutique located in South Delhi.

CLINIC INFORMATION:
- Name: ${CLINIC_INFO.name}
- Location: ${CLINIC_INFO.address.line1}, ${CLINIC_INFO.address.area}, ${CLINIC_INFO.address.city} – ${CLINIC_INFO.address.pincode}
- Landmark: ${CLINIC_INFO.address.landmark}
- Phone: ${CLINIC_INFO.phone}, Mobile/Emergency: ${CLINIC_INFO.mobile}, WhatsApp: ${CLINIC_INFO.whatsapp}
- Timings: Mon–Sat 9:30 AM – 8:00 PM, Sun 10:00 AM – 2:00 PM (By prior appointment)
- Transit: 3 mins walk from Vasant Vihar Metro (Magenta Line, Gate 2). Complimentary valet parking at porch.
- Standards: European EN 13060 Class-B cleanroom sterilization, Planmeca 3D CBCT, iTero 5D digital optical scanning, Carl Zeiss surgical microscopes, computer-buffered painless anesthesia.

DOCTORS & SPECIALTIES:
${DOCTORS.map(
  (d) => `- ${d.name} (${d.role}, ${d.degrees}): Experience: ${d.experienceYears}+ years. OPD Days: ${d.opdDays}. Philosophy: "${d.quote}"`
).join('\n')}

TREATMENTS OFFERED:
${TREATMENTS.map(
  (t) => `- ID: "${t.id}", Name: "${t.name}" (${t.category})
  Tagline: "${t.tagline}"
  Duration: ${t.duration}, Visits: ${t.sessions}, Anesthesia: ${t.anesthesia}, Recovery: ${t.recoveryTime}
  Key Benefits: ${t.benefits.join('; ')}`
).join('\n\n')}

ROLE & GUIDELINES:
1. Warm, reassuring, clinically precise, and empathetic tone. Never robotic or cold.
2. Educate patients clearly about options, expected comfort, technologies used (e.g., Swedish Straumann® implants, Carl Zeiss surgical magnification, computer-buffered painless anesthesia, invisible aligners).
3. If the patient has tooth pain, trauma, swelling, or an emergency:
   - Provide immediate first-aid advice (rinse with lukewarm saline, cold compress for swelling, do not apply aspirin directly to gums, avoid extremely hot/cold food).
   - Flag it as an emergency and advise them to call our concierge directly at +91 98110 54321 or visit the Vasant Vihar studio immediately.
4. If the patient asks about costs:
   - Provide realistic, transparent approximate ranges in Indian Rupees (INR ₹) based on Delhi boutique standards:
     - Dental Implants (Straumann®): ₹45,000 - ₹75,000 per implant (including Swedish fixture and abutment)
     - Invisalign Clear Aligners: ₹1,50,000 - ₹3,50,000 depending on complexity (Lite vs Comprehensive)
     - Porcelain Veneers: ₹18,000 - ₹32,000 per tooth (hand-layered feldspathic/e.max)
     - Single-Sitting Microscopic RCT: ₹8,500 - ₹15,000 (including rotary nickel-titanium & 3D obturation)
     - In-Office Teeth Whitening: ₹14,000 - ₹22,000 (phototherapy cold blue LED)
     - Full Mouth Rehabilitation / All-on-4: ₹3,50,000 - ₹7,00,000 per arch
     - Dental Consultation & 3D Diagnostic Evaluation: ₹1,500
   - Clarify that every patient receives a written, itemized estimate with zero surprise chairside fees following their in-person 3D CBCT scan.
5. If a treatment fits the conversation, reference its exact canonical ID: "dental-implants", "invisalign-aligners", "teeth-whitening", "root-canal-treatment", "cosmetic-dentistry", "dental-crowns-bridges", "pediatric-dentistry", "general-dentistry".
6. Always maintain a professional medical disclaimer: this information is for educational guidance and does not substitute for an in-person diagnostic examination.
7. Format responses cleanly using short paragraphs or bullet points for readability. Avoid walls of dense text.
`;

export async function processDentalChat(
  history: ChatMessage[],
  latestMessage: string
): Promise<ChatResponsePayload> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn('[DentalChat] GEMINI_API_KEY not found in environment. Using clinical fallback.');
    return generateFallbackResponse(latestMessage);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Format conversation history for Gemini API
    const contents = [];
    
    // Add up to last 10 messages from history to keep context manageable
    const recentHistory = history.slice(-10);
    for (const msg of recentHistory) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      });
    }

    // Add latest user message
    contents.push({
      role: 'user',
      parts: [
        {
          text: `User query: "${latestMessage}"
          
Please respond as the Lumina Dental Studio concierge.
After your helpful response, output a special delimiter "---JSON_METADATA---" followed by a JSON object with:
{
  "recommendedTreatmentId": string | null (matching one of: dental-implants, invisalign-aligners, teeth-whitening, root-canal-treatment, cosmetic-dentistry, dental-crowns-bridges, pediatric-dentistry, general-dentistry, or null),
  "isEmergency": boolean (true if acute pain, severe trauma, bleeding, or urgent distress),
  "suggestedActions": array of { "label": string, "action": "book" | "treatment-detail" | "call" | "whatsapp", "treatmentId": string optional } (max 3 actions)
}`,
        },
      ],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: CLINICAL_KNOWLEDGE_BASE,
        temperature: 0.6,
      },
    });

    const rawText = response.text || '';

    // Split text by delimiter if present
    if (rawText.includes('---JSON_METADATA---')) {
      const [replyPart, jsonPart] = rawText.split('---JSON_METADATA---');
      try {
        const cleanJson = jsonPart.trim().replace(/^```json/i, '').replace(/```$/i, '').trim();
        const meta = JSON.parse(cleanJson);
        return {
          reply: replyPart.trim(),
          recommendedTreatmentId: meta.recommendedTreatmentId || undefined,
          isEmergency: Boolean(meta.isEmergency),
          suggestedActions: Array.isArray(meta.suggestedActions) ? meta.suggestedActions : undefined,
        };
      } catch (err) {
        console.error('[DentalChat] Failed to parse metadata JSON:', err);
        return {
          reply: replyPart.trim() || rawText.trim(),
          ...inferActionsFromText(latestMessage),
        };
      }
    }

    // Default if no metadata delimiter
    return {
      reply: rawText.trim(),
      ...inferActionsFromText(latestMessage),
    };
  } catch (error) {
    console.error('[DentalChat] Error calling Gemini API:', error);
    return generateFallbackResponse(latestMessage);
  }
}

function inferActionsFromText(query: string): Partial<ChatResponsePayload> {
  const q = query.toLowerCase();
  if (q.includes('implant') || q.includes('missing tooth') || q.includes('denture')) {
    return {
      recommendedTreatmentId: 'dental-implants',
      suggestedActions: [
        { label: 'Book Implant Consult', action: 'book', treatmentId: 'dental-implants' },
        { label: 'View Implant Details', action: 'treatment-detail', treatmentId: 'dental-implants' },
        { label: 'WhatsApp Concierge', action: 'whatsapp' },
      ],
    };
  }
  if (q.includes('invisalign') || q.includes('aligner') || q.includes('braces') || q.includes('crooked')) {
    return {
      recommendedTreatmentId: 'invisalign-aligners',
      suggestedActions: [
        { label: 'Book Invisalign Assessment', action: 'book', treatmentId: 'invisalign-aligners' },
        { label: 'View Aligner Guide', action: 'treatment-detail', treatmentId: 'invisalign-aligners' },
        { label: 'WhatsApp Concierge', action: 'whatsapp' },
      ],
    };
  }
  if (q.includes('pain') || q.includes('ache') || q.includes('root canal') || q.includes('nerve')) {
    return {
      recommendedTreatmentId: 'root-canal-treatment',
      isEmergency: true,
      suggestedActions: [
        { label: 'Book Urgent Evaluation', action: 'book', treatmentId: 'root-canal-treatment' },
        { label: 'Call Studio Immediately', action: 'call' },
        { label: 'WhatsApp Concierge', action: 'whatsapp' },
      ],
    };
  }
  if (q.includes('veneer') || q.includes('smile') || q.includes('cosmetic') || q.includes('makeover')) {
    return {
      recommendedTreatmentId: 'cosmetic-dentistry',
      suggestedActions: [
        { label: 'Book Smile Makeover Consult', action: 'book', treatmentId: 'cosmetic-dentistry' },
        { label: 'View Veneers Details', action: 'treatment-detail', treatmentId: 'cosmetic-dentistry' },
      ],
    };
  }
  return {
    suggestedActions: [
      { label: 'Book Appointment', action: 'book' },
      { label: 'Call Concierge', action: 'call' },
      { label: 'WhatsApp Clinic', action: 'whatsapp' },
    ],
  };
}

function generateFallbackResponse(query: string): ChatResponsePayload {
  const q = query.toLowerCase();

  if (q.includes('pain') || q.includes('ache') || q.includes('emergency')) {
    return {
      reply: `I understand you are experiencing discomfort. At Lumina Dental Studio in Vasant Vihar, we prioritize urgent dental care.

**Immediate Guidance:**
- Rinse gently with lukewarm salt water to cleanse the area.
- You may apply a cold compress to the outside of your cheek if there is any swelling.
- Avoid applying painkillers directly against the gum tissue.

Our endodontic team provides single-sitting, microscope-guided painless relief using computer-buffered anesthesia.`,
      recommendedTreatmentId: 'root-canal-treatment',
      isEmergency: true,
      suggestedActions: [
        { label: 'Emergency Call: +91 98110 54321', action: 'call' },
        { label: 'Book Urgent Appointment', action: 'book', treatmentId: 'root-canal-treatment' },
        { label: 'WhatsApp Emergency Desk', action: 'whatsapp' },
      ],
    };
  }

  if (q.includes('implant') || q.includes('missing')) {
    return {
      reply: `At Lumina Dental Studio, we specialize in computer-guided Swedish Straumann® dental implants. 

**Key highlights:**
- **Precision:** 3D CBCT bone mapping and keyhole surgical guides ensure sub-millimeter accuracy.
- **Comfort:** Computer-buffered painless anesthesia means most patients resume normal routines within 24–48 hours.
- **Longevity:** 98.4% clinical success rate with lifetime durability.
- **Investment:** Single tooth implants typically range from ₹45,000 to ₹75,000 including the ceramic crown, with transparent written estimates provided before treatment.`,
      recommendedTreatmentId: 'dental-implants',
      suggestedActions: [
        { label: 'Book Implant Evaluation', action: 'book', treatmentId: 'dental-implants' },
        { label: 'View Procedure Protocol', action: 'treatment-detail', treatmentId: 'dental-implants' },
        { label: 'WhatsApp Concierge', action: 'whatsapp' },
      ],
    };
  }

  if (q.includes('invisalign') || q.includes('aligner') || q.includes('straight')) {
    return {
      reply: `Lumina Dental Studio is an authorized Invisalign Diamond Provider in South Delhi.

**Our clear aligner protocol:**
- **Digital Simulation:** We take a 3D iTero intraoral scan to simulate your before-and-after smile transformation before you commit.
- **Discreet:** Virtually invisible, removable for dining and brushing.
- **Supervised Care:** Monitored personally by Dr. Ananya Roy (MDS Orthodontics).
- **Investment:** Treatment plans range from ₹1,50,000 to ₹3,50,000 depending on complexity, with interest-free EMI options.`,
      recommendedTreatmentId: 'invisalign-aligners',
      suggestedActions: [
        { label: 'Book 3D Smile Scan', action: 'book', treatmentId: 'invisalign-aligners' },
        { label: 'Explore Invisalign Details', action: 'treatment-detail', treatmentId: 'invisalign-aligners' },
        { label: 'WhatsApp Clinic', action: 'whatsapp' },
      ],
    };
  }

  return {
    reply: `Welcome to Lumina Dental Studio in Vasant Vihar, New Delhi. 

I can assist you with:
- **Treatment Guidance:** Swedish Straumann® implants, Invisalign aligners, porcelain veneers, single-sitting microscopic root canals, and teeth whitening.
- **Painless Anesthesia Protocols:** Learn how our computer-controlled delivery removes injection anxiety.
- **Doctor Availability:** Consult with Dr. Arjun Mehta, Dr. Ananya Roy, Dr. Aditya Sharma, or Dr. Priyanka Sen.
- **Appointments & Directions:** Complimentary valet parking at E-14 Poorvi Marg, Vasant Vihar.

How may I assist your smile today?`,
    suggestedActions: [
      { label: 'Book an Appointment', action: 'book' },
      { label: 'Explore Treatments', action: 'treatment-detail', treatmentId: 'dental-implants' },
      { label: 'Call Concierge', action: 'call' },
    ],
  };
}

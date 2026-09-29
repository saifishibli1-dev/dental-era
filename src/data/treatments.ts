import { Treatment } from '../types';

export const TREATMENTS: Treatment[] = [
  {
    id: 'dental-implants',
    name: 'Dental Implants',
    tagline: 'Permanent, titanium-anchored teeth with natural bone fusion',
    category: 'Surgical',
    shortDescription: 'Restore missing teeth with computer-guided Swedish Straumann® implants that fuse with your jawbone for lifelong stability.',
    fullDescription: 'At Lumina Dental Studio, our computer-guided implantology protocols eliminate guesswork. Using high-resolution 3D CBCT imaging and virtual surgical templates, we position biocompatible grade-4 titanium or ceramic fixtures with sub-millimeter precision. Whether replacing a single tooth, a bridge span, or full-arch rehabilitation (All-on-4 / All-on-6), our implants look, chew, and feel just like healthy natural teeth.',
    duration: '45–60 mins per implant',
    sessions: '2–3 visits',
    anesthesia: 'Computerized local anesthesia or conscious sedation',
    recoveryTime: '24–48 hours for normal routine',
    technology: ['Straumann® Roxolid Implants', 'Planmeca 3D CBCT', '3Shape TRIOS 5 Intraoral Scanner', 'Surgical Stent Navigation'],
    benefits: [
      'Preserves adjacent natural teeth without filing or crowning',
      'Prevents facial bone resorption and jawbone shrinkage',
      'Life-long durability with 98.4% clinical success rate',
      'Enables normal bite force for crisp vegetables, apples, and nuts'
    ],
    steps: [
      {
        number: '01',
        title: '3D CBCT Volumetric Assessment',
        description: 'Comprehensive 3D bone density mapping and nerve pathway identification to plan precise implant angulation.'
      },
      {
        number: '02',
        title: 'Guided Micro-Surgical Placement',
        description: 'Keyhole surgical technique minimizing tissue disruption, swelling, and postoperative discomfort.'
      },
      {
        number: '03',
        title: 'Osseointegration & Healing',
        description: 'Biological integration of the biocompatible fixture with natural bone architecture (typically 8–12 weeks).'
      },
      {
        number: '04',
        title: 'Custom Zirconia Prosthetic Crown',
        description: 'Hand-layered ceramic crown matched to the exact hue, translucency, and mamelon traits of your neighboring teeth.'
      }
    ],
    faqs: [
      {
        question: 'Is dental implant surgery painful?',
        answer: 'Most patients report significantly less discomfort than a routine tooth extraction. We utilize painless computerized anesthesia and offer oral sedation for anxious patients.'
      },
      {
        question: 'How long do dental implants last?',
        answer: 'With proper oral hygiene and bi-annual dental check-ups, dental implants are engineered to last a lifetime.'
      },
      {
        question: 'Am I eligible if I have low bone density?',
        answer: 'Yes, our surgical team frequently performs minimally invasive sinus lifts and PRF (platelet-rich fibrin) bone grafting to rebuild bone foundations.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
    beforeAfterImage: {
      before: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=80',
      after: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80',
      caseTitle: 'Molar Replacement with Straumann® Crown'
    }
  },
  {
    id: 'invisalign-aligners',
    name: 'Invisalign / Clear Aligners',
    tagline: 'Discreet orthodontic correction without metal brackets or wires',
    category: 'Orthodontics',
    shortDescription: 'Custom-molded transparent aligners that straighten crooked, crowded, or spaced teeth with zero lifestyle interruption.',
    fullDescription: 'Clear orthodontic treatment at Lumina is powered by our Diamond Apex orthodontic specialist. We use the iTero 5D Element scanner to generate a 3D simulation of your smile progression before you even begin. Fabricated from proprietary SmartTrack® medical polymer, each aligner applies gentle, calibrated force to move teeth predictably without food restrictions or mouth abrasions.',
    duration: '6–14 months average',
    sessions: 'Check-in every 6–8 weeks (or virtual monitoring)',
    anesthesia: 'None required',
    recoveryTime: 'Immediate adaptability within 48 hours',
    technology: ['Invisalign SmartTrack® Material', 'iTero Element 5D Scanner', 'ClinCheck 3D Treatment Engine', 'DentalMonitoring AI'],
    benefits: [
      'Virtually invisible at normal conversational distance',
      'Removable for meals, brushing, and high-stakes social events',
      'No sharp metal wires or emergency bracket repairs',
      'Predictable 3D timeline showing final alignment before starting'
    ],
    steps: [
      {
        number: '01',
        title: 'High-Definition 3D Optical Scan',
        description: 'Zero-putty, zero-gag optical scan capturing 6,000 frames per second of your dental arches.'
      },
      {
        number: '02',
        title: 'ClinCheck Digital Blueprint',
        description: 'Our orthodontist custom-programs every tooth movement stage for optimal facial harmony and bite function.'
      },
      {
        number: '03',
        title: 'Aligner Wear & Staged Progress',
        description: 'You change to a new set of customized aligners every 7–10 days, wearing them 20–22 hours daily.'
      },
      {
        number: '04',
        title: 'Vivera Retainers & Smile Locking',
        description: 'Medical-grade retention ensures your newly perfected smile stays stable for years to come.'
      }
    ],
    faqs: [
      {
        question: 'Can Invisalign fix severe crowding or overbites?',
        answer: 'Yes, our Diamond Provider orthodontist routinely treats complex malocclusions, deep bites, and crossbites with specialized attachments.'
      },
      {
        question: 'How many hours a day must I wear the aligners?',
        answer: 'Aligners must be worn for 20 to 22 hours per day, removing them only for meals, brushing, and flossing.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80',
    beforeAfterImage: {
      before: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=900&q=80',
      after: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
      caseTitle: 'Severe Anterior Crowding Resolved in 10 Months'
    }
  },
  {
    id: 'teeth-whitening',
    name: 'Teeth Whitening',
    tagline: 'In-chair laser brightening up to 8 shades lighter in 60 minutes',
    category: 'Cosmetic',
    shortDescription: 'Medical-grade Philips Zoom! WhiteSpeed laser treatment that erases tea, coffee, and age-related enamel stains safely.',
    fullDescription: 'Our clinical laser teeth whitening combines hydrogen peroxide gel with advanced LED accelerator technology to dissolve deep molecular stains without stripping your enamel. Before treatment, your gums and roots are protected with a rubber dental barrier, ensuring zero gum burn and minimal sensitivity.',
    duration: '60–75 minutes',
    sessions: 'Single appointment',
    anesthesia: 'None required (desensitizing ACP paste applied)',
    recoveryTime: 'Immediate; avoid staining foods for 48 hours',
    technology: ['Philips Zoom! WhiteSpeed LED', 'Relief ACP Oral Desensitizer', 'Custom Thermoformed Take-Home Trays'],
    benefits: [
      'Up to 8 shades lighter in just one single 60-minute visit',
      'Advanced ACP formulation protects enamel luster and reduces sensitivity',
      'Customized shade matching for a natural, healthy glow rather than chalky white',
      'Includes complimentary maintenance touch-up kit'
    ],
    steps: [
      {
        number: '01',
        title: 'Shade Mapping & Polishing',
        description: 'Baseline VITA shade recorded and superficial plaque removed for optimal whitening penetration.'
      },
      {
        number: '02',
        title: 'Gingival Barrier Isolation',
        description: 'Light-cured protective barrier placed over the gums to isolate and shield soft tissues.'
      },
      {
        number: '03',
        title: 'Triple 15-Minute Light Cycles',
        description: 'Medical whitening gel activated with targeted blue LED wavelengths to dissolve deep pigments.'
      },
      {
        number: '04',
        title: 'Fluoride & ACP Enamel Infusion',
        description: 'Re-mineralizing varnish applied to restore micro-hardness and soothe dental nerves.'
      }
    ],
    faqs: [
      {
        question: 'Will the whitening treatment make my teeth sensitive?',
        answer: 'We use the latest Zoom! formula infused with Amorphous Calcium Phosphate (ACP), which dramatically reduces sensitivity. Any transient sensitivity subsides within 24 hours.'
      },
      {
        question: 'How long do results last?',
        answer: 'Results typically last 18–24 months, depending on dietary habits such as coffee, dark wine, or tobacco consumption.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'root-canal-treatment',
    name: 'Root Canal Treatment',
    tagline: 'Microscopic, single-sitting endodontic therapy with 100% painless guarantee',
    category: 'Restorative',
    shortDescription: 'Save infected or severely decayed teeth under high-magnification Carl Zeiss dental operating microscopes.',
    fullDescription: 'Root canal therapy at Lumina is nothing like the outdated rumors. Under the high-power magnification of our German Carl Zeiss dental microscope, our endodontist accesses microscopic canal branches that ordinary eyesight cannot detect. Paired with nickel-titanium rotary files and warm vertical gutta-percha condensation, 92% of cases are completed in a single, relaxed 60-minute appointment.',
    duration: '45–60 minutes',
    sessions: 'Single sitting for most cases',
    anesthesia: 'Deep local anesthesia (The Wand® computerized delivery)',
    recoveryTime: 'Immediate; mild soreness for 24 hours',
    technology: ['Carl Zeiss OPMI PROergo Microscope', 'Dentsply X-Smart Plus Rotary Endodontics', 'Apex ID Digital Locator', 'Digital Radiography'],
    benefits: [
      'Preserves your natural biological tooth and prevents extraction',
      'Complete relief from throbbing toothaches and cold sensitivity',
      'Microscopic precision leaves healthy tooth structure intact',
      'Sealed with biocompatible hermetic seal to prevent reinfection'
    ],
    steps: [
      {
        number: '01',
        title: 'Painless Micro-Anesthesia',
        description: 'Computerized buffer anesthesia numbs the tooth completely before treatment begins.'
      },
      {
        number: '02',
        title: 'Microscopic Canal Cleaning',
        description: 'Zeiss optics allow complete debridement of microscopic bacteria and inflamed nerve pulp.'
      },
      {
        number: '03',
        title: 'Bio-Ceramic Hermetic Obturation',
        description: 'Canals are 3D sealed with biocompatible gutta-percha to prevent microbial recolonization.'
      },
      {
        number: '04',
        title: 'Core Buildup & Protection',
        description: 'Bonded composite resin core prepares the tooth for a monolithic crown restoration.'
      }
    ],
    faqs: [
      {
        question: 'Can a root canal really be completed in one sitting?',
        answer: 'Yes. In approximately 90% of non-acute cases, our advanced microscopic rotary equipment allows complete cleaning and sealing in a single 60-minute session.'
      },
      {
        question: 'Will I need a crown after the root canal?',
        answer: 'In most posterior (back) teeth, a protective crown is essential to reinforce the tooth against heavy chewing forces.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cosmetic-dentistry',
    name: 'Cosmetic Dentistry & Smile Makeovers',
    tagline: 'Hand-crafted porcelain veneers and biometric digital smile design',
    category: 'Cosmetic',
    shortDescription: 'Harmonize your teeth proportions, symmetry, and color with ultra-thin feldspathic veneers and gum contouring.',
    fullDescription: 'A bespoke smile makeover is where science meets high art. Using 3D Digital Smile Design (DSD), we map your facial symmetry, lip dynamics, and pupillary line before fabricating ultra-thin (0.3mm) handcrafted ceramic veneers. We correct gaps, severe discoloration, chipping, and uneven tooth lengths while maintaining a remarkably natural, translucent luster.',
    duration: '2 visits across 7–10 days',
    sessions: '2 visits (Diagnostic trial + Final bonding)',
    anesthesia: 'Mild local anesthesia for minimal preparation',
    recoveryTime: 'Immediate',
    technology: ['Digital Smile Design (DSD) 3D Protocol', 'IPS e.max Lithium Disilicate', 'Diode Laser Gingivoplasty', 'Trios 5 Color Matching'],
    benefits: [
      'Tailored to your facial features and skin tone for natural elegance',
      'Ultra-thin preparations preserve maximum natural tooth enamel',
      'Resistant to coffee, wine, and food staining for decades',
      'Test-drive your smile with a temporary mock-up before final fabrication'
    ],
    steps: [
      {
        number: '01',
        title: 'Digital Smile Aesthetic Analysis',
        description: 'Facial photography and videography analyzing your natural speech, smile line, and lip curvature.'
      },
      {
        number: '02',
        title: 'Physical Trial Smile (Mock-Up)',
        description: 'A 3D printed trial smile placed directly over your teeth so you can see and approve the result.'
      },
      {
        number: '03',
        title: 'Micro-Prep & Master Impressions',
        description: 'Minimal feather-edge tooth preparation and optical digital impression sent to our master ceramicist.'
      },
      {
        number: '04',
        title: 'Adhesive Resin Bonding',
        description: 'Permanent resin cementation under rubber dam isolation for decades of optical and mechanical stability.'
      }
    ],
    faqs: [
      {
        question: 'Do porcelain veneers ruin your real teeth?',
        answer: 'Not with modern minimally-invasive techniques. We remove only 0.2mm to 0.4mm of enamel (less than the thickness of a contact lens).'
      },
      {
        question: 'How long do IPS e.max veneers last?',
        answer: 'Clinical literature demonstrates 96%+ survival rates beyond 15–20 years with standard oral hygiene.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    beforeAfterImage: {
      before: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
      after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
      caseTitle: '8 Upper Porcelain Veneers for Bridal Makeover'
    }
  },
  {
    id: 'dental-crowns-bridges',
    name: 'Dental Crowns & Bridges',
    tagline: 'Monolithic Zirconia and E.max restorations engineered for durability',
    category: 'Restorative',
    shortDescription: 'Reinforce cracked, weakened, or heavily filled teeth with custom-milled biocompatible crowns and aesthetic fixed bridges.',
    fullDescription: 'When a tooth is compromised by fractures, deep decay, or large failing restorations, our CAD/CAM monolithic crowns restore structural integrity and natural chewing ability. Crafted from high-translucency Zirconia and IPS e.max ceramic, our crowns contain zero black metal margins, ensuring seamless biological integration at the gumline.',
    duration: '45 minutes per visit',
    sessions: '2 visits (Digital scan + Cementation)',
    anesthesia: 'Gentle computerized local anesthesia',
    recoveryTime: 'Immediate bite restoration',
    technology: ['Amann Girrbach 5-Axis Dental Milling', 'Katana Multi-Layered Zirconia', 'Kuraray Panavia SA Cement'],
    benefits: [
      'Metal-free biocompatibility: no gray line at the gum margin',
      'Exceptional flexural strength exceeding 1,200 MPa',
      'Digital optical impressions: no uncomfortable silicone trays',
      'Precise margin fit prevents bacterial micro-leakage and decay'
    ],
    steps: [
      {
        number: '01',
        title: 'Tooth Preparation & Scanning',
        description: 'Gentle smoothing of the tooth surface followed by a high-precision digital optical scan.'
      },
      {
        number: '02',
        title: 'Aesthetic Temporary Crown',
        description: 'Placement of a comfortable temporary restoration while your permanent crown is milled.'
      },
      {
        number: '03',
        title: 'CAD/CAM Precision Milling',
        description: 'Custom ceramic restoration milled with micron-level tolerances and characterization.'
      },
      {
        number: '04',
        title: 'Permanent Resin Luting',
        description: 'Bonded with high-strength resin cement for rock-solid stability and seamless natural appearance.'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between Zirconia and metal-ceramic (PFM) crowns?',
        answer: 'Zirconia is 100% metal-free, significantly stronger, and does not show dark metal shadows along the gum margin over time.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'pediatric-dentistry',
    name: 'Pediatric Dentistry',
    tagline: 'Compassionate, sensory-friendly care designed for young smiles',
    category: 'Preventive',
    shortDescription: 'Gentle preventative care, fluoride sealants, and early interceptive orthodontics in an anxiety-free environment.',
    fullDescription: 'At Lumina Kids Club, we believe that early positive dental experiences form the bedrock of lifelong oral health. Led by Dr. Priyanka Sen, our pediatric wing is designed to remove dental anxiety through "Tell-Show-Do" techniques, audiovisual ceiling screens with favorite cartoons, and painless preventative treatments like pit-and-fissure sealants and remineralizing fluoride therapies.',
    duration: '30–45 minutes',
    sessions: '1 visit',
    anesthesia: 'Painless topical numbing jelly or mild nitrous oxide laughing gas',
    recoveryTime: 'Immediate return to school or play',
    technology: ['Nitrous Oxide Conscious Sedation', 'Ultra-gentle Ultrasonic Scalers', 'BPA-Free Bio-Active Sealants'],
    benefits: [
      'Positive, fun dental visits eliminate dental phobia early in childhood',
      'Protective sealants prevent 80% of molar cavities during school years',
      'Early detection of tongue ties, mouth breathing, and jaw development issues',
      'Bespoke parental guidance on pediatric nutrition and brushing habits'
    ],
    steps: [
      {
        number: '01',
        title: 'Playful Acclimatization',
        description: 'Child-led orientation where tools are introduced as gentle friendly characters.'
      },
      {
        number: '02',
        title: 'Gentle Dental Check & Plaque Polish',
        description: 'Fun flavor-choice polish (bubblegum, strawberry) to clean growing teeth.'
      },
      {
        number: '03',
        title: 'Cavity-Shield Sealants',
        description: 'Clear protective shields painted into deep molar grooves to block trapped sugars.'
      },
      {
        number: '04',
        title: 'Junior Smile Champion Reward',
        description: 'Certificates, smile badges, and healthy dental care prizes to celebrate brave visits.'
      }
    ],
    faqs: [
      {
        question: 'When should my child visit the dentist for the first time?',
        answer: 'The Indian Dental Association and American Academy of Pediatric Dentistry recommend the first visit by age 1 or when the first baby tooth emerges.'
      },
      {
        question: 'Why treat baby teeth if they fall out anyway?',
        answer: 'Baby teeth act as natural space maintainers for permanent teeth and are crucial for healthy speech, chewing, and jawbone development.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'general-dentistry',
    name: 'General & Preventive Dentistry',
    tagline: 'Comprehensive exams, ultrasonic hygiene, and biocompatible restorations',
    category: 'Preventive',
    shortDescription: 'Maintain peak oral health with regular check-ups, cancer screenings, EMS AirFlow® guided biofilm therapy, and invisible tooth fillings.',
    fullDescription: 'Preventive dental care at Lumina is comprehensive and proactive. Rather than merely drilling and filling, we employ Swiss EMS AirFlow® Guided Biofilm Therapy—a painless warm-water powder treatment that gently eliminates bacterial plaque from every microscopic groove without scraping enamel. Every check-up includes an oral mucosal cancer screening and digital periodontal charting.',
    duration: '45 minutes',
    sessions: 'Routine 6-month check-up',
    anesthesia: 'None needed (warm water soothing therapy)',
    recoveryTime: 'Immediate',
    technology: ['EMS AIRFLOW® Prophylaxis Master', 'SoproCare Fluorescence Intraoral Camera', 'Velscope Oral Mucosa Screener'],
    benefits: [
      'Airflow technology cleans without the scraping vibration of traditional tools',
      'Eliminates morning bad breath (halitosis) by clearing deep tongue & gum bacteria',
      'Early detection of hidden micro-cavities before toothache starts',
      'Includes personalized home oral care blueprint tailored to your saliva pH'
    ],
    steps: [
      {
        number: '01',
        title: 'Fluorescence Plaque Disclosure',
        description: 'Non-toxic herbal dye highlights harmful plaque biofilm so patients can see their oral health status.'
      },
      {
        number: '02',
        title: 'Swiss AirFlow Gentle Cleanse',
        description: 'Soothing mixture of warm water and superfine erythritol powder polishes enamel seamlessly.'
      },
      {
        number: '03',
        title: 'Comprehensive Doctor Assessment',
        description: 'Microscopic examination of every tooth, restoration check, and bite alignment check.'
      },
      {
        number: '04',
        title: 'Remineralizing Enamel Shield',
        description: 'Enamel nourishment with bio-available calcium phosphate and xylitol.'
      }
    ],
    faqs: [
      {
        question: 'How often should I get a dental cleaning?',
        answer: 'For most healthy adults, bi-annual visits (every 6 months) are ideal. Patients with orthodontic braces or periodontal history benefit from 3–4 month intervals.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'
  }
];

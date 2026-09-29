import { Testimonial, BeforeAfterCase } from '../types';

export const CLINIC_INFO = {
  name: 'Lumina Dental Studio',
  tagline: 'Modern Boutique Dentistry in South Delhi',
  address: {
    line1: 'E-14 Poorvi Marg, Ground Floor',
    area: 'Vasant Vihar',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110057',
    landmark: 'Adjacent to Priya Cinema Complex / Near Basant Lok Market'
  },
  phone: '+91 11 4987 6500',
  mobile: '+91 98110 54321',
  whatsapp: '+91 98110 54321',
  email: 'concierge@luminadental.in',
  hours: [
    { days: 'Monday – Saturday', time: '09:30 AM – 08:00 PM' },
    { days: 'Sunday', time: '10:00 AM – 02:00 PM (By Prior Appointment)' }
  ],
  transitInfo: {
    metro: 'Vasant Vihar Metro Station (Magenta Line) – Gate No. 2 (3 mins walk)',
    airport: 'Indira Gandhi International Airport (T3) – 18 mins drive via NH-48',
    gurgaon: 'Cyber City Gurgaon – 22 mins drive via Rao Tula Ram Marg',
    parking: 'Dedicated complimentary valet parking available at clinic entrance'
  },
  accreditations: [
    'NABH Accrediated Standards Protocol',
    'ISO 9001:2015 Sterilization Certified',
    'Invisalign Diamond Apex Center 2025/2026',
    'Straumann® Implant Clinical Center'
  ]
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    patientName: 'Devika Singhania',
    location: 'Shanti Niketan, New Delhi',
    treatment: 'Porcelain Veneers & Smile Makeover',
    rating: 5,
    quote: 'Before my wedding, I had visible enamel discoloration and slight crowding on my upper teeth. Dr. Rohan and his team crafted 8 custom porcelain veneers that look so organic my own family thought I just had a professional polish. The 3D trial preview gave me complete peace of mind.',
    verified: true,
    avatarText: 'DS'
  },
  {
    id: 't-2',
    patientName: 'Sameer Bhargava',
    location: 'DLF Phase 5, Gurgaon',
    treatment: 'Swedish Straumann® Dental Implant',
    rating: 5,
    quote: 'I had lost a lower molar two years ago and kept putting it off due to fear of surgical pain. The computer-guided keyhole surgery was completely painless. Dr. Rohan placed the implant in 25 minutes flat, and by evening I did not even need a painkiller. Chewing is back to 100%.',
    verified: true,
    avatarText: 'SB'
  },
  {
    id: 't-3',
    patientName: 'Sunita Kapoor',
    location: 'Greater Kailash II, New Delhi',
    treatment: 'Microscopic Root Canal Therapy',
    rating: 5,
    quote: 'I came in with excruciating toothache on a Saturday evening. Dr. Vikram Mehra used a high-magnification German microscope and completed the entire root canal in one sitting without a single prick of pain. The clinic atmosphere feels like a luxury lounge rather than a scary clinic.',
    verified: true,
    avatarText: 'SK'
  },
  {
    id: 't-4',
    patientName: 'Arjun Nambiar',
    location: 'Defence Colony, New Delhi',
    treatment: 'Invisalign Clear Aligners',
    rating: 5,
    quote: 'As a corporate consultant, traditional metal braces were out of the question for my client presentations. Dr. Ananya monitored my progress digitally with the iTero scan. In just 9 months, my deep bite and overlapping front teeth were flawlessly corrected.',
    verified: true,
    avatarText: 'AN'
  }
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'case-1',
    title: 'Bespoke Ceramic Veneers Transformation',
    treatmentName: 'Cosmetic Dentistry',
    patientProfile: '29-year-old marketing director with fluorosis staining and gap',
    duration: '2 visits (10 days total)',
    beforeImage: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    clinicalNotes: 'Eight ultra-thin (0.3mm) feldspathic ceramic veneers crafted with natural mamelon characteristics and bleached shade BL2, preserving 95% of native tooth enamel.'
  },
  {
    id: 'case-2',
    title: 'Full Arch Guided Implant Restoration',
    treatmentName: 'Dental Implants',
    patientProfile: '58-year-old retired civil servant with terminal dentition',
    duration: 'Single-day immediate load',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80',
    clinicalNotes: 'All-on-4 Swedish Straumann® implants placed via keyhole 3D surgical guide with immediate monolithic cross-arch screw-retained hybrid prosthesis.'
  },
  {
    id: 'case-3',
    title: 'Adult Orthodontic Correction with Invisalign',
    treatmentName: 'Invisalign / Clear Aligners',
    patientProfile: '34-year-old architect with class II crowding and rotated incisors',
    duration: '11 months (22 aligner stages)',
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    clinicalNotes: 'Non-extraction orthodontic expansion with SmartForce attachments, resolving 6.5mm anterior crowding while expanding buccal corridors.'
  },
  {
    id: 'case-4',
    title: 'In-Office Philips Zoom! Laser Whitening',
    treatmentName: 'Teeth Whitening',
    patientProfile: '41-year-old attorney with deep coffee and tannin enamel staining',
    duration: 'Single 60-minute session',
    beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
    clinicalNotes: 'Baseline shade A3.5 lightened 7 shades to B1 using Zoom! WhiteSpeed 25% hydrogen peroxide with Relief ACP remineralization.'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'g-1',
    title: 'VIP Master Operatory',
    category: 'Clinic Interiors',
    description: 'Bespoke dental suite featuring floor-to-ceiling garden light and ergonomic Italian KaVo treatment chair.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g-2',
    title: 'Intraoral 3D Digital Scanning Suite',
    category: 'Technology',
    description: 'iTero Element 5D digital scanner replaces uncomfortable putty impressions with microscopic real-time 3D teeth rendering.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g-3',
    title: 'Concierge Patient Lounge',
    category: 'Clinic Interiors',
    description: 'Tranquil hospitality lounge with artisanal coffee, calming aromatherapy, and private consultation alcoves.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g-4',
    title: 'Carl Zeiss Microscopic Operatory',
    category: 'Technology',
    description: 'High-magnification surgical optics that allow our endodontists to operate at up to 25x optical magnification.',
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g-5',
    title: 'Hospital-Grade Class-B Sterilization',
    category: 'Safety & Hygiene',
    description: '6-stage European standard autoclave sterilization with vacuum autoclaving and individually sealed pouches.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g-6',
    title: 'Digital Smile Design Studio',
    category: 'Technology',
    description: 'High-definition digital photography studio where smile aesthetics are customized to your unique facial dynamics.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80'
  }
];

export const WHY_CHOOSE_US = [
  {
    number: '01',
    title: 'Swedish & German Precision Engineering',
    description: 'We do not compromise on hardware. From genuine Straumann® Swedish implants to Carl Zeiss surgical microscopes and Planmeca 3D CBCT, our diagnostic and clinical equipment matches top European university hospitals.'
  },
  {
    number: '02',
    title: 'Strict Class-B Sterilization Protocols',
    description: 'Our hospital-grade 6-stage sterilization cycle features vacuum autoclaves, biological spore testing, and single-use sterile barrier envelopes opened exclusively in your presence.'
  },
  {
    number: '03',
    title: 'Computerized Pain-Free Anesthesia',
    description: 'Fear of needles is eliminated with our computerized anesthesia delivery system. Sensor-controlled micro-droplets numb tissues comfortably without painful pressure sensations.'
  },
  {
    number: '04',
    title: 'Zero Over-Treatment & Clear Transparency',
    description: 'Every treatment recommendation is backed by high-resolution intraoral photos and 3D scans shown on-screen. You receive a fixed written estimate with no hidden clinic charges.'
  }
];

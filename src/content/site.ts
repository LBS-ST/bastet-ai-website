// Every visitor-facing string on the site lives here, transcribed verbatim from
// reference/content.md. Edit copy here only; components never hard-code marketing text.
// `**bold**` inside a string renders as <strong> (see src/lib/rich.ts).

export const SITE = {
  name: 'Bastet AI',
  legalName: 'Bastet AI Pesttech Limited',
  tagline: 'Make the Pest Visible',
  positioning: 'Professional Pesttech solutions leveraging AI, computer vision, and IoT sensors',
  url: 'https://www.bastet-tech.ai',
  email: 'info@bastet-tech.ai',
  blog: 'https://blog.bastet-tech.ai',
  linkedin: 'https://www.linkedin.com/company/bastet-tech/',
  facebook: 'https://www.facebook.com/profile.php?id=61583264173759',
  whatsapp: 'https://wa.me/85265645417?text=Hello%20Bastet%20AI%2C%20I%20would%20like%20to%20enquire%20about%20your%20solutions.',
  appIos: 'https://apps.apple.com/ca/app/bastet-hygience/id6443843225',
  appAndroid: 'https://play.google.com/store/apps/details?id=com.iotree.emsd',
  analysisTool: 'https://aianalysistool.bastet-tech.ai/',
} as const;

// Tracking: hardcoded defaults, overridable per environment (PUBLIC_GA4_ID / PUBLIC_GSC_VERIFICATION).
// ⚠ GA4 ID: confirm with Alex this is Bastet's own property (LBSST uses the same ID).
export const TRACKING = {
  ga4: (import.meta.env.PUBLIC_GA4_ID as string | undefined) || 'G-YESEEGLGZ6',
  gsc: (import.meta.env.PUBLIC_GSC_VERIFICATION as string | undefined) || 'elrk-lMsiJTc79FostpBS8dg5D3SMG3Brj20YRxY6uA',
};

export type PageId = 'home' | 'solution' | 'datasheet' | 'about' | 'contact' | 'privacy' | 'blog';

/** Canonical path per page (build.format = 'file', no trailing slashes). */
export const ROUTES: Record<PageId, string> = {
  home: '/',
  solution: '/solution',
  datasheet: '/datasheet',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  blog: '/blog',
};

export interface Link {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV: (Link & { page?: PageId })[] = [
  { label: 'Home', href: '/', page: 'home' },
  { label: 'Solutions', href: '/solution', page: 'solution' },
  { label: 'Datasheet', href: '/datasheet', page: 'datasheet' },
  { label: 'Blog', href: SITE.blog, external: true },
  { label: 'About Us', href: '/about', page: 'about' },
  { label: 'Contact', href: '/contact', page: 'contact' },
];
export const NAV_CTA: Link = { label: 'Request Demo', href: '/contact' };

export const SEO: Record<PageId, { title: string; description: string }> = {
  home: {
    title: 'Bastet AI — Smart Pest Control with Computer Vision',
    description:
      'Bastet provides AI vision and IoT smart pest control systems for commercial buildings. Reduce pest sightings by 85% with real-time monitoring and predictive analytics.',
  },
  solution: {
    title: 'AI Pest Control: Computer Vision & IoT | Bastet AI',
    description:
      "Explore Bastet's AI pest control platform: computer vision cameras, IoT smart traps, sticky trap analysis, and a unified dashboard for commercial facilities.",
  },
  datasheet: {
    title: 'Product Datasheets — Bastet AI Smart Pest Hardware',
    description:
      "Download datasheets for Bastet AI's LoRa gateway, PIR sensors, smart trap sensors, AI box, and mobile platform.",
  },
  about: {
    title: 'About Bastet AI — Field-Tested Smart Pest Control Experts',
    description:
      'Bastet AI combines pest control veterans with IT engineers to deliver field-tested, data-driven smart pest management for commercial facilities.',
  },
  contact: {
    title: 'Contact Bastet AI — Request a Smart Pest Control Demo',
    description:
      'Get in touch with Bastet AI. Schedule a personalized demo of our AI vision and IoT pest monitoring solutions for your facility.',
  },
  privacy: {
    title: 'Privacy Policy — Bastet AI',
    description:
      "Read Bastet AI's privacy policy covering data collection, cookies, analytics, and your rights when using bastet-tech.ai.",
  },
  blog: {
    title: 'Blog — Smart Pest Control Insights | Bastet AI',
    description:
      'Articles on AI pest control, IoT monitoring, and smart facility pest management from the Bastet AI team.',
  },
};

// ───────────────────────────── Home ─────────────────────────────
export const HOME = {
  // Hero copy is in src/content/flythrough.ts (chapter "arrive") so Stage 2 can map it to a beat.
  solutions: {
    title: 'Smart Pest Control Solutions',
    intro: 'Three innovative solutions that revolutionize how you manage pest control',
    items: [
      {
        icon: 'sensor',
        title: 'Smart Rodent IOT Solution',
        body: 'Using PIR sensor to find out the root and source of rodent problem. Smart Trap alerts via email and mobile app push notification when the rat is caught.',
      },
      {
        icon: 'box',
        title: 'AI in a Box',
        body: 'Using existing CCTV in your facility, install an AI box on the same network. The AI monitors 24/7 and captures pictures when rats come out.',
      },
      {
        icon: 'trap',
        title: 'Sticky Trap Image Analyze Tool',
        body: 'AI engine to rapidly process images of sticky traps, delivering structured, actionable data and expert contextual notes for real-time pest control interventions.',
      },
    ],
  },
  howItWorks: {
    title: 'How It Works',
    intro: 'Simple to deploy, powerful in results',
    steps: [
      { title: 'Deploy Smart Sensors', body: 'Install IoT sensors and AI-enabled cameras in strategic locations' },
      { title: 'AI Detects Pests', body: 'Our AI automatically detects and monitors pest activity 24/7' },
      { title: 'Get Actionable Reports', body: 'Access comprehensive data and insights through your dashboard' },
    ],
    cta: { label: 'Explore Full Details', href: '/solution' },
  },
  features: {
    title: 'Powerful Features',
    intro: 'Technology that delivers measurable results',
    items: [
      { icon: 'eye', title: 'AI-Powered Detection', body: 'Computer vision technology identifies and monitors pest activity automatically 24/7' },
      { icon: 'chart', title: 'Real-Time Analytics', body: 'Access detailed reports, heatmaps, and pest activity data in one centralized platform' },
      { icon: 'bell', title: 'Instant Alerts', body: 'Receive immediate notifications via email and mobile app when pests are detected' },
    ],
    cta: { label: 'See All Features', href: '/solution' },
  },
  cta: {
    title: 'Ready to Transform Your Pest Control Management?',
    body: "Schedule a personalized demo and see how Bastet's smart pest control solutions can bring intelligence and efficiency to your pest management operations.",
    button: { label: 'Schedule My Demo', href: '/contact' },
  },
  testimonials: {
    title: 'What Our Clients Say',
    intro: 'Trusted by facilities across food manufacturing, logistics, and commercial real estate',
    items: [
      {
        quote:
          "Bastet's AI vision system replaced our manual sticky board inspections completely. The accuracy is outstanding, and having photographic evidence with every detection has made compliance reporting effortless. Our auditor was genuinely impressed.",
        role: 'Quality Assurance Manager',
        org: 'Food Manufacturing Facility, Hong Kong',
      },
      {
        quote:
          'We used to rely on weekly pest control visits and hoped for the best. Now we have 24/7 monitoring with instant alerts. Response time dropped from days to hours, and pest incidents decreased by over 60% in the first quarter.',
        role: 'Hygiene Supervisor',
        org: 'International Logistics Centre',
      },
      {
        quote:
          "The AI analytics dashboard gives us trend data that we simply couldn't get before. We can see hotspots, peak activity times, and measure the effectiveness of our pest management programme with real numbers. It's changed how we make decisions.",
        role: 'Environmental Health Officer',
        org: 'Commercial Real Estate Group',
      },
    ],
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        q: 'What is AI-powered pest control?',
        a: 'AI-powered pest control uses computer vision and IoT sensors to detect, identify, and monitor pest activity in real time. Unlike traditional methods that rely on periodic manual inspections, our system provides 24/7 automated surveillance with instant alerts — catching problems early before they become infestations.',
      },
      {
        q: 'How does computer vision detect pests?',
        a: 'Our AI in the Box system uses edge AI cameras with trained models to recognise rodent species, cockroaches, and other pests from images captured on sticky boards or in open areas. The AI classifies each detection, counts activity levels, and sends structured data to your dashboard — no human inspection needed.',
      },
      {
        q: "Which industries use Bastet's solutions?",
        a: 'Our solutions serve food manufacturing, commercial kitchens, logistics warehouses, shopping malls, commercial buildings, and government facilities. Any environment where pest compliance and early detection are critical benefits from automated AI monitoring.',
      },
      {
        q: 'How is this different from traditional pest control?',
        a: 'Traditional pest control relies on scheduled visits and manual checks — often missing activity between inspections. Bastet provides continuous, data-driven monitoring with photographic evidence, trend analytics, and real-time alerts. This means faster response, better compliance records, and reduced chemical usage.',
      },
      {
        q: 'Do you integrate with existing facility management systems?',
        a: 'Yes. Our platform provides API access and standard data exports that integrate with major facility management and ERP systems. You get a unified dashboard for all monitoring data, accessible via web and mobile app.',
      },
      {
        q: 'How do I get started with Bastet?',
        a: "Contact us at info@bastet-tech.ai or through our website. We'll assess your site, recommend the right camera and sensor mix, and handle installation. Most deployments are operational within 2–3 weeks, with ongoing AI model updates and support included.",
      },
    ],
  },
};

// ─────────────────────────── Solution ───────────────────────────
export const SOLUTION = {
  hero: {
    title: 'The Bastet Solution',
    sub: 'A comprehensive AI-enhanced system that automates pest detection and provides objective proof of pest management effectiveness',
  },
  what: {
    title: 'What is Bastet?',
    paragraphs: [
      'The Bastet AI-Enhanced Pest Detection & Management System represents a paradigm shift in pest control. Traditional pest management relies on manual inspections, sticky traps, and reactive responses—an approach that leads to inconsistent monitoring, delayed detection, and difficulty proving effectiveness to clients.',
      'Bastet solves this by deploying AI-powered computer vision cameras and IoT sensors throughout your facility. These devices continuously monitor for pest activity, automatically detect and identify pests in real-time, and provide objective data on infestation levels. Facility managers gain unprecedented visibility into pest control effectiveness with real-time dashboards, comprehensive reports, and instant alerts.',
    ],
  },
  tech: {
    title: 'Built on Cutting-Edge Technology',
    intro: 'Enterprise-grade infrastructure designed for scale and reliability',
    items: [
      { icon: 'brain', title: 'AI & Machine Learning', body: 'Deep learning models trained on millions of pest images' },
      { icon: 'eye', title: 'Computer Vision', body: 'Real-time pest detection and tracking algorithms' },
      { icon: 'sensor', title: 'IoT Sensors', body: 'Connected devices monitoring pest activity 24/7' },
      { icon: 'cloud', title: 'Cloud Platform', body: 'Scalable infrastructure with 99.9% uptime guarantee' },
    ],
  },
  visualize: {
    title: 'Visualize Your Pest Control Operations',
    intro: 'Real-time dashboards, interactive floor plans, and AI-powered analysis tools',
    app: {
      title: 'Download Our Mobile App',
      ios: { label: 'Download for iOS', href: SITE.appIos },
      android: { label: 'Download for Android', href: SITE.appAndroid },
    },
    screens: [
      {
        title: 'IoT Detection Sensor Locations',
        caption: 'Strategic sensor placement across your facility for comprehensive pest activity monitoring',
        images: ['iot-sensor-map'],
      },
      {
        title: 'Smart Trap - Caught Red',
        caption: 'Real-time trap status monitoring showing open and caught indicators across your facility',
        images: ['smart-trap-caught'],
      },
      {
        title: 'Analytics Dashboard',
        caption: 'Track pest activity trends, monitor zones, and analyze data across different time periods',
        images: ['dashboard-analytics'],
      },
      {
        title: 'AI-Powered Sticky Trap Analysis',
        caption: 'Automated image analysis with detailed pest counts and contextual insights',
        images: ['sticky-trap-analysis', 'analysis-details'],
        cta: { label: 'View Live Analytics Dashboard', href: SITE.analysisTool, external: true },
      },
    ],
  },
  aiBox: {
    title: 'AI-in-a-Box: Integrated Intelligence System',
    intro: 'All-in-one hardware and software solution for real-time pest detection and monitoring',
    images: ['ai-box-dashboard', 'ai-box-detection'],
    subtitle: 'Complete Integrated Solution',
    body: 'Our AI-in-a-box is a fully integrated hardware and software system that combines advanced computer vision, edge computing, and cloud connectivity in a single unit. This plug-and-play solution requires minimal setup and starts monitoring your facility immediately, detecting and tracking pest activity 24/7 with precision AI algorithms.',
    points: [
      { icon: 'bolt', title: 'Instant Detection', body: 'Real-time pest identification within milliseconds' },
      { icon: 'chip', title: 'Edge Processing', body: 'On-device AI processing for fast, reliable detection' },
      { icon: 'cloud', title: 'Cloud Integration', body: 'Seamless data sync and remote monitoring capabilities' },
    ],
  },
  process: {
    title: 'How It Works: From Deployment to Results',
    steps: [
      {
        title: 'Installation & Setup',
        body: 'Our team deploys AI-in-a-box units and IoT sensors at strategic locations throughout your facility. The system is configured based on your facility layout, pest history, and monitoring priorities.',
      },
      {
        title: 'Real-Time Detection',
        body: 'Our AI continuously analyzes video feeds and sensor data, detecting pest activity the moment it occurs. The system identifies pest types, tracks movement patterns, and documents everything automatically.',
      },
      {
        title: 'Instant Alerts & Response',
        body: 'Receive immediate notifications when pests are detected or activity levels exceed thresholds. Pest control teams can respond proactively before minor issues become major infestations.',
      },
      {
        title: 'Comprehensive Reporting',
        body: 'Access detailed analytics through your dashboard. View pest activity trends, identify entry points and hotspots, and generate proof-of-service reports for clients or regulatory compliance.',
      },
    ],
  },
  cta: {
    title: 'See Bastet in Action',
    body: 'Schedule a personalized demo to see how our AI-enhanced system can transform your pest management operations and provide objective proof of effectiveness.',
    button: { label: 'Request a Demo', href: '/contact' },
  },
};

// ─────────────────────────── Datasheet ──────────────────────────
export const DATASHEET = {
  hero: {
    title: 'Product Datasheets',
    sub: 'Download detailed technical specifications and documentation for all Bastet AI products',
  },
  button: 'Download PDF',
  products: [
    { name: 'Bastet Platform Mobile App', category: 'Software', description: 'Mobile application for real-time pest monitoring and management', file: 'Bastet_Platform_Mobile_app.pdf' },
    { name: 'Bastet LoRa Gateway', category: 'Gateway', description: 'Long-range wireless gateway for IoT sensor connectivity', file: 'Bastet_Lora_Gateway.pdf' },
    { name: 'Bastet LoRa PIR Sensor', category: 'Sensor', description: 'Long-range passive infrared motion detection sensor', file: 'Bastet_Lora_PIR.pdf' },
    { name: 'Bastet LoRa Trap Sensor', category: 'Sensor', description: 'Long-range wireless trap sensor for remote capture detection', file: 'Bastet_Lora_Trap_Sensor.pdf' },
    { name: 'Bastet Sensing Camera', category: 'Camera', description: 'AI-powered camera for visual pest detection and analysis', file: 'Bastet_Sensing_Camera.pdf' },
    { name: 'Bastet Zigbee Smart Plug', category: 'Accessory', description: 'Smart plug for power management and device control', file: 'Bastet_Zigbee_Smart_Plug.pdf' },
    { name: 'Bastet Zigbee Trap Sensor Component', category: 'Sensor', description: 'Component specifications for trap sensor integration', file: 'Bastet_Zigbee_Trap_Sensor_Component.pdf' },
    { name: 'Bastet Zigbee Trap Sensor', category: 'Sensor', description: 'Wireless trap sensor for real-time capture detection', file: 'Bastet_Zigbee_Trap_Sensor.pdf' },
    { name: 'Bastet Zigbee PIR Sensor', category: 'Sensor', description: 'Zigbee-enabled passive infrared motion sensor', file: 'Bastet_Zigbee_PIR.pdf' },
    { name: 'Bastet Zigbee Gateway', category: 'Gateway', description: 'Central hub for Zigbee device network management', file: 'Bastet_Zigbee_Gateway.pdf' },
  ],
};

// ───────────────────────────── About ────────────────────────────
export const ABOUT = {
  hero: {
    title: 'About Bastet',
    sub: 'Built by pest control and IT professionals with real-world experience from the field, not just the lab',
  },
  story: {
    title: 'Born from Real-World Experience',
    paragraphs: [
      'Bastet was created by a team of experienced **pest control professionals and IT experts** who understand the challenges of pest management from the ground up. Our knowledge comes from years spent on-site, dealing with real infestations, not from textbooks or laboratory theories.',
      "We've walked through facilities at 3 AM to check traps. We've analyzed countless pest patterns in shopping malls, restaurants, warehouses, and hospitals. We understand what works in the field and what doesn't. This hands-on experience, combined with expertise in artificial intelligence and IoT technology, led us to create Bastet—a solution built by practitioners, for practitioners.",
    ],
    statement: "We're not just technology providers; we're pest control professionals who built the tools we wished we had.",
  },
  mission: {
    title: 'Our Mission',
    body: 'To bring transparency and data-driven intelligence to pest control, empowering facility managers with tools built from real-world experience. We believe that effective pest management should be objective, efficient, and based on actual field knowledge—not just laboratory theories. Every feature in Bastet solves a real problem we\'ve personally encountered on-site.',
  },
  values: {
    title: 'Our Core Values',
    intro: 'The principles that guide everything we do',
    items: [
      { icon: 'target', title: 'Field-Tested', body: 'Every solution built from real on-site experience, not theoretical assumptions' },
      { icon: 'wrench', title: 'Practical', body: 'Tools designed for real-world conditions and challenges faced daily' },
      { icon: 'users', title: 'Experienced', body: 'Team of pest control veterans combined with cutting-edge IT expertise' },
      { icon: 'shield', title: 'Reliable', body: 'Solutions proven in the field across diverse facility types and challenges' },
    ],
  },
  why: {
    title: 'Why We Built Bastet',
    items: [
      {
        title: 'The Reality on the Ground',
        body: 'As pest control professionals working in the field, we faced the same frustrations repeatedly: manually checking hundreds of traps at 2 AM, analyzing sticky boards by eye under poor lighting, writing reports by hand, and struggling to show clients the true extent of infestations. We knew there had to be a better way—one that leverages technology without losing the practical knowledge gained from years of hands-on experience.',
      },
      {
        title: 'Experience Meets Technology',
        body: "Our team combines decades of on-site pest control experience with advanced IT expertise. We've dealt with rat infestations in restaurant kitchens, monitored pest activity in warehouses, and managed comprehensive programs for shopping centers. This real-world knowledge guided every feature we built into Bastet. We didn't design solutions in an office—we designed them in the field, solving actual problems we encountered daily.",
      },
      {
        title: 'Built by Practitioners',
        body: "Bastet is the tool we always wanted when we were out in the field. Every alert, every dashboard metric, every AI detection was designed based on real scenarios and actual needs. We're continuously improving based on field feedback—because we're still out there, working alongside other pest control professionals, understanding new challenges, and adapting our technology to solve them.",
      },
    ],
  },
  field: {
    title: 'Field-Tested Across Diverse Environments',
    intro:
      'Bastet has been deployed and tested in real-world environments—from 24/7 food processing facilities to high-traffic shopping centers. Our solutions work because they were built by people who have personally dealt with every type of pest challenge in every type of facility imaginable.',
    stats: [
      { value: '15+', label: 'Years Combined Field Experience' },
      { value: '1000+', label: 'On-Site Inspections Performed' },
      { value: '50+', label: 'Real Cases Analyzed' },
    ],
  },
  cta: {
    title: 'Ready to Partner With Us?',
    body: "Let's discuss how Bastet can transform your pest management operations. Schedule a personalized consultation with our team.",
    button: { label: 'Get in Touch', href: '/contact' },
  },
};

// ──────────────────────────── Contact ───────────────────────────
export const CONTACT = {
  hero: {
    title: "Let's Transform Your Facility",
    sub: 'Schedule a personalized demo and discover how Bastet can bring transparency and efficiency to your pest control operations',
  },
  intro: {
    title: 'Request a Demo',
    body: 'Our team is ready to answer your questions and show you how Bastet can solve your facility management challenges.',
  },
  email: {
    title: 'Email Us',
    address: SITE.email,
    hint: 'Click to send us an email',
  },
  expect: {
    title: 'What to Expect',
    items: [
      'Response within 24 hours',
      'Personalized 30-minute demo',
      'Custom pricing based on your needs',
      'Implementation timeline discussion',
    ],
  },
};

// ──────────────────────────── Privacy ───────────────────────────
export const PRIVACY = {
  title: 'Privacy Policy',
  updated: 'Last updated: April 2026',
  sections: [
    {
      title: '1. Introduction',
      body: ['Bastet AI Pesttech ("Bastet", "we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website bastet-tech.ai and use our services.'],
    },
    {
      title: '2. Information We Collect',
      body: ['We may collect the following types of information:'],
      list: [
        '**Contact Information:** Name, email address, phone number, and company name when you submit a contact form or request a demo.',
        '**Usage Data:** Information about how you interact with our website, including pages visited, time spent, and referring URLs.',
        '**Device Information:** Browser type, operating system, IP address, and device identifiers.',
        '**Cookies:** We use cookies and similar technologies for analytics and site functionality.',
      ],
    },
    {
      title: '3. How We Use Your Information',
      list: [
        'To respond to your inquiries and provide customer support',
        'To improve our website, products, and services',
        'To send you relevant information about our solutions (with your consent)',
        'To analyze website usage and optimize user experience',
        'To comply with legal obligations',
      ],
    },
    {
      title: '4. Third-Party Services',
      body: ['We use third-party services including Google Analytics for website analytics and WhatsApp for direct enquiry support. These services may collect information as described in their respective privacy policies.'],
    },
    {
      title: '5. Data Security',
      body: ['We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'],
    },
    {
      title: '6. Your Rights',
      body: ['You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time. To exercise these rights, contact us at info@bastet-tech.ai.'],
    },
    {
      title: '7. Contact Us',
      body: ['If you have questions about this Privacy Policy, please contact us at: info@bastet-tech.ai'],
    },
  ] as { title: string; body?: string[]; list?: string[] }[],
};

// ───────────────────────────── Blog ─────────────────────────────
export const BLOG = {
  title: 'Bastet AI Blog',
  sub: 'Insights on AI-powered pest detection, IoT monitoring, and data-driven facility pest management.',
  button: { label: 'Read the latest articles', href: SITE.blog, external: true },
};

// ──────────────────────────── Footer ────────────────────────────
export const FOOTER = {
  brand: 'Bastet AI',
  tagline:
    'AI-Enhanced Pest Control System built by experienced pest control and IT professionals. Real-world solutions from the field, bringing transparency and data-driven intelligence to facility management.',
  quickLinks: {
    title: 'Quick Links',
    items: [
      { label: 'Solutions', href: '/solution' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Blog', href: SITE.blog, external: true },
    ] as Link[],
  },
  contact: { title: 'Contact Us', email: SITE.email },
  copyright: (year: number) => `© ${year} Bastet AI. All rights reserved.`,
};

// Functional UI strings that content.md does not cover (accessibility + 404).
// Kept deliberately minimal; flagged for copy sign-off.
export const UI = {
  skip: 'Skip to content',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  whatsapp: 'WhatsApp',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  newTab: '(opens in a new tab)',
  skipTour: 'Skip the tour',
  notFound: { title: 'Page not found', back: 'Home' },
};

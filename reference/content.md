# Bastet AI — Content Source (verbatim extract from bastet-clean-vision)

> Source repo: `LBS-ST/bastet-clean-vision` @ commit `64ac0ad` (2026-08-27).
> This file is the AUTHORITATIVE copy source for the Astro rebuild. Every string below is verbatim from the production Lovable site. Do NOT rewrite or embellish — replicate exactly.
> Language: **English only** (no Chinese). Brand has NO Chinese name — use "Bastet AI" only.

---

## 0. Brand Facts

| Item | Value |
|---|---|
| Brand name | Bastet AI |
| Legal name (llms.txt) | Bastet AI Pesttech Limited |
| Tagline | Make the Pest Visible |
| Positioning | Professional Pesttech solutions leveraging AI, computer vision, and IoT sensors |
| Language | English only |
| Email | info@bastet-tech.ai |
| Domain | bastet-tech.ai (apex) + www.bastet-tech.ai |
| Blog | blog.bastet-tech.ai (separate Ghost instance — link out, do NOT rebuild blog) |
| LinkedIn | https://www.linkedin.com/company/bastet-tech/ |
| Facebook | https://www.facebook.com/profile.php?id=61583264173759 |
| WhatsApp | wa.me/85265645417 — pre-filled msg "Hello Bastet AI, I would like to enquire about your solutions." Floating button bottom-right, #25D366 green |
| GA4 Measurement ID | G-YESEEGLGZ6 |
| GSC verification | elrk-lMsiJTc79FostpBS8dg5D3SMG3Brj20YRxY6uA |
| Mobile app (iOS) | https://apps.apple.com/ca/app/bastet-hygience/id6443843225 |
| Mobile app (Android) | https://play.google.com/store/apps/details?id=com.iotree.emsd |
| AI analysis tool | https://aianalysistool.bastet-tech.ai/ (external — "View Live Analytics Dashboard" button links here) |
| 3 Solutions | Smart Rodent IOT Solution / AI in a Box / Sticky Trap Image Analyze Tool |

⚠️ NOTE on social URLs: `Footer.tsx` + JSON-LD use `linkedin.com/company/bastet-tech/` and `facebook.com/profile.php?id=61583264173759`. `llms.txt` has OLDER values (`linkedin.com/company/109903020`, `facebook.com/872298952630298`). Use the Footer.tsx values (they're the rendered/canonical ones).

⚠️ NOTE on GA4: `G-YESEEGLGZ6` — confirm with Alex this is Bastet's OWN GA4 property (it may be shared with LBSST which uses the same ID; flag to Alex before hardcoding).

---

## 1. Navigation (header)

Logo: `bastet-logo.png` (left). Desktop nav items (right, in order):
1. Home → `/`
2. Solutions → `/solution`
3. Datasheet → `/datasheet`
4. Blog → `https://blog.bastet-tech.ai` (external, new tab)
5. About Us → `/about`
6. Contact → `/contact`

CTA button (rightmost): "Request Demo" → `/contact`
Mobile: hamburger menu, same items + "Request Demo" button.

---

## 2. Home (`/`)

### SEO
- title: "Bastet AI — Smart Pest Control with Computer Vision"
- description: "Bastet provides AI vision and IoT smart pest control systems for commercial buildings. Reduce pest sightings by 85% with real-time monitoring and predictive analytics."
- JSON-LD: Organization (+ sameAs LinkedIn/Facebook + contactPoint sales email), WebSite (SearchAction), FAQPage (from FAQs below)

### Hero
- H1: "Make the Pest Visible"
- Sub: "Bastet is a professional Pesttech solutions leveraging AI, computer vision, and IoT sensors to automate monitoring and detection of pest activity. Move beyond traditional manual methods to intelligent, data-driven pest management."
- Buttons: "Request a Live Demo" (→ /contact) + "Learn How It Works" (→ /solution)
- Background: `solution-hero-bg.png` with dark overlay

### "Smart Pest Control Solutions" (3 cards)
1. **Smart Rodent IOT Solution** — "Using PIR sensor to find out the root and source of rodent problem. Smart Trap alerts via email and mobile app push notification when the rat is caught."
2. **AI in a Box** — "Using existing CCTV in your facility, install an AI box on the same network. The AI monitors 24/7 and captures pictures when rats come out."
3. **Sticky Trap Image Analyze Tool** — "AI engine to rapidly process images of sticky traps, delivering structured, actionable data and expert contextual notes for real-time pest control interventions."
- Section intro: "Three innovative solutions that revolutionize how you manage pest control"

### "How It Works" (3 steps)
- Intro: "Simple to deploy, powerful in results"
1. **Deploy Smart Sensors** — "Install IoT sensors and AI-enabled cameras in strategic locations"
2. **AI Detects Pests** — "Our AI automatically detects and monitors pest activity 24/7"
3. **Get Actionable Reports** — "Access comprehensive data and insights through your dashboard"
- Button: "Explore Full Details" (→ /solution)

### "Powerful Features" (3 items)
- Intro: "Technology that delivers measurable results"
1. **AI-Powered Detection** — "Computer vision technology identifies and monitors pest activity automatically 24/7"
2. **Real-Time Analytics** — "Access detailed reports, heatmaps, and pest activity data in one centralized platform"
3. **Instant Alerts** — "Receive immediate notifications via email and mobile app when pests are detected"
- Button: "See All Features" (→ /solution)

### CTA
- H2: "Ready to Transform Your Pest Control Management?"
- Sub: "Schedule a personalized demo and see how Bastet's smart pest control solutions can bring intelligence and efficiency to your pest management operations."
- Button: "Schedule My Demo" (→ /contact)

### Testimonials (3)
- Intro: "What Our Clients Say" / "Trusted by facilities across food manufacturing, logistics, and commercial real estate"
1. "Bastet's AI vision system replaced our manual sticky board inspections completely. The accuracy is outstanding, and having photographic evidence with every detection has made compliance reporting effortless. Our auditor was genuinely impressed." — Quality Assurance Manager, Food Manufacturing Facility, Hong Kong
2. "We used to rely on weekly pest control visits and hoped for the best. Now we have 24/7 monitoring with instant alerts. Response time dropped from days to hours, and pest incidents decreased by over 60% in the first quarter." — Hygiene Supervisor, International Logistics Centre
3. "The AI analytics dashboard gives us trend data that we simply couldn't get before. We can see hotspots, peak activity times, and measure the effectiveness of our pest management programme with real numbers. It's changed how we make decisions." — Environmental Health Officer, Commercial Real Estate Group

### FAQ (6, exact Q&A)
1. Q "What is AI-powered pest control?" — A "AI-powered pest control uses computer vision and IoT sensors to detect, identify, and monitor pest activity in real time. Unlike traditional methods that rely on periodic manual inspections, our system provides 24/7 automated surveillance with instant alerts — catching problems early before they become infestations."
2. Q "How does computer vision detect pests?" — A "Our AI in the Box system uses edge AI cameras with trained models to recognise rodent species, cockroaches, and other pests from images captured on sticky boards or in open areas. The AI classifies each detection, counts activity levels, and sends structured data to your dashboard — no human inspection needed."
3. Q "Which industries use Bastet's solutions?" — A "Our solutions serve food manufacturing, commercial kitchens, logistics warehouses, shopping malls, commercial buildings, and government facilities. Any environment where pest compliance and early detection are critical benefits from automated AI monitoring."
4. Q "How is this different from traditional pest control?" — A "Traditional pest control relies on scheduled visits and manual checks — often missing activity between inspections. Bastet provides continuous, data-driven monitoring with photographic evidence, trend analytics, and real-time alerts. This means faster response, better compliance records, and reduced chemical usage."
5. Q "Do you integrate with existing facility management systems?" — A "Yes. Our platform provides API access and standard data exports that integrate with major facility management and ERP systems. You get a unified dashboard for all monitoring data, accessible via web and mobile app."
6. Q "How do I get started with Bastet?" — A "Contact us at info@bastet-tech.ai or through our website. We'll assess your site, recommend the right camera and sensor mix, and handle installation. Most deployments are operational within 2–3 weeks, with ongoing AI model updates and support included."

---

## 3. Solution (`/solution`)

### SEO
- title: "AI Pest Control: Computer Vision & IoT | Bastet AI"
- description: "Explore Bastet's AI pest control platform: computer vision cameras, IoT smart traps, sticky trap analysis, and a unified dashboard for commercial facilities."
- JSON-LD: Product ("Bastet AI Pest Control Platform")

### Hero
- H1: "The Bastet Solution"
- Sub: "A comprehensive AI-enhanced system that automates pest detection and provides objective proof of pest management effectiveness"

### "What is Bastet?"
- H2: "What is Bastet?"
- P1: "The Bastet AI-Enhanced Pest Detection & Management System represents a paradigm shift in pest control. Traditional pest management relies on manual inspections, sticky traps, and reactive responses—an approach that leads to inconsistent monitoring, delayed detection, and difficulty proving effectiveness to clients."
- P2: "Bastet solves this by deploying AI-powered computer vision cameras and IoT sensors throughout your facility. These devices continuously monitor for pest activity, automatically detect and identify pests in real-time, and provide objective data on infestation levels. Facility managers gain unprecedented visibility into pest control effectiveness with real-time dashboards, comprehensive reports, and instant alerts."

### "Built on Cutting-Edge Technology" (4 tech)
- Intro: "Enterprise-grade infrastructure designed for scale and reliability"
1. **AI & Machine Learning** — "Deep learning models trained on millions of pest images"
2. **Computer Vision** — "Real-time pest detection and tracking algorithms"
3. **IoT Sensors** — "Connected devices monitoring pest activity 24/7"
4. **Cloud Platform** — "Scalable infrastructure with 99.9% uptime guarantee"

### "Visualize Your Pest Control Operations" (interfaces showcase)
- Intro: "Real-time dashboards, interactive floor plans, and AI-powered analysis tools"

1. **Download Our Mobile App** — two buttons: "Download for iOS" (Apple link above) + "Download for Android" (Play link above)
2. **IoT Detection Sensor Locations** — caption "Strategic sensor placement across your facility for comprehensive pest activity monitoring" + image `iot-sensor-map.png`
3. **Smart Trap - Caught Red** — caption "Real-time trap status monitoring showing open and caught indicators across your facility" + image `smart-trap-caught.png`
4. **Analytics Dashboard** — caption "Track pest activity trends, monitor zones, and analyze data across different time periods" + image `dashboard-analytics.png`
5. **AI-Powered Sticky Trap Analysis** — caption "Automated image analysis with detailed pest counts and contextual insights" + images `sticky-trap-analysis.png` + `analysis-details.png` + button "View Live Analytics Dashboard" (→ https://aianalysistool.bastet-tech.ai/)

### "AI-in-a-Box: Integrated Intelligence System"
- Intro: "All-in-one hardware and software solution for real-time pest detection and monitoring"
- Images: `ai-box-dashboard.png` + `ai-box-detection.png`
- H3 "Complete Integrated Solution" — "Our AI-in-a-box is a fully integrated hardware and software system that combines advanced computer vision, edge computing, and cloud connectivity in a single unit. This plug-and-play solution requires minimal setup and starts monitoring your facility immediately, detecting and tracking pest activity 24/7 with precision AI algorithms."
- 3 sub-points:
  - **Instant Detection** — "Real-time pest identification within milliseconds"
  - **Edge Processing** — "On-device AI processing for fast, reliable detection"
  - **Cloud Integration** — "Seamless data sync and remote monitoring capabilities"

### "How It Works: From Deployment to Results" (4 steps)
1. **Installation & Setup** — "Our team deploys AI-in-a-box units and IoT sensors at strategic locations throughout your facility. The system is configured based on your facility layout, pest history, and monitoring priorities."
2. **Real-Time Detection** — "Our AI continuously analyzes video feeds and sensor data, detecting pest activity the moment it occurs. The system identifies pest types, tracks movement patterns, and documents everything automatically."
3. **Instant Alerts & Response** — "Receive immediate notifications when pests are detected or activity levels exceed thresholds. Pest control teams can respond proactively before minor issues become major infestations."
4. **Comprehensive Reporting** — "Access detailed analytics through your dashboard. View pest activity trends, identify entry points and hotspots, and generate proof-of-service reports for clients or regulatory compliance."

### CTA
- H2: "See Bastet in Action"
- Sub: "Schedule a personalized demo to see how our AI-enhanced system can transform your pest management operations and provide objective proof of effectiveness."
- Button: "Request a Demo" (→ /contact)

---

## 4. Datasheet (`/datasheet`)

### SEO
- title: "Product Datasheets — Bastet AI Smart Pest Hardware"
- description: "Download datasheets for Bastet AI's LoRa gateway, PIR sensors, smart trap sensors, AI box, and mobile platform."
- JSON-LD: CollectionPage

### Hero
- H1: "Product Datasheets"
- Sub: "Download detailed technical specifications and documentation for all Bastet AI products"

### 10 products (name / category / description / PDF file)
1. **Bastet Platform Mobile App** (Software) — "Mobile application for real-time pest monitoring and management" — `Bastet_Platform_Mobile_app.pdf`
2. **Bastet LoRa Gateway** (Gateway) — "Long-range wireless gateway for IoT sensor connectivity" — `Bastet_Lora_Gateway.pdf`
3. **Bastet LoRa PIR Sensor** (Sensor) — "Long-range passive infrared motion detection sensor" — `Bastet_Lora_PIR.pdf`
4. **Bastet LoRa Trap Sensor** (Sensor) — "Long-range wireless trap sensor for remote capture detection" — `Bastet_Lora_Trap_Sensor.pdf`
5. **Bastet Sensing Camera** (Camera) — "AI-powered camera for visual pest detection and analysis" — `Bastet_Sensing_Camera.pdf`
6. **Bastet Zigbee Smart Plug** (Accessory) — "Smart plug for power management and device control" — `Bastet_Zigbee_Smart_Plug.pdf`
7. **Bastet Zigbee Trap Sensor Component** (Sensor) — "Component specifications for trap sensor integration" — `Bastet_Zigbee_Trap_Sensor_Component.pdf`
8. **Bastet Zigbee Trap Sensor** (Sensor) — "Wireless trap sensor for real-time capture detection" — `Bastet_Zigbee_Trap_Sensor.pdf`
9. **Bastet Zigbee PIR Sensor** (Sensor) — "Zigbee-enabled passive infrared motion sensor" — `Bastet_Zigbee_PIR.pdf`
10. **Bastet Zigbee Gateway** (Gateway) — "Central hub for Zigbee device network management" — `Bastet_Zigbee_Gateway.pdf`

Button per card: "Download PDF"

---

## 5. About (`/about`)

### SEO
- title: "About Bastet AI — Field-Tested Smart Pest Control Experts"
- description: "Bastet AI combines pest control veterans with IT engineers to deliver field-tested, data-driven smart pest management for commercial facilities."
- JSON-LD: AboutPage

### Hero
- H1: "About Bastet"
- Sub: "Built by pest control and IT professionals with real-world experience from the field, not just the lab"

### "Born from Real-World Experience"
- H2: "Born from Real-World Experience"
- P1: "Bastet was created by a team of experienced **pest control professionals and IT experts** who understand the challenges of pest management from the ground up. Our knowledge comes from years spent on-site, dealing with real infestations, not from textbooks or laboratory theories."
- P2: "We've walked through facilities at 3 AM to check traps. We've analyzed countless pest patterns in shopping malls, restaurants, warehouses, and hospitals. We understand what works in the field and what doesn't. This hands-on experience, combined with expertise in artificial intelligence and IoT technology, led us to create Bastet—a solution built by practitioners, for practitioners."
- P3: "**We're not just technology providers; we're pest control professionals who built the tools we wished we had.**"

### "Our Mission"
- H3: "Our Mission"
- "To bring transparency and data-driven intelligence to pest control, empowering facility managers with tools built from real-world experience. We believe that effective pest management should be objective, efficient, and based on actual field knowledge—not just laboratory theories. Every feature in Bastet solves a real problem we've personally encountered on-site."

### "Our Core Values" (4)
- Intro: "The principles that guide everything we do"
1. **Field-Tested** — "Every solution built from real on-site experience, not theoretical assumptions"
2. **Practical** — "Tools designed for real-world conditions and challenges faced daily"
3. **Experienced** — "Team of pest control veterans combined with cutting-edge IT expertise"
4. **Reliable** — "Solutions proven in the field across diverse facility types and challenges"

### "Why We Built Bastet" (3 cards)
1. **The Reality on the Ground** — "As pest control professionals working in the field, we faced the same frustrations repeatedly: manually checking hundreds of traps at 2 AM, analyzing sticky boards by eye under poor lighting, writing reports by hand, and struggling to show clients the true extent of infestations. We knew there had to be a better way—one that leverages technology without losing the practical knowledge gained from years of hands-on experience."
2. **Experience Meets Technology** — "Our team combines decades of on-site pest control experience with advanced IT expertise. We've dealt with rat infestations in restaurant kitchens, monitored pest activity in warehouses, and managed comprehensive programs for shopping centers. This real-world knowledge guided every feature we built into Bastet. We didn't design solutions in an office—we designed them in the field, solving actual problems we encountered daily."
3. **Built by Practitioners** — "Bastet is the tool we always wanted when we were out in the field. Every alert, every dashboard metric, every AI detection was designed based on real scenarios and actual needs. We're continuously improving based on field feedback—because we're still out there, working alongside other pest control professionals, understanding new challenges, and adapting our technology to solve them."

### "Field-Tested Across Diverse Environments" (3 stats)
- H2: "Field-Tested Across Diverse Environments"
- Intro: "Bastet has been deployed and tested in real-world environments—from 24/7 food processing facilities to high-traffic shopping centers. Our solutions work because they were built by people who have personally dealt with every type of pest challenge in every type of facility imaginable."
- **15+** Years Combined Field Experience
- **1000+** On-Site Inspections Performed
- **50+** Real Cases Analyzed

### CTA
- H2: "Ready to Partner With Us?"
- Sub: "Let's discuss how Bastet can transform your pest management operations. Schedule a personalized consultation with our team."
- Button: "Get in Touch" (→ /contact)

---

## 6. Contact (`/contact`)

### SEO
- title: "Contact Bastet AI — Request a Smart Pest Control Demo"
- description: "Get in touch with Bastet AI. Schedule a personalized demo of our AI vision and IoT pest monitoring solutions for your facility."
- JSON-LD: ContactPage (Organization, email info@bastet-tech.ai)

### Hero
- H1: "Let's Transform Your Facility"
- Sub: "Schedule a personalized demo and discover how Bastet can bring transparency and efficiency to your pest control operations"

### Body
- H2 "Request a Demo" — "Our team is ready to answer your questions and show you how Bastet can solve your facility management challenges."
- **Email card**: H3 "Email Us" / info@bastet-tech.ai / "Click to send us an email" (mailto:info@bastet-tech.ai)
- **"What to Expect"** (4 checkmarks):
  - "Response within 24 hours"
  - "Personalized 30-minute demo"
  - "Custom pricing based on your needs"
  - "Implementation timeline discussion"

⚠️ NOTE: the source Contact page has NO form — just an email card + "What to Expect" list. There is no Supabase/resend backend. Replicate as email-based contact. (Flag to Alex: LBSST/IoTree got a real contact form — Bastet could get one too if wanted, but "replicate" = email card.)

---

## 7. Privacy (`/privacy`)

### SEO
- title: "Privacy Policy — Bastet AI"
- description: "Read Bastet AI's privacy policy covering data collection, cookies, analytics, and your rights when using bastet-tech.ai."

### Body
- H1: "Privacy Policy" — "Last updated: April 2026"
- **1. Introduction** — "Bastet AI Pesttech ("Bastet", "we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website bastet-tech.ai and use our services."
- **2. Information We Collect** — "We may collect the following types of information:" + list:
  - "**Contact Information:** Name, email address, phone number, and company name when you submit a contact form or request a demo."
  - "**Usage Data:** Information about how you interact with our website, including pages visited, time spent, and referring URLs."
  - "**Device Information:** Browser type, operating system, IP address, and device identifiers."
  - "**Cookies:** We use cookies and similar technologies for analytics and site functionality."
- **3. How We Use Your Information** — list:
  - "To respond to your inquiries and provide customer support"
  - "To improve our website, products, and services"
  - "To send you relevant information about our solutions (with your consent)"
  - "To analyze website usage and optimize user experience"
  - "To comply with legal obligations"
- **4. Third-Party Services** — "We use third-party services including Google Analytics for website analytics and WhatsApp for direct enquiry support. These services may collect information as described in their respective privacy policies."
- **5. Data Security** — "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
- **6. Your Rights** — "You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time. To exercise these rights, contact us at info@bastet-tech.ai."
- **7. Contact Us** — "If you have questions about this Privacy Policy, please contact us at: info@bastet-tech.ai"

---

## 8. Blog (`/blog`)

### SEO
- title: "Blog — Smart Pest Control Insights | Bastet AI"
- description: "Articles on AI pest control, IoT monitoring, and smart facility pest management from the Bastet AI team."
- JSON-LD: Blog

### Body (simple interstitial page — blog itself lives on Ghost subdomain)
- H1: "Bastet AI Blog"
- Sub: "Insights on AI-powered pest detection, IoT monitoring, and data-driven facility pest management."
- Button: "Read the latest articles" (→ https://blog.bastet-tech.ai, new tab)

---

## 9. Asset → Usage Map

| Asset | Used in |
|---|---|
| bastet-logo.png | Header logo |
| solution-hero-bg.png | Home/Solution/About/Contact hero backgrounds |
| dashboard-analytics.png | Solution — Analytics Dashboard |
| floor-plan-map.png | (in assets, referenced by older layout — may be orphaned) |
| sticky-trap-analysis.png | Solution — Sticky Trap Analysis (left) |
| analysis-details.png | Solution — Sticky Trap Analysis (right) |
| ai-box-dashboard.png | Solution — AI-in-a-Box (left) |
| ai-box-detection.png | Solution — AI-in-a-Box (right) |
| iot-sensor-map.png | Solution — IoT Detection Sensor Locations |
| smart-trap-caught.png | Solution — Smart Trap Caught Red |
| computer-vision-detection.png | (in assets — may be orphaned) |
| smart-trap-map.png | (in assets — may be orphaned) |
| hero-bg.jpg / hero-bg.png | (in assets — may be orphaned; older hero backgrounds) |
| og-image.png | Open Graph / social share |
| favicon.ico / favicon.png | favicon |
| datasheets/*.pdf (10) | Datasheet page downloads |

---

## 10. Footer

- Social icons (top-left): LinkedIn + Facebook (URLs above)
- Brand: "Bastet AI" + tagline "AI-Enhanced Pest Control System built by experienced pest control and IT professionals. Real-world solutions from the field, bringing transparency and data-driven intelligence to facility management."
- **Quick Links**: Solutions (/solution), About Us (/about), Contact (/contact), Privacy Policy (/privacy), Blog (blog.bastet-tech.ai)
- **Contact Us**: info@bastet-tech.ai
- Copyright: "© {year} Bastet AI. All rights reserved."

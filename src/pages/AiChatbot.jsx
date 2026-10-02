import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  MessageSquare, 
  FileText, 
  Zap, 
  Code2, 
  Send, 
  HelpCircle, 
  Building2, 
  Hospital, 
  Hotel, 
  GraduationCap, 
  ShoppingBag, 
  Layers, 
  Languages, 
  PhoneCall, 
  Clock, 
  Check, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { COMPANY_INFO, DELIVERY_PROCESS } from '../data/companyData';
import ProcessTimeline from '../components/ProcessTimeline';
import FAQAccordion from '../components/FAQAccordion';

const AiChatbot = () => {
  // Simulator state for interactive demo
  const sampleScenarios = [
    {
      id: 'clinic',
      label: 'Clinic / Healthcare',
      question: 'What are Dr. Debbarma\'s OPD consultation hours and consultation fee?',
      reply: 'Dr. S. Debbarma conducts consultations on Monday, Wednesday, and Friday from 4:30 PM to 7:30 PM at the Agartala Clinic Chamber. The consultation fee is ₹500 for initial assessment.',
      citation: 'Official Clinic Schedule 2026 (Page 2, Line 14)',
      leadPrompt: 'Would you like to schedule an appointment? Share your phone number and our clinic receptionist will confirm your slot.',
    },
    {
      id: 'hotel',
      label: 'Hotel / Homestay',
      question: 'Do you offer airport pickup from MBB Airport and complimentary breakfast?',
      reply: 'Yes, complimentary buffet breakfast is included with all Deluxe and Executive room bookings (served 7:30 AM – 10:00 AM). Chauffeur airport pickup from Maharaja Bir Bikram (MBB) Airport is available upon 24-hour advance request at ₹450.',
      citation: 'Guest Services & Tariff Card (Section 4: Transfers)',
      leadPrompt: 'Planning your trip? Leave your travel dates and our reservation team will WhatsApp you the current seasonal tariffs.',
    },
    {
      id: 'coaching',
      label: 'Coaching Institute',
      question: 'When does the new batch for Class 11 Science CBSE start, and can fees be paid in installments?',
      reply: 'The new Class 11 Science batch commences on 15th April 2026. Tuition fees can be paid in three equal quarterly installments, or in full upfront with a 5% academic concession.',
      citation: 'Academic Prospectus 2026–27 (Fee Structure, Page 8)',
      leadPrompt: 'Would you like to reserve a seat for the scholarship assessment? Share your details and our counselor will call you.',
    },
    {
      id: 'fallback',
      label: 'Out-of-Scope Query',
      question: 'Can you give me a 50% discount on wholesale orders right now?',
      reply: 'I do not have authorization to grant custom wholesale discounts beyond our published dealer tiers. However, our sales director can evaluate volume orders directly.',
      citation: 'Human Escalation Boundary Protocol (Verified)',
      leadPrompt: 'Click "Chat on WhatsApp" below to discuss custom wholesale volume pricing directly with our commercial team.',
      isFallback: true
    }
  ];

  const [activeScenario, setActiveScenario] = useState(sampleScenarios[0]);

  const features = [
    {
      title: 'Zero Hallucinations (Strict Grounding)',
      desc: 'The assistant only answers from documents, URLs, price sheets, and FAQs you explicitly approve. It never makes up false policies, discounts, or inventory claims.',
      icon: ShieldCheck,
    },
    {
      title: 'Verifiable Source Citations',
      desc: 'Every factual response provides a clear source reference (e.g. "[Source: Service Catalog Page 4]"). Your customers see verified business facts, building immediate trust.',
      icon: FileText,
    },
    {
      title: '24/7 Lead Capture & Email Alerts',
      desc: 'Captures visitor name, phone number, and specific requirement directly inside the conversation and instantly emails your sales team with the full dialogue transcript.',
      icon: Zap,
    },
    {
      title: 'One-Click WhatsApp Human Handoff',
      desc: 'When a visitor needs custom negotiation or complex support, one click transfers the conversation to your business WhatsApp with a pre-filled summary.',
      icon: PhoneCall,
    },
    {
      title: 'Single-Line Script Installation',
      desc: 'Installs in under two minutes with a single standard script snippet. Fully compatible with WordPress, Wix, Shopify, custom HTML, React, and PHP websites.',
      icon: Code2,
    },
    {
      title: 'Bilingual Fluency (English & Hindi)',
      desc: 'Seamlessly interacts in English and Hindi out of the box, understanding regional phrasing and colloquial customer inquiries across Tripura and Northeast India.',
      icon: Languages,
    },
  ];

  const useCases = [
    {
      sector: 'Clinics & Diagnostic Labs',
      icon: Hospital,
      highlight: 'Turn website visitors into booked appointments',
      points: [
        'Answers OPD consultation schedules, doctor specialities, and clinic chamber locations',
        'Provides fasting instructions and preparation guidelines for blood tests & ultrasounds',
        'Captures patient contact details for callback by front-desk receptionists',
        'Reduces repeated phone inquiries during busy clinic operating hours'
      ]
    },
    {
      sector: 'Hotels, Resorts & Homestays',
      icon: Hotel,
      highlight: 'Capture direct bookings without OTA commission leaks',
      points: [
        'Shares room tariffs, check-in/out policies, amenities, and parking rules instantly',
        'Answers questions regarding airport transfer, sightseeing packages, and restaurant timings',
        'Pre-fills booking inquiries directly to the hotel manager\'s WhatsApp',
        'Available 24/7 for late-night tourists planning itineraries across Northeast India'
      ]
    },
    {
      sector: 'Coaching & Educational Institutes',
      icon: GraduationCap,
      highlight: 'Convert student inquiries before admission deadlines',
      points: [
        'Explains course curriculums, faculty credentials, batch timings, and entrance criteria',
        'Clarifies fee schedules, installment milestones, and scholarship examination dates',
        'Collects student name, parent contact number, and target course for admissions follow-up',
        'Delivers consistent, accurate academic counseling information 24/7'
      ]
    },
    {
      sector: 'Retailers & Wholesale Distributors',
      icon: ShoppingBag,
      highlight: 'Qualify bulk B2B dealer and buyer inquiries instantly',
      points: [
        'Helps customers check product specifications, catalog availability, and brand lines',
        'Answers minimum order quantity (MOQ) and standard delivery turnaround queries',
        'Routes large procurement inquiries directly to your senior sales team via email',
        'Works seamlessly on mobile devices for regional merchants and contractors'
      ]
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '₹1,499',
      period: '/ month',
      badge: null,
      desc: 'Ideal for single-location businesses, clinics, and professional practices starting with AI web assistance.',
      features: [
        '1 website installation',
        'Up to 50 pages / 20 documents indexed',
        '500 conversations / month included',
        'Strict RAG grounding & source citations',
        'Lead capture with instant email alerts',
        'Standard email support',
        'English language support'
      ],
      ctaText: 'Get Started with Starter',
      topic: 'ai_chatbot'
    },
    {
      name: 'Growth',
      price: '₹3,999',
      period: '/ month',
      badge: 'Most Popular',
      desc: 'Best for growing businesses, hotels, regional distributors, and institutes needing high volume & WhatsApp handoff.',
      features: [
        '2 websites installation',
        'Up to 200 pages / 100 documents indexed',
        '2,000 conversations / month included',
        'Strict RAG grounding & source citations',
        'Lead capture to email + CSV lead export',
        'One-click WhatsApp human handoff button',
        'Bilingual support (English & Hindi)',
        'Priority email & WhatsApp technical support'
      ],
      ctaText: 'Get Started with Growth',
      topic: 'ai_chatbot',
      featured: true
    },
    {
      name: 'Pro',
      price: '₹7,999',
      period: '/ month',
      badge: 'High Volume',
      desc: 'For multi-branch enterprises, high-traffic catalogs, and businesses planning automated WhatsApp channel rollout.',
      features: [
        'Up to 5 websites installation',
        'Up to 500 pages / 250 documents indexed',
        '5,000 conversations / month included',
        'Strict RAG grounding & source citations',
        'Lead capture to email, CSV, & webhook support',
        'One-click WhatsApp handoff button',
        'WhatsApp Business API channel readiness',
        'Dedicated onboarding engineer & priority SLA'
      ],
      ctaText: 'Get Started with Pro',
      topic: 'ai_chatbot'
    }
  ];

  const faqItems = [
    {
      q: 'How does the AI assistant install on my existing website?',
      a: 'Installation requires copying a single line of JavaScript (<script src="..."></script>) into your website\'s HTML template before the closing </body> tag. It works seamlessly with WordPress, Wix, Shopify, Squarespace, custom HTML5/PHP sites, and modern React/Next.js frameworks. If you prefer, our team can install it for you during Done-For-You setup.'
    },
    {
      q: 'How do you guarantee the chatbot will not invent incorrect prices or false policies?',
      a: 'We use strict Retrieval-Augmented Generation (RAG) with conservative confidence thresholds. The system is explicitly instructed to retrieve facts exclusively from your approved documents (website URLs, PDFs, catalogs, FAQs). If a visitor asks something outside your verified documentation, the bot will never guess—it politely explains that it does not have verified information and offers to connect the visitor directly with your human team on WhatsApp.'
    },
    {
      q: 'How do I receive the leads captured by the assistant?',
      a: 'When a visitor shares their contact information (such as name, phone number, and requirement), our server validates the details and immediately delivers an automated email notification containing the lead\'s contact details along with the full chat transcript. On Growth and Pro plans, leads can also be exported to CSV or pushed to your internal webhook.'
    },
    {
      q: 'What languages does the chatbot support?',
      a: 'The assistant supports fluent English and Hindi out of the box, understanding colloquial regional queries and mixed-language phrasing commonly used in Northeast India. Support for Bengali and regional dialects is added after strict quality benchmark verification.'
    },
    {
      q: 'What happens when our business prices, policies, or catalogs change?',
      a: 'You can update your knowledge base anytime. For Done-For-You clients, simply email us your updated PDF catalog, price sheet, or changed webpage URL. We re-index your updated materials and deploy the refreshed knowledge base with zero downtime.'
    },
    {
      q: 'Is our proprietary business information safe and private?',
      a: 'Yes. Every client runs on an isolated tenant partition with strict Row-Level Security (RLS). Your business documents, private pricing sheets, and customer lead transcripts are strictly confidential and are never used to train public commercial AI models.'
    },
    {
      q: 'Are WhatsApp messaging fees included in the plan price?',
      a: 'The website widget includes an instant click-to-WhatsApp ("Chat on WhatsApp") handoff button on Growth and Pro plans with zero recurring Meta charges. If you later choose to deploy an automated two-way WhatsApp Business API bot on Pro, Meta\'s official messaging utility rates are passed through transparently at cost.'
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Saurik AI Chatbot",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "description": "AI assistant for business websites that answers visitor questions strictly from approved business content, captures leads, and hands off to WhatsApp.",
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": "1499",
          "highPrice": "7999",
          "offerCount": "3"
        },
        "provider": {
          "@type": "Organization",
          "name": "SAURIK IT Private Limited",
          "url": "https://www.saurikit.in"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.saurikit.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Saurik AI Chatbot",
            "item": "https://www.saurikit.in/ai-chatbot"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqItems.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      }
    ]
  };

  return (
    <div className="space-y-20 pt-4 sm:pt-8">
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. Hero Section ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-accent-teal text-xs font-semibold uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5" />
              <span>AI Assistant for Business Websites • Tripura &amp; Northeast India</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-ink-primary font-heading tracking-tight leading-[1.15]">
              Turn website visitors into qualified customers. <span className="text-accent-teal">24/7, without false promises.</span>
            </h1>

            <p className="text-lg text-ink-secondary leading-relaxed max-w-2xl">
              An AI assistant trained strictly on your approved website pages, PDF catalogs, and price lists. It answers questions with verified source citations, captures phone leads, and escalates to your WhatsApp when a human touch is needed.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link 
                to="/contact?topic=ai_chatbot" 
                className="btn-primary px-7 py-3.5 text-base flex items-center justify-center gap-2 group shadow-md"
              >
                <span>Request a Demo on Your Content</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <a 
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hello%20Saurik%20IT%2C%20I%20am%20interested%20in%20an%20AI%20Chatbot%20for%20my%20business%20website.`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary px-6 py-3.5 text-base flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Quick Guarantees Chips */}
            <div className="pt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-ink-muted">
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <CheckCircle2 className="w-4 h-4 text-accent-teal flex-shrink-0" />
                Zero Hallucinations (Strict RAG)
              </span>
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <CheckCircle2 className="w-4 h-4 text-accent-teal flex-shrink-0" />
                Single &lt;script&gt; Tag Install
              </span>
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <CheckCircle2 className="w-4 h-4 text-accent-teal flex-shrink-0" />
                English &amp; Hindi Fluency
              </span>
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <CheckCircle2 className="w-4 h-4 text-accent-teal flex-shrink-0" />
                Instant WhatsApp &amp; Email Alerts
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Live Demo Preview Box */}
          <div className="lg:col-span-5">
            <div className="bg-surface rounded-2xl border border-border-subtle shadow-xl overflow-hidden">
              {/* Simulator Header */}
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                  <div>
                    <div className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-400">
                      Live Grounding Simulator
                    </div>
                    <div className="text-sm font-semibold text-slate-100">
                      Saurik AI Assistant Preview
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Strict RAG Mode
                </span>
              </div>

              {/* Scenario Selector Pills */}
              <div className="p-3 bg-slate-50 border-b border-border-subtle flex gap-1.5 overflow-x-auto text-xs">
                {sampleScenarios.map((sc) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setActiveScenario(sc)}
                    className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      activeScenario.id === sc.id
                        ? 'bg-accent-teal text-white shadow-sm'
                        : 'bg-white text-ink-secondary border border-border-subtle hover:bg-slate-100'
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>

              {/* Chat Dialogue Stage */}
              <div className="p-5 space-y-4 text-sm bg-slate-50/50 min-h-[300px] flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Visitor Message */}
                  <div className="flex items-start gap-2.5 justify-end">
                    <div className="bg-accent-teal text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm leading-relaxed text-xs sm:text-sm">
                      {activeScenario.question}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-teal-100 text-accent-teal flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      You
                    </div>
                  </div>

                  {/* AI Assistant Grounded Reply */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-border-subtle p-3.5 rounded-2xl rounded-tl-none max-w-[90%] shadow-sm space-y-2.5">
                      <p className="text-ink-primary leading-relaxed text-xs sm:text-sm">
                        {activeScenario.reply}
                      </p>

                      {/* Verifiable Citation Tag */}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[11px] font-mono text-ink-secondary">
                        <FileText className="w-3 h-3 text-accent-teal flex-shrink-0" />
                        <span>Source: {activeScenario.citation}</span>
                      </div>

                      {/* Lead Generation Prompt Box */}
                      <div className="p-2.5 rounded-xl bg-teal-50/70 border border-teal-200/60 text-xs text-ink-secondary space-y-1.5">
                        <span className="font-semibold text-ink-primary block flex items-center gap-1">
                          <Zap className="w-3 h-3 text-accent-teal" />
                          <span>Smart Action</span>
                        </span>
                        <p>{activeScenario.leadPrompt}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Widget Footer */}
                <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-ink-muted">
                  <span className="flex items-center gap-1 font-mono text-[10px]">
                    <ShieldCheck className="w-3 h-3 text-accent-teal" />
                    Verified Tenant Isolation
                  </span>
                  <Link 
                    to="/contact?topic=ai_chatbot" 
                    className="text-accent-teal font-semibold hover:underline flex items-center gap-0.5"
                  >
                    Test on your content →
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. Why Most Chatbots Fail vs. The Saurik IT Approach ── */}
      <section className="bg-surface border-y border-border-subtle py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-accent-teal">
              Ground Reality Architecture
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-ink-primary font-heading tracking-tight">
              Why standard chatbots fail, and how we keep yours accurate.
            </p>
            <p className="text-ink-secondary text-sm sm:text-base leading-relaxed">
              Customer trust takes years to build and one hallucinated price or false claim to destroy. Our engine is built with strict boundaries from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* The Old Way / Generic Chatbots */}
            <div className="p-8 rounded-2xl bg-rose-50/30 border border-rose-200/70 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
                <span>The Problem with Generic AI</span>
              </div>
              <h3 className="text-xl font-bold text-ink-primary font-heading">
                Hallucinations &amp; Frustrated Customers
              </h3>
              <ul className="space-y-3.5 text-sm text-ink-secondary">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Invents non-existent discounts:</strong> Unconstrained models often promise offers or prices not approved by management.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Robotic, repetitive dead ends:</strong> Hardcoded rule-based chatbots force users through endless menu buttons without solving their question.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Lost sales leads:</strong> When a user gets stuck, they leave the website instead of reaching a human sales rep.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Public data leakage risk:</strong> Generic tools often feed your private documents into public training sets.</span>
                </li>
              </ul>
            </div>

            {/* The Saurik IT Way */}
            <div className="p-8 rounded-2xl bg-teal-50/40 border border-teal-200/80 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
                <span>The Saurik IT Standard</span>
              </div>
              <h3 className="text-xl font-bold text-ink-primary font-heading">
                Strict Retrieval Bounds &amp; Human Review
              </h3>
              <ul className="space-y-3.5 text-sm text-ink-secondary">
                <li className="flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-accent-teal flex-shrink-0" />
                  <span><strong>Answers only from approved files:</strong> Retrieves answers exclusively from your uploaded PDFs, service pages, and FAQs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-accent-teal flex-shrink-0" />
                  <span><strong>Mandatory document citations:</strong> Highlights the exact page or section backing up the answer.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-accent-teal flex-shrink-0" />
                  <span><strong>One-click WhatsApp escalation:</strong> Transparently admits when it is unsure and connects directly to your WhatsApp or email.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-accent-teal flex-shrink-0" />
                  <span><strong>Complete tenant isolation:</strong> Your data is isolated in private database tables with PostgreSQL Row-Level Security.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Core Features Grid ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-accent-teal">
            Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-ink-primary font-heading tracking-tight">
            Engineered for regional Indian businesses.
          </p>
          <p className="text-ink-secondary text-sm sm:text-base leading-relaxed">
            Everything your business needs to automate customer interactions, capture qualified inquiries, and assist customers day and night.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="content-card space-y-3.5 hover:border-accent-teal/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-accent-teal">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-ink-primary font-heading">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. Local Industry Use Cases ─────────────────────── */}
      <section className="bg-surface border-y border-border-subtle py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-accent-teal">
              Regional Use Cases
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-ink-primary font-heading tracking-tight">
              Built for businesses across Tripura &amp; Northeast India.
            </p>
            <p className="text-ink-secondary text-sm sm:text-base leading-relaxed">
              See how different sectors in Agartala and the Northeast deploy website assistants to solve real operational bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((uc, idx) => {
              const Icon = uc.icon;
              return (
                <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-canvas border border-border-subtle space-y-5 hover:border-accent-teal/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-accent-teal flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink-primary font-heading">
                        {uc.sector}
                      </h3>
                      <p className="text-xs font-semibold text-accent-teal">
                        {uc.highlight}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-ink-secondary">
                    {uc.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent-teal flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-border-subtle">
                    <Link
                      to="/contact?topic=ai_chatbot"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-teal hover:underline"
                    >
                      <span>Explore for your sector</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Transparent Pricing ──────────────────────────── */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-accent-teal">
            Pricing Plans
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-ink-primary font-heading tracking-tight">
            Transparent, predictable monthly plans.
          </p>
          <p className="text-ink-secondary text-sm sm:text-base leading-relaxed">
            Starting from ₹1,499/month. Annual billing gives 2 months free. No hidden fees or runaway token surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, idx) => (
            <div 
              key={idx}
              className={`rounded-2xl border p-8 flex flex-col justify-between transition-shadow ${
                plan.featured 
                  ? 'bg-surface border-accent-teal shadow-xl ring-2 ring-accent-teal/20 relative' 
                  : 'bg-surface border-border-subtle shadow-card'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-ink-primary font-heading">
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-teal-100 text-teal-800 border border-teal-300">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-ink-secondary mb-6 leading-relaxed">
                  {plan.desc}
                </p>

                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-border-subtle">
                  <span className="text-4xl font-extrabold text-ink-primary font-heading tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm font-semibold text-ink-muted">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-ink-secondary mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-accent-teal flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  to={`/contact?topic=${plan.topic}`}
                  className={`w-full py-3 px-4 rounded-control text-sm font-bold text-center block transition-all shadow-sm ${
                    plan.featured
                      ? 'bg-accent-teal text-white hover:bg-[#0b7c72]'
                      : 'bg-slate-100 text-ink-primary hover:bg-slate-200'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Done-For-You Setup Addon Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-teal-50/50 border border-teal-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-mono font-bold">
              <span>Managed Onboarding Option</span>
            </div>
            <h3 className="text-lg font-bold text-ink-primary font-heading">
              Done-For-You Setup &amp; Training: ₹4,999 (One-time)
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              Don’t have time to clean your documents? Our engineering team will collect your catalogs, clean boilerplate, tune system boundaries, install the widget on your site, and provide 30 days of active QA monitoring.
            </p>
          </div>
          <Link
            to="/contact?topic=ai_chatbot"
            className="btn-primary whitespace-nowrap px-6 py-3 text-sm flex-shrink-0"
          >
            Request Done-For-You Setup
          </Link>
        </div>

        <div className="mt-4 text-center text-xs text-ink-muted">
          * All plan prices are subject to 18% GST. Annual billing equals 10 months (2 months free). Soft-limit warnings are sent at 80% usage to guarantee zero surprise overages.
        </div>
      </section>

      {/* ── 6. 4-Step Implementation Process ─────────────────── */}
      <section className="bg-surface border-y border-border-subtle py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-accent-teal">
              Implementation
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-ink-primary font-heading tracking-tight">
              Live on your website in four deliberate steps.
            </p>
            <p className="text-ink-secondary text-sm sm:text-base leading-relaxed">
              We follow our signature four-stage engineering methodology so you know exactly what is built and verified.
            </p>
          </div>

          <ProcessTimeline steps={DELIVERY_PROCESS} />
        </div>
      </section>

      {/* ── 7. FAQ Accordion ────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-accent-teal">
            Frequently Asked Questions
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-ink-primary font-heading tracking-tight">
            Everything you need to know.
          </p>
        </div>

        <FAQAccordion items={faqItems} />
      </section>

      {/* ── 8. Final Conversion CTA ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready to Automate Customer Inquiries?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-white leading-tight">
              Test an AI assistant trained on your own website content.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Send us your website URL or service brochure. We will build a free, live demonstration widget showing how it answers questions from your real business data.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/contact?topic=ai_chatbot"
                className="btn-primary bg-accent-teal hover:bg-[#0b7c72] text-white px-8 py-3.5 text-base font-bold shadow-lg text-center"
              >
                Request Free Live Demo
              </Link>
              
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hello%20Saurik%20IT%2C%20I%20would%20like%20to%20see%20a%20demo%20of%20the%20AI%20Chatbot%20on%20my%20website%20content.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-control bg-white/10 hover:bg-white/20 text-white font-semibold text-base transition-colors border border-white/20"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Chat with Founder on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiChatbot;

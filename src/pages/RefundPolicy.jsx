import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

const RefundPolicy = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-4">
        <Link to="/" className="mb-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent-teal hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Return to Home</span>
        </Link>

        <div className="badge-software">
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Cancellation &amp; Refunds</span>
        </div>

        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ink-primary sm:text-4xl">
          Cancellation &amp; Refund Policy
        </h1>

        <p className="text-sm text-ink-secondary">
          Effective Date: 02 October 2026 • Compliant with Indian Consumer Protection &amp; Payment Gateway Standards
        </p>
      </div>

      <div className="content-card space-y-9 text-sm leading-relaxed text-ink-secondary sm:text-base">
        {/* Intro */}
        <section className="space-y-3">
          <p>
            At <strong>{COMPANY_INFO.legalName}</strong> (&ldquo;SAURIK IT&rdquo;), we stand behind the quality, reliability, and precision of our software platforms, AI products, and IT hardware solutions. This Cancellation &amp; Refund Policy outlines the terms governing subscription cancellations, setup refunds, and payment reversals.
          </p>
        </section>

        {/* Section 1: SaaS Subscriptions */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">1. SaaS Subscriptions (Saurik AI Chatbot, Saurik Track, Arthos)</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li><strong>14-Day Free Evaluation Period:</strong> All self-serve tiers and pilot onboarding engagements include an evaluation window without credit card requirements or billing obligations.</li>
            <li><strong>Monthly Subscriptions:</strong> You may cancel your monthly subscription at any time prior to the next scheduled renewal date by emailing <a href={`mailto:${COMPANY_INFO.email}`} className="text-accent-teal hover:underline">{COMPANY_INFO.email}</a>. Upon cancellation, your chatbot or tracking service remains operational until the conclusion of the paid billing period, with no subsequent charges incurred. Because LLM vector tokens and server infrastructure are consumed dynamically, partial-month pro-rata refunds are not issued once active querying has occurred.</li>
            <li><strong>Annual Subscriptions:</strong> If you cancel an annual upfront plan within thirty (30) calendar days of commencement, you are eligible for a pro-rata refund for the remaining full calendar months, minus a single standard month charge calculated at the non-discounted monthly plan rate.</li>
          </ul>
        </section>

        {/* Section 2: Done-For-You Setup Fees */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">2. Done-For-You Setup &amp; Custom Ingestion Fees</h2>
          <p>
            One-time setup fees (e.g., ₹4,999–₹14,999 for custom website crawling, PDF document structuring, semantic chunking, and embedding generation) involve dedicated engineering hours:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li><strong>Before Engineering Work Commences:</strong> 100% full refund if cancellation is requested in writing within twenty-four (24) hours of payment and before document ingestion has begun.</li>
            <li><strong>In-Progress Ingestion:</strong> 50% refund if cancellation is requested after automated crawling has run but prior to final script delivery.</li>
            <li><strong>Completed Delivery:</strong> Non-refundable once the custom bot has been indexed, vector embeddings stored in PostgreSQL pgvector, and the final embed script tag or preview link delivered for customer acceptance.</li>
          </ul>
        </section>

        {/* Section 3: IT Hardware & Surveillance Systems */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">3. IT Hardware, CCTV &amp; Equipment Sales</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li><strong>Defective Out-of-the-Box Hardware:</strong> If an electronic component, CCTV camera, NVR, server component, or networking switch supplied by SAURIK IT is confirmed defective upon installation, we provide an immediate direct replacement within seven (7) days of delivery.</li>
            <li><strong>Manufacturer Warranty:</strong> Hardware products are backed by their respective original equipment manufacturer (OEM) warranties (e.g., Hikvision, CP Plus, Dell, HP). SAURIK IT assists with warranty claims and authorized service center routing under accepted service contracts.</li>
          </ul>
        </section>

        {/* Section 4: Refund Process & Timeline */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">4. How to Request a Refund &amp; Processing Timelines</h2>
          <div className="rounded-control border border-border-subtle bg-canvas p-4 text-sm">
            <h3 className="font-semibold text-ink-primary mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent-teal" />
              <span>Standard Refund Processing Schedule</span>
            </h3>
            <ol className="list-decimal space-y-1.5 pl-5 text-xs sm:text-sm text-ink-secondary">
              <li>Submit your written request to <a href={`mailto:${COMPANY_INFO.email}`} className="text-accent-teal hover:underline">{COMPANY_INFO.email}</a> with your Business Name, Invoice Number, and reason for cancellation.</li>
              <li>Our finance team reviews and confirms refund eligibility within two (2) business days.</li>
              <li>Approved refunds are credited back to the original payment method (Bank Account, UPI, or Card via Razorpay) within <strong>5 to 7 banking working days</strong> in accordance with standard RBI clearing timelines.</li>
            </ol>
          </div>
        </section>

        {/* Section 5: Contact Desk */}
        <section className="space-y-3 border-t border-border-subtle pt-6">
          <h2 className="font-heading text-xl font-bold text-ink-primary">5. Billing &amp; Refund Assistance</h2>
          <p>If you have any questions regarding an invoice or wish to submit a refund inquiry, contact us directly:</p>
          <div className="space-y-1 rounded-control border border-border-subtle bg-canvas p-4 text-sm font-medium text-ink-primary">
            <div><strong>{COMPANY_INFO.legalName} — Billing Desk</strong></div>
            <div>Email: <a href={`mailto:${COMPANY_INFO.email}`} className="text-accent-teal hover:underline">{COMPANY_INFO.email}</a></div>
            <div>Phone / WhatsApp: {COMPANY_INFO.phoneDisplay}</div>
            <div>Address: Agartala, Tripura 799001, India</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ShieldCheck, UserCheck, Lock, Database, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

const Privacy = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-4">
        <Link to="/contact" className="mb-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent-teal hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Return to Contact</span>
        </Link>

        <div className="badge-software">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Privacy &amp; DPDP 2025 Compliance</span>
        </div>

        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ink-primary sm:text-4xl">
          Privacy Policy &amp; Data Protection Notice
        </h1>

        <p className="text-sm text-ink-secondary">
          Last Updated: 02 October 2026 • Compliant with India&rsquo;s Digital Personal Data Protection (DPDP) Act 2023 &amp; Rules 2025
        </p>
      </div>

      <div className="content-card space-y-9 text-sm leading-relaxed text-ink-secondary sm:text-base">
        {/* Intro */}
        <section className="space-y-3">
          <p>
            <strong>{COMPANY_INFO.legalName}</strong> (&ldquo;SAURIK IT&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy and digital personal data. This Privacy Policy outlines how we collect, process, store, and safeguard personal information across our website (<a href="https://www.saurikit.in" className="text-accent-teal hover:underline">https://www.saurikit.in</a>), our software applications (Saurik Track, Arthos Invoice Studio), and our multi-tenant <strong>Saurik AI Chatbot</strong> platform.
          </p>
        </section>

        {/* Section 1: DPDP Roles */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">1. Our Roles Under the DPDP Act 2023 &amp; Rules 2025</h2>
          <p>Under Indian data protection jurisprudence, our legal role depends on how you interact with us:</p>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li>
              <strong>When you browse saurikit.in or submit an enquiry:</strong> SAURIK IT acts as the <strong>Data Fiduciary</strong>. We determine the purpose and means of collecting your contact information and requirement specifications.
            </li>
            <li>
              <strong>When you chat with a Saurik AI Chatbot embedded on a client&rsquo;s third-party website:</strong> The client whose website you are visiting is the <strong>Data Fiduciary</strong>. SAURIK IT acts strictly as a <strong>Data Processor</strong>, processing your conversation queries and lead details solely upon the instructions of that business.
            </li>
          </ul>
        </section>

        {/* Section 2: Data Collected */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">2. Personal Data We Collect &amp; Process</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li><strong>Direct Website Inquiries:</strong> Full name, email address, mobile phone number, company name (optional for residential CCTV), service topic, and requirement notes submitted via our contact forms.</li>
            <li><strong>Saurik AI Chatbot Conversations:</strong> Visitor query transcripts, browser session tokens, device viewport metadata, and voluntary lead submissions (name, phone, specific requirement) with recorded consent timestamps.</li>
            <li><strong>Client Account &amp; Billing Data:</strong> Registered business name, legal entity address, GSTIN, primary contact details, and payment transaction references generated via Razorpay. (SAURIK IT never stores credit card or debit card numbers on its servers).</li>
            <li><strong>Technical &amp; Telemetry Data:</strong> IP addresses (anonymized for rate-limiting), HTTP referrer origins (for embed authorization), and error telemetry.</li>
          </ul>
        </section>

        {/* Section 3: Grounded AI & Sub-Processors */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">3. AI Processing, Grounding &amp; Sub-Processors</h2>
          <p>We maintain strict security safeguards regarding how artificial intelligence interacts with data:</p>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li><strong>Zero Training on Customer Data:</strong> Customer documents, conversation transcripts, and lead details are <em>never</em> used to train or fine-tune public foundation models (OpenAI, Anthropic, or open-source weights). Queries are processed via commercial API endpoints with zero-retention commitments.</li>
            <li><strong>Strict Retrieval Bounds:</strong> The chatbot answers exclusively from client-approved documents, price lists, and web pages stored in tenant-isolated PostgreSQL <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">pgvector</code> tables.</li>
            <li><strong>Authorized Sub-Processors:</strong> Indian cloud hosting providers (Mumbai region), PostgreSQL database infrastructure, and Razorpay (PCI-DSS compliant payment processing).</li>
          </ul>
        </section>

        {/* Section 4: Multi-Tenant Isolation */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">4. Row-Level Security &amp; Tenant Isolation</h2>
          <p>
            To prevent cross-tenant leakage, our database architecture implements PostgreSQL <strong>Row-Level Security (RLS)</strong>. Every document vector, chat message, and lead inquiry is tied to a cryptographically validated <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">tenant_id</code> session variable. One business&rsquo;s chatbot cannot search, access, or retrieve another business&rsquo;s data under any condition.
          </p>
        </section>

        {/* Section 5: Retention */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">5. Data Retention &amp; Erasure Schedules</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li><strong>Chatbot Message Transcripts:</strong> Retained for a default period of ninety (90) days for quality assurance and debugging, after which automated purge jobs remove the records.</li>
            <li><strong>Captured Leads:</strong> Stored securely in the client&rsquo;s tenant account until the business exports or deletes them, or upon subscription termination.</li>
            <li><strong>Tax &amp; Accounting Records:</strong> Invoices, payment receipts, and GST ledgers are retained for the statutory period mandated by the Central Goods and Services Tax (CGST) Act.</li>
          </ul>
        </section>

        {/* Section 6: Data Principal Rights */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">6. Rights of Data Principals (Under DPDP Act 2023)</h2>
          <p>As an individual whose personal data is processed by SAURIK IT, you have the right to:</p>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li><strong>Right to Access:</strong> Request a summary of your personal data processed by us and the identities of any data fiduciaries/processors with whom it has been shared.</li>
            <li><strong>Right to Correction &amp; Erasure:</strong> Request the correction of inaccurate data or the permanent deletion of personal data no longer necessary for the specified purpose.</li>
            <li><strong>Right of Grievance Redressal:</strong> Register complaints with our designated Grievance Officer regarding the processing of your data.</li>
            <li><strong>Right to Nominate:</strong> Designate an individual to exercise your data rights in the event of death or incapacity.</li>
          </ul>
        </section>

        {/* Section 7: Grievance Officer */}
        <section className="space-y-3 border-t border-border-subtle pt-6">
          <h2 className="font-heading text-xl font-bold text-ink-primary">7. Data Protection Officer &amp; Grievance Redressal</h2>
          <p>
            In accordance with Rule 11 of the DPDP Rules 2025, you may submit any inquiry, access request, or privacy grievance to our named Grievance Redressal Officer:
          </p>
          <div className="space-y-1.5 rounded-control border border-border-subtle bg-canvas p-4 text-sm font-medium text-ink-primary">
            <div><strong>Grievance Redressal Officer:</strong> Saurav Debnath</div>
            <div><strong>Entity:</strong> {COMPANY_INFO.legalName}</div>
            <div><strong>Registered Address:</strong> Agartala, Tripura 799001, India</div>
            <div><strong>Email:</strong> <a href={`mailto:${COMPANY_INFO.email}`} className="text-accent-teal hover:underline">{COMPANY_INFO.email}</a> (Subject: &ldquo;Attn: DPDP Grievance Officer&rdquo;)</div>
            <div><strong>Response SLA:</strong> Inquiries acknowledged within 48 hours; resolution completed within 30 days as prescribed by law.</div>
          </div>
        </section>

        {/* Section 8: B2B Data Processing Agreement */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">8. Data Processing Agreement (DPA) for B2B Clients</h2>
          <p>
            Businesses deploying the Saurik AI Chatbot on their public websites may execute our standard <strong>Data Processing Agreement (DPA)</strong>, governing data transfer bounds, breach notification covenants (within 72 hours), and post-termination erasure guarantees. Contact our legal desk at <a href={`mailto:${COMPANY_INFO.email}`} className="text-accent-teal hover:underline">{COMPANY_INFO.email}</a> to request the execution-ready DPA.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, FileText, CheckCircle2, AlertTriangle, Scale, Building2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

const Terms = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-4">
        <Link to="/" className="mb-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent-teal hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Return to Home</span>
        </Link>

        <div className="badge-software">
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Terms of Service</span>
        </div>

        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ink-primary sm:text-4xl">
          Terms of Service &amp; Business Terms
        </h1>

        <p className="text-sm text-ink-secondary">
          Effective Date: 02 October 2026 • Governed under the laws of Tripura, India
        </p>
      </div>

      <div className="content-card space-y-9 text-sm leading-relaxed text-ink-secondary sm:text-base">
        {/* Intro */}
        <section className="space-y-3">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;Customer&rdquo;, &ldquo;Client&rdquo;, or &ldquo;User&rdquo;) and <strong>{COMPANY_INFO.legalName}</strong> (&ldquo;SAURIK IT&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), having its registered office in Agartala, Tripura, India.
          </p>
          <p>
            By accessing our website (<a href="https://www.saurikit.in" className="text-accent-teal hover:underline">https://www.saurikit.in</a>), using our flagship software (Saurik Track, Arthos Invoice Studio), subscribing to the Saurik AI Chatbot platform, or purchasing IT hardware and custom development services, you agree to comply with and be bound by these Terms.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">1. Services &amp; Product Offerings</h2>
          <p>SAURIK IT provides technology solutions shaped around verified operational requirements:</p>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li><strong>Saurik AI Chatbot:</strong> Multi-tenant, grounded AI assistant platforms and embeddable website widgets (<a href="/ai-chatbot" className="text-accent-teal hover:underline">/ai-chatbot</a>) providing automated lead capture, verified source citations, and human WhatsApp handoffs.</li>
            <li><strong>Saurik Track:</strong> Field-team GPS attendance, van-stock inventory tracking, and dispatch coordination software (<a href="/track/" className="text-accent-teal hover:underline">/track/</a>).</li>
            <li><strong>Arthos Invoice Studio:</strong> Clean GST invoice generation and billing ledger software (<a href="/arthos/" className="text-accent-teal hover:underline">/arthos/</a>).</li>
            <li><strong>Digital IT &amp; Engineering Services:</strong> Custom web and mobile application development, website design, and data analytics.</li>
            <li><strong>IT Hardware Sales &amp; Installation:</strong> Commercial and residential CCTV surveillance systems, server supply, workstation deployment, and structured networking.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">2. Saurik AI Chatbot Specific Terms</h2>
          <p>For customers subscribing to or deploying the Saurik AI Chatbot platform:</p>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li><strong>Origin Authorization:</strong> Client chatbots may only be embedded on domain origins explicitly registered and authorized in the customer&rsquo;s tenant account.</li>
            <li><strong>Acceptable Use:</strong> Clients must not upload, crawl, or instruct the assistant to process unlawful, defamatory, infringing, or harmful material. Reverse engineering vector embeddings or attempting prompt injection attacks against multi-tenant infrastructure is strictly prohibited.</li>
            <li><strong>Usage Limits &amp; Caps:</strong> Each subscription tier includes defined monthly conversation, crawled page, and document caps. When a client reaches 100% of their conversation quota, the widget gracefully falls back to a human WhatsApp handoff without incurring unbounded overage fees.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">3. AI Grounding &amp; Accuracy Disclaimer</h2>
          <div className="rounded-control border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700" />
              <span>Grounded Knowledge Bounds &amp; Human Review Requirement</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-amber-900">
              Saurik AI Chatbot operates on strict Retrieval-Augmented Generation (RAG) bounds, pulling answers exclusively from the documents, price sheets, FAQs, and web pages approved by the client. However, Large Language Models are probabilistic systems. Clients must review and maintain the accuracy of their underlying source material. SAURIK IT does not warrant that AI-generated responses will be 100% error-free in all hypothetical scenarios. Consequential decisions (such as medical diagnosis, legal advice, or contractual commitments) must be reviewed by qualified human personnel.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">4. Multi-Tenant Data Isolation &amp; Security</h2>
          <p>
            We implement strict database Row-Level Security (RLS) on PostgreSQL with <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">pgvector</code>. Every chunk, conversation, and lead is cryptographically isolated by tenant identifier. No client&rsquo;s documents or inquiries are ever exposed to, cross-retrieved by, or used to fine-tune third-party models.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">5. Subscriptions, Invoicing &amp; GST</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li><strong>Goods and Services Tax (GST):</strong> All advertised prices are exclusive of 18% GST. For customers located in Tripura, 9% CGST + 9% SGST applies. For customers located in other Indian states, 18% IGST applies. Valid GSTIN numbers must be provided at onboarding to claim input tax credit.</li>
            <li><strong>Billing Cycle:</strong> Recurring SaaS subscriptions are billed on a monthly or annual basis. Subscriptions renew automatically unless cancelled prior to the renewal date.</li>
            <li><strong>Done-for-You Setup Fees:</strong> One-time onboarding fees cover source gathering, PDF/document layout sanitization, semantic chunking, custom embeddings generation, and verified script integration.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">6. Intellectual Property</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li><strong>Client Ownership:</strong> The client retains all right, title, and intellectual property ownership in their uploaded source documents, customer leads, and business records.</li>
            <li><strong>SAURIK IT Ownership:</strong> SAURIK IT retains all ownership rights in the platform software, RAG engine, embeddable widget code, database architecture, algorithms, and documentation.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable Indian law, SAURIK IT Private Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business interruption. In no event shall our total aggregate liability arising out of or related to these Terms exceed the total amounts paid by the client in the three (3) months preceding the incident.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">8. Governing Law &amp; Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any legal dispute, controversy, or claim arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>Agartala, Tripura, India</strong>.
          </p>
        </section>

        {/* Contact block */}
        <section className="space-y-3 border-t border-border-subtle pt-6">
          <h2 className="font-heading text-xl font-bold text-ink-primary">9. Contact &amp; Legal Notices</h2>
          <p>For any questions or legal inquiries regarding these Terms, contact our legal desk:</p>
          <div className="space-y-1 rounded-control border border-border-subtle bg-canvas p-4 text-sm font-medium text-ink-primary">
            <div><strong>{COMPANY_INFO.legalName}</strong></div>
            <div>Registered Address: Agartala, Tripura 799001, India</div>
            <div>Email: <a href={`mailto:${COMPANY_INFO.email}`} className="text-accent-teal hover:underline">{COMPANY_INFO.email}</a></div>
            <div>Phone: {COMPANY_INFO.phoneDisplay}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terms;

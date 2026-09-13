import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

const Privacy = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <Link to="/contact" className="mb-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent-teal hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Return to Contact</span>
        </Link>

        <div className="badge-software">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Enquiry information</span>
        </div>

        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ink-primary sm:text-4xl">
          How this website handles enquiry information
        </h1>

        <p className="text-sm text-ink-secondary">Last updated: 13 September 2026</p>
      </div>

      <div className="content-card space-y-9 text-sm leading-relaxed text-ink-secondary sm:text-base">
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">1. What the website does</h2>
          <p>
            This website does not send the contact form to a SAURIK IT server or store a submitted enquiry in a website database. The form prepares a message for an external app that you choose.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm">
            <li>The email option opens a draft addressed to {COMPANY_INFO.email} in your email application.</li>
            <li>The WhatsApp option opens WhatsApp with a message assembled from the form.</li>
            <li>You must review and send the message in that external app. Opening a draft does not confirm receipt.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">2. Information you may include</h2>
          <p>The prepared message can include the information you enter, such as:</p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm">
            <li>Name and email address</li>
            <li>Phone number, company name, service topic, and timeframe when provided</li>
            <li>Project, hardware, installation, service, or premises details written in the requirement field</li>
          </ul>
          <p>
            Company name is optional, including for residential CCTV enquiries. Avoid entering passwords, payment details, identity documents, or other sensitive information in the initial enquiry.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">3. External email and WhatsApp services</h2>
          <p>
            When you choose an email or WhatsApp handoff, the information moves to the selected external application. Its provider may process message content, account information, and technical data under its own terms and privacy policy. Review those terms before sending.
          </p>
          <p className="flex items-start gap-2 rounded-control border border-border-subtle bg-canvas p-4 text-sm text-ink-primary">
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-accent-teal" aria-hidden="true" />
            The website cannot confirm that an external app opened successfully or that SAURIK IT received the message.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-ink-primary">4. Retention, confidentiality, and project terms</h2>
          <p>
            Retention, deletion, confidentiality, intellectual-property ownership, access, and security obligations are not established by this page. Ask for the terms relevant to your enquiry or project to be recorded in the accepted quotation, contract, or other written agreement before sharing confidential material.
          </p>
        </section>

        <section className="space-y-3 border-t border-border-subtle pt-6">
          <h2 className="font-heading text-xl font-bold text-ink-primary">5. Questions about enquiry information</h2>
          <p>Use one of the verified contact destinations below to ask how a specific enquiry would be handled:</p>
          <div className="space-y-1 rounded-control border border-border-subtle bg-canvas p-4 text-sm font-medium text-ink-primary">
            <div><strong>{COMPANY_INFO.name}</strong></div>
            <div>Email: <a href={`mailto:${COMPANY_INFO.email}`} className="text-accent-teal hover:underline">{COMPANY_INFO.email}</a></div>
            <div>Phone / WhatsApp: {COMPANY_INFO.phoneDisplay}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Privacy;

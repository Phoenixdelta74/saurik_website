import React from 'react';
import { Link } from 'react-router-dom';
import './Arthos.css';

const Arthos = () => {
  return (
    <div className="arthos-page">

  <a href="#main-content" className="skip-link">Skip to main content</a>

  {/* Navigation */}
  <nav id="site-nav" aria-label="Main Navigation">
    <div className="nav-corporate-tier">
      <div className="container nav-corporate-inner">
        <Link to="/" className="nav-corporate-brand">
          <span>SAURIK IT</span>
          <span style={{ color: "var(--ink-muted)", fontWeight: "normal" }}>/ Corporate Services</span>
        </Link>
        <ul className="nav-corporate-links">
          <li><Link to="/software">Software & IT</Link></li>
          <li><Link to="/hardware">Hardware & IT</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </div>

    <div className="nav-product-tier">
      <div className="container nav-product-inner">
        <a href="#hero" className="nav-brand-group">
          <img src="/arthos/logo.png" alt="Arthos" width="32" height="32" className="nav-brand-logo" />
          <span className="nav-product-title">Arthos</span>
          <span className="nav-brand-parent">by SAURIK IT</span>
        </a>

        <ul className="nav-product-links">
          <li><a href="#editions">How it runs</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#workflow">How it works</a></li>
          <li><a href="#trial-and-pricing">Trial</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>

        <div className="nav-cta-wrap">
            <Link to="/contact?topic=arthos_early_access" className="btn-primary" data-launch-cta data-conversion="early-access" data-placement="nav">Request early access</Link>
        </div>
      </div>
    </div>
  </nav>

  <main id="main-content">
    {/* Hero */}
    <section id="hero" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Arthos Invoice Studio</span>
            <h1 id="hero-heading">GST-aware invoicing. Clear collections. A better view of your business.</h1>
            <p className="hero-subhead">Create invoices, track payments, preserve pricing history, and understand business performance with Arthos Invoice Studio—built for small Indian service and trading businesses.</p>
            <p className="hero-edition-line">Arthos runs in Chrome or Edge on your Windows computer. Your invoices and business records stay in that browser on your computer, not on our servers.</p>
            <p className="hero-trial-line">Try every feature free for 30 days. After the trial you can still view, print, and export your records; creating new ones needs a paid licence.</p>
            <div className="hero-cta-group">
              <Link to="/contact?topic=arthos_early_access" className="btn-primary" data-launch-cta data-conversion="early-access" data-placement="hero">Request early access</Link>
              <a href="#editions" className="btn-secondary">How Arthos runs</a>
            </div>
            <p className="micro-text mono-label">30-day free trial planned for launch</p>
          </div>

          <div className="hero-visual dashboard-card" aria-label="Business Health illustrative preview with sample figures">
            <span className="dashboard-badge">Illustrative preview · Sample figures</span>
            <div className="dashboard-header">
              <span className="dashboard-period">Business Health — This month</span>
            </div>
            <div className="dashboard-figures">
              <div className="dashboard-figure">
                <span className="dashboard-figure-label">Sales</span>
                <span className="dashboard-figure-value">₹8,42,500</span>
              </div>
              <div className="dashboard-figure">
                <span className="dashboard-figure-label">Receivables</span>
                <span className="dashboard-figure-value">₹1,17,200</span>
              </div>
              <div className="dashboard-figure">
                <span className="dashboard-figure-label">Estimated gross profit</span>
                <span className="dashboard-figure-value positive">₹2,63,880</span>
              </div>
              <div className="dashboard-figure">
                <span className="dashboard-figure-label">Overdue</span>
                <span className="dashboard-figure-value warning">₹42,000</span>
              </div>
            </div>
            <div className="dashboard-tags">
              <span className="dashboard-tag">Sales trend</span>
              <span className="dashboard-tag">Category mix</span>
              <span className="dashboard-tag">Product margins</span>
              <span className="dashboard-tag">Overdue queue</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Editions */}
    <section id="editions" aria-labelledby="editions-heading">
      <div className="container">
        <div className="section-intro">
          <h2 id="editions-heading">How Arthos runs</h2>
          <p>Arthos is a web app you open in your browser. Your sign-in and licence are handled online; your business records stay on your computer.</p>
        </div>
        <div className="editions-grid">
          <article className="edition-card desktop">
            <span className="edition-tag">Arthos · at launch</span>
            <h3>In your browser, on your computer</h3>
            <ul className="edition-list">
              <li>Opens in current Chrome or Edge on Windows</li>
              <li>Sign in with a one-time code sent to your email</li>
              <li>Invoices and business records stay in that browser on your computer</li>
              <li>Keeps working offline once signed in, until your licence end date</li>
              <li>You export and restore your own backup files</li>
            </ul>
          </article>
          <article className="edition-card cloud">
            <span className="edition-tag">Arthos Cloud · planned</span>
            <h3>Cloud storage and multi-device access</h3>
            <ul className="edition-list">
              <li>Records stored on our servers instead of in one browser</li>
              <li>Access from more than one device</li>
              <li>Not available yet; we will announce it when it is ready</li>
            </ul>
          </article>
        </div>
        <p className="edition-note">Records on different computers do not synchronise. To move your records to another computer, export a backup and restore it there.</p>
      </div>
    </section>

    {/* Problems */}
    <section id="problems" aria-labelledby="problems-heading">
      <div className="container">
        <div className="problems-grid">
          <div className="problems-intro">
            <h2 id="problems-heading">Bring the work around every invoice into one clear process</h2>
          </div>
          <ol className="problem-list">
            <li>
              <span className="problem-eyebrow">01</span>
              <h3>Repeated entry slows billing down</h3>
              <p>Repeated entry makes billing slower and less consistent.</p>
            </li>
            <li>
              <span className="problem-eyebrow">02</span>
              <h3>Partial payments are hard to follow</h3>
              <p>Partial payments and overdue follow-ups are difficult to track.</p>
            </li>
            <li>
              <span className="problem-eyebrow">03</span>
              <h3>Price history gets lost</h3>
              <p>Price changes lose the history needed to explain older invoices.</p>
            </li>
            <li>
              <span className="problem-eyebrow">04</span>
              <h3>Reporting is rebuilt by hand</h3>
              <p>Business reporting is repeatedly rebuilt in spreadsheets.</p>
            </li>
            <li>
              <span className="problem-eyebrow">05</span>
              <h3>Records need to stay under your control</h3>
              <p>Business records should stay with the business, with backups the owner can make and restore.</p>
            </li>
          </ol>
        </div>
      </div>
    </section>

    {/* Features */}
    <section id="features" aria-labelledby="features-heading">
      <div className="container">
        <div className="section-header">
          <h2 id="features-heading">From billing to business visibility</h2>
        </div>
        <div className="features-grid">
          <article className="feature-card">
            <span className="eyebrow">Documents</span>
            <h3>GST-aware documents</h3>
            <p>Tax invoices, retail invoices, quotations, proformas, and delivery challans with customer details, line items, discounts, shipping, due dates, and GST calculations.</p>
          </article>
          <article className="feature-card">
            <span className="eyebrow">Entry</span>
            <h3>Fast item entry</h3>
            <p>A spreadsheet-style item grid with keyboard navigation, paste, insert, duplicate, delete, undo, redo, and live calculations.</p>
          </article>
          <article className="feature-card">
            <span className="eyebrow">Collections</span>
            <h3>Collections and receivables</h3>
            <p>Track paid and pending amounts, partial payments, due dates, overdue balances, bank CSV reconciliation, and follow-up drafts.</p>
          </article>
          <article className="feature-card">
            <span className="eyebrow">Pricing</span>
            <h3>Pricing history and control</h3>
            <p>Maintain stable product identities, effective-dated price history, audit events, and invoice-time snapshots so historical documents retain their context.</p>
          </article>
          <article className="feature-card">
            <span className="eyebrow">Insights</span>
            <h3>Business Health</h3>
            <p>Review filtered sales, receivables, category contribution, product margins, and estimated profit based on the invoices, costs, payments, and expenses recorded in Arthos, with drill-through to the underlying invoices and PDF, Excel, and CSV exports.</p>
          </article>
        </div>
      </div>
    </section>

    {/* Workflow */}
    <section id="workflow" aria-labelledby="workflow-heading">
      <div className="container">
        <h2 id="workflow-heading">How work moves through Arthos</h2>
        <ol className="workflow-list">
          <li className="workflow-step">
            <span className="workflow-num">1</span>
            <h3>Prepare the document</h3>
            <p>Select the customer, add items, apply GST and other charges, and review the totals.</p>
          </li>
          <li className="workflow-step">
            <span className="workflow-num">2</span>
            <h3>Deliver it</h3>
            <p>Print it, create a PDF, include a UPI QR, or use a supported email workflow.</p>
          </li>
          <li className="workflow-step">
            <span className="workflow-num">3</span>
            <h3>Track collection</h3>
            <p>Record payments, follow partial balances, and review overdue invoices.</p>
          </li>
          <li className="workflow-step">
            <span className="workflow-num">4</span>
            <h3>Understand the business</h3>
            <p>Review sales, receivables, margins, categories, and estimated profitability from the data entered.</p>
          </li>
          <li className="workflow-step">
            <span className="workflow-num">5</span>
            <h3>Export and protect records</h3>
            <p>Prepare accountant exports, including Tally import files, and export a backup of your records.</p>
          </li>
        </ol>
      </div>
    </section>

    {/* Data and backups */}
    <section id="data-and-backups" aria-labelledby="data-heading">
      <div className="container">
        <h2 id="data-heading">Where your records live</h2>
        <div className="data-grid">
          <div className="data-card">
            <h3>On your computer</h3>
            <p>Invoices, customers, products, payments, and expenses are stored in the browser on the computer where you use Arthos. You are responsible for exporting backups and storing copies safely. A backup does not restore activity created after it was made, and clearing the browser's site data removes the records on that computer.</p>
          </div>
          <div className="data-card">
            <h3>With your Arthos account</h3>
            <p>Your sign-in email, business name, optional GSTIN, and licence status are stored with SAURIK IT so you can sign in and keep your licence. Your invoices and business records are not uploaded.</p>
          </div>
        </div>
        <p className="data-disclosure">Backup files contain your business records but not passwords or sign-in details. When you export a file or send a document by email, the information you select is shared through that service.</p>
      </div>
    </section>

    {/* Trial and pricing */}
    <section id="trial-and-pricing" aria-labelledby="trial-heading">
      <div className="container">
        <div className="trial-inner">
          <span className="trial-status mono-label">30-day free trial planned for launch</span>
          <h2 id="trial-heading">Try Arthos free for 30 days</h2>
          <p>Every feature, including Business Health, is included during the 30-day trial. When the trial ends, Arthos becomes read-only: you can still open, print, and export your records and restore a backup, but creating or editing records needs a paid licence.</p>
          <p>Pricing is being finalised ahead of launch. For a live demo or to discuss current pricing and availability, contact our team directly and we'll get back to you.</p>
          <div className="trial-cta-group">
            <Link to="/contact?topic=arthos_early_access" className="btn-primary" data-launch-cta data-conversion="early-access" data-placement="trial">Request early access</Link>
            <a href="mailto:contact@saurikit.in" className="btn-secondary">Email us for a demo</a>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section id="faq" aria-labelledby="faq-heading">
      <div className="container">
        <h2 id="faq-heading">Common questions</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary><span>Which edition of Arthos is available?</span><span className="toggle" aria-hidden="true"></span></summary>
            <div className="faq-answer"><p>At launch, Arthos runs in current Chrome or Edge on Windows, with your records kept in that browser on your computer. A separate Arthos Cloud edition, with records stored on our servers and access from several devices, is planned but not available yet.</p></div>
          </details>
          <details className="faq-item">
            <summary><span>Does Arthos need an internet connection?</span><span className="toggle" aria-hidden="true"></span></summary>
            <div className="faq-answer"><p>You need internet to sign in with the code sent to your email and to refresh your licence from time to time. Once signed in, Arthos keeps working offline until your licence end date. Sending invoices through Gmail also needs internet.</p></div>
          </details>
          <details className="faq-item">
            <summary><span>Can I use Arthos on another computer?</span><span className="toggle" aria-hidden="true"></span></summary>
            <div className="faq-answer"><p>Yes. Sign in on that computer and restore a backup there. Records do not synchronise between computers, so each computer keeps its own copy from the point of restore.</p></div>
          </details>
          <details className="faq-item">
            <summary><span>Where are my records and backups stored?</span><span className="toggle" aria-hidden="true"></span></summary>
            <div className="faq-answer"><p>Invoices and business records are stored in the browser on your computer, and you are responsible for exporting backups. Your sign-in email, business name, optional GSTIN, and licence status are stored with SAURIK IT. Backup files do not include passwords or sign-in details.</p></div>
          </details>
          <details className="faq-item">
            <summary><span>What happens when the 30-day trial ends?</span><span className="toggle" aria-hidden="true"></span></summary>
            <div className="faq-answer"><p>Arthos becomes read-only. You can still open every screen, print, export, and restore a backup, so your records stay available. Creating or editing invoices and other records needs a paid licence. Pricing will be published before launch. In the meantime, <a href="mailto:contact@saurikit.in">contact us</a> for a live demo or to discuss current pricing and availability.</p></div>
          </details>
          <details className="faq-item">
            <summary><span>Does Arthos file GST returns?</span><span className="toggle" aria-hidden="true"></span></summary>
            <div className="faq-answer"><p>Arthos supports GST-aware documents and selected accounting exports. It does not directly file GSTR-1, GSTR-3B, or other GST returns unless that capability is explicitly introduced and verified in the product.</p></div>
          </details>
          <details className="faq-item">
            <summary><span>Will I be able to move to Arthos Cloud later?</span><span className="toggle" aria-hidden="true"></span></summary>
            <div className="faq-answer"><p>Arthos Cloud is planned but not available yet. Any move to it will be a migration from a backup that you review and confirm. Automatic migration or synchronisation is not currently offered.</p></div>
          </details>
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section id="final-cta" aria-labelledby="final-cta-heading">
      <div className="container cta-grid">
        <div className="cta-content">
          <h2 id="final-cta-heading">See how Arthos can fit the way your business works</h2>
          <p>Arthos runs in the browser you already use and keeps your records on your own computer. A 30-day free trial with every feature will be available at launch. Want a live demo or to discuss pricing first? Contact us — we're happy to walk you through it.</p>
        </div>
        <div className="cta-action">
          <Link to="/contact?topic=arthos_early_access" className="btn-white" data-launch-cta data-conversion="early-access" data-placement="final-cta">Request early access</Link>
          <a href="tel:+919862087157" className="btn-white" data-conversion="call" data-placement="final-cta">Call +91 98620 87157</a>
        </div>
      </div>
    </section>
  </main>

  {/* Footer */}
  <footer id="site-footer" aria-label="Site Footer">
    <div className="container footer-inner">
      <div className="footer-main-row">
        <div className="footer-brand-wrap">
          <a href="#hero" className="footer-brand footer-brand-group">
            <img src="/arthos/logo.png" alt="" width="28" height="28" />
            <span>Arthos Invoice Studio</span>
          </a>
          <span className="footer-relationship">A Saurik IT product</span>
        </div>
        <ul className="footer-links">
          <li><a href="#editions">How it runs</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#workflow">How it works</a></li>
          <li><a href="#trial-and-pricing">Trial</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><Link to="/">Visit SAURIK IT</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms</Link></li>
        </ul>
        <div className="footer-contact-wrap">
          <a href="mailto:contact@saurikit.in" className="footer-contact">contact@saurikit.in</a>
          <a href="tel:+919862087157" className="footer-contact">+91 98620 87157</a>
        </div>
      </div>
      <div className="footer-copy">
        <p>© 2026 SAURIK IT Private Limited. All rights reserved.</p>
      </div>
    </div>
  </footer>

    </div>
  );
};

export default Arthos;

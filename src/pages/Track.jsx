import React from 'react';
import { Link } from 'react-router-dom';
import './Track.css';

const Track = () => {
  return (
    <div className="track-page">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* 1. Sticky Navigation (Two-Tier) */}
      <nav id="site-nav" aria-label="Main Navigation">
        {/* Corporate Tier */}
        <div className="nav-corporate-tier">
          <div className="container nav-corporate-inner">
            <Link to="/" className="nav-corporate-brand">
              <span>SAURIK IT</span>
              <span style={{ color: 'var(--slate)', fontWeight: 'normal' }}>/ Corporate Services</span>
            </Link>
            <ul className="nav-corporate-links">
              <li><Link to="/software">Software &amp; AI</Link></li>
              <li><Link to="/hardware">Hardware &amp; Infrastructure</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Product Subnav Tier */}
        <div className="nav-product-tier">
          <div className="container nav-product-inner">
            <a href="#hero" className="nav-brand-group">
              <span className="nav-product-title">Saurik Track</span>
              <span className="nav-brand-parent">by SAURIK IT</span>
            </a>

            <ul className="nav-product-links">
              <li><a href="#features">Product</a></li>
              <li><a href="#how-it-works">How it works</a></li>
              <li><a href="#industries">Industries</a></li>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>

            <div className="nav-cta-wrap">
              <Link to="/contact?topic=saurik_track" className="btn-primary" data-conversion="trial-start" data-placement="nav">Start free trial</Link>
            </div>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* 2. Hero Section */}
        <section id="hero" aria-labelledby="hero-heading">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-copy">
                <h1 id="hero-heading">Know where your field team is. Know what's left in the van.</h1>
                <p className="hero-subhead">A privacy-transparent field-work platform for sales, distribution, and service teams. GPS attendance, structured visits, and live van-stock—with an audit trail your reps can see and corrections they can request.</p>
                <div className="hero-cta-group">
                  <Link to="/contact?topic=saurik_track" className="btn-primary" data-conversion="trial-start" data-placement="hero">Start free 30-day trial</Link>
                  <span className="micro-text">No credit card required</span>
                </div>
              </div>

              <div className="hero-visual" aria-label="Shift manifest example">
                <div className="manifest-card">
                  <span className="manifest-label-badge">Illustrative shift example</span>
                  <div className="manifest-header">
                    <span className="manifest-agent">Rahul Sharma — North Zone</span>
                    <span className="manifest-date">Today</span>
                  </div>
                  <ol className="manifest-checkpoints">
                    <li className="checkpoint-row">
                      <div className="dot-col" aria-hidden="true">
                        <span className="status-dot moss"></span>
                      </div>
                      <div className="checkpoint-content">
                        <div className="checkpoint-title-row">
                          <strong className="checkpoint-title">Checked in</strong>
                          <span className="checkpoint-time">· 9:04 AM</span>
                        </div>
                        <div className="checkpoint-details">
                          <span>Location captured · reported accuracy 8 m</span>
                        </div>
                      </div>
                    </li>
                    <li className="checkpoint-row">
                      <div className="dot-col" aria-hidden="true">
                        <span className="status-dot navy"></span>
                      </div>
                      <div className="checkpoint-content">
                        <div className="checkpoint-title-row">
                          <strong className="checkpoint-title">Visit logged — Apex Healthcare</strong>
                          <span className="checkpoint-time">· 10:22 AM</span>
                        </div>
                        <div className="checkpoint-details">
                          <span>Order taken · ₹1,250.00</span>
                          <span className="tag-stock">Van stock auto-adjusted</span>
                        </div>
                      </div>
                    </li>
                    <li className="checkpoint-row">
                      <div className="dot-col" aria-hidden="true">
                        <span className="status-dot amber"></span>
                      </div>
                      <div className="checkpoint-content">
                        <div className="checkpoint-title-row">
                          <strong className="checkpoint-title">Session paused — Lunch break</strong>
                          <span className="checkpoint-time">· 1:00 PM</span>
                        </div>
                        <div className="checkpoint-details">
                          <span>Tracking suspended until resume</span>
                        </div>
                      </div>
                    </li>
                    <li className="checkpoint-row">
                      <div className="dot-col" aria-hidden="true">
                        <span className="status-dot moss"></span>
                      </div>
                      <div className="checkpoint-content">
                        <div className="checkpoint-title-row">
                          <strong className="checkpoint-title">Checked out</strong>
                          <span className="checkpoint-time">· 6:02 PM</span>
                        </div>
                        <div className="checkpoint-details">
                          <span>7h 58m logged · 4 visits · 1 order</span>
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Problem Section */}
        <section id="problem" aria-labelledby="problem-heading">
          <div className="container">
            <div className="problem-grid">
              <div className="problem-intro">
                <h2 id="problem-heading">Field work should not depend on group chats and guesswork.</h2>
              </div>
              <ol className="problem-list">
                <li className="problem-item">
                  <span className="problem-eyebrow">01</span>
                  <h3>Nobody knows who's active or stuck</h3>
                  <p>Reps report in when it's convenient, not when a manager needs an update.</p>
                </li>
                <li className="problem-item">
                  <span className="problem-eyebrow">02</span>
                  <h3>Attendance disputes have no shared evidence</h3>
                  <p>&ldquo;I was there&rdquo; and &ldquo;the sheet says otherwise&rdquo; leave both sides without a fair way to settle the record.</p>
                </li>
                <li className="problem-item">
                  <span className="problem-eyebrow">03</span>
                  <h3>Van stock and warehouse counts drift apart</h3>
                  <p>Orders get booked in the field faster than paper records can be reconciled.</p>
                </li>
                <li className="problem-item">
                  <span className="problem-eyebrow">04</span>
                  <h3>Weekly reports consume someone's evening</h3>
                  <p>Attendance, visits, and orders should not require hours of manual spreadsheet work.</p>
                </li>
                <li className="problem-item">
                  <span className="problem-eyebrow">05</span>
                  <h3>Opaque tracking damages trust</h3>
                  <p>When employees cannot see when tracking starts, stops, or how records are corrected, adoption suffers.</p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* 4. Features Section (2x2 Grid) */}
        <section id="features" aria-labelledby="features-heading">
          <div className="container">
            <div className="features-header">
              <h2 id="features-heading">Four things a field team actually needs</h2>
              <p>Attendance shows who's working. Inventory shows what is moving. The audit trail helps settle what happened. Reports show where the week went. Saurik Track brings all four into one platform.</p>
            </div>
            <div className="features-grid-2x2">
              {/* Feature 1 */}
              <article className="feature-card">
                <span className="feature-eyebrow mono-label">GPS attendance and field visibility</span>
                <h3>See the field, not just a spreadsheet of it</h3>
                <p className="feature-body">Reps check in with a captured location and remain visible on a live map during an active shift. Tracking has clear start, pause, resume, and stop states, with nothing recorded outside the defined work session.</p>
                <ul className="feature-bullets">
                  <li>Live map of on-duty representatives, including pause and travel status</li>
                  <li>Structured visit outcomes: order taken, follow-up, or no sale</li>
                  <li>Exceptions queue for missed checkouts and stale locations</li>
                  <li>Native background location support on Android and iOS</li>
                  <li>Android foreground service and platform-appropriate permission disclosures</li>
                </ul>
              </article>

              {/* Feature 2 */}
              <article className="feature-card">
                <span className="feature-eyebrow mono-label">Inventory and van-stock tracking</span>
                <h3>Stock that updates when an order closes</h3>
                <p className="feature-body">Each van operates as a mobile extension of the warehouse. When a representative books an order, the stock ledger moves with it—without a second reconciliation entry.</p>
                <ul className="feature-bullets">
                  <li>Industry templates for FMCG, pharma, electronics, and apparel</li>
                  <li>Price and stock revision history with a reason attached to every change</li>
                  <li>Warehouse-to-van transfer manifests tracked by vehicle</li>
                  <li>Keyboard entry, spreadsheet paste, and barcode-scanner support</li>
                  <li>Responsive handling of large product catalogues</li>
                </ul>
              </article>

              {/* Feature 3 */}
              <article className="feature-card">
                <span className="feature-eyebrow mono-label">Audit trail and corrections</span>
                <h3>Attendance your team can dispute—and settle</h3>
                <p className="feature-body">Check-ins, visits, pauses, and checkouts create append-only business events. When a representative needs to correct a mistake, they provide a reason and an administrator records the decision while preserving the original event.</p>
                <ul className="feature-bullets">
                  <li>Append-only audit history for attendance and visit actions</li>
                  <li>Employee-submitted correction requests with required reasons</li>
                  <li>Administrator approval or rejection with a decision note</li>
                  <li>Approved corrections reflected in reports without overwriting source events</li>
                </ul>
              </article>

              {/* Feature 4 */}
              <article className="feature-card">
                <span className="feature-eyebrow mono-label">Reports and exports</span>
                <h3>The Monday report writes itself</h3>
                <p className="feature-body">Attendance hours, visit outcomes, and order value are brought together automatically, ready to review on the web or export as CSV.</p>
                <ul className="feature-bullets">
                  <li>Historical attendance reporting for a selected date range</li>
                  <li>Filters for employee, outcome, and team</li>
                  <li>CSV exports for payroll and accounting workflows</li>
                  <li>Web Command Center for real-time team visibility</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* 5. How It Works Section */}
        <section id="how-it-works" aria-labelledby="how-it-works-heading">
          <div className="container">
            <h2 id="how-it-works-heading">How a shift moves through the system</h2>
            <div className="steps-grid">
              <div className="step-card">
                <span className="step-label mono-label">STEP 1 — Check in</span>
                <h3>Check in</h3>
                <p>A representative opens the app at their first stop and checks in. The location and its reported accuracy are recorded.</p>
              </div>
              <div className="step-card">
                <span className="step-label mono-label">STEP 2 — Log the visit</span>
                <h3>Log the visit</h3>
                <p>The client, outcome, and order value are recorded. Stock adjusts automatically when an order closes.</p>
              </div>
              <div className="step-card">
                <span className="step-label mono-label">STEP 3 — Pause when needed</span>
                <h3>Pause when needed</h3>
                <p>A lunch or approved break pauses tracking, with the reason and tracking state clearly shown.</p>
              </div>
              <div className="step-card">
                <span className="step-label mono-label">STEP 4 — Check out</span>
                <h3>Check out</h3>
                <p>The shift closes with a summary of hours worked, visits made, and orders booked.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Industries Section */}
        <section id="industries" aria-labelledby="industries-heading">
          <div className="container industries-inner">
            <h2 id="industries-heading" className="industries-lead">Built for teams that sell, deliver, install, and service in person:</h2>
            <div className="chips-row">
              <span className="industry-chip">FMCG and beverages</span>
              <span className="industry-chip">Pharma and healthcare</span>
              <span className="industry-chip">Electronics and hardware</span>
              <span className="industry-chip">Fashion and apparel</span>
              <span className="industry-chip">Logistics and distribution</span>
              <span className="industry-chip">Installation, field service, and repair</span>
            </div>
          </div>
        </section>

        {/* 7. Privacy Section */}
        <section id="privacy" aria-labelledby="privacy-heading">
          <div className="container">
            <h2 id="privacy-heading">Transparent tracking, by design</h2>
            <div className="privacy-card">
              <div className="privacy-col">
                <h3>Tracking has a visible start and end</h3>
                <p>Location is recorded only during an active work session between check-in and check-out. Employees can see whether tracking is active, paused, or stopped. Before Android requests background-location permission, a plain-language disclosure explains what is collected and why.</p>
              </div>
              <div className="privacy-col">
                <h3>Company workspaces are isolated</h3>
                <p>Application access is scoped to each company workspace using authenticated roles, Firebase custom claims, and Firestore security rules. Privileged backend operations are separately restricted and audited.</p>
              </div>
              <div className="privacy-col">
                <h3>Employees can request access, correction, or deletion</h3>
                <p>Employees can submit requests concerning their personal data from inside the application. Requests follow an administrator-reviewed backend workflow so identity, company obligations, retention requirements, and audit history are handled safely.</p>
              </div>
            </div>
            <div className="privacy-links-row">
              <Link to="/privacy" className="privacy-link">Read our Privacy Policy</Link>
              <a href="mailto:contact@wwwsaurikit.com" className="privacy-link">Contact support</a>
            </div>
          </div>
        </section>

        {/* 8. FAQ Section */}
        <section id="faq" aria-labelledby="faq-heading">
          <div className="container">
            <h2 id="faq-heading">Common questions</h2>
            <div className="faq-list">
              <details className="faq-item">
                <summary>
                  <span>Do you track employees when they're off the clock?</span>
                  <span className="toggle" aria-hidden="true"></span>
                </summary>
                <div className="faq-answer">
                  <p>No. Location tracking operates only during an active work session. It stops after checkout and is suspended while the session is paused. The application shows employees when tracking is active, paused, or stopped.</p>
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  <span>What platforms do you support?</span>
                  <span className="toggle" aria-hidden="true"></span>
                </summary>
                <div className="faq-answer">
                  <p>Field employees can use Android or iOS, with platform-appropriate background-location support. Administrators and managers use the Web Command Center. All three surfaces synchronize in real time when network connectivity is available.</p>
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  <span>How is my company's data separated from other companies?</span>
                  <span className="toggle" aria-hidden="true"></span>
                </summary>
                <div className="faq-answer">
                  <p>Each user is authenticated into a company workspace. Application access is scoped using authenticated roles, Firebase custom claims, and Firestore security rules. Privileged backend operations are separately controlled and audited.</p>
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  <span>What happens if a representative loses signal or their phone dies?</span>
                  <span className="toggle" aria-hidden="true"></span>
                </summary>
                <div className="faq-answer">
                  <p>The application flags incomplete or stale records for administrator review. The representative can submit a correction with a reason, and the administrator can approve or reject it. The decision is recorded without overwriting the original event.</p>
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  <span>How does pricing work after the trial?</span>
                  <span className="toggle" aria-hidden="true"></span>
                </summary>
                <div className="faq-answer">
                  <p>The 30-day trial provides full access with no credit card required. After the trial, plans are billed per active user per month. Contact us before the trial ends and we'll help select the plan that fits your team size.</p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* 9. Final CTA Section */}
        <section id="cta" aria-labelledby="cta-heading">
          <div className="container cta-grid">
            <div className="cta-content">
              <h2 id="cta-heading">Set up your workspace in a few minutes</h2>
              <p>Invite your first field representative the same day. No credit card or setup call is required.</p>
            </div>
            <div className="cta-action">
              <Link to="/contact?topic=saurik_track" className="btn-white" data-conversion="trial-start" data-placement="final-cta">Start free 30-day trial</Link>
            </div>
          </div>
        </section>
      </main>

      {/* 10. Site Footer */}
      <footer id="site-footer" aria-label="Site Footer">
        <div className="container footer-inner">
          <div className="footer-main-row">
            <div className="footer-brand-wrap">
              <a href="#hero" className="footer-brand">Saurik Track</a>
              <span className="footer-relationship">A product of SAURIK IT Private Limited</span>
            </div>
            <ul className="footer-links">
              <li><a href="#features">Product</a></li>
              <li><a href="#how-it-works">How it works</a></li>
              <li><a href="#industries">Industries</a></li>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><Link to="/">Visit SAURIK IT</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
            <a href="mailto:contact@wwwsaurikit.com" className="footer-contact">contact@wwwsaurikit.com</a>
          </div>
          <div className="footer-copy">
            <p>© 2026 SAURIK IT Private Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Track;

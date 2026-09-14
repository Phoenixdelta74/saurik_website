import React from 'react';
import './Track.css';

const Track = () => {
  return (
    <div className="track-page">
      <a href="#hero" className="skip-link">Skip to main content</a>

      {/* 1. Sticky Navigation */}
      <nav id="site-nav" aria-label="Main Navigation">
        <div className="container nav-inner">
          <a href="#hero" className="nav-brand">Saurik Track</a>
          <ul className="nav-links">
            <li><a href="#features">Product</a></li>
            <li><a href="#how-it-works">How it works</a></li>
            <li><a href="#industries">Industries</a></li>
            <li><a href="#privacy">Privacy</a></li>
          </ul>
          <div className="nav-cta">
            {/* TODO: wire to signup flow */}
            <a href="#cta" className="btn-primary">Start free trial</a>
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
                <p className="hero-subhead">Saurik Track pairs GPS attendance with live van-stock, so managers stop chasing updates on WhatsApp and start seeing the day as it happens.</p>
                <div className="hero-cta-group">
                  {/* TODO: wire to signup flow */}
                  <a href="#cta" className="btn-primary">Start free 30-day trial</a>
                  <span className="micro-text">No credit card required</span>
                </div>
              </div>

              <div className="hero-visual" aria-label="Shift manifest example">
                <div className="manifest-card">
                  <div className="manifest-header">
                    <span className="manifest-agent">Rahul Sharma — North Zone</span>
                    <time className="manifest-date" dateTime="2026-09-14">14 Sep 2026</time>
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
                          <span>Location verified, accuracy 8m</span>
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
                <h2 id="problem-heading">Right now, the field runs on group chats and guesswork.</h2>
              </div>
              <ol className="problem-list">
                <li className="problem-item">
                  <span className="problem-eyebrow">01</span>
                  <h3>Nobody knows who's active or stuck</h3>
                  <p>Reps report in when it's convenient, not when a manager needs to know.</p>
                </li>
                <li className="problem-item">
                  <span className="problem-eyebrow">02</span>
                  <h3>Attendance disputes have no evidence</h3>
                  <p>&ldquo;I was there&rdquo; vs. &ldquo;the sheet says otherwise&rdquo; — with nothing to settle it.</p>
                </li>
                <li className="problem-item">
                  <span className="problem-eyebrow">03</span>
                  <h3>Van stock and warehouse counts drift apart</h3>
                  <p>Orders get booked in the field faster than stock gets reconciled on paper.</p>
                </li>
                <li className="problem-item">
                  <span className="problem-eyebrow">04</span>
                  <h3>Weekly reports mean someone's evening is gone</h3>
                  <p>Pulling attendance, visits, and orders into one sheet shouldn't be manual work.</p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* 4. Features Section */}
        <section id="features" aria-labelledby="features-heading">
          <div className="container">
            <div className="features-header">
              <h2 id="features-heading">Two systems, one live picture of the field</h2>
              <p>Attendance tells you who's working and where. Inventory tells you what they're carrying and selling. Saurik Track keeps both in sync, automatically.</p>
            </div>
            <div className="features-grid">
              {/* Feature Card 1 */}
              <article className="feature-card">
                <span className="feature-eyebrow mono-label">GPS Attendance &amp; Field Visibility</span>
                <h3>See the field, not just a spreadsheet of it</h3>
                <p className="feature-body">Reps check in with a verified location, and stay visible on a live map for the length of their shift — nothing tracked before check-in or after check-out.</p>
                <ul className="feature-bullets">
                  <li>Live map of every on-duty rep, with pause and travel status</li>
                  <li>Structured visit outcomes — order taken, follow-up, no sale</li>
                  <li>An exceptions queue that surfaces missed checkouts and stale locations, instead of burying them in a list</li>
                  <li>Attendance correction requests with admin approval and an audit trail</li>
                </ul>
              </article>

              {/* Feature Card 2 */}
              <article className="feature-card">
                <span className="feature-eyebrow mono-label">Inventory &amp; Van-Stock Tracking</span>
                <h3>Stock that updates itself when an order closes</h3>
                <p className="feature-body">Every van is a mobile extension of the warehouse. When a rep books an order in the field, the stock ledger moves with it — no separate reconciliation step.</p>
                <ul className="feature-bullets">
                  <li>One-click industry templates — FMCG, pharma, electronics, apparel</li>
                  <li>Immutable price and stock revision history, with a reason attached to every change</li>
                  <li>Warehouse-to-van transfer manifests, tracked by vehicle</li>
                  <li>Spreadsheet-speed entry — arrow keys, bulk paste, single-key shortcuts</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* 5. How It Works Section */}
        <section id="how-it-works" aria-labelledby="how-it-works-heading">
          <div className="container">
            <h2 id="how-it-works-heading">How a shift actually moves through the system</h2>
            <div className="steps-grid">
              <div className="step-card">
                <span className="step-label mono-label">STEP 1 — Check in</span>
                <h3>Check in</h3>
                <p>A rep opens the app at their first stop and checks in. Location is verified on the spot.</p>
              </div>
              <div className="step-card">
                <span className="step-label mono-label">STEP 2 — Log the visit</span>
                <h3>Log the visit</h3>
                <p>Client name, outcome, and order value are recorded — stock adjusts automatically if an order closes.</p>
              </div>
              <div className="step-card">
                <span className="step-label mono-label">STEP 3 — Pause when needed</span>
                <h3>Pause when needed</h3>
                <p>Lunch or a long transit break pauses tracking cleanly, with the reason recorded.</p>
              </div>
              <div className="step-card">
                <span className="step-label mono-label">STEP 4 — Check out</span>
                <h3>Check out</h3>
                <p>The shift closes with a summary — hours worked, visits made, orders booked.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Industries Section */}
        <section id="industries" aria-labelledby="industries-heading">
          <div className="container industries-inner">
            <h2 id="industries-heading" className="industries-lead">Built for teams that sell and deliver in person:</h2>
            <div className="chips-row">
              <span className="industry-chip">FMCG &amp; Beverages</span>
              <span className="industry-chip">Pharma &amp; Healthcare</span>
              <span className="industry-chip">Electronics &amp; Hardware</span>
              <span className="industry-chip">Fashion &amp; Apparel</span>
              <span className="industry-chip">Logistics &amp; Distribution</span>
            </div>
          </div>
        </section>

        {/* 7. Privacy Section */}
        <section id="privacy" aria-labelledby="privacy-heading">
          <div className="container">
            <h2 id="privacy-heading">Transparent tracking, by design</h2>
            <div className="privacy-card">
              <div className="privacy-col">
                <h3>Tracking has a start and an end</h3>
                <p>Location is only ever recorded between check-in and check-out. It stops the moment a shift pauses or ends.</p>
              </div>
              <div className="privacy-col">
                <h3>Every company is walled off</h3>
                <p>Workspaces are strictly separated — no company can see another's employees, visits, or stock.</p>
              </div>
              <div className="privacy-col">
                <h3>Employees control their own data</h3>
                <p>Reps can request an export or deletion of their personal data from inside the app, reviewed by their admin.</p>
              </div>
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
                  <p>No. GPS is only active between check-in and check-out, and it fully stops when a shift is paused. There is no background tracking outside a work session.</p>
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  <span>What platforms do you support?</span>
                  <span className="toggle" aria-hidden="true"></span>
                </summary>
                <div className="faq-answer">
                  <p>Android for field employees, and a web dashboard for admins and managers. iOS support is on the roadmap.</p>
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  <span>How is my company's data kept separate from other companies using Saurik Track?</span>
                  <span className="toggle" aria-hidden="true"></span>
                </summary>
                <div className="faq-answer">
                  <p>Every workspace is tenant-isolated at the database level. Queries and permissions enforce that no user can see records belonging to another company.</p>
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  <span>What happens if a rep loses signal or their phone dies?</span>
                  <span className="toggle" aria-hidden="true"></span>
                </summary>
                <div className="faq-answer">
                  <p>The app captures the checkout attempt and flags the record for admin review. Reps can submit a correction request with a reason, and the admin approves or rejects it — with an audit trail.</p>
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  <span>How does pricing work after the trial?</span>
                  <span className="toggle" aria-hidden="true"></span>
                </summary>
                <div className="faq-answer">
                  <p>The 30-day trial gives you full access with no credit card. After the trial, plans are billed per active user per month. Talk to us before the trial ends and we'll set up the plan that fits your team size.</p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* 9. Repeat CTA Section */}
        <section id="cta" aria-labelledby="cta-heading">
          <div className="container cta-grid">
            <div className="cta-content">
              <h2 id="cta-heading">Set up your workspace in a few minutes</h2>
              <p>Invite your first field rep the same day. No credit card, no setup calls required.</p>
            </div>
            <div className="cta-action">
              {/* TODO: wire to signup flow */}
              <a href="#cta" className="btn-white">Start free 30-day trial</a>
            </div>
          </div>
        </section>
      </main>

      {/* 10. Site Footer */}
      <footer id="site-footer" aria-label="Site Footer">
        <div className="container footer-inner">
          <div className="footer-main-row">
            <a href="#hero" className="footer-brand">Saurik Track</a>
            <ul className="footer-links">
              <li><a href="#features">Product</a></li>
              <li><a href="#how-it-works">How it works</a></li>
              <li><a href="#industries">Industries</a></li>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
            <a href="mailto:support@sauriktrack.com" className="footer-contact">support@sauriktrack.com</a>
          </div>
          <div className="footer-copy">
            <p>© 2026 Saurik IT Private Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Track;

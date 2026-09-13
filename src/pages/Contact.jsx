import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  ArrowRight, 
  FileText,
  ShieldCheck,
  Building2,
  Home
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const initialTopic = searchParams.get('topic') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceTopic: initialTopic || 'not_sure',
    cctvType: 'commercial', // or 'residential'
    serverType: 'installation', // or 'service'
    timeframe: 'flexible',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'draft_ready' | 'error'

  // Update topic if search param changes
  useEffect(() => {
    const topic = searchParams.get('topic');
    if (topic) {
      if (topic === 'cctv_residential') {
        setFormData(prev => ({ ...prev, serviceTopic: 'hardware_cctv', cctvType: 'residential' }));
      } else if (topic === 'cctv_commercial') {
        setFormData(prev => ({ ...prev, serviceTopic: 'hardware_cctv', cctvType: 'commercial' }));
      } else {
        setFormData(prev => ({ ...prev, serviceTopic: topic }));
      }
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSubmissionStatus(null);
    // Clear error for field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.description.trim()) {
      errs.description = 'Please describe your requirement or question.';
    }
    return errs;
  };

  const getTopicLabel = (val) => {
    const labels = {
      data_analytics: 'Data Analytics as a Service (Forecasting)',
      generative_ai: 'Generative AI Systems',
      agentic_ai: 'Agentic AI & Workflow Automation',
      custom_apps: 'Custom Web Application',
      web_design: 'Website Design & Support',
      mobile_apps: 'Mobile App Development',
      hardware_cctv: `CCTV Sales & Services (${formData.cctvType === 'residential' ? 'Residential Home' : 'Commercial Facility'})`,
      hardware_computers: 'Computer Sales & Workstations',
      hardware_servers: `Server ${formData.serverType === 'installation' ? 'Installation' : 'Servicing'}`,
      hardware_quote: 'General Hardware Quotation',
      not_sure: 'Not sure yet / General enquiry',
    };
    return labels[val] || val;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmissionStatus(null);
      requestAnimationFrame(() => document.getElementById(Object.keys(validationErrors)[0])?.focus());
      return;
    }

    // Compose formatted email draft
    const subject = encodeURIComponent(`Project Enquiry: ${getTopicLabel(formData.serviceTopic)} - ${formData.name}`);
    const body = encodeURIComponent(
      `Hello SAURIK IT Team,\n\n` +
      `Here are the details of my enquiry:\n\n` +
      `Full Name: ${formData.name}\n` +
      `Email Address: ${formData.email}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Company / Entity: ${formData.company || (formData.cctvType === 'residential' ? 'Residential Client' : 'Individual / Not provided')}\n` +
      `Service Topic: ${getTopicLabel(formData.serviceTopic)}\n` +
      `Estimated Timeframe: ${formData.timeframe}\n\n` +
      `Requirement Description:\n${formData.description}\n\n` +
      `Sent via Saurik IT Website Contact Form.`
    );

    const mailtoUrl = `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
    
    // Open the default email client
    window.location.href = mailtoUrl;

    // Distinguish opening draft per design brief
    setSubmissionStatus('draft_ready');
  };

  const handleWhatsAppDirect = () => {
    // Even if partially filled, let user WhatsApp
    const msg = encodeURIComponent(
      `Hello Saurik IT,\n` +
      `My name is ${formData.name || 'a visitor'}.\n` +
      `I am inquiring about: ${getTopicLabel(formData.serviceTopic)}.\n` +
      `Requirement: ${formData.description || 'I would like to discuss my project requirement.'}`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-16 pt-4 sm:pt-8">
      
      {/* ── 1. Page Heading ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="max-w-3xl space-y-4">
          <div className="badge-software">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Project Enquiry</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-primary font-heading tracking-tight">
            Discuss your requirement.
          </h1>

          <p className="text-lg text-ink-secondary leading-relaxed">
            Tell us what you need. Prepare an email draft or continue the conversation in WhatsApp, then review and send your message there.
          </p>
        </div>
      </section>

      {/* ── 2. Dual-Column Contact & Form ──────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column (4 cols) - Contact channels */}
          <div className="order-2 lg:order-1 lg:col-span-4 space-y-6">
            <div className="content-card space-y-6 border-t-4 border-t-accent-teal">
              <div>
                <h3 className="text-xl font-bold text-ink-primary font-heading mb-1">
                  Other ways to get in touch
                </h3>
                <p className="text-xs text-ink-secondary">
                  Reach out directly via official email or WhatsApp.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-xs text-ink-muted uppercase tracking-wider font-semibold block mb-1">
                    Official Email
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="flex items-center gap-2 font-medium text-ink-primary hover:text-accent-teal transition-colors"
                  >
                    <Mail className="w-4 h-4 text-accent-teal" />
                    <span>{COMPANY_INFO.email}</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-border-subtle">
                  <span className="text-xs text-ink-muted uppercase tracking-wider font-semibold block mb-1">
                    Phone & WhatsApp
                  </span>
                  <a
                    href={`tel:+91${COMPANY_INFO.phone}`}
                    className="flex items-center gap-2 font-medium text-ink-primary hover:text-accent-teal transition-colors"
                  >
                    <Phone className="w-4 h-4 text-accent-teal" />
                    <span>{COMPANY_INFO.phoneDisplay}</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-border-subtle">
                  <span className="text-xs text-ink-muted uppercase tracking-wider font-semibold block mb-1">
                    Direct WhatsApp
                  </span>
                  <a
                    href={COMPANY_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-control text-xs font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-colors w-full justify-center shadow-subtle"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Instant WhatsApp Chat</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-border-subtle">
                  <span className="text-xs text-ink-muted uppercase tracking-wider font-semibold block mb-1">
                    Operating Schedule
                  </span>
                  <div className="flex items-center gap-2 text-ink-secondary text-xs">
                    <Clock className="w-4 h-4 text-ink-muted flex-shrink-0" />
                    <span>{COMPANY_INFO.availability}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-canvas rounded-control border border-border-subtle text-xs text-ink-secondary space-y-1.5">
                <div className="font-semibold text-ink-primary flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent-teal" />
                  <span>Your enquiry details</span>
                </div>
                <p>
                  Email and WhatsApp use their respective providers to deliver your message. Share only the information needed to discuss your requirement. <Link to="/privacy" className="underline">Read our enquiry information page.</Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (8 cols) - Interactive Form */}
          <div className="order-1 lg:order-2 lg:col-span-8">
            <div className="bg-surface rounded-panel border border-border-subtle p-6 sm:p-10 shadow-card">
              
              {/* Submission Status Alerts */}
              {submissionStatus === 'draft_ready' && (
                <div role="status" className="mb-8 p-4 rounded-panel bg-accent-teal-light border border-accent-teal/30 text-ink-primary animate-in fade-in duration-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-teal flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-ink-primary">
                        Continue in your email app.
                      </h4>
                      <p className="text-xs text-ink-secondary leading-relaxed">
                        If your email app opened, review the draft and send it to <strong className="text-ink-primary">{COMPANY_INFO.email}</strong>. Nothing has been sent by this website. If no app opened, copy your details into an email; your entries remain below.
                      </p>
                      <p className="text-xs text-ink-muted pt-1">
                        Prefer WhatsApp? You can also <button type="button" onClick={handleWhatsAppDirect} className="text-accent-teal font-semibold underline">send this directly via WhatsApp</button>.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <p className="text-sm text-ink-secondary">Fields marked * are required for an email draft. You will send the message from your email app.</p>
                {Object.values(errors).some(Boolean) && <p role="alert" className="text-sm text-rose-700">Please correct the highlighted fields before preparing your draft.</p>}
                
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-ink-primary uppercase tracking-wider mb-2">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      aria-required="true"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-4 py-3 rounded-control border bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-accent-teal transition-all ${
                        errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-border-subtle focus:border-accent-teal'
                      }`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-ink-primary uppercase tracking-wider mb-2">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      aria-required="true"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@company.com"
                      className={`w-full px-4 py-3 rounded-control border bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-accent-teal transition-all ${
                        errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-border-subtle focus:border-accent-teal'
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-ink-primary uppercase tracking-wider mb-2">
                      Phone / Mobile Number <span className="text-xs font-normal text-ink-muted">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-control border border-border-subtle bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-accent-teal focus:border-accent-teal transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-xs font-bold text-ink-primary uppercase tracking-wider mb-2">
                      Company / Organization <span className="text-xs font-normal text-ink-muted">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Acme Logistics Ltd / Residential"
                      className="w-full px-4 py-3 rounded-control border border-border-subtle bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-accent-teal focus:border-accent-teal transition-all"
                    />
                  </div>
                </div>

                {/* Service Topic Selector */}
                <div>
                  <label htmlFor="serviceTopic" className="block text-xs font-bold text-ink-primary uppercase tracking-wider mb-2">
                    Primary Service Requirement
                  </label>
                  <select
                    id="serviceTopic"
                    name="serviceTopic"
                    value={formData.serviceTopic}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-control border border-border-subtle bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-accent-teal focus:border-accent-teal transition-all"
                  >
                    <option value="not_sure">Not sure yet / General discussion</option>
                    <optgroup label="── Software & IT Division ──">
                      <option value="data_analytics">Data Analytics as a Service (Predictive Forecasting)</option>
                      <option value="generative_ai">Generative AI Systems</option>
                      <option value="agentic_ai">Agentic AI & Workflow Automation</option>
                      <option value="custom_apps">Custom Web Applications</option>
                      <option value="web_design">Website Design & Support</option>
                      <option value="mobile_apps">Mobile App Development</option>
                    </optgroup>
                    <optgroup label="── IT Hardware Division ──">
                      <option value="hardware_cctv">CCTV Sales & Services</option>
                      <option value="hardware_computers">Computer Sales & Workstations</option>
                      <option value="hardware_servers">Server Installation & Service</option>
                      <option value="hardware_quote">General Hardware Quotation</option>
                    </optgroup>
                  </select>
                </div>

                {/* Dynamic Sub-Options: CCTV Residential vs Commercial */}
                {formData.serviceTopic === 'hardware_cctv' && (
                  <div className="p-4 bg-canvas rounded-control border border-border-subtle animate-in fade-in duration-200">
                    <label className="block text-xs font-bold text-ink-primary uppercase tracking-wider mb-2">
                      Surveillance Premise Type:
                    </label>
                    <div className="flex flex-wrap gap-4 text-xs font-medium">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="cctvType"
                          value="commercial"
                          checked={formData.cctvType === 'commercial'}
                          onChange={handleChange}
                          className="text-accent-teal focus:ring-accent-teal"
                        />
                        <Building2 className="w-3.5 h-3.5 text-accent-blue" />
                        <span>Commercial / Office / Warehouse / Facility</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="cctvType"
                          value="residential"
                          checked={formData.cctvType === 'residential'}
                          onChange={handleChange}
                          className="text-accent-teal focus:ring-accent-teal"
                        />
                        <Home className="w-3.5 h-3.5 text-accent-teal" />
                        <span>Residential / Home / Villa / Apartment</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Dynamic Sub-Options: Server Installation vs Service */}
                {formData.serviceTopic === 'hardware_servers' && (
                  <div className="p-4 bg-canvas rounded-control border border-border-subtle animate-in fade-in duration-200">
                    <label className="block text-xs font-bold text-ink-primary uppercase tracking-wider mb-2">
                      Server Requirement Type:
                    </label>
                    <div className="flex flex-wrap gap-4 text-xs font-medium">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="serverType"
                          value="installation"
                          checked={formData.serverType === 'installation'}
                          onChange={handleChange}
                          className="text-accent-blue focus:ring-accent-blue"
                        />
                        <span>New Rack / Tower Server Installation</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="serverType"
                          value="service"
                          checked={formData.serverType === 'service'}
                          onChange={handleChange}
                          className="text-accent-blue focus:ring-accent-blue"
                        />
                        <span>Preventive Maintenance / Servicing of Existing Server</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Timeframe selector */}
                <div>
                  <label htmlFor="timeframe" className="block text-xs font-bold text-ink-primary uppercase tracking-wider mb-2">
                    Estimated Timeframe / Urgency
                  </label>
                  <select
                    id="timeframe"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-control border border-border-subtle bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-accent-teal focus:border-accent-teal transition-all"
                  >
                    <option value="immediate">Immediate (within 1–2 weeks)</option>
                    <option value="within_month">Within 1 month</option>
                    <option value="quarter">This quarter (1–3 months)</option>
                    <option value="flexible">Exploring / Flexible timeline</option>
                  </select>
                </div>

                {/* Requirement Description */}
                <div>
                  <label htmlFor="description" className="block text-xs font-bold text-ink-primary uppercase tracking-wider mb-2">
                    Requirement Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    aria-required="true"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Please outline the goal, key functionality, device quantities, or premises details..."
                    className={`w-full px-4 py-3 rounded-control border bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-accent-teal transition-all ${
                      errors.description ? 'border-rose-400 bg-rose-50/20' : 'border-border-subtle focus:border-accent-teal'
                    }`}
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? 'desc-error' : undefined}
                  />
                  {errors.description && (
                    <p id="desc-error" className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.description}</span>
                    </p>
                  )}
                </div>

                {/* Form Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="submit"
                    className="btn-primary py-3.5 px-8 text-sm justify-center group flex-1"
                  >
                    <Send className="w-4 h-4" />
                    <span>Prepare email draft</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-control text-sm font-semibold bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-all shadow-subtle"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Open WhatsApp</span>
                  </button>
                </div>

                <p className="text-sm text-ink-secondary text-center pt-2">
                  Review and send from your chosen app. <Link to="/privacy" className="underline">How enquiry information is handled</Link>.
                </p>

              </form>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;

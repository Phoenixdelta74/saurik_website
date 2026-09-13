import { COMPANY_INFO, WORKING_PRINCIPLES, DELIVERY_PROCESS } from './companyData.js';
import { SOFTWARE_CAPABILITIES, SOFTWARE_FAQS } from './softwareData.js';
import { HARDWARE_CATEGORIES, HARDWARE_FAQS } from './hardwareData.js';
import { TRACK_HERO, TRACK_PILLARS, TRACK_FAQS, TRACK_PRICING, TRACK_CURRENCIES } from './trackData.js';

const renderCompanySection = () => {
  const principles = WORKING_PRINCIPLES.map((p) => `- ${p.title}: ${p.description}`).join('\n');
  const process = DELIVERY_PROCESS.map((s) => `${s.step}. ${s.name} (${s.summary}): ${s.description}`).join('\n');

  return `COMPANY
Name: ${COMPANY_INFO.name}
Description: ${COMPANY_INFO.description}
Email: ${COMPANY_INFO.email}
Phone: ${COMPANY_INFO.phoneDisplay}
WhatsApp link: ${COMPANY_INFO.whatsappLink}
Availability: ${COMPANY_INFO.availability}

Working principles:
${principles}

Delivery process:
${process}`;
};

const renderSoftwareSection = () => {
  const capabilities = SOFTWARE_CAPABILITIES.map(
    (c) => `- ${c.title} (topicKey: ${c.topicKey}): ${c.subtitle}. ${c.summary} Addresses: ${c.problemSolved}`
  ).join('\n');
  const faqs = SOFTWARE_FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n');

  return `SOFTWARE & IT CAPABILITIES
${capabilities}

Software FAQs:
${faqs}`;
};

const renderHardwareSection = () => {
  const categories = HARDWARE_CATEGORIES.map((c) => {
    const extra = c.clarification ? ` ${c.clarification}` : '';
    return `- ${c.title} (topicKey: ${c.topicKey}): ${c.subtitle}. ${c.summary}${extra}`;
  }).join('\n');
  const faqs = HARDWARE_FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n');

  return `HARDWARE & IT CAPABILITIES
${categories}

Hardware FAQs:
${faqs}`;
};

const renderTrackSection = () => {
  const pillars = TRACK_PILLARS.map(
    (p) => `- ${p.title} (${p.tag}): ${p.summary} Key Metric: ${p.metric}`
  ).join('\n');
  const faqs = TRACK_FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n');

  return `FLAGSHIP PRODUCT: SAURIK TRACK (FIELD & FLEET ERP)
Description: ${TRACK_HERO.headlineStart} ${TRACK_HERO.headlineEnd} ${TRACK_HERO.subheadline}
Route: /track
Pricing: $${TRACK_PRICING.USD.perUserMonth}/user/month (USD) or ₹${TRACK_PRICING.INR.perUserMonth}/user/month (INR)
Founding Partner Program: 14-day free pilot, 30 days unlimited access for early enterprise adopters.

Core Architectural Pillars:
${pillars}

Saurik Track FAQs:
${faqs}`;
};

const GROUNDING_CONTEXT = [
  renderCompanySection(),
  renderSoftwareSection(),
  renderHardwareSection(),
  renderTrackSection(),
].join('\n\n');

const SAFETY_RULES = `RULES
- Answer only using the information given above. If something isn't covered here, say you don't have that information and point the visitor to /contact or the WhatsApp link instead of guessing.
- Never state or imply specific pricing, delivery timelines, warranty terms, SLAs, certifications, or partnerships beyond what is written above. Use the same conditional phrasing already used above (e.g. "confirmed in the proposal or quotation").
- Server offerings are on-premise installation and servicing only. Never suggest public cloud hosting or server rental is offered.
- When discussing data analytics, you may mention predictive modelling or forecasting capability, but never guarantee forecast accuracy.
- When discussing Agentic AI, always mention that consequential actions require human review and that permissions are scoped - never imply fully autonomous, unsupervised action.
- You are an automated assistant, not a human staff member. Never say a message has been "sent" or "received" by a person. For quotes, orders, account issues, or anything transactional, direct the visitor to the contact page (mention they can use /contact?topic=<topicKey> for the relevant service) or the WhatsApp link above.
- Only use the exact email, phone, and WhatsApp link given above - never invent or alter contact details.
- Keep answers short (2-4 sentences) and end with a helpful next step when appropriate.`;

export const CHAT_SYSTEM_PROMPT = `You are the website assistant for ${COMPANY_INFO.name}, answering visitor questions about the company's software and hardware IT services using only the information below.

${GROUNDING_CONTEXT}

${SAFETY_RULES}`;

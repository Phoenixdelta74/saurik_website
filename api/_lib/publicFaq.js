// These answers contain public website facts. Match only a self-contained first question.
const entries = [
  ['arthos', 'Where are my invoices and records stored?', 'Arthos Invoice Studio keeps your records in the browser profile on your computer. Use its backup export before changing devices or clearing site data.'],
  ['arthos', 'Does Arthos work without internet?', 'Yes. Arthos Invoice Studio is local-first. You can work with invoices on the computer where you keep your records.'],
  ['arthos', 'Does Arthos file GST returns directly?', 'Arthos helps you prepare invoices and records. Arrange GST filing separately.'],
  ['arthos', 'What happens when the trial ends?', 'After the 30-day Arthos trial, your records become read-only.'],
  ['arthos', 'Is there a Cloud edition?', 'Arthos Cloud is planned. The available Invoice Studio runs locally on your computer.'],
  ['general', 'What is Arthos Invoice Studio?', 'Arthos Invoice Studio helps you create invoices and keep business records locally in Chrome or Edge. You can try it for 30 days.'],
  ['general', 'Do you install CCTV at home?', 'Yes, we help with home CCTV installations. Which areas would you like to cover?'],
  ['general', 'Can you service an existing CCTV system?', 'Yes, we offer CCTV service. What has stopped working on your existing system?'],
  ['general', 'Do you install CCTV for businesses?', 'Yes. We can discuss your entrances, work areas and recording needs to plan a business installation.'],
  ['general', 'What should I prepare for a CCTV quote?', 'Tell us whether the site is a home or business, the areas you want covered, and whether there are existing cameras or cables.'],
  ['general', 'Do I need a company name for home CCTV?', 'You can enquire about CCTV for your home using your own name. The company field is optional.'],
  ['general', 'Can you service my server?', 'We offer server installation and service. What issue are you seeing, and which system is affected?'],
  ['general', 'Do you offer computer servicing?', 'Yes, we offer computer sales and service. Tell us the symptoms and whether one or several computers are affected.'],
  ['general', 'Do you build websites?', 'Yes. We offer website design, development and support. What would you like visitors to be able to do?'],
  ['general', 'Do you build custom software?', 'Yes. We build custom web and mobile applications around business workflows. Which step is taking the most time today?'],
  ['general', 'Can I speak to a person?', 'Of course. Choose Request follow-up here, or use the contact page to prepare an email or WhatsApp message.'],
  ['general', 'Do you offer demand forecasting?', 'Yes. We help businesses explore demand forecasts from historical data. You can explore sample scenarios on the Use Cases page.'],
  ['general', 'What is Saurik Track?', 'Saurik Track is an on-premise platform for field operations, including attendance, field visits and van stock.'],
  ['general', 'Can I ask without sharing my phone number?', 'Yes. You can ask questions here without giving contact details. Share a contact method only if you want the team to follow up.'],
  ['general', 'Can I ask about CCTV for my home?', 'Yes. Tell me which areas you want to cover and whether this is a new installation.'],
];

const normalize = text => text.normalize('NFKC').trim().toLowerCase().replace(/[?!.]+$/, '').replace(/\s+/g, ' ');
export function publicAnswer(messages, mode, lang) {
  const users = messages.filter(message => message.role === 'user');
  if (users.length !== 1 || messages.at(-1)?.role !== 'user' || (lang && lang !== 'en-IN')) return;
  const question = normalize(users[0].content);
  return entries.find(([scope, title]) => (scope === 'general' || scope === mode) && normalize(title) === question)?.[2];
}

export const HARDWARE_CATEGORIES = [
  {
    id: 'cctv',
    topicKey: 'hardware_cctv',
    title: 'CCTV Sales & Services',
    subtitle: 'Surveillance requirements for business and residential premises',
    summary: 'Discuss camera coverage, recording, viewing, cabling, installation, and service needs before equipment is selected.',
    routes: [
      {
        id: 'business',
        label: 'For My Business',
        context: 'Commercial premises',
        description: 'A business enquiry can cover entrances, work areas, storage, recording access, cabling routes, and existing equipment.',
        features: ['Required coverage areas and lighting conditions', 'Recording duration and access requirements', 'Cabling, network, power, and mounting constraints', 'User access and remote-viewing needs', 'Installation or service scope requested'],
        idealFor: 'Offices, shops, workshops, storage areas, and other business premises',
      },
      {
        id: 'home',
        label: 'For My Home',
        context: 'Residential premises',
        description: 'A residential enquiry can begin with the areas to cover, whether equipment already exists, and any installation constraints.',
        features: ['Indoor or outdoor coverage areas', 'Day, night, audio, and alert preferences', 'Local recording and viewing requirements', 'Cabling and placement considerations', 'Mobile access requested by the household'],
        idealFor: 'Houses, apartments, and other residential premises',
      },
    ],
    buyingAdvice: 'A site discussion or assessment may be proposed when coverage, cabling, power, or mounting cannot be established from the initial enquiry.',
  },
  {
    id: 'computers',
    topicKey: 'hardware_computers',
    title: 'Computer Sales & Services',
    subtitle: 'Computer requirements, upgrades, diagnostics, and setup',
    summary: 'Define intended use, quantity, software needs, existing equipment, and service context before a model or repair scope is proposed.',
    scope: ['Laptop or desktop requirements for individuals or teams', 'Workstation requirements based on the intended software and workload', 'Storage, memory, graphics, and other component upgrades', 'Operating-system and workplace configuration included in the quote', 'Diagnostics and repair options after equipment assessment'],
    procurementNote: 'Brand, condition, availability, warranty, invoice, configuration, and delivery terms are confirmed in the quotation before purchase.',
  },
  {
    id: 'servers',
    topicKey: 'hardware_servers',
    title: 'Server Installation & Service',
    subtitle: 'On-premise server installation, configuration, and servicing',
    summary: 'Assess owned server equipment and the site environment before defining installation, configuration, or maintenance work.',
    scope: ['Rack or tower placement, cabling, power, and cooling review', 'Storage and RAID configuration included in the accepted scope', 'Operating-system and local service configuration', 'Backup requirements and available target systems', 'Inspection and preventive service tasks agreed after assessment'],
    clarification: 'The confirmed offering is on-premise server installation and service. Public cloud hosting and server rental are not advertised as services.',
  },
];

export const BUYING_PROCESS = [
  { step: '01', title: 'Requirement', description: 'Share the intended use, quantity, existing equipment, site context, and whether advice, supply, installation, or service is needed.' },
  { step: '02', title: 'Recommendation & Quotation', description: 'Review a quotation that identifies the proposed equipment or work, assumptions, availability, pricing, warranty terms, and exclusions.' },
  { step: '03', title: 'Supply & Setup', description: 'After acceptance, complete only the supply, configuration, installation, and testing recorded in the quotation.' },
  { step: '04', title: 'Handover & Agreed Support', description: 'Confirm the delivered items, basic operation, documentation, warranty information, and any support arrangement included in the quotation.' },
];

export const HARDWARE_FAQS = [
  { q: 'Is a site assessment available for CCTV?', a: 'A site discussion or assessment may be recommended when camera coverage, lighting, cable routes, power, mounting, or existing equipment cannot be confirmed remotely. Availability and any assessment charge are confirmed for the enquiry.' },
  { q: 'Can remote CCTV viewing be included?', a: 'Remote viewing can be considered when the selected equipment, internet connection, account setup, and security requirements support it. Devices, features, recurring costs, and configuration responsibilities are confirmed in the quotation.' },
  { q: 'What condition and warranty apply to computers or components?', a: 'Brand, model, condition, included accessories, invoice details, and manufacturer or seller warranty terms are identified in the quotation. Do not assume a warranty or sealed-new condition unless it is recorded there.' },
  { q: 'What can server servicing include?', a: 'The scope may include hardware inspection, storage-health checks, cleaning, cooling review, firmware review, or backup checks. The actual tasks depend on the equipment, access, condition, and accepted service quotation.' },
];

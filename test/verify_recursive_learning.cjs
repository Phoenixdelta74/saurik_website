/**
 * SAURIK IT — Automated Verification Suite: Recursive Learning & Project Memory
 * Validates agent memory files, lesson schemas, ADRs, constitutional protocols,
 * and modular skill definitions (Role personas + Tactical skills).
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== RUNNING RECURSIVE LEARNING & MEMORY VERIFICATION SUITE ===\n');

let failed = false;
function check(condition, message) {
  if (condition) {
    console.log(`  ✔ [PASS] ${message}`);
  } else {
    console.error(`  ✖ [FAIL] ${message}`);
    failed = true;
  }
}

// 1. Verify agent-memory/ files
console.log('1. Verifying agent-memory/ hierarchy...');
const memoryFiles = [
  'shared-lessons.md',
  'product-lessons.md',
  'design-lessons.md',
  'architect-lessons.md',
  'developer-lessons.md',
  'qa-lessons.md',
];

const requiredLessonFields = [
  'Date:',
  'Problem:',
  'Cause:',
  'Action:',
  'Evidence:',
  'Result:',
  'Status:',
];

for (const file of memoryFiles) {
  const filePath = path.resolve(__dirname, '../agent-memory', file);
  check(fs.existsSync(filePath), `agent-memory/${file} exists`);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasLesson = content.includes('## Lesson');
    check(hasLesson, `${file} contains seeded lessons`);

    const fieldsFound = requiredLessonFields.every((field) => content.includes(field));
    check(fieldsFound, `${file} conforms to structured lesson schema (${requiredLessonFields.join(', ')})`);
  }
}

// 2. Verify Architecture Decision Records (docs/decisions.md)
console.log('\n2. Verifying Architecture Decision Records (docs/decisions.md)...');
const decisionsPath = path.resolve(__dirname, '../docs/decisions.md');
check(fs.existsSync(decisionsPath), 'docs/decisions.md exists');
if (fs.existsSync(decisionsPath)) {
  const decisions = fs.readFileSync(decisionsPath, 'utf8');
  check(decisions.includes('ADR-001'), 'ADR-001 (Zero-Cost Native Voice Engine) documented');
  check(decisions.includes('ADR-002'), 'ADR-002 (Fast-Fail Timeout & Cloud Fallback) documented');
  check(decisions.includes('ADR-003'), 'ADR-003 (Recursive Agent Learning Protocol) documented');
  check(decisions.includes('Context') && decisions.includes('Decision') && decisions.includes('Consequences'), 'ADR structure verified (Context, Decision, Consequences)');
}

// 3. Verify Living Requirements (docs/requirements.md)
console.log('\n3. Verifying Living Requirements (docs/requirements.md)...');
const reqPath = path.resolve(__dirname, '../docs/requirements.md');
check(fs.existsSync(reqPath), 'docs/requirements.md exists');
if (fs.existsSync(reqPath)) {
  const reqContent = fs.readFileSync(reqPath, 'utf8');
  check(reqContent.includes('Zero-Cost Native Voice Engine'), 'Zero-Cost Native Voice Engine mandate present');
  check(reqContent.includes('Zero-JS Static Pre-Rendering'), 'Static Pre-Rendering (SSG) mandate present');
  check(reqContent.includes('WCAG 2.2 AA'), 'Accessibility mandate present');
}

// 4. Verify Constitutional Protocol in AGENTS.md
console.log('\n4. Verifying Governance & Protocols in AGENTS.md...');
const agentsPath = path.resolve(__dirname, '../AGENTS.md');
check(fs.existsSync(agentsPath), 'AGENTS.md exists');
if (fs.existsSync(agentsPath)) {
  const agents = fs.readFileSync(agentsPath, 'utf8');
  check(agents.includes('Recursive learning protocol'), 'AGENTS.md contains Recursive Learning Protocol');
  check(agents.includes('Human Gatekeeper Rule'), 'AGENTS.md contains Human Gatekeeper Rule');
  check(agents.includes('Anti-Thrashing Circuit Breaker'), 'AGENTS.md contains Anti-Thrashing Circuit Breaker (max 2 attempts)');
  check(agents.includes('Lesson graduation ladder'), 'AGENTS.md defines Lesson Graduation Ladder');
  check(agents.includes('Zero-Cost Native Voice Engine Rule'), 'AGENTS.md preserves Zero-Cost Native Voice Engine Rule');
  check(agents.includes('Always-On Shared Agent Workflow'), 'AGENTS.md defines Always-On Shared Agent Workflow');
  check(agents.includes('Core Always-On Rule'), 'AGENTS.md defines Core Always-On Rule');
  check(agents.includes('Simple Request') && agents.includes('Complex or High-Impact Feature'), 'AGENTS.md codifies Scaled Workflow Tiers');
}

// 4b. Verify Cross-Platform Entry Point in CLAUDE.md
console.log('\n4b. Verifying Cross-Platform Entry Point in CLAUDE.md...');
const claudePath = path.resolve(__dirname, '../CLAUDE.md');
check(fs.existsSync(claudePath), 'CLAUDE.md exists');
if (fs.existsSync(claudePath)) {
  const claudeContent = fs.readFileSync(claudePath, 'utf8');
  check(claudeContent.includes('AGENTS.md'), 'CLAUDE.md links to shared instructions in AGENTS.md');
  check(claudeContent.includes('shared agent workflow') || claudeContent.includes('Always-On Shared Workflow'), 'CLAUDE.md mandates Always-On Shared Workflow');
  check(claudeContent.includes('Simple Request') && claudeContent.includes('Complex / High-Impact'), 'CLAUDE.md codifies Scaled Workflow Tiers');
}

// 5. Verify Team Spec Alignment (.agents/team/roles.md)
console.log('\n5. Verifying Team Spec Alignment (.agents/team/roles.md)...');
const rolesPath = path.resolve(__dirname, '../.agents/team/roles.md');
check(fs.existsSync(rolesPath), '.agents/team/roles.md exists');
if (fs.existsSync(rolesPath)) {
  const roles = fs.readFileSync(rolesPath, 'utf8');
  check(roles.includes('product_planner') && roles.includes('agent-memory/product-lessons.md'), 'product_planner memory mapping verified');
  check(roles.includes('fullstack_developer') && roles.includes('agent-memory/developer-lessons.md'), 'fullstack_developer memory mapping verified');
  check(roles.includes('qa_reviewer') && roles.includes('agent-memory/qa-lessons.md'), 'qa_reviewer memory mapping verified');
}

// 6. Verify Workspace Role Personas (.agents/skills/role-*/SKILL.md)
console.log('\n6. Verifying Workspace Role Personas (.agents/skills/role-*/SKILL.md)...');
const roleSkills = [
  'role-product-planner',
  'role-ui-ux-designer',
  'role-solution-architect',
  'role-fullstack-developer',
  'role-qa-reviewer',
];

for (const skill of roleSkills) {
  const skillPath = path.resolve(__dirname, '../.agents/skills', skill, 'SKILL.md');
  check(fs.existsSync(skillPath), `.agents/skills/${skill}/SKILL.md exists`);
  if (fs.existsSync(skillPath)) {
    const content = fs.readFileSync(skillPath, 'utf8');
    check(content.startsWith('---') && content.includes(`name: ${skill}`), `${skill} contains valid YAML frontmatter`);
    check(content.includes('Step 0: Pre-Flight') || content.includes('Pre-Flight Memory'), `${skill} enforces Step 0 Pre-Flight Memory check`);
    check(content.includes('Post-Flight: Memory Recording') || content.includes('Post-Flight'), `${skill} enforces Post-Flight memory recording`);
  }
}

// 7. Verify Modular Tactical Skills (.agents/skills/<skill>/SKILL.md)
console.log('\n7. Verifying Modular Tactical Skills (.agents/skills/)...');
const modularSkills = [
  // Product Owner Skills
  { name: 'po-discovery', keyPhrases: ['Who is the Audience', 'What is the Business Goal', 'Verified Facts vs. Assumptions'] },
  { name: 'deliver-prd', keyPhrases: ['Executive Summary', 'Scope Boundaries', 'Non-Functional Requirements'] },
  { name: 'deliver-user-stories', keyPhrases: ['Dual-Path Acceptance Criteria', 'Happy Path', 'Failure / Recovery Path'] },
  { name: 'po-prioritization', keyPhrases: ['MoSCoW Prioritization', 'Must Have', 'Anti-Fabrication Prioritization Rule'] },
  { name: 'po-decision-management', keyPhrases: ['Taxonomy of Truth', 'Known Fact', 'Human Gatekeeper Protocol'] },

  // Solution Architect Skills
  { name: 'architect-context-assessment', keyPhrases: ['Existing Tech Stack', 'Active Architectural Constraints', 'Context Assessment Output'] },
  { name: 'solution-design', keyPhrases: ['Proportionality Mandate', 'System Topology', 'Failure Modes & Fallback Matrix'] },
  { name: 'architecture-tradeoff-analysis', keyPhrases: ['7-Step Evaluation Pipeline', 'Hard Constraints', 'Multi-Factor Evaluation Matrix'] },
  { name: 'architecture-decision-records', keyPhrases: ['Standard ADR Schema', 'Decision Drivers', 'Considered Options'] },
  { name: 'api-and-integration-design', keyPhrases: ['Endpoint Route & Allowed HTTP Methods', 'Response Contracts & HTTP Status Codes', 'Timeout Budgets & Fast-Fail Ceilings'] },
  { name: 'website-security-architecture', keyPhrases: ['Absolute Secret Protection', 'Input Sanitization', 'Privacy-Preserving Logging'] },
  { name: 'implementation-planning', keyPhrases: ['Atomic & Checkable Steps', 'Dependency Ordering', 'Work Breakdown Structure'] },

  // Fullstack Developer Skills
  { name: 'developer-codebase-exploration', keyPhrases: ['Existing Component & Style Inventory', 'Routes & Navigation Structure', 'Exploration Findings Summary'] },
  { name: 'website-feature-implementation', keyPhrases: ['Minimal Coherent Changes', 'The 4 Mandatory Component States', 'Truthful Interaction Copy'] },
  { name: 'frontend-react-implementation', keyPhrases: ['Responsive Viewport Verification', 'WCAG 2.2 AA Accessibility Mandates', 'Lucide React'] },
  { name: 'website-api-implementation', keyPhrases: ['HTTP Verb & Payload Guards', 'Fast-Fail Timeout Protection', 'Privacy-Preserving Logging'] },
  { name: 'systematic-debugging', keyPhrases: ['6-Step Systematic Debugging Protocol', 'Reproduce the Defect', 'Anti-Thrashing Circuit Breaker'] },
  { name: 'developer-testing', keyPhrases: ['Developer Testing vs. QA Testing', 'Verification Pyramid', 'Build Verification Gate'] },
  { name: 'secure-web-implementation', keyPhrases: ['Absolute Secret Protection', 'Defensive Input Sanitization', 'Privacy-Preserving Logging'] },
  { name: 'verification-before-completion', keyPhrases: ['Core Truthfulness Mandate', 'Pre-Completion Audit Protocol', 'Verification Summary'] },

  // UI/UX Designer Skills
  { name: 'ux-design-brief', keyPhrases: ['Business Objective & Primary Action', 'Target Audience & Usage Context', 'Existing Brand Assets'] },
  { name: 'ux-journey-mapping', keyPhrases: ['Evidence-Based vs. Assumed Journeys', 'Multi-Entry-Point Navigation', 'Journey Map Output Format'] },
  { name: 'website-wireframing', keyPhrases: ['Page Structure & Section Ordering', 'Mobile vs. Desktop Structural Adaptation', 'Wireframe Specification Output'] },
  { name: 'visual-design-and-art-direction', keyPhrases: ['Light, Spacious, and High-Contrast', 'The SAURIK IT Color Palette', 'Icon & Graphic Asset Discipline'] },
  { name: 'website-design-system', keyPhrases: ['Core Design Tokens', 'The 8 Mandatory Component Interaction States', 'Component Specification Output Format'] },
  { name: 'responsive-interaction-design', keyPhrases: ['Responsive Viewport Matrix', 'Touch Targets (44px to 48px)', 'Mobile Drawer & Modal Disclosures'] },
  { name: 'accessibility-and-usability-review', keyPhrases: ['Color Contrast & Visual Perception', 'Keyboard Navigability & Focus Management', 'Touch Target Sizing'] },

  // QA Reviewer Skills
  { name: 'qa-acceptance-review', keyPhrases: ['Dual-Path Scenario Derivation', 'Test Scenarios Matrix', 'Happy Path'] },
  { name: 'qa-risk-based-test-planning', keyPhrases: ['Risk Classification Matrix', 'Tier 1: Critical Risk', 'Change Blast Radius'] },
  { name: 'qa-browser-testing', keyPhrases: ['Real User Journey Walkthrough', 'Testing Component State Sequences', 'Browser Test Log'] },
  { name: 'qa-code-review', keyPhrases: ['Specification & Acceptance Criteria Parity', 'Error Handling & Asynchronous Resilience', 'Findings Matrix'] },
  { name: 'qa-responsive-visual-review', keyPhrases: ['5-Viewport Audit Matrix', 'Mobile Small (360px)', 'Visual Defect Checklist'] },
  { name: 'qa-accessibility-testing', keyPhrases: ['Keyboard-Only Operability Walkthrough', 'Form Labels & Error Association', 'Accessibility Test Report'] },
  { name: 'qa-api-integration-testing', keyPhrases: ['API Test Scenarios & Invariants', 'Happy Path & Payload Integrity', 'Fast-Fail Timeout & Downstream Outage'] },
  { name: 'qa-defect-triage-and-retest', keyPhrases: ['Defect Severity Triage Guidelines', 'Standard Defect Report Format', 'Steps to Reproduce'] },
  { name: 'qa-release-readiness', keyPhrases: ['Core Release Gates', 'Release Readiness Report Format', 'Executive Recommendation'] },

  // Shared Cross-Role Skills
  { name: 'agent-handoff', keyPhrases: ['Agent Handoff', 'Standard Handoff Matrix', 'handoff-template.md'] },
  { name: 'team-learning', keyPhrases: ['Step 0: Pre-Flight Memory Check', 'Anti-Thrashing Circuit Breaker', 'Lesson Graduation Ladder'] },
  { name: 'shared-agent-workflow', keyPhrases: ['Always-On Shared Agent Workflow', 'Scaled Workflow Tiers', 'Tier 1: Simple', 'Skill Routing & Maintainable Code'] },
];

for (const modSkill of modularSkills) {
  const modSkillPath = path.resolve(__dirname, '../.agents/skills', modSkill.name, 'SKILL.md');
  check(fs.existsSync(modSkillPath), `.agents/skills/${modSkill.name}/SKILL.md exists`);
  if (fs.existsSync(modSkillPath)) {
    const content = fs.readFileSync(modSkillPath, 'utf8');
    check(content.startsWith('---') && content.includes(`name: ${modSkill.name}`), `${modSkill.name} contains valid YAML frontmatter`);
    const allPhrasesPresent = modSkill.keyPhrases.every((phrase) => content.includes(phrase));
    check(allPhrasesPresent, `${modSkill.name} contains required tactical sections (${modSkill.keyPhrases.join(', ')})`);
  }
}

// 8. Verify Standard Handoff Templates
console.log('\n8. Verifying Standard Handoff Templates (docs/templates/)...');
const templates = [
  'prd-template.md',
  'user-stories-template.md',
  'handoff-template.md',
];

for (const tmpl of templates) {
  const tmplPath = path.resolve(__dirname, '../docs/templates', tmpl);
  check(fs.existsSync(tmplPath), `docs/templates/${tmpl} exists`);
}

// 9. Verify File-Based Markdown Handoff Hierarchy & Reference Specs
console.log('\n9. Verifying File-Based Markdown Handoff Structure (docs/*)...');
const handoffDirs = [
  { dir: 'product', file: 'contact-form-requirements.md', phrase: 'FEAT-001' },
  { dir: 'design', file: 'contact-form-design.md', phrase: 'FEAT-001' },
  { dir: 'architecture', file: 'contact-form-architecture.md', phrase: 'FEAT-001' },
  { dir: 'tasks', file: 'contact-form-tasks.md', phrase: 'FEAT-001' },
  { dir: 'qa', file: 'contact-form-test-report.md', phrase: 'FEAT-001' },
  { dir: 'handoffs', file: 'FEAT-001-contact-form.md', phrase: 'FEAT-001' },
];

for (const item of handoffDirs) {
  const dirPath = path.resolve(__dirname, '../docs', item.dir);
  check(fs.existsSync(dirPath), `docs/${item.dir}/ directory exists`);

  const filePath = path.resolve(dirPath, item.file);
  check(fs.existsSync(filePath), `docs/${item.dir}/${item.file} reference spec exists`);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    check(content.includes(item.phrase), `${item.file} contains feature tracking tag (${item.phrase})`);
  }
}

console.log('\n======================================================');
if (failed) {
  console.error('❌ SOME RECURSIVE LEARNING CHECKS FAILED!');
  process.exit(1);
} else {
  console.log('✅ ALL RECURSIVE LEARNING & MODULAR SKILL CHECKS PASSED!');
  console.log('======================================================\n');
}

import React, { useState } from 'react';
import { Bot, ShieldAlert, CheckCircle2, Play, ArrowRight, Terminal, Cpu, UserCheck } from 'lucide-react';
import { AGENTIC_WORKFLOW_STEPS } from '../data/softwareData';

const AgenticWorkflow = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [simulating, setSimulating] = useState(false);

  const handleSimulate = () => {
    setSimulating(true);
    let step = 1;
    setActiveStep(step);
    const interval = setInterval(() => {
      step += 1;
      if (step > 4) {
        clearInterval(interval);
        setSimulating(false);
      } else {
        setActiveStep(step);
      }
    }, 1200);
  };

  const current = AGENTIC_WORKFLOW_STEPS.find(s => s.id === activeStep) || AGENTIC_WORKFLOW_STEPS[0];

  return (
    <div className="bg-surface rounded-panel border border-border-subtle p-6 lg:p-8 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-teal uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4" />
            <span>Illustrative Workflow Model</span>
          </div>
          <h3 className="text-xl font-bold text-ink-primary font-heading">
            Agentic AI Execution Pipeline with Human Review Gates
          </h3>
          <p className="text-xs text-ink-secondary mt-0.5">
            This is not a client case study. Inspect how scoped permissions and human review could be arranged for a consequential workflow.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSimulate}
          disabled={simulating}
          className="btn-primary text-xs py-2 px-4 whitespace-nowrap self-start sm:self-center"
        >
          <Play className={`w-3.5 h-3.5 ${simulating ? 'animate-spin' : ''}`} />
          <span>{simulating ? 'Simulating Step...' : 'Simulate Workflow'}</span>
        </button>
      </div>

      {/* Steps Navigation Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-6 pb-6">
        {AGENTIC_WORKFLOW_STEPS.map((step) => {
          const isSelected = activeStep === step.id;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(step.id)}
              className={`p-3 rounded-control text-left transition-all border ${
                isSelected
                  ? 'bg-accent-teal-light/50 border-accent-teal text-ink-primary font-semibold shadow-sm'
                  : 'bg-canvas border-border-subtle text-ink-secondary hover:border-border-hover'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`font-mono font-bold ${isSelected ? 'text-accent-teal' : 'text-ink-muted'}`}>
                  0{step.id}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${isSelected ? 'bg-accent-teal text-white' : 'bg-slate-200 text-ink-secondary'}`}>
                  {step.badge}
                </span>
              </div>
              <div className="text-xs font-heading font-medium truncate">
                {step.role}
              </div>
            </button>
          );
        })}
      </div>

      {/* Step Detail Card */}
      <div className="bg-canvas rounded-control p-5 border border-border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-teal"></span>
            <span className="text-xs font-mono uppercase tracking-wider text-accent-teal font-bold">
              Stage 0{current.id} • {current.role}
            </span>
          </div>
          <h4 className="text-base font-bold text-ink-primary font-heading">
            {current.title}
          </h4>
          <p className="text-sm text-ink-secondary">
            {current.description}
          </p>
          <div className="text-xs text-ink-secondary bg-surface p-3 rounded border border-border-subtle font-mono mt-2">
            <span className="text-accent-teal font-bold">$ verification: </span>
            {current.details}
          </div>
        </div>

        {/* Security / Verification Badge */}
        <div className="p-4 bg-surface rounded-control border border-border-subtle flex-shrink-0 w-full md:w-64 text-center md:text-left space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted flex items-center gap-1.5 justify-center md:justify-start">
            {current.id === 3 ? (
              <UserCheck className="w-4 h-4 text-amber-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-accent-teal" />
            )}
            <span>{current.id === 3 ? 'Human Review' : 'Illustrative Control'}</span>
          </div>
          <div className="text-xs font-bold text-ink-primary">
            {current.id === 3 ? 'Approval Before Consequential Action' : 'Scoped Permission Boundary'}
          </div>
          <p className="text-[11px] text-ink-secondary">
            {current.id === 3 
              ? 'The proposed action pauses until an authorised reviewer approves or rejects it.'
              : 'The design would allow only the tools and actions agreed for this workflow.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgenticWorkflow;

import React, { useMemo, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import PositionSelector from './PositionSelector';

const JobOpenings = ({ jobs = [], onApply }) => {
  const departments = useMemo(() => Array.from(new Set(jobs.map(j => j.department))), [jobs]);
  const [activeDep, setActiveDep] = useState('All');
  const filtered = useMemo(() => activeDep === 'All' ? jobs : jobs.filter(j => j.department === activeDep), [jobs, activeDep]);

  const [expanded, setExpanded] = useState(null);

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-headline-bold text-foreground">Open Positions</h2>
        </div>
        <div className="mb-6">
          <PositionSelector departments={departments} active={activeDep} onChange={setActiveDep} />
        </div>
        <div className="space-y-4">
          {filtered.map((job) => (
            <div key={job.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-foreground">{job.title}</div>
                  <div className="text-sm text-muted-foreground">{job.department} • {job.location} • {job.type}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="px-2 py-1 rounded bg-muted/50">Exp: {job.experience}</span>
                  <span className="px-2 py-1 rounded bg-muted/50">CTC: {job.salaryRange}</span>
                  <Button size="sm" onClick={() => onApply?.(job)}>Apply</Button>
                </div>
              </div>
              <button onClick={() => setExpanded(expanded === job.id ? null : job.id)} className="mt-3 text-sm text-primary hover:text-primary/80">
                {expanded === job.id ? 'Hide details' : 'View details'}
              </button>
              {expanded === job.id && (
                <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium mb-2">Description</div>
                    <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Requirements</div>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {job.requirements.map((r, i) => (<li key={i}>{r}</li>))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Key Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((s, i) => (
                        <span key={i} className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobOpenings;

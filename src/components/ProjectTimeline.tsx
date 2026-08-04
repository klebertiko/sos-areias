import React from 'react';
import { Calendar, CheckCircle, Clock, ArrowRight, Zap } from 'lucide-react';
import { TimelineStep } from '../types';

interface ProjectTimelineProps {
  steps: TimelineStep[];
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ steps }) => {
  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
      <div>
        <h3 className="text-2xl font-black text-white flex items-center gap-2">
          <Zap className="text-red-500" size={24} />
          Cronograma das Obras e Etapas
        </h3>
        <p className="text-sm text-zinc-400 mt-1">
          Planejamento estratégico para garantir durabilidade e rápida execução da reforma.
        </p>
      </div>

      <div className="relative pl-6 border-l-2 border-zinc-800 space-y-8">
        {steps.map((step) => {
          const isDone = step.status === 'concluido';
          const isActive = step.status === 'em_andamento';

          return (
            <div key={step.phase} className="relative group">
              {/* Timeline Bullet */}
              <div
                className={`absolute -left-[31px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isDone
                    ? 'bg-green-500 border-green-400 text-zinc-950'
                    : isActive
                    ? 'bg-red-500 border-red-400 text-white animate-pulse'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-500'
                }`}
              >
                {isDone ? (
                  <CheckCircle size={14} className="stroke-[3]" />
                ) : (
                  <span className="font-mono text-xs font-bold">{step.phase}</span>
                )}
              </div>

              {/* Card Content */}
              <div className="bg-zinc-950 border border-zinc-800/80 p-5 rounded-xl space-y-2 hover:border-zinc-700 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Calendar size={13} />
                    {step.date}
                  </span>

                  <span
                    className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
                      isDone
                        ? 'bg-green-500/10 text-green-400 border-green-500/30'
                        : isActive
                        ? 'bg-red-500/10 text-red-400 border-red-500/30'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}
                  >
                    {isDone ? 'Concluído' : isActive ? 'Em Andamento' : 'A Caminho'}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white">
                  Etapa {step.phase}: {step.title}
                </h4>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {step.description}
                </p>

                {/* Highlights pill list */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {step.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono bg-zinc-900 text-zinc-400 px-2.5 py-1 rounded-md border border-zinc-800"
                    >
                      • {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

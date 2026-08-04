import React, { useMemo } from 'react';
import { Target, PieChart, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { BudgetItem, BudgetTheme } from '../types';

interface BudgetBreakdownProps {
  items: BudgetItem[];
  totalGoal: number;
  raised?: number;
}

const THEME_STYLES: Record<BudgetTheme, { bg: string; text: string; border: string; bar: string }> = {
  yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', bar: 'bg-yellow-500' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', bar: 'bg-cyan-500' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', bar: 'bg-emerald-500' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', bar: 'bg-purple-500' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30', bar: 'bg-rose-500' },
};

const fmtBRL = (value: number) => `R$ ${value.toLocaleString('pt-BR')}`;

export const BudgetBreakdown: React.FC<BudgetBreakdownProps> = ({ items, totalGoal, raised = 0 }) => {
  // Compute items with exact dynamic percentages and sequential funding progress
  const calculatedItems = useMemo(() => {
    let remainingRaised = raised;

    return items.map((item) => {
      const pctNumber = totalGoal > 0 ? (item.cost / totalGoal) * 100 : 0;
      const pctString = pctNumber.toFixed(1);

      // Sequential funding allocation for progress bar
      const funded = Math.min(remainingRaised, item.cost);
      remainingRaised = Math.max(0, remainingRaised - item.cost);
      const percentFunded = item.cost > 0 ? Math.min(100, Math.round((funded / item.cost) * 100)) : 0;

      return {
        ...item,
        exactPctNumber: pctNumber,
        exactPctString: pctString,
        funded,
        percentFunded,
        themeStyle: THEME_STYLES[item.theme],
      };
    });
  }, [items, totalGoal, raised]);

  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-zinc-800">
        <h3 className="text-2xl font-black text-white flex items-center gap-2">
          <Target className="text-red-500" size={24} />
          Transparência: Onde cada centavo será investido?
        </h3>
        <p className="text-sm text-zinc-400">
          Orçamento técnico da Ruaria Skateparks, com base em vistoria in loco e cotações reais de materiais, insumos e mão de obra.
        </p>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 font-mono block">Meta Total Prevista</span>
            <span className="text-xl font-black text-red-400 font-mono">{fmtBRL(totalGoal)}</span>
          </div>
          <PieChart className="text-red-500/40" size={24} />
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 font-mono block">Itens Mapeados</span>
            <span className="text-xl font-black text-white font-mono">{items.length} Categorias</span>
          </div>
          <Target className="text-zinc-600" size={24} />
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 font-mono block">Execução Técnica</span>
            <span className="text-xl font-black text-green-400 font-mono">Ruaria Skateparks</span>
          </div>
          <CheckCircle2 className="text-green-500/40" size={24} />
        </div>
      </div>

      {/* 100% Stacked Distribution Bar */}
      <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-300 font-bold uppercase flex items-center gap-1.5">
            <PieChart size={14} className="text-red-400" />
            Distribuição do Orçamento (100% do valor)
          </span>
          <span className="text-red-400 font-bold">Total: {fmtBRL(totalGoal)}</span>
        </div>

        {/* Stacked Bar Fill */}
        <div className="w-full bg-zinc-900 rounded-lg h-3 overflow-hidden flex">
          {calculatedItems.map((item) => (
            <div
              key={item.id}
              className={`h-full ${item.themeStyle.bar} transition-all relative group cursor-pointer border-r border-zinc-950 last:border-0`}
              style={{ width: `${item.exactPctNumber}%` }}
              title={`${item.category}: ${item.exactPctString}% (${fmtBRL(item.cost)})`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-[11px] font-mono">
          {calculatedItems.map((item) => (
            <div key={item.id} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${item.themeStyle.bar}`} />
              <span className="text-zinc-300 font-medium">{item.category}:</span>
              <span className={`font-bold ${item.themeStyle.text}`}>{item.exactPctString}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {calculatedItems.map((item) => {
          const theme = item.themeStyle;

          return (
            <div
              key={item.id}
              className="bg-zinc-950 border border-zinc-800 p-5 rounded-xl space-y-3 hover:border-zinc-700 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-mono font-bold uppercase px-2.5 py-1 ${theme.bg} ${theme.text} border ${theme.border} rounded-md`}>
                    {item.category}
                  </span>
                  <div className="text-right">
                    <span className="font-mono font-black text-base text-white block">
                      {fmtBRL(item.cost)}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {item.exactPctString}% do total
                    </span>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-snug">
                  {item.description}
                </p>
              </div>

              {/* Progress Bar for Category Funding */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-900">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400">
                    Arrecadado: <strong className="text-white">{fmtBRL(item.funded)}</strong> ({item.percentFunded}%)
                  </span>

                  <span className="flex items-center gap-1">
                    {item.status === 'concluido' || item.percentFunded >= 100 ? (
                      <span className="text-green-400 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Comprado / Financiado
                      </span>
                    ) : item.status === 'em_andamento' ? (
                      <span className="text-red-400 flex items-center gap-1">
                        <Clock size={12} /> Em Cotação
                      </span>
                    ) : (
                      <span className="text-zinc-400 flex items-center gap-1">
                        <AlertCircle size={12} /> Aguardando Arrecadação
                      </span>
                    )}
                  </span>
                </div>

                <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden p-0.5 border border-zinc-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.percentFunded >= 100 || item.status === 'concluido'
                        ? 'bg-green-500'
                        : item.percentFunded > 0
                        ? theme.bar
                        : 'bg-zinc-800'
                    }`}
                    style={{ width: `${Math.max(item.percentFunded, item.status === 'concluido' ? 100 : 0)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note about execution model */}
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-300/90 leading-relaxed font-medium">
        💬 <strong>Execução Profissional + Mutirão:</strong> Lapidar e resinar concreto exige equipe especializada — por isso parte do valor cobre a Ruaria Skateparks. A comunidade contribui com mutirões de limpeza, logística, alimentação e divulgação.
      </div>

    </section>
  );
};

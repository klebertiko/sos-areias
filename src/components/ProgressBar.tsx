import React from 'react';
import { Heart, Share2, Users } from 'lucide-react';

interface ProgressBarProps {
  raised: number;
  goal: number;
  supporterCount: number;
  onOpenDonation: (amount?: string) => void;
  onOpenShare: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  raised,
  goal,
  supporterCount,
  onOpenDonation,
  onOpenShare,
}) => {
  const progressPercent = Math.min((raised / goal) * 100, 100);

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 sticky top-20 shadow-2xl space-y-6">
      
      {/* Financial Numbers */}
      <div>
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">Total Arrecadado</p>
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-1">
              <span className="text-red-500 font-mono text-2xl">R$</span>
              {raised.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">Meta Final</p>
            <p className="text-lg font-bold text-zinc-300 font-mono">
              R$ {goal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-full bg-zinc-950 rounded-full h-5 p-1 border border-zinc-800 overflow-hidden my-3">
          <div
            className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full transition-all duration-700 relative shadow-[0_0_12px_rgba(239,68,68,0.5)] overflow-hidden"
            style={{ width: `${progressPercent}%` }}
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2s_infinite]" />
          </div>
        </div>

        <div className="flex justify-between items-center text-xs font-mono font-bold text-zinc-400">
          <span className="text-red-400">{progressPercent.toFixed(1)}% ALCANÇADO</span>
          <span className="flex items-center gap-1 text-zinc-300">
            <Users size={14} className="text-red-500" />
            {supporterCount} Apoiadores
          </span>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => onOpenDonation()}
          className="w-full bg-red-500 hover:bg-red-400 text-white font-black text-lg py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
        >
          <Heart className="fill-current" size={22} />
          <span>Fazer Doação via PIX</span>
        </button>

        <button
          onClick={onOpenShare}
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-zinc-700/50"
        >
          <Share2 size={18} />
          <span>Compartilhar Vaquinha</span>
        </button>
      </div>

      {/* Trust Notice */}
      <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-center">
        <p className="text-xs text-zinc-400">
          🔒 <strong className="text-zinc-300">Doação Direta via PIX:</strong> Sem taxas abusivas de intermediários. 100% repassado ao material da obra.
        </p>
      </div>

    </div>
  );
};

import React from 'react';
import { Heart, Share2, Users, Trophy, Sparkles, Copy, Check } from 'lucide-react';
import { RewardTier } from '../types';

interface ProgressBarProps {
  raised: number;
  goal: number;
  supporterCount: number;
  rewards: RewardTier[];
  onOpenDonation: (amount?: string) => void;
  onOpenShare: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  raised,
  goal,
  supporterCount,
  rewards,
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
              <span className="text-yellow-500 font-mono text-2xl">R$</span>
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
            className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-full rounded-full transition-all duration-700 relative shadow-[0_0_12px_rgba(234,179,8,0.5)]"
            style={{ width: `${progressPercent}%` }}
          >
            {/* Shimmer line */}
            <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
          </div>
        </div>

        <div className="flex justify-between items-center text-xs font-mono font-bold text-zinc-400">
          <span className="text-yellow-400">{progressPercent.toFixed(1)}% ALCANÇADO</span>
          <span className="flex items-center gap-1 text-zinc-300">
            <Users size={14} className="text-yellow-500" />
            {supporterCount} Apoiadores
          </span>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => onOpenDonation()}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-black text-lg py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.25)]"
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

      {/* Quick Reward Selector */}
      {rewards.length > 0 && (
      <div className="pt-2 border-t border-zinc-800">
        <h4 className="font-bold text-sm text-zinc-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Trophy size={16} className="text-yellow-500" />
          Recompensas Simbólicas
        </h4>

        <div className="space-y-3">
          {rewards.map((reward) => (
            <button
              key={reward.id}
              onClick={() => onOpenDonation(reward.amount.toString())}
              className={`w-full text-left p-4 rounded-xl transition-all border group relative overflow-hidden ${
                reward.popular
                  ? 'bg-zinc-950 border-yellow-500/60 hover:border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.1)]'
                  : 'bg-zinc-950/60 hover:bg-zinc-950 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {reward.popular && (
                <div className="absolute top-0 right-0 bg-yellow-500 text-zinc-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-bl-lg font-mono">
                  Mais Escolhido
                </div>
              )}

              <div className="flex justify-between items-baseline mb-1">
                <span className="font-mono font-black text-lg text-yellow-400">
                  R$ {reward.amount}
                </span>
              </div>

              <h5 className="font-bold text-sm text-zinc-100 group-hover:text-yellow-400 transition-colors">
                {reward.title}
              </h5>

              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                {reward.description}
              </p>

              <div className="mt-2.5 pt-2 border-t border-zinc-900 flex items-center text-[11px] text-yellow-500/80 font-mono">
                <span>Clique para selecionar R$ {reward.amount} →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      )}

      {/* Trust Notice */}
      <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-center">
        <p className="text-xs text-zinc-400">
          🔒 <strong className="text-zinc-300">Doação Direta via PIX:</strong> Sem taxas abusivas de intermediários. 100% repassado ao material da obra.
        </p>
      </div>

    </div>
  );
};

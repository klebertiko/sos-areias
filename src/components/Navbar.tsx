import React from 'react';
import { Hammer, Heart, Share2, Sparkles, Volume2, VolumeX, Lock } from 'lucide-react';

interface NavbarProps {
  raised: number;
  goal: number;
  onOpenDonation: (amount?: string) => void;
  onOpenShare: () => void;
  onOpenAdmin: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  raised,
  goal,
  onOpenDonation,
  onOpenShare,
  onOpenAdmin,
  soundEnabled,
  onToggleSound,
}) => {
  const percent = Math.min(Math.round((raised / goal) * 100), 100);

  return (
    <header className="fixed top-0 w-full bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-red-500 text-white p-2 rounded-lg font-mono font-black text-xl shadow-[2px_2px_0px_#000] flex items-center justify-center">
            <Hammer size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                S.O.S AREIAS
              </h1>
            </div>
            <p className="text-xs text-zinc-400 hidden md:block">
              Reforma da Pista de Skate de Areias • Mutirão Comunitário
            </p>
          </div>
        </div>

        {/* Progress Quick Badge & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
            <div className="text-right text-xs">
              <span className="text-zinc-400 block">Progresso</span>
              <span className="font-mono font-bold text-red-400">{percent}% (R$ {raised.toLocaleString('pt-BR')})</span>
            </div>
            <div className="w-16 bg-zinc-800 rounded-full h-2 overflow-hidden border border-zinc-700">
              <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
            </div>
          </div>

          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-red-400 transition-colors flex items-center gap-1.5"
            title="Painel Admin do Coletivo (Gerenciar PIX e Cronograma)"
          >
            <Lock size={18} />
            <span className="hidden sm:inline text-xs font-mono font-bold">Admin</span>
          </button>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Som ativado' : 'Som desativado'}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
          >
            {soundEnabled ? <Volume2 size={18} className="text-red-400" /> : <VolumeX size={18} />}
          </button>

          <button
            onClick={onOpenShare}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
            title="Compartilhar vaquinha"
          >
            <Share2 size={18} />
          </button>

          <button
            onClick={() => onOpenDonation()}
            className="bg-red-500 hover:bg-red-400 text-white font-black px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(239,68,68,0.25)] flex items-center gap-2 text-sm"
          >
            <Heart size={18} className="fill-current" />
            <span>Apoiar PIX</span>
          </button>
        </div>

      </div>
    </header>
  );
};

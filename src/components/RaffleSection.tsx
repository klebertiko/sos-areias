import React from 'react';
import { Ticket } from 'lucide-react';
import { Raffle } from '../types';

interface RaffleSectionProps {
  raffles: Raffle[];
}

export const RaffleSection: React.FC<RaffleSectionProps> = ({ raffles }) => {
  const activeRaffles = raffles.filter((raffle) => raffle.status === 'ativa');

  if (activeRaffles.length === 0) return null;

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 shadow-2xl space-y-6">
      <div className="flex items-center gap-2">
        <Ticket className="text-red-500" size={20} />
        <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">Rifas Solidárias</p>
      </div>

      <div className="space-y-4">
        {activeRaffles.map((raffle) => (
          <div key={raffle.id} className="space-y-3">
            <div>
              <p className="font-bold text-white">{raffle.title}</p>
              <p className="text-sm text-zinc-400">{raffle.description}</p>
            </div>
            <a
              href={raffle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-red-500 hover:bg-red-400 text-white font-black text-lg py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
            >
              <Ticket size={22} />
              <span>Participar da Rifa</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

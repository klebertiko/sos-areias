import React from 'react';
import { Hammer, MapPin, CheckCircle2, Flame } from 'lucide-react';
import skateparkPhotoImg from '../assets/images/track-photos/vista-geral-1.webp';

interface HeroSectionProps {
  onOpenDonation: (amount?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDonation }) => {
  return (
    <section className="space-y-6">

      {/* Hero Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-red-500 text-white font-black text-xs uppercase px-3 py-1 rounded-full font-mono flex items-center gap-1.5 shadow-[0_0_12px_rgba(239,68,68,0.25)]">
            <Flame size={14} className="fill-current" />
            Mutirão Coletivo 2026
          </span>
          <span className="text-xs text-zinc-400 flex items-center gap-1">
            <MapPin size={14} className="text-red-500" />
            Areias do Campeche • Florianópolis/SC
          </span>
        </div>
      </div>

      {/* Main Hero Image Frame */}
      <div className="relative h-72 sm:h-96 md:h-[420px] w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 group shadow-2xl flex items-center justify-center">
        <img
          src={skateparkPhotoImg}
          alt="Pista de Skate de Areias"
          className="w-full h-full object-cover scale-[1.01] group-hover:scale-105 transition-all duration-500"
        />

        {/* Subtle vignette gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

        {/* Real park indicator badge */}
        <div className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-red-400 font-mono text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span>Foto real da pista</span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 p-6 sm:p-8 max-w-3xl space-y-2 pointer-events-none">
          <h2 className="text-3xl sm:text-5xl font-black leading-tight text-white tracking-tight drop-shadow-md">
            Reforma da Pista de Skate de Areias
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base font-medium line-clamp-2 sm:line-clamp-none">
            Lapidação profissional do concreto, correção das fissuras estruturais e recuperação dos corrimãos e copings metálicos.
          </p>
        </div>
      </div>

      {/* Narrative Story (Authentic, no AI slop) */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4 text-zinc-300 leading-relaxed text-base sm:text-lg">
        <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Hammer className="text-red-500" size={24} />
          Por que precisamos do seu apoio hoje?
        </h3>

        <p>
          Salve família do skate! A pista pública de Areias do Campeche (Rua Jardim dos Eucaliptos, entre Campeche e Morro das Pedras) é um espaço vivo de esporte, convivência e cultura, usado diariamente por crianças, jovens e adultos. A própria comunidade já mobilizou reparos por conta própria — prova do quanto esse espaço importa.
        </p>

        <p>
          Anos de uso intenso e chuva deixaram marcas sérias: fissuras extensas, concreto desplacado, drenagem inadequada e corrimãos/copings oxidados e desalinhados — comprometendo a segurança de quem anda ali.
        </p>

        <p className="bg-zinc-950 border-l-4 border-red-500 p-4 rounded-r-xl font-medium text-zinc-200 text-sm sm:text-base">
          💡 <strong className="text-red-400">Objetivo da Campanha:</strong> A revitalização completa está orçada em R$ 55.370 pela Ruaria Skateparks — mas a obra começa em setembro ou outubro mesmo sem atingir 100% da meta. Cada real acelera a lapidação, a resinagem e o retorno da pista à comunidade.
        </p>

        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-xs font-semibold text-zinc-300">
          <div className="flex items-center justify-center gap-2 bg-zinc-950 px-3 py-2.5 rounded-xl border border-zinc-800 text-center">
            <CheckCircle2 size={16} className="text-green-400 shrink-0" />
            <span>Transparência em tempo real</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-zinc-950 px-3 py-2.5 rounded-xl border border-zinc-800 text-center">
            <CheckCircle2 size={16} className="text-green-400 shrink-0" />
            <span>Projeto técnico assinado pela Ruaria Skateparks</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-zinc-950 px-3 py-2.5 rounded-xl border border-zinc-800 text-center">
            <CheckCircle2 size={16} className="text-green-400 shrink-0" />
            <span>Prestação de contas semanal</span>
          </div>
        </div>
      </div>

    </section>
  );
};

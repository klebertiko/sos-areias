import React from 'react';
import { Users, Handshake, Instagram, Award } from 'lucide-react';
import { PROJECT_PARTNERS, SOCIAL_LINKS, SPONSOR_TIERS, SPONSOR_BENEFITS, TRACK_PHOTOS } from '../data/mockData';
import { PhotoGallery } from './PhotoGallery';

const linkPillClass = "flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors";

export const AboutProject: React.FC = () => {
  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">

      <div className="space-y-2 pb-4 border-b border-zinc-800">
        <h3 className="text-2xl font-black text-white flex items-center gap-2">
          <Users className="text-yellow-500" size={24} />
          Quem está por trás dessa reforma?
        </h3>
        <p className="text-sm text-zinc-400">
          O S.O.S Areias nasceu de uma parceria entre quem tem o conhecimento técnico e quem vive a pista todo dia.
        </p>
      </div>

      <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
        Nos últimos meses, a própria comunidade de Areias já vinha se mobilizando e fazendo reparos por conta própria para conter o avanço das rachaduras. Foi esse movimento espontâneo que motivou a aproximação com a Ruaria Skateparks, empresa especializada em pistas de skate, que fez a vistoria técnica completa e assinou o projeto oficial de revitalização. Da união entre o conhecimento técnico da Ruaria e a mobilização da comunidade nasceu essa campanha.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {PROJECT_PARTNERS.map((partner) => (
          <div key={partner.id} className="bg-zinc-950 border border-zinc-800 p-5 rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <Handshake size={16} className="text-yellow-500 shrink-0" />
              <span className="font-bold text-white">{partner.name}</span>
            </div>
            <span className="text-xs font-mono uppercase text-yellow-400/90">{partner.role}</span>
            <p className="text-sm text-zinc-400 leading-snug">{partner.description}</p>
          </div>
        ))}
      </div>

      {/* Sponsor tiers for companies */}
      <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-xl space-y-3">
        <div className="flex items-center gap-2">
          <Award size={16} className="text-yellow-500 shrink-0" />
          <span className="font-bold text-white text-sm">Empresa quer apoiar? Existem cotas de patrocínio</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          O valor total de R$ 55.370 também pode ser assumido, integral ou parcialmente, por empresas parceiras — com contrapartidas de marca no projeto. Fale com a gente pelo Instagram ou pelo PIX de contato.
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {SPONSOR_TIERS.map((tier) => (
            <span key={tier.id} className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-zinc-300">
              <strong className="text-yellow-400">{tier.label}</strong> · {tier.range}
            </span>
          ))}
        </div>

        <div className="pt-3 border-t border-zinc-800/80 space-y-2">
          <span className="text-xs font-mono uppercase text-zinc-400">Benefícios para empresas parceiras</span>
          <div className="grid sm:grid-cols-2 gap-2">
            {SPONSOR_BENEFITS.map((benefit) => (
              <div key={benefit.id} className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-lg">
                <p className="text-xs font-bold text-zinc-200">{benefit.title}</p>
                <p className="text-[11px] text-zinc-500 leading-snug">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo gallery */}
      <div className="pt-2 border-t border-zinc-800">
        <PhotoGallery photos={TRACK_PHOTOS} />
      </div>

      {/* Social links */}
      <div className="flex flex-wrap items-center gap-2">
        {SOCIAL_LINKS.map((link) => (
          <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className={linkPillClass}>
            <Instagram size={13} className="text-yellow-500" />
            {link.handle}
          </a>
        ))}
      </div>

    </section>
  );
};

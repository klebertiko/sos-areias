import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';

interface LgpdBannerProps {
  onOpenPrivacy: () => void;
}

export const LgpdBanner: React.FC<LgpdBannerProps> = ({ onOpenPrivacy }) => {
  const [accepted, setAccepted] = useState(true); // Default true until mounted

  useEffect(() => {
    const consent = localStorage.getItem('areias_lgpd_consent');
    if (!consent) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = (type: 'all' | 'essential') => {
    localStorage.setItem('areias_lgpd_consent', type);
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-zinc-950/98 border-t border-zinc-800 backdrop-blur-md shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3 max-w-3xl">
          <div className="p-2 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 shrink-0 mt-0.5">
            <Cookie size={20} />
          </div>
          <div className="text-xs text-zinc-300 leading-relaxed space-y-1">
            <p className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-red-400" />
              Respeito à LGPD (Lei Geral de Proteção de Dados - Lei 13.709/2018)
            </p>
            <p className="text-zinc-400">
              Não usamos cookies de rastreamento nem de terceiros. Usamos apenas armazenamento local do seu navegador (localStorage) para salvar o estado da sua doação e suas preferências. Suas informações pessoais (nome/apelido) fornecidas no mural são utilizadas apenas para reconhecimento do seu apoio.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-end">
          <button
            onClick={onOpenPrivacy}
            className="text-xs text-zinc-400 hover:text-white underline font-mono px-2 py-1.5"
          >
            Saber Mais & Termos
          </button>
          
          <button
            onClick={() => handleAccept('essential')}
            className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl border border-zinc-700 transition-colors"
          >
            Apenas Essenciais
          </button>

          <button
            onClick={() => handleAccept('all')}
            className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white text-xs font-black rounded-xl transition-all shadow-[0_0_10px_rgba(239,68,68,0.2)]"
          >
            Aceitar Todos
          </button>
        </div>

      </div>
    </div>
  );
};

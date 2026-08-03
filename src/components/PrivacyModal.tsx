import React from 'react';
import { X, ShieldCheck, Lock, FileText, Trash2, Mail } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  pixKey: string;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, pixKey, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8 animate-[slideUp_0.2s_ease-out]">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-500/10 text-yellow-400 rounded-xl border border-yellow-500/20">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="font-bold text-white text-xl">Política de Privacidade & LGPD</h3>
              <p className="text-xs text-zinc-400 font-mono">Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-sm text-zinc-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <Lock size={16} className="text-yellow-400" />
              1. Compromisso com a Transparência e Segurança
            </h4>
            <p className="text-xs text-zinc-400">
              A vaquinha comunitária "Reforma Pista de Skate Areias" compromete-se a proteger a privacidade dos doadores e visitantes, coletando exclusivamente os dados estritamente necessários para a operacionalização da arrecadação e divulgação dos apoiadores no mural público.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <FileText size={16} className="text-yellow-400" />
              2. Dados Coletados e Finalidades do Tratamento
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-300">
              <li><strong>Nome ou Apelido:</strong> Utilizados para identificação e exibição no Mural de Apoiadores da pista.</li>
              <li><strong>Telefone / WhatsApp e E-mail:</strong> Coletados exclusivamente para contato logístico e alinhamento de envio/entrega das recompensas do mutirão (kits de adesivos e camisetas oficiais da Pista de Areias), amparado pelo Art. 7º, V da LGPD.</li>
              <li><strong>Tamanho da Camiseta (P, M, G, GG, XG):</strong> Coletado para a produção personalizada das peças enviadas aos doadores das categorias de recompensa.</li>
              <li><strong>Mensagem de Apoio e Base (Stance):</strong> Exibidas no mural para incentivo comunitário do mutirão.</li>
              <li><strong>Valor da Contribuição:</strong> Utilizado unicamente para o somatório e atualização em tempo real da meta do projeto.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <Trash2 size={16} className="text-yellow-400" />
              3. Direitos do Titular dos Dados (Seus Direitos)
            </h4>
            <p className="text-xs text-zinc-400">
              Nos termos do Art. 18 da LGPD, você possui o direito de a qualquer momento solicitar:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-300">
              <li>Confirmação da existência de tratamento dos seus dados;</li>
              <li>Anonimização, bloqueio ou eliminação do seu nome e mensagem do Mural de Apoiadores;</li>
              <li>Revogação do consentimento concedido.</li>
            </ul>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <Mail size={16} className="text-yellow-400" />
              4. Contato do Encarregado / Coletivo
            </h4>
            <p className="text-xs text-zinc-400">
              Para exercer seus direitos de privacidade ou tirar dúvidas sobre o projeto, entre em contato diretamente com os organizadores através do e-mail: <strong className="text-yellow-400">{pixKey}</strong>.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-zinc-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-black text-xs uppercase rounded-xl transition-all"
          >
            Entendido, Fechar
          </button>
        </div>

      </div>
    </div>
  );
};

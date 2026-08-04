import React, { useState } from 'react';
import { X, ShieldCheck, Lock, FileText, Trash2, Mail, Scale, Heart, Cookie, Database } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  pixKey: string;
  onClose: () => void;
}

type Tab = 'termos' | 'privacidade' | 'cookies';

const tabs: { id: Tab; label: string }[] = [
  { id: 'termos', label: 'Termos de Uso' },
  { id: 'privacidade', label: 'Privacidade & LGPD' },
  { id: 'cookies', label: 'Cookies' },
];

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, pixKey, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('termos');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-2xl p-6 sm:p-8 space-y-5 shadow-2xl my-8 animate-[slideUp_0.2s_ease-out]">

        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-500/10 text-yellow-400 rounded-xl border border-yellow-500/20">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="font-bold text-white text-xl">Termos, Privacidade & Cookies</h3>
              <p className="text-xs text-zinc-400 font-mono">LGPD — Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono uppercase transition-colors border ${
                activeTab === tab.id
                  ? 'bg-yellow-500 text-zinc-950 border-yellow-500'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-sm text-zinc-300 leading-relaxed max-h-[55vh] overflow-y-auto pr-2">

          {activeTab === 'termos' && (
            <>
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <Scale size={16} className="text-yellow-400" />
                  1. O que é o S.O.S Areias
                </h4>
                <p className="text-xs text-zinc-400">
                  O S.O.S Areias é uma iniciativa comunitária sem fins lucrativos e sem personalidade jurídica própria, mantida pela parceria entre a <strong>Ruaria Skateparks</strong> (projeto técnico e execução da obra) e a <strong>comunidade do skate de Areias do Campeche</strong> (mobilização e mutirão). Este site serve para divulgar o projeto, arrecadar doações voluntárias e mostrar o andamento da reforma.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <Heart size={16} className="text-yellow-400" />
                  2. Natureza das Doações
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-300">
                  <li>As doações são <strong>voluntárias</strong> e feitas diretamente via PIX à chave divulgada no site — o site não processa, armazena nem tem acesso a dados bancários ou de pagamento.</li>
                  <li>Contribuições confirmadas são registradas manualmente pelos organizadores no Painel do Coletivo para atualizar o total arrecadado e o mural de apoiadores.</li>
                  <li>Por serem doações espontâneas, não há reembolso, exceto em caso comprovado de erro operacional (ex.: valor duplicado por falha técnica).</li>
                  <li>Recompensas (adesivos, camiseta, nome no mural) dependem da produção e logística do coletivo local e podem sofrer atraso conforme o andamento da obra.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <FileText size={16} className="text-yellow-400" />
                  3. Conteúdo e Uso do Site
                </h4>
                <p className="text-xs text-zinc-400">
                  Orçamento, cronograma e demais informações do projeto seguem o projeto técnico assinado pela Ruaria Skateparks. Esses dados podem ser atualizados pelos organizadores conforme o avanço real da obra. Mensagens e nomes enviados ao Mural de Apoiadores são publicados publicamente; os organizadores podem editar ou remover conteúdo ofensivo, falso ou inadequado.
                </p>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <Mail size={16} className="text-yellow-400" />
                  4. Contato
                </h4>
                <p className="text-xs text-zinc-400">
                  Dúvidas sobre estes termos podem ser enviadas para: <strong className="text-yellow-400">{pixKey}</strong>.
                </p>
              </div>
            </>
          )}

          {activeTab === 'privacidade' && (
            <>
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <Lock size={16} className="text-yellow-400" />
                  1. Compromisso com a Transparência e Segurança
                </h4>
                <p className="text-xs text-zinc-400">
                  O S.O.S Areias compromete-se a proteger a privacidade dos doadores e visitantes, coletando exclusivamente os dados estritamente necessários para a operacionalização da arrecadação e divulgação dos apoiadores no mural público.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <FileText size={16} className="text-yellow-400" />
                  2. Dados Coletados e Finalidades do Tratamento
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-300">
                  <li><strong>Nome ou Apelido:</strong> utilizados para identificação e exibição no Mural de Apoiadores da pista.</li>
                  <li><strong>Telefone / WhatsApp e E-mail:</strong> coletados exclusivamente para contato logístico e alinhamento de envio/entrega das recompensas do mutirão (adesivos e camisetas oficiais), amparado pelo Art. 7º, V da LGPD.</li>
                  <li><strong>Tamanho da Camiseta (P, M, G, GG, XG):</strong> coletado para a produção personalizada das peças enviadas aos doadores.</li>
                  <li><strong>Mensagem de Apoio e Base (Stance):</strong> exibidas no mural para incentivo comunitário do mutirão.</li>
                  <li><strong>Valor da Contribuição:</strong> utilizado unicamente para o somatório e atualização em tempo real da meta do projeto.</li>
                </ul>
                <p className="text-xs text-zinc-500 pt-1">
                  O site não possui backend próprio: esses dados ficam salvos apenas no navegador de quem preenche o formulário (ver aba Cookies) até serem repassados manualmente aos organizadores para fins de contato e logística.
                </p>
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
                  <li>Acesso, correção ou portabilidade dos seus dados;</li>
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
                  Para exercer seus direitos de privacidade ou tirar dúvidas sobre o tratamento de dados, entre em contato diretamente com os organizadores através do e-mail: <strong className="text-yellow-400">{pixKey}</strong>.
                </p>
              </div>
            </>
          )}

          {activeTab === 'cookies' && (
            <>
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <Cookie size={16} className="text-yellow-400" />
                  1. Este site não usa cookies de rastreamento
                </h4>
                <p className="text-xs text-zinc-400">
                  O S.O.S Areias é um site 100% client-side, sem servidor próprio, sem serviço de analytics e sem cookies de terceiros ou de publicidade. Nada do que você faz aqui é enviado para nenhum servidor — tudo roda no seu próprio navegador.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <Database size={16} className="text-yellow-400" />
                  2. Armazenamento Local (localStorage)
                </h4>
                <p className="text-xs text-zinc-400">
                  Para o site funcionar sem um backend, usamos o armazenamento local do seu navegador (<code className="text-yellow-400/90">localStorage</code>) — não são cookies HTTP, e os dados nunca saem do seu dispositivo. É o que guarda:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-300">
                  <li><strong>Total arrecadado e meta</strong> — para manter a barra de progresso atualizada entre visitas.</li>
                  <li><strong>Mural de apoiadores</strong> — nomes, mensagens e curtidas exibidos publicamente.</li>
                  <li><strong>Chave PIX e cronograma da obra</strong> — editáveis pelos organizadores no Painel do Coletivo.</li>
                  <li><strong>Recompensas para doadores</strong> — lista exibida na barra lateral de apoio.</li>
                  <li><strong>Sua preferência neste banner de consentimento.</strong></li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <Trash2 size={16} className="text-yellow-400" />
                  3. Como remover
                </h4>
                <p className="text-xs text-zinc-400">
                  Todos esses dados são essenciais ao funcionamento do site (não há cookies "não essenciais" a desativar). Você pode apagá-los a qualquer momento limpando os dados de navegação/armazenamento local do site nas configurações do seu navegador.
                </p>
              </div>
            </>
          )}

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

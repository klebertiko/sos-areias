import React, { useState, useEffect, useRef } from 'react';
import { X, Copy, CheckCircle2, Heart, Hammer, Sparkles, QrCode, ShieldCheck, Phone, Mail, User } from 'lucide-react';
import { drawPixelQrCode, generatePixPayload } from '../utils/pix';
import { SkateStance, Supporter } from '../types';

interface PixModalProps {
  isOpen: boolean;
  initialAmount?: string;
  pixKey: string;
  onClose: () => void;
  onConfirmDonation: (supporterData: Omit<Supporter, 'id' | 'date' | 'likes'>) => void;
}

export const PixModal: React.FC<PixModalProps> = ({
  isOpen,
  initialAmount = '50',
  pixKey,
  onClose,
  onConfirmDonation,
}) => {
  const [amount, setAmount] = useState<string>(initialAmount || '50');
  const [donorName, setDonorName] = useState('');
  const [donorNickname, setDonorNickname] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorStance, setDonorStance] = useState<SkateStance>('Regular');
  const [donorMessage, setDonorMessage] = useState('');
  const [agreedLgpd, setAgreedLgpd] = useState(true);

  const [copied, setCopied] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const numericAmount = parseFloat(amount) || 0;
  const pixPayload = generatePixPayload(pixKey, numericAmount);

  useEffect(() => {
    if (initialAmount) {
      setAmount(initialAmount);
    }
  }, [initialAmount]);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      drawPixelQrCode(canvasRef.current, pixPayload);
    }
  }, [isOpen, amount, pixPayload]);

  if (!isOpen) return null;

  const handleCopyPix = () => {
    const textArea = document.createElement("textarea");
    textArea.value = pixPayload;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Falha ao copiar payload PIX', err);
    }
    document.body.removeChild(textArea);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (numericAmount <= 0) return;

    setSimulating(true);
    setTimeout(() => {
      onConfirmDonation({
        name: donorName.trim() || 'Apoiador Anônimo',
        nickname: donorNickname.trim() || undefined,
        stance: donorStance,
        amount: numericAmount,
        message: donorMessage.trim() || 'Apoiou a reforma da pista!',
        phone: donorPhone.trim() || undefined,
        email: donorEmail.trim() || undefined,
      });
      setSimulating(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-zinc-900 border-2 border-zinc-700 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl my-8 animate-[slideUp_0.3s_ease-out]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-500 text-zinc-950 p-2 rounded-xl">
              <Heart className="fill-current" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Apoiar via PIX Instântaneo</h3>
              <p className="text-xs text-zinc-400 font-mono">100% Repassado ao Mutirão de Areias</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Preset Amount Selector */}
          <div>
            <label className="text-xs font-mono text-zinc-400 block mb-2 uppercase tracking-wider">
              1. Selecione ou digite o valor do PIX:
            </label>
            <div className="grid grid-cols-5 gap-1.5 mb-3">
              {['20', '50', '100', '250', '500'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className={`py-2 rounded-xl font-mono font-bold text-xs sm:text-sm transition-all border ${
                    amount === preset
                      ? 'bg-yellow-500 text-zinc-950 border-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.3)]'
                      : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  R$ {preset}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-yellow-500 text-sm">
                R$
              </span>
              <input
                type="number"
                min="1"
                placeholder="Qualquer outro valor livre..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 font-mono text-white text-base focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
          </div>

          {/* QR Code Pixel Canvas */}
          <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl text-center space-y-3">
            <div className="inline-block p-3 bg-white rounded-2xl border-4 border-zinc-800 shadow-inner">
              <canvas
                ref={canvasRef}
                width={180}
                height={180}
                className="pixelated block mx-auto"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs text-zinc-400 font-mono">
                Escaneie o QR Code no app do banco ou utilize as opções de cópia abaixo:
              </p>
              <div className="bg-zinc-900 border border-zinc-800/80 p-2.5 rounded-xl text-xs font-mono text-yellow-400 font-bold select-all break-all">
                {pixKey}
              </div>
            </div>

            {/* Dual Copy Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(pixKey);
                  setCopiedKey(true);
                  setTimeout(() => setCopiedKey(false), 2000);
                }}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 border ${
                  copiedKey
                    ? 'bg-green-500/20 text-green-400 border-green-500/40'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-800'
                }`}
              >
                {copiedKey ? <CheckCircle2 size={15} /> : <Copy size={15} />}
                <span>{copiedKey ? 'Chave Copiada!' : 'Copiar Chave PIX'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyPix}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 border ${
                  copied
                    ? 'bg-green-500/20 text-green-400 border-green-500/40'
                    : 'bg-yellow-500 hover:bg-yellow-400 text-zinc-950 border-yellow-400 shadow-md font-extrabold'
                }`}
              >
                {copied ? <CheckCircle2 size={15} /> : <QrCode size={15} />}
                <span>{copied ? 'Payload Copiado!' : 'Copiar PIX Copia e Cola'}</span>
              </button>
            </div>
          </div>

          {/* Detailed Form for Instant Confirmation */}
          <form onSubmit={handleSimulatePayment} className="space-y-4 bg-zinc-950/80 p-4 sm:p-5 border border-zinc-800 rounded-2xl">
            <div className="border-b border-zinc-800 pb-2">
              <p className="text-xs font-mono text-yellow-400 font-bold uppercase flex items-center gap-1.5">
                <Sparkles size={15} />
                2. Cadastro para o Mural de Apoiadores:
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Preencha para ter seu nome no mural e permitir o contato de confirmação da doação.
              </p>
            </div>

            {/* Name & Nickname */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-mono text-zinc-400 block mb-1">Seu Nome / Razão Social:</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Ex: João da Silva"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-zinc-400 block mb-1">Apelido (Opcional):</label>
                <input
                  type="text"
                  placeholder='Ex: "Flip"'
                  value={donorNickname}
                  onChange={(e) => setDonorNickname(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            {/* Phone/WhatsApp & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-mono text-zinc-400 block mb-1">WhatsApp / Telefone:</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="tel"
                    placeholder="(48) 99999-9999"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-zinc-400 block mb-1">E-mail de Contato:</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>
            </div>

            {/* Stance */}
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Sua Base no Skate:</label>
              <select
                value={donorStance}
                onChange={(e) => setDonorStance(e.target.value as SkateStance)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="Regular">Regular</option>
                <option value="Goofy">Goofy</option>
                <option value="Local">Local de Areias</option>
                <option value="Simpatizante">Simpatizante / Amigo do Skate</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Mensagem para o Mural da Pista:</label>
              <input
                type="text"
                placeholder="Ex: Força Areias! A pista vai ficar incrível."
                value={donorMessage}
                onChange={(e) => setDonorMessage(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* LGPD Consent Checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="lgpdConsentCheck"
                checked={agreedLgpd}
                onChange={(e) => setAgreedLgpd(e.target.checked)}
                className="mt-0.5 rounded accent-yellow-500"
              />
              <label htmlFor="lgpdConsentCheck" className="text-[10px] text-zinc-400 leading-tight">
                Concordo com o uso dos meus dados de contato (WhatsApp/Email) para envio de confirmações da doação (LGPD Lei nº 13.709/2018).
              </label>
            </div>

            <button
              type="submit"
              disabled={simulating || numericAmount <= 0 || !agreedLgpd}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-black py-3 rounded-xl transition-all hover:scale-[1.01] active:scale-95 shadow-[0_0_15px_rgba(234,179,8,0.2)] disabled:opacity-50 flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
            >
              {simulating ? (
                <span className="font-mono text-xs animate-pulse">Registrando PIX...</span>
              ) : (
                <>
                  <Heart className="fill-current" size={18} />
                  <span>Confirmar Doação de R$ {numericAmount.toLocaleString('pt-BR')}</span>
                </>
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

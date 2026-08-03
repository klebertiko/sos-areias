import React, { useState } from 'react';
import { X, Copy, CheckCircle2, Share2, MessageCircle, Instagram } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://skate-areias.com.br';
  const shareText = "Bora salvar a Pista de Skate de Areias! Apoie o mutirão de reforma ou compartilhe com a galera: ";

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${currentUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-md p-6 space-y-6 shadow-2xl animate-[slideUp_0.2s_ease-out]">
        
        <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <Share2 className="text-yellow-500" size={20} />
            Compartilhar Vaquinha
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed">
          Compartilhar nos grupos de skate e nas redes sociais é tão importante quanto doar. Ajude a espalhar a palavra!
        </p>

        <div className="space-y-3">
          <button
            onClick={handleWhatsAppShare}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle size={20} />
            <span>Compartilhar no WhatsApp</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors border border-zinc-700"
          >
            {copied ? (
              <>
                <CheckCircle2 size={20} className="text-green-400" />
                <span className="text-green-400">Link Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={20} />
                <span>Copiar Link para Stories</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

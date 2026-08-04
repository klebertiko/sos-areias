import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, Heart, User, Sparkles } from 'lucide-react';
import { SkateStance, Supporter } from '../types';

interface SupportersWallProps {
  supporters: Supporter[];
  onAddSupporter: (supporter: Omit<Supporter, 'id' | 'date' | 'likes'>) => void;
  onLikeSupporter: (id: string) => void;
  onOpenDonation: () => void;
}

export const SupportersWall: React.FC<SupportersWallProps> = ({
  supporters,
  onAddSupporter,
  onLikeSupporter,
  onOpenDonation,
}) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [stance, setStance] = useState<SkateStance>('Regular');
  const [amount, setAmount] = useState('50');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onAddSupporter({
      name: name.trim(),
      nickname: nickname.trim() || undefined,
      stance,
      amount: parseFloat(amount) || 20,
      message: message.trim(),
    });

    setSubmitted(true);
    setName('');
    setNickname('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h3 className="text-2xl font-black text-white flex items-center gap-2">
            <MessageSquare className="text-red-500" size={24} />
            Mural da Galera & Mensagens de Apoio
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Quem apoia o skate em Areias fica gravado para sempre na história do pico.
          </p>
        </div>

        <button
          onClick={onOpenDonation}
          className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-zinc-950 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5"
        >
          <Heart size={14} className="fill-current" />
          <span>Fazer Doação para Aparecer no Mural</span>
        </button>
      </div>

      {/* Leave a Support Message Form */}
      <form onSubmit={handleSubmit} className="bg-zinc-950 border border-zinc-800 p-5 rounded-xl space-y-4">
        <h4 className="font-bold text-sm text-white flex items-center gap-2 uppercase tracking-wider font-mono">
          <Sparkles size={16} className="text-red-500" />
          Deixe seu recado e apoio ao projeto
        </h4>

        {submitted && (
          <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono rounded-lg flex items-center gap-2">
            ✨ Mensagem gravada com sucesso! Obrigado por apoiar a pista de Areias!
          </div>
        )}

        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-mono text-zinc-400 block mb-1">Seu Nome *</label>
            <input
              type="text"
              required
              placeholder="Ex: João Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 block mb-1">Apelido no Skate</label>
            <input
              type="text"
              placeholder="Ex: Jhow Flip"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 block mb-1">Sua Base (Stance)</label>
            <select
              value={stance}
              onChange={(e) => setStance(e.target.value as SkateStance)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
            >
              <option value="Regular">Regular</option>
              <option value="Goofy">Goofy</option>
              <option value="Local">Local de Areias</option>
              <option value="Simpatizante">Simpatizante</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-zinc-400 block mb-1">Sua Mensagem de Apoio *</label>
          <textarea
            required
            rows={2}
            placeholder="Mande um salve pra rapaziada do pico ou conte uma lembrança da pista..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
          />
        </div>

        <div className="flex justify-between items-center pt-1">
          <span className="text-[11px] text-zinc-500 font-mono">
            * Mensagens públicas para incentivar o mutirão.
          </span>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-400 text-zinc-950 font-black px-5 py-2 rounded-lg text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <Send size={14} />
            <span>Publicar Recado</span>
          </button>
        </div>
      </form>

      {/* Supporters List Grid */}
      <div className="space-y-3">
        {supporters.length === 0 ? (
          <div className="bg-zinc-950/60 border border-dashed border-zinc-800 p-8 rounded-xl text-center space-y-2">
            <Sparkles size={28} className="text-red-500 mx-auto" />
            <h5 className="font-bold text-white text-base">Seja o primeiro a apoiar a pista de Areias!</h5>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Faça sua doação via PIX para inaugurar o mural de apoiadores e ajudar a transformar a reforma em realidade.
            </p>
            <button
              onClick={onOpenDonation}
              className="mt-3 inline-flex items-center gap-2 bg-red-500 hover:bg-red-400 text-zinc-950 font-black px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition-all"
            >
              <Heart size={14} className="fill-current" />
              <span>Apoiar Agora</span>
            </button>
          </div>
        ) : (
          supporters.map((sup) => (
            <div
              key={sup.id}
              className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl space-y-2 hover:border-zinc-700 transition-colors"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center font-mono font-bold text-xs uppercase">
                    {sup.name.substring(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-sm text-white">{sup.name}</h5>
                      {sup.nickname && (
                        <span className="text-xs text-red-400/90 font-mono font-semibold">
                          "{sup.nickname}"
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                      <span className="text-zinc-500">{sup.date}</span>
                      <span>•</span>
                      <span className="bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-300">
                        Base: {sup.stance}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="font-mono font-black text-sm text-red-400 bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20">
                  Apoiou com R$ {sup.amount}
                </span>
              </div>

              <p className="text-sm text-zinc-300 italic pl-10 border-l-2 border-zinc-800 my-1">
                "{sup.message}"
              </p>

              <div className="pl-10 pt-1 flex justify-end">
                <button
                  onClick={() => onLikeSupporter(sup.id)}
                  className="text-xs font-mono text-zinc-400 hover:text-red-400 flex items-center gap-1.5 transition-colors bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800"
                >
                  <ThumbsUp size={13} className="hover:scale-110 transition-transform" />
                  <span>{sup.likes} Salves</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </section>
  );
};

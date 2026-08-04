import React, { useState } from 'react';
import { X, Lock, Key, Calendar, Plus, Trash2, Pencil, Check, CheckCircle2, Save, ShieldAlert, Users, Phone, Mail } from 'lucide-react';
import { Supporter, TimelineStep } from '../types';
import { INITIAL_GOAL } from '../data/mockData';

const ADMIN_PASSCODES = ['areias.plaza'];

interface AdminModalProps {
  isOpen: boolean;
  pixKey: string;
  onUpdatePixKey: (key: string) => void;
  timelineSteps: TimelineStep[];
  onUpdateTimelineSteps: (steps: TimelineStep[]) => void;
  totalGoal: number;
  onUpdateGoal: (goal: number) => void;
  raised: number;
  onUpdateRaised: (raised: number) => void;
  supporters: Supporter[];
  onAddSupporter: (data: Omit<Supporter, 'id' | 'date' | 'likes'>) => void;
  onEditSupporter: (id: string, updates: Partial<Pick<Supporter, 'name' | 'amount'>>) => void;
  onDeleteSupporter: (id: string) => void;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  pixKey,
  onUpdatePixKey,
  timelineSteps,
  onUpdateTimelineSteps,
  totalGoal,
  onUpdateGoal,
  raised,
  onUpdateRaised,
  supporters,
  onAddSupporter,
  onEditSupporter,
  onDeleteSupporter,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Editable states
  const [editablePixKey, setEditablePixKey] = useState(pixKey);
  const [editableGoal, setEditableGoal] = useState(totalGoal.toString());
  const [editableRaised, setEditableRaised] = useState(raised.toString());
  const [steps, setSteps] = useState<TimelineStep[]>(timelineSteps);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Step form state
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // New manual donation form state
  const [newDonorName, setNewDonorName] = useState('');
  const [newDonorAmount, setNewDonorAmount] = useState('');
  const [newDonorMessage, setNewDonorMessage] = useState('');

  // Inline donation-amount edit state
  const [editingSupporterId, setEditingSupporterId] = useState<string | null>(null);
  const [editingAmount, setEditingAmount] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (ADMIN_PASSCODES.includes(pinInput.trim().toLowerCase())) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSaveAll = () => {
    onUpdatePixKey(editablePixKey.trim());
    const parsedGoal = parseFloat(editableGoal);
    onUpdateGoal(Number.isNaN(parsedGoal) ? INITIAL_GOAL : Math.max(0, parsedGoal));
    const parsedRaised = parseFloat(editableRaised);
    onUpdateRaised(Number.isNaN(parsedRaised) ? raised : Math.max(0, parsedRaised));
    onUpdateTimelineSteps(steps);

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleStatusChange = (phase: number, status: TimelineStep['status']) => {
    setSteps((prev) =>
      prev.map((s) => (s.phase === phase ? { ...s, status } : s))
    );
  };

  const handleDeleteStep = (phase: number) => {
    setSteps((prev) => prev.filter((s) => s.phase !== phase));
  };

  const handleAddStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const maxPhase = steps.reduce((max, s) => Math.max(max, s.phase), 0);
    const newStepItem: TimelineStep = {
      phase: maxPhase + 1,
      title: newTitle.trim(),
      date: newDate.trim() || 'A definir',
      description: newDesc.trim() || 'Nova etapa cadastrada no cronograma do mutirão.',
      status: 'proximo',
      highlights: [],
    };

    setSteps((prev) => [...prev, newStepItem]);
    setNewTitle('');
    setNewDate('');
    setNewDesc('');
  };

  const handleAddDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(newDonorAmount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) return;

    onAddSupporter({
      name: newDonorName.trim() || 'Apoiador Anônimo',
      stance: 'Simpatizante',
      amount: parsedAmount,
      message: newDonorMessage.trim() || 'Doação registrada pelo Painel do Coletivo.',
    });

    setNewDonorName('');
    setNewDonorAmount('');
    setNewDonorMessage('');
  };

  const handleStartEditAmount = (sup: Supporter) => {
    setEditingSupporterId(sup.id);
    setEditingAmount(sup.amount.toString());
  };

  const handleConfirmEditAmount = (id: string) => {
    const parsedAmount = parseFloat(editingAmount);
    if (!Number.isNaN(parsedAmount) && parsedAmount > 0) {
      onEditSupporter(id, { amount: parsedAmount });
    }
    setEditingSupporterId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8 animate-[slideUp_0.2s_ease-out]">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-500 text-zinc-950 rounded-xl font-mono font-bold">
              <Lock size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-xl">Painel de Gestão do Coletivo</h3>
              <p className="text-xs text-zinc-400 font-mono">Gerenciamento de PIX, Progresso, Cronograma e Doações</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Auth Gate */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="space-y-4 py-4 max-w-md mx-auto text-center">
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2">
              <ShieldAlert className="text-yellow-400 mx-auto" size={32} />
              <h4 className="font-bold text-white text-base">Acesso Restrito aos Organizadores</h4>
              <p className="text-xs text-zinc-400">
                Digite a senha de acesso da comissão da Pista de Areias para editar as chaves PIX e cronograma da obra.
              </p>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-xs font-mono text-zinc-400 block uppercase">
                Senha de Acesso:
              </label>
              <input
                type="password"
                placeholder="Digite a senha..."
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-yellow-500"
              />
              {pinError && (
                <p className="text-xs text-red-400 font-mono">Senha incorreta.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-black text-sm uppercase rounded-xl transition-all shadow-lg"
            >
              Entrar no Painel
            </button>
          </form>
        ) : (
          /* Admin Controls */
          <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
            
            {/* Success alert */}
            {saveSuccess && (
              <div className="bg-green-500/20 border border-green-500/40 text-green-400 p-3 rounded-xl flex items-center gap-2 font-mono text-xs font-bold">
                <CheckCircle2 size={18} />
                <span>Configurações atualizadas com sucesso e aplicadas ao site!</span>
              </div>
            )}

            {/* General Settings */}
            <div className="bg-zinc-950 p-4 sm:p-5 rounded-2xl border border-zinc-800 space-y-4">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <Key className="text-yellow-400" size={18} />
                Chave PIX, Meta e Progresso
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    Chave PIX Oficial do Mutirão:
                  </label>
                  <input
                    type="text"
                    value={editablePixKey}
                    onChange={(e) => setEditablePixKey(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-yellow-400 font-mono font-bold focus:outline-none focus:border-yellow-500"
                  />
                  <span className="text-[10px] text-zinc-500 font-mono">Atualiza o QR Code e payload automaticamente.</span>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    Meta Total Prevista (R$):
                  </label>
                  <input
                    type="number"
                    value={editableGoal}
                    onChange={(e) => setEditableGoal(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-yellow-500"
                  />
                  <span className="text-[10px] text-zinc-500 font-mono">Meta orçamentária do projeto.</span>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1">
                    Total Arrecadado (R$):
                  </label>
                  <input
                    type="number"
                    value={editableRaised}
                    onChange={(e) => setEditableRaised(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-yellow-500"
                  />
                  <span className="text-[10px] text-zinc-500 font-mono">Ajuste manual do progresso (ex: doações recebidas fora do site).</span>
                </div>
              </div>
            </div>

            {/* Timeline Steps Management */}
            <div className="bg-zinc-950 p-4 sm:p-5 rounded-2xl border border-zinc-800 space-y-4">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <Calendar className="text-yellow-400" size={18} />
                Gerenciar Cronograma e Etapas
              </h4>

              {/* Current steps list */}
              <div className="space-y-2">
                {steps.map((step) => (
                  <div
                    key={step.phase}
                    className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5 max-w-sm">
                      <p className="font-bold text-white text-sm">{step.title}</p>
                      <p className="text-zinc-400 text-[11px] font-mono">{step.date} • {step.description}</p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <select
                        value={step.status}
                        onChange={(e) => handleStatusChange(step.phase, e.target.value as TimelineStep['status'])}
                        className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-yellow-500"
                      >
                        <option value="concluido">Concluído</option>
                        <option value="em_andamento">Em Andamento</option>
                        <option value="proximo">Próximo</option>
                      </select>

                      <button
                        onClick={() => handleDeleteStep(step.phase)}
                        className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-950 rounded-lg transition-colors"
                        title="Remover etapa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Step Form */}
              <form onSubmit={handleAddStep} className="pt-3 border-t border-zinc-800/80 space-y-2">
                <p className="text-xs font-mono font-bold text-yellow-400 uppercase flex items-center gap-1">
                  <Plus size={14} />
                  Adicionar Nova Etapa ao Cronograma:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Título da Etapa (ex: Compra do Cimento)"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Data prevista (ex: Agosto/2026)"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Descrição da etapa..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                />

                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-lg transition-colors disabled:opacity-50"
                >
                  Adicionar Etapa
                </button>
              </form>
            </div>

            {/* Supporters List */}
            <div className="bg-zinc-950 p-4 sm:p-5 rounded-2xl border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <Users className="text-yellow-400" size={18} />
                  Apoiadores ({supporters.length})
                </h4>
                <span className="text-[11px] font-mono text-zinc-400">
                  Total Arrecadado: R$ {raised.toLocaleString('pt-BR')}
                </span>
              </div>

              <p className="text-xs text-zinc-400 font-mono">
                Lista de dados colhidos dos apoiadores para contato e mural (Protegido por LGPD):
              </p>

              {/* Add Manual Donation Form */}
              <form onSubmit={handleAddDonation} className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl space-y-2">
                <p className="text-xs font-mono font-bold text-yellow-400 uppercase flex items-center gap-1">
                  <Plus size={14} />
                  Registrar Doação Manual (ex: recebida fora do site):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Nome do apoiador"
                    value={newDonorName}
                    onChange={(e) => setNewDonorName(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="number"
                    placeholder="Valor (R$)"
                    value={newDonorAmount}
                    onChange={(e) => setNewDonorAmount(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Mensagem (opcional)"
                    value={newDonorMessage}
                    onChange={(e) => setNewDonorMessage(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newDonorAmount.trim()}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-lg transition-colors disabled:opacity-50"
                >
                  Adicionar Doação
                </button>
              </form>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {supporters.length === 0 ? (
                  <p className="text-xs text-zinc-500 font-mono italic py-2">Nenhum apoiador registrado ainda.</p>
                ) : (
                  supporters.map((sup) => (
                    <div
                      key={sup.id}
                      className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{sup.name}</span>
                          {sup.nickname && (
                            <span className="text-[10px] text-yellow-400 font-mono">"{sup.nickname}"</span>
                          )}
                          {editingSupporterId === sup.id ? (
                            <span className="flex items-center gap-1">
                              <input
                                type="number"
                                autoFocus
                                value={editingAmount}
                                onChange={(e) => setEditingAmount(e.target.value)}
                                className="w-20 bg-zinc-950 border border-yellow-500/50 rounded px-1.5 py-0.5 text-yellow-400 font-mono font-bold text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => handleConfirmEditAmount(sup.id)}
                                className="p-1 text-green-400 hover:bg-zinc-950 rounded"
                                title="Confirmar valor"
                              >
                                <Check size={14} />
                              </button>
                            </span>
                          ) : (
                            <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded font-mono font-bold">
                              R$ {sup.amount}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400 font-mono">
                          {sup.phone && (
                            <span className="flex items-center gap-1 text-zinc-300">
                              <Phone size={11} className="text-green-400" /> {sup.phone}
                            </span>
                          )}
                          {sup.email && (
                            <span className="flex items-center gap-1 text-zinc-300">
                              <Mail size={11} className="text-yellow-400" /> {sup.email}
                            </span>
                          )}
                          <span>Base: {sup.stance}</span>
                          <span>{sup.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 self-end sm:self-center">
                        <button
                          onClick={() => handleStartEditAmount(sup)}
                          className="p-1.5 text-zinc-500 hover:text-yellow-400 hover:bg-zinc-950 rounded-lg transition-colors"
                          title="Editar valor da doação"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => onDeleteSupporter(sup.id)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-950 rounded-lg transition-colors"
                          title="Excluir apoiador"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2 text-right">
              <button
                onClick={handleSaveAll}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-black text-sm uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)] flex items-center gap-2 ml-auto"
              >
                <Save size={18} />
                <span>Salvar Todas as Alterações</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

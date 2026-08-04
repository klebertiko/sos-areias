import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Hammer, Share2, Sparkles, Volume2, VolumeX, ShieldCheck, Lock, Linkedin, Globe } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutProject } from './components/AboutProject';
import { ProgressBar } from './components/ProgressBar';
import { BudgetBreakdown } from './components/BudgetBreakdown';
import { ProjectTimeline } from './components/ProjectTimeline';
import { SupportersWall } from './components/SupportersWall';
import { PixModal } from './components/PixModal';
import { ShareModal } from './components/ShareModal';
import { LgpdBanner } from './components/LgpdBanner';
import { PrivacyModal } from './components/PrivacyModal';
import { AdminModal } from './components/AdminModal';
import {
  BUDGET_ITEMS,
  DEFAULT_PIX_KEY,
  INITIAL_GOAL,
  INITIAL_RAISED,
  INITIAL_SUPPORTERS,
  TIMELINE_STEPS,
} from './data/mockData';
import { Supporter, TimelineStep } from './types';
import { soundEngine } from './utils/audio';
import {
  fetchState,
  saveState,
  addSupporterApi,
  likeSupporterApi,
  editSupporterAmountApi,
  deleteSupporterApi,
} from './utils/api';

export default function App() {
  const [raised, setRaised] = useState<number>(() => {
    const saved = localStorage.getItem('areias_raised_v3');
    return saved ? parseFloat(saved) : INITIAL_RAISED;
  });

  const [supporters, setSupporters] = useState<Supporter[]>(() => {
    const saved = localStorage.getItem('areias_supporters_v3');
    try {
      return saved ? JSON.parse(saved) : INITIAL_SUPPORTERS;
    } catch {
      return INITIAL_SUPPORTERS;
    }
  });

  const [pixKey, setPixKey] = useState<string>(() => {
    const saved = localStorage.getItem('areias_pix_key_v3');
    return saved || DEFAULT_PIX_KEY;
  });

  const [totalGoal, setTotalGoal] = useState<number>(() => {
    const saved = localStorage.getItem('areias_goal_v3');
    return saved ? parseFloat(saved) : INITIAL_GOAL;
  });

  const [timelineSteps, setTimelineSteps] = useState<TimelineStep[]>(() => {
    const saved = localStorage.getItem('areias_timeline_v3');
    try {
      return saved ? JSON.parse(saved) : TIMELINE_STEPS;
    } catch {
      return TIMELINE_STEPS;
    }
  });

  const [isPixOpen, setIsPixOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string>('50');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [adminPasscode, setAdminPasscode] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('areias_raised_v3', raised.toString());
  }, [raised]);

  useEffect(() => {
    localStorage.setItem('areias_supporters_v3', JSON.stringify(supporters));
  }, [supporters]);

  useEffect(() => {
    localStorage.setItem('areias_pix_key_v3', pixKey);
  }, [pixKey]);

  useEffect(() => {
    localStorage.setItem('areias_goal_v3', totalGoal.toString());
  }, [totalGoal]);

  useEffect(() => {
    localStorage.setItem('areias_timeline_v3', JSON.stringify(timelineSteps));
  }, [timelineSteps]);

  // Hydrate from Neon (source of truth) once on mount; localStorage above stays as instant-paint fallback.
  useEffect(() => {
    fetchState()
      .then((state) => {
        if (state.pixKey !== null) setPixKey(state.pixKey);
        if (state.goal !== null) setTotalGoal(state.goal);
        if (state.raised !== null) setRaised(state.raised);
        if (state.timelineSteps.length > 0) setTimelineSteps(state.timelineSteps);
        setSupporters(state.supporters);
      })
      .catch((err) => console.warn('Falha ao carregar dados do servidor, usando cache local:', err));
  }, []);

  const handleOpenDonation = useCallback((amount = '50') => {
    soundEngine.playClickSound();
    setSelectedAmount(amount);
    setIsPixOpen(true);
  }, []);

  const handleToggleSound = useCallback(() => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEngine.enabled = next;
    if (next) soundEngine.playClickSound();
  }, [soundEnabled]);

  const handleAddSupporter = useCallback((newSupporter: Omit<Supporter, 'id' | 'date' | 'likes'>) => {
    soundEngine.playCoinSound();
    const created: Supporter = {
      ...newSupporter,
      id: Date.now().toString(),
      date: 'Agora mesmo',
      likes: 1,
    };

    setSupporters((prev) => [created, ...prev]);
    setRaised((prev) => prev + newSupporter.amount);
    addSupporterApi(newSupporter).catch((err) => console.error('Falha ao salvar apoiador:', err));
  }, []);

  const handleLikeSupporter = useCallback((id: string) => {
    soundEngine.playClickSound();
    setSupporters((prev) =>
      prev.map((s) => (s.id === id ? { ...s, likes: s.likes + 1 } : s))
    );
    likeSupporterApi(id).catch((err) => console.error('Falha ao curtir apoiador:', err));
  }, []);

  const handleOpenShare = useCallback(() => {
    soundEngine.playClickSound();
    setIsShareOpen(true);
  }, []);

  const handleOpenAdmin = useCallback(() => {
    soundEngine.playClickSound();
    setIsAdminOpen(true);
  }, []);

  const handleDeleteSupporter = useCallback((id: string) => {
    const sup = supporters.find((s) => s.id === id);
    if (sup) {
      setRaised((prev) => Math.max(0, prev - sup.amount));
    }
    setSupporters((prev) => prev.filter((s) => s.id !== id));
    if (adminPasscode) {
      deleteSupporterApi(adminPasscode, id).catch((err) => console.error('Falha ao excluir apoiador:', err));
    }
  }, [supporters, adminPasscode]);

  const handleEditSupporter = useCallback((id: string, updates: Partial<Pick<Supporter, 'name' | 'amount'>>) => {
    const sup = supporters.find((s) => s.id === id);
    if (!sup) return;

    if (updates.amount !== undefined) {
      setRaised((prev) => Math.max(0, prev - sup.amount + updates.amount!));
      if (adminPasscode) {
        editSupporterAmountApi(adminPasscode, id, updates.amount).catch((err) => console.error('Falha ao editar apoiador:', err));
      }
    }
    setSupporters((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  }, [supporters, adminPasscode]);

  const handleAdminAuthenticated = useCallback((passcode: string) => {
    setAdminPasscode(passcode);
    fetchState(passcode)
      .then((state) => setSupporters(state.supporters))
      .catch((err) => console.warn('Falha ao carregar dados de contato dos apoiadores:', err));
  }, []);

  const handleSaveAdminState = useCallback((data: { pixKey: string; goal: number; raised: number; timelineSteps: TimelineStep[] }) => {
    setPixKey(data.pixKey);
    setTotalGoal(data.goal);
    setRaised(data.raised);
    setTimelineSteps(data.timelineSteps);
    if (adminPasscode) {
      saveState(adminPasscode, data).catch((err) => console.error('Falha ao salvar configurações:', err));
    }
  }, [adminPasscode]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500 selection:text-white relative">
      
      {/* Top Navbar */}
      <Navbar
        raised={raised}
        goal={totalGoal}
        onOpenDonation={handleOpenDonation}
        onOpenShare={handleOpenShare}
        onOpenAdmin={handleOpenAdmin}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Container */}
      <main className="pt-24 pb-20 max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Narrative, Hero, Budget & Timeline */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-10">
          
          {/* Hero Section */}
          <HeroSection onOpenDonation={handleOpenDonation} />

          {/* Who's Behind the Project */}
          <AboutProject />

          {/* Budget Transparency Breakdown */}
          <BudgetBreakdown items={BUDGET_ITEMS} totalGoal={totalGoal} raised={raised} />

          {/* Project Steps Timeline */}
          <ProjectTimeline steps={timelineSteps} />

          {/* Wall of Supporters & Community Messages */}
          <SupportersWall
            supporters={supporters}
            onAddSupporter={handleAddSupporter}
            onLikeSupporter={handleLikeSupporter}
            onOpenDonation={() => handleOpenDonation()}
          />

        </div>

        {/* Right Column: Dynamic Donation Sidebar */}
        <div className="lg:col-span-5 xl:col-span-4">
          <ProgressBar
            raised={raised}
            goal={totalGoal}
            supporterCount={supporters.length}
            onOpenDonation={handleOpenDonation}
            onOpenShare={() => {
              soundEngine.playClickSound();
              setIsShareOpen(true);
            }}
          />
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-10 px-4 text-xs text-zinc-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <div className="bg-red-500 text-white p-1.5 rounded-lg font-mono font-black">
              <Hammer size={16} />
            </div>
            <div>
              <p className="font-bold text-white">S.O.S AREIAS • Ruaria Skateparks + Comunidade</p>
              <p className="text-[11px] text-zinc-500">Iniciativa sem fins lucrativos, em parceria entre a Ruaria Skateparks e a comunidade do skate de Areias.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <ShieldCheck size={14} />
              <span>Privacidade & LGPD</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-red-400 transition-colors flex items-center gap-1 text-zinc-400 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800"
            >
              <Lock size={13} />
              <span>Painel do Coletivo</span>
            </button>
          </div>

        </div>

        <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-zinc-500">
          <span>Desenvolvido por <strong className="text-zinc-300 font-semibold">Kleber Almeida Toyota</strong></span>
          <a
            href="https://br.linkedin.com/in/kleber-almeida-toyota"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <Linkedin size={12} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://klebertiko.github.io/klebertiko/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <Globe size={12} />
            <span>Portfólio</span>
          </a>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 lg:hidden z-40">
        <button
          onClick={() => handleOpenDonation('50')}
          className="w-full bg-red-500 hover:bg-red-400 text-white font-black text-base py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-95 transition-all"
        >
          <Heart className="fill-current" size={20} />
          <span>Apoiar no PIX (R$ 50)</span>
        </button>
      </div>

      {/* LGPD Banner */}
      <LgpdBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {/* Modals */}
      <PixModal
        isOpen={isPixOpen}
        initialAmount={selectedAmount}
        pixKey={pixKey}
        onClose={() => setIsPixOpen(false)}
        onConfirmDonation={handleAddSupporter}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        pixKey={pixKey}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <AdminModal
        isOpen={isAdminOpen}
        pixKey={pixKey}
        timelineSteps={timelineSteps}
        totalGoal={totalGoal}
        raised={raised}
        onSaveAll={handleSaveAdminState}
        supporters={supporters}
        onAddSupporter={handleAddSupporter}
        onEditSupporter={handleEditSupporter}
        onDeleteSupporter={handleDeleteSupporter}
        onAuthenticated={handleAdminAuthenticated}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Global CSS keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      ` }} />

    </div>
  );
}


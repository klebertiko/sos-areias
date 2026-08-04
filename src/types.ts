export type SkateStance = 'Regular' | 'Goofy' | 'Simpatizante' | 'Local';

export interface Supporter {
  id: string;
  name: string;
  nickname?: string;
  stance: SkateStance;
  amount: number;
  date: string;
  message: string;
  likes: number;
  phone?: string;
  email?: string;
}

export type BudgetTheme = 'yellow' | 'cyan' | 'emerald' | 'purple' | 'rose';

export interface BudgetItem {
  id: string;
  category: string;
  description: string;
  cost: number;
  theme: BudgetTheme;
  status: 'concluido' | 'em_andamento' | 'planejado';
}

export interface TimelineStep {
  phase: number;
  title: string;
  status: 'concluido' | 'em_andamento' | 'proximo';
  date: string;
  description: string;
  highlights: string[];
}

export interface ProjectPartner {
  id: string;
  name: string;
  role: string;
  description: string;
}

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
}

export interface SponsorTier {
  id: string;
  label: string;
  range: string;
}

export interface SponsorBenefit {
  id: string;
  title: string;
  description: string;
}

export interface TrackPhoto {
  id: string;
  src: string;
  thumb: string;
  alt: string;
}

export interface Raffle {
  id: string;
  title: string;
  description: string;
  url: string;
  status: 'ativa' | 'encerrada';
}

import { BudgetItem, ProjectPartner, RewardTier, SocialLink, SponsorBenefit, SponsorTier, Supporter, TimelineStep } from '../types';

export const INITIAL_GOAL = 55370;
export const INITIAL_RAISED = 0;
export const DEFAULT_PIX_KEY = "areias.plaza@gmail.com";

export const PHOTOS_DRIVE_URL = 'https://drive.google.com/drive/folders/1mzcppndxVJfB6DP7PLXaLpoHK-2HoLxY?usp=sharing';

export const PROJECT_PARTNERS: ProjectPartner[] = [
  {
    id: 'ruaria',
    name: 'Ruaria Skateparks',
    role: 'Projeto Técnico & Execução',
    description: 'Empresa especializada em construção e reforma de pistas de skate. Fez a vistoria estrutural completa, assina o projeto de lapidação e resinagem e é quem executa o serviço com equipamentos profissionais.'
  },
  {
    id: 'comunidade',
    name: 'Comunidade do Skate de Areias',
    role: 'Mobilização & Mutirão',
    description: 'Skatistas e moradores do Campeche e Morro das Pedras que já vinham cuidando da pista por conta própria. Tocam a campanha, o mutirão de apoio e a divulgação nas contas @biometryskateboard, @areias_skate_plaza e @floripaskateboard.'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'biometry', label: 'Biometry Skateboard', handle: '@biometryskateboard', url: 'https://www.instagram.com/biometryskateboard/' },
  { id: 'areias', label: 'Areias Skate Plaza', handle: '@areias_skate_plaza', url: 'https://www.instagram.com/areias_skate_plaza/' },
  { id: 'floripa', label: 'Floripa Skateboard', handle: '@floripaskateboard', url: 'https://www.instagram.com/floripaskateboard/' }
];

export const SPONSOR_TIERS: SponsorTier[] = [
  { id: 'bronze', label: 'Bronze', range: '1% a 25%' },
  { id: 'prata', label: 'Prata', range: '26% a 50%' },
  { id: 'ouro', label: 'Ouro', range: '51% a 100%' }
];

export const SPONSOR_BENEFITS: SponsorBenefit[] = [
  {
    id: 'marca',
    title: 'Fortalecimento da Marca',
    description: 'Associação da empresa a uma causa social e esportiva legítima, incluindo ganhos de reputação em critérios ESG.'
  },
  {
    id: 'marketing',
    title: 'Marketing e Visibilidade',
    description: 'Exposição da marca junto à comunidade do skate e nos canais oficiais do projeto durante toda a revitalização.'
  },
  {
    id: 'institucional',
    title: 'Relacionamento Institucional',
    description: 'Aproximação com a comunidade local, coletivos de skate e demais parceiros do projeto Areias.'
  },
  {
    id: 'imagem',
    title: 'Valorização da Imagem Corporativa',
    description: 'Reforço da imagem da empresa como agente ativo de transformação social no bairro.'
  },
  {
    id: 'fiscal',
    title: 'Incentivos Fiscais',
    description: 'Possibilidade de incentivo fiscal, condicionada à legislação vigente e à estrutura jurídica adotada para o apoio.'
  }
];

export const INITIAL_REWARDS: RewardTier[] = [
  {
    id: 'adesivo',
    title: 'Adesivo Exclusivo S.O.S Areias',
    amount: 20,
    description: 'Adesivo em vinil laminado de alta resistência para colar no shape ou no capacete.',
    items: ['1x Adesivo de Vinil "Eu Apoiei o Skate Areias"', 'Agradecimento no site oficial']
  },
  {
    id: 'stories',
    title: 'Pack Adesivos + Salve no Instagram',
    amount: 50,
    description: 'Combo de 3 adesivos artesanais e um agradecimento especial nas redes oficiais do coletivo.',
    items: ['Pack com 3 Adesivos Exclusivos', 'Agradecimento marcado no Instagram', 'Nome na lista do site']
  },
  {
    id: 'mural',
    title: 'Nome Gravado no Mural da Pista',
    amount: 100,
    popular: true,
    description: 'Seu nome ou apelido pintado com graffiti no mural de apoiadores da nova pista de Areias.',
    items: ['Nome definitivo no Mural da Pista', 'Pack com 5 Adesivos Exclusivos', 'Certificado Digital de Apoiador']
  },
  {
    id: 'camiseta',
    title: 'Camiseta Oficial + Nome no Mural',
    amount: 250,
    description: 'Camiseta Silk Screen 100% algodão edição limitada "Reforma Pista de Areias 2026".',
    items: ['Camiseta Silk Screen Algodão 100%', 'Nome no Mural dos Apoiadores', 'Pack Completo de Adesivos']
  }
];

export const BUDGET_ITEMS: BudgetItem[] = [
  {
    id: 'materiais_equipamentos',
    category: 'Materiais & Equipamentos',
    description: 'Aluguel de gerador e extensão, endurecedor de superfície, resina acrílica, tinta de piso, argamassa CP-III, sílica atro, murafan, PU, fitas e rolos',
    cost: 20170,
    theme: 'yellow',
    status: 'em_andamento'
  },
  {
    id: 'insumos_diamantados',
    category: 'Insumos Diamantados',
    description: 'Pedras e inserts diamantados, discos diamantados e diversos, lixas vitrificadas usadas na lapidação mecânica progressiva do concreto',
    cost: 9200,
    theme: 'cyan',
    status: 'planejado'
  },
  {
    id: 'mao_de_obra',
    category: 'Mão de Obra Técnica',
    description: 'Equipe especializada da Ruaria Skateparks para desbaste, correção de imperfeições, regularização das transições e aplicação da resina',
    cost: 12600,
    theme: 'emerald',
    status: 'planejado'
  },
  {
    id: 'custos_indiretos',
    category: 'Custos Indiretos',
    description: 'Custos operacionais do projeto: administração da obra, imprevistos e suporte técnico durante toda a execução',
    cost: 10000,
    theme: 'purple',
    status: 'planejado'
  },
  {
    id: 'mobilizacao_logistica',
    category: 'Mobilização & Logística',
    description: 'Transporte da equipe e dos equipamentos até a pista, montagem do canteiro de obras e limpeza/entrega final',
    cost: 3400,
    theme: 'rose',
    status: 'planejado'
  }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    phase: 1,
    title: 'Vistoria Técnica e Diagnóstico',
    status: 'concluido',
    date: 'Pré-campanha / 2026',
    description: 'Vistoria estrutural completa realizada pela Ruaria Skateparks, mapeamento das fissuras e desplacamentos, e elaboração do projeto oficial de revitalização.',
    highlights: ['Diagnóstico estrutural completo', 'Orçamento técnico de R$ 55.370 definido', 'Projeto de lapidação e resinagem aprovado']
  },
  {
    phase: 2,
    title: 'Campanha de Arrecadação (S.O.S Areias)',
    status: 'em_andamento',
    date: 'Agosto / 2026',
    description: 'Vaquinha aberta para viabilizar materiais, insumos diamantados e parte da mão de obra técnica especializada.',
    highlights: ['Meta de R$ 55.370', 'Transparência total das doações', 'Parceria Ruaria Skateparks + Comunidade']
  },
  {
    phase: 3,
    title: 'Início da Reforma Estrutural',
    status: 'proximo',
    date: 'Setembro ou Outubro / 2026 (previsão)',
    description: 'Mobilização da equipe técnica e início do desbaste do concreto e correção das fissuras. A previsão é começar no mês seguinte ou no outro após o fechamento da campanha, mesmo que a meta ainda não tenha sido 100% atingida.',
    highlights: ['Obra começa sem depender da meta total', 'Desbaste mecânico do concreto', 'Correção de fissuras e desplacamentos']
  },
  {
    phase: 4,
    title: 'Lapidação, Resinagem & Pintura',
    status: 'proximo',
    date: 'A definir (conforme avanço da obra)',
    description: 'Lapidação progressiva com abrasivos diamantados, aplicação do sistema de resina protetiva e pintura artística com a comunidade. Data exata depende do ritmo da arrecadação e do início efetivo da obra.',
    highlights: ['Piso liso e seguro para manobras', 'Sistema de resina de alta durabilidade', 'Mutirão de pintura comunitário']
  },
  {
    phase: 5,
    title: 'Entrega e Inauguração',
    status: 'proximo',
    date: 'A definir (conforme avanço da obra)',
    description: 'Revisão final de segurança e qualidade, entrega da pista revitalizada e evento de inauguração com a comunidade do skate. Data exata depende do avanço das etapas anteriores.',
    highlights: ['Revisão técnica final', 'Evento de inauguração', 'Celebração comunitária']
  }
];

export const INITIAL_SUPPORTERS: Supporter[] = [];

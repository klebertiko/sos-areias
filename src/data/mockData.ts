import { BudgetItem, ProjectPartner, RewardTier, SocialLink, SponsorBenefit, SponsorTier, Supporter, TimelineStep, TrackPhoto } from '../types';
import vistaGeral1 from '../assets/images/track-photos/vista-geral-1.webp';
import vistaGeral1Thumb from '../assets/images/track-photos/vista-geral-1-thumb.webp';
import vistaGeral2 from '../assets/images/track-photos/vista-geral-2.webp';
import vistaGeral2Thumb from '../assets/images/track-photos/vista-geral-2-thumb.webp';
import rachadura1 from '../assets/images/track-photos/rachadura-1.webp';
import rachadura1Thumb from '../assets/images/track-photos/rachadura-1-thumb.webp';
import rachadura2 from '../assets/images/track-photos/rachadura-2.webp';
import rachadura2Thumb from '../assets/images/track-photos/rachadura-2-thumb.webp';
import pocaDagua from '../assets/images/track-photos/poca-dagua.webp';
import pocaDaguaThumb from '../assets/images/track-photos/poca-dagua-thumb.webp';
import ferroEnferrujado1 from '../assets/images/track-photos/ferro-enferrujado-1.webp';
import ferroEnferrujado1Thumb from '../assets/images/track-photos/ferro-enferrujado-1-thumb.webp';
import ferroEnferrujado2 from '../assets/images/track-photos/ferro-enferrujado-2.webp';
import ferroEnferrujado2Thumb from '../assets/images/track-photos/ferro-enferrujado-2-thumb.webp';
import rampaQuebrada from '../assets/images/track-photos/rampa-quebrada.webp';
import rampaQuebradaThumb from '../assets/images/track-photos/rampa-quebrada-thumb.webp';
import comunidade from '../assets/images/track-photos/comunidade.webp';
import comunidadeThumb from '../assets/images/track-photos/comunidade-thumb.webp';
import tenisArvore from '../assets/images/track-photos/tenis-arvore.webp';
import tenisArvoreThumb from '../assets/images/track-photos/tenis-arvore-thumb.webp';
import rachadura3 from '../assets/images/track-photos/rachadura-3.webp';
import rachadura3Thumb from '../assets/images/track-photos/rachadura-3-thumb.webp';
import quadraBasquete from '../assets/images/track-photos/quadra-basquete.webp';
import quadraBasqueteThumb from '../assets/images/track-photos/quadra-basquete-thumb.webp';
import mesaJogos from '../assets/images/track-photos/mesa-jogos.webp';
import mesaJogosThumb from '../assets/images/track-photos/mesa-jogos-thumb.webp';
import grafiteMuro from '../assets/images/track-photos/grafite-muro.webp';
import grafiteMuroThumb from '../assets/images/track-photos/grafite-muro-thumb.webp';
import muralArte from '../assets/images/track-photos/mural-arte.webp';
import muralArteThumb from '../assets/images/track-photos/mural-arte-thumb.webp';

export const INITIAL_GOAL = 55370;
export const INITIAL_RAISED = 0;
export const DEFAULT_PIX_KEY = "areias.plaza@gmail.com";

export const TRACK_PHOTOS: TrackPhoto[] = [
  { id: 'vista-geral-1', src: vistaGeral1, thumb: vistaGeral1Thumb, alt: 'Vista geral da pista de Areias do Campeche' },
  { id: 'vista-geral-2', src: vistaGeral2, thumb: vistaGeral2Thumb, alt: 'Vista geral da pista com a quadra de basquete ao fundo' },
  { id: 'rachadura-1', src: rachadura1, thumb: rachadura1Thumb, alt: 'Rachadura profunda no concreto de um dos obstáculos' },
  { id: 'rachadura-2', src: rachadura2, thumb: rachadura2Thumb, alt: 'Rachadura e desnível no piso próximo a um rail' },
  { id: 'poca-dagua', src: pocaDagua, thumb: pocaDaguaThumb, alt: "Poça d'água acumulada por falha na drenagem do piso" },
  { id: 'ferro-enferrujado-1', src: ferroEnferrujado1, thumb: ferroEnferrujado1Thumb, alt: 'Ferragem enferrujada na borda de um obstáculo' },
  { id: 'ferro-enferrujado-2', src: ferroEnferrujado2, thumb: ferroEnferrujado2Thumb, alt: 'Ferragem enferrujada com concreto quebrado na base' },
  { id: 'rampa-quebrada', src: rampaQuebrada, thumb: rampaQuebradaThumb, alt: 'Rampa de madeira quebrada encostada em outro módulo' },
  { id: 'comunidade', src: comunidade, thumb: comunidadeThumb, alt: 'Jovem jogando basquete na quadra ao lado da pista' },
  { id: 'tenis-arvore', src: tenisArvore, thumb: tenisArvoreThumb, alt: 'Tênis pendurados em árvore, marca da cultura local do skate' },
  { id: 'rachadura-3', src: rachadura3, thumb: rachadura3Thumb, alt: 'Rachadura no concreto próxima a um rail, com pichação ao fundo' },
  { id: 'quadra-basquete', src: quadraBasquete, thumb: quadraBasqueteThumb, alt: 'Jovem jogando basquete na quadra vista através da tela rasgada' },
  { id: 'mesa-jogos', src: mesaJogos, thumb: mesaJogosThumb, alt: 'Mesa de jogos de concreto na área de convivência ao lado da pista' },
  { id: 'grafite-muro', src: grafiteMuro, thumb: grafiteMuroThumb, alt: 'Rachadura no piso e pichação colorida em muro da pista' },
  { id: 'mural-arte', src: muralArte, thumb: muralArteThumb, alt: 'Arte local pintada em um dos módulos da pista' },
];

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

export const INITIAL_REWARDS: RewardTier[] = [];

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

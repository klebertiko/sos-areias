-- S.O.S Areias — Neon Postgres schema
-- Idempotent: safe to run multiple times (CREATE IF NOT EXISTS + ON CONFLICT DO NOTHING seeds).
-- Run with: psql "$DATABASE_URL" -f infra/schema.sql

CREATE TABLE IF NOT EXISTS campaign_state (
  id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- single-row table
  pix_key TEXT NOT NULL,
  goal NUMERIC(12, 2) NOT NULL,
  raised NUMERIC(12, 2) NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS timeline_steps (
  phase INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('concluido', 'em_andamento', 'proximo')),
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS supporters (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  nickname TEXT,
  stance TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  donated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  message TEXT NOT NULL,
  likes INTEGER NOT NULL DEFAULT 0,
  phone TEXT,
  email TEXT
);

CREATE INDEX IF NOT EXISTS supporters_donated_at_idx ON supporters (donated_at DESC);

CREATE TABLE IF NOT EXISTS raffles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('ativa', 'encerrada')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS raffles_created_at_idx ON raffles (created_at DESC);

-- Seed: campaign_state (matches src/data/mockData.ts INITIAL_GOAL / INITIAL_RAISED / DEFAULT_PIX_KEY)
INSERT INTO campaign_state (id, pix_key, goal, raised)
VALUES (1, 'areias.plaza@gmail.com', 55370, 5206.70)
ON CONFLICT (id) DO NOTHING;

-- Seed: timeline_steps (matches src/data/mockData.ts TIMELINE_STEPS)
INSERT INTO timeline_steps (phase, title, status, date, description, highlights) VALUES
(1, 'Vistoria Técnica e Diagnóstico', 'concluido', 'Pré-campanha / 2026',
 'Vistoria estrutural completa realizada pela Ruaria Skateparks, mapeamento das fissuras e desplacamentos, e elaboração do projeto oficial de revitalização.',
 '["Diagnóstico estrutural completo", "Orçamento técnico de R$ 55.370 definido", "Projeto de lapidação e resinagem aprovado"]'::jsonb),
(2, 'Campanha de Arrecadação (S.O.S Areias)', 'em_andamento', 'Agosto / 2026',
 'Vaquinha aberta para viabilizar materiais, insumos diamantados e parte da mão de obra técnica especializada.',
 '["Meta de R$ 55.370", "Transparência total das doações", "Parceria Ruaria Skateparks + Comunidade"]'::jsonb),
(3, 'Início da Reforma Estrutural', 'proximo', 'Setembro ou Outubro / 2026 (previsão)',
 'Mobilização da equipe técnica e início do desbaste do concreto e correção das fissuras. A previsão é começar no mês seguinte ou no outro após o fechamento da campanha, mesmo que a meta ainda não tenha sido 100% atingida.',
 '["Obra começa sem depender da meta total", "Desbaste mecânico do concreto", "Correção de fissuras e desplacamentos"]'::jsonb),
(4, 'Lapidação, Resinagem & Pintura', 'proximo', 'A definir (conforme avanço da obra)',
 'Lapidação progressiva com abrasivos diamantados, aplicação do sistema de resina protetiva e pintura artística com a comunidade. Data exata depende do ritmo da arrecadação e do início efetivo da obra.',
 '["Piso liso e seguro para manobras", "Sistema de resina de alta durabilidade", "Mutirão de pintura comunitário"]'::jsonb),
(5, 'Entrega e Inauguração', 'proximo', 'A definir (conforme avanço da obra)',
 'Revisão final de segurança e qualidade, entrega da pista revitalizada e evento de inauguração com a comunidade do skate. Data exata depende do avanço das etapas anteriores.',
 '["Revisão técnica final", "Evento de inauguração", "Celebração comunitária"]'::jsonb)
ON CONFLICT (phase) DO NOTHING;

-- supporters: no seed rows (INITIAL_SUPPORTERS is empty — table just needs to exist).

-- Seed: raffles (matches src/data/mockData.ts RAFFLES)
INSERT INTO raffles (id, title, description, url, status) VALUES
('reforma-areias-1', 'Rifa Reforma Areias Skate Plaza', 'Concorra a prêmios e ajude a arrecadar para a reforma da pista.', 'https://rifapersonalizada.com.br/reforma-areias-skate-plaza-uCWWyw', 'ativa')
ON CONFLICT (id) DO NOTHING;

import type { ComponentProps } from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AdminModal } from '../AdminModal';
import { Raffle } from '../../types';
import * as api from '../../utils/api';

vi.mock('../../utils/api', async () => {
  const actual = await vi.importActual<typeof api>('../../utils/api');
  return { ...actual, verifyAdminPasscode: vi.fn() };
});

const raffle: Raffle = {
  id: 'reforma-areias-1',
  title: 'Rifa Reforma Areias Skate Plaza',
  description: 'Concorra a prêmios e ajude a arrecadar para a reforma da pista.',
  url: 'https://rifapersonalizada.com.br/reforma-areias-skate-plaza-uCWWyw',
  status: 'ativa',
};

async function renderAuthenticated(props: Partial<ComponentProps<typeof AdminModal>> = {}) {
  vi.mocked(api.verifyAdminPasscode).mockResolvedValue(true);

  render(
    <AdminModal
      isOpen
      pixKey="areias.plaza@gmail.com"
      timelineSteps={[]}
      totalGoal={55370}
      raised={0}
      onSaveAll={vi.fn()}
      supporters={[]}
      onAddSupporter={vi.fn()}
      onEditSupporter={vi.fn()}
      onDeleteSupporter={vi.fn()}
      raffles={[raffle]}
      onAddRaffle={vi.fn()}
      onEditRaffle={vi.fn()}
      onDeleteRaffle={vi.fn()}
      onAuthenticated={vi.fn()}
      onClose={vi.fn()}
      {...props}
    />
  );

  fireEvent.change(screen.getByPlaceholderText(/digite a senha/i), { target: { value: 'segredo' } });
  fireEvent.click(screen.getByRole('button', { name: /entrar no painel/i }));

  await waitFor(() => expect(screen.getByText(/gerenciar rifas/i)).toBeInTheDocument());
}

describe('AdminModal — raffle management', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('lists existing raffles with title and status', async () => {
    await renderAuthenticated();
    expect(screen.getByText(raffle.title)).toBeInTheDocument();
  });

  it('calls onDeleteRaffle when the delete button is clicked', async () => {
    const onDeleteRaffle = vi.fn();
    await renderAuthenticated({ onDeleteRaffle });

    fireEvent.click(screen.getByTitle(/excluir rifa/i));

    expect(onDeleteRaffle).toHaveBeenCalledWith(raffle.id);
  });

  it('calls onAddRaffle with form data when a new raffle is submitted', async () => {
    const onAddRaffle = vi.fn();
    await renderAuthenticated({ onAddRaffle });

    fireEvent.change(screen.getByPlaceholderText(/título da rifa/i), { target: { value: 'Nova Rifa' } });
    fireEvent.change(screen.getByPlaceholderText(/descrição da rifa/i), { target: { value: 'Descrição da nova rifa' } });
    fireEvent.change(screen.getByPlaceholderText(/link da rifa/i), { target: { value: 'https://rifapersonalizada.com.br/nova-rifa' } });
    fireEvent.click(screen.getByRole('button', { name: /adicionar rifa/i }));

    expect(onAddRaffle).toHaveBeenCalledWith({
      title: 'Nova Rifa',
      description: 'Descrição da nova rifa',
      url: 'https://rifapersonalizada.com.br/nova-rifa',
      status: 'ativa',
    });
  });

  it('calls onEditRaffle with updated fields when editing an existing raffle', async () => {
    const onEditRaffle = vi.fn();
    await renderAuthenticated({ onEditRaffle });

    fireEvent.click(screen.getByTitle(/editar rifa/i));

    const titleInput = screen.getByDisplayValue(raffle.title);
    fireEvent.change(titleInput, { target: { value: 'Rifa Atualizada' } });
    fireEvent.click(screen.getByTitle(/salvar rifa/i));

    expect(onEditRaffle).toHaveBeenCalledWith(raffle.id, expect.objectContaining({ title: 'Rifa Atualizada' }));
  });
});

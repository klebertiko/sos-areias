import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AdminModal } from '../AdminModal';
import { TimelineStep } from '../../types';
import * as api from '../../utils/api';

vi.mock('../../utils/api', async () => {
  const actual = await vi.importActual<typeof api>('../../utils/api');
  return { ...actual, verifyAdminPasscode: vi.fn() };
});

const steps: TimelineStep[] = [
  { phase: 1, title: 'Primeira Etapa', status: 'concluido', date: '2026', description: 'desc 1', highlights: [] },
  { phase: 2, title: 'Segunda Etapa', status: 'proximo', date: '2026', description: 'desc 2', highlights: [] },
];

describe('AdminModal — timeline reordering', () => {
  it('moves a step down and persists the new phase order on save', async () => {
    vi.mocked(api.verifyAdminPasscode).mockResolvedValue(true);
    const onSaveAll = vi.fn();

    render(
      <AdminModal
        isOpen
        pixKey="areias.plaza@gmail.com"
        timelineSteps={steps}
        totalGoal={55370}
        raised={0}
        onSaveAll={onSaveAll}
        supporters={[]}
        onAddSupporter={vi.fn()}
        onEditSupporter={vi.fn()}
        onDeleteSupporter={vi.fn()}
        raffles={[]}
        onAddRaffle={vi.fn()}
        onEditRaffle={vi.fn()}
        onDeleteRaffle={vi.fn()}
        onAuthenticated={vi.fn()}
        onClose={vi.fn()}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/digite a senha/i), { target: { value: 'segredo' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar no painel/i }));
    await waitFor(() => expect(screen.getByText('Primeira Etapa')).toBeInTheDocument());

    fireEvent.click(screen.getAllByTitle(/mover para baixo/i)[0]);
    fireEvent.click(screen.getByRole('button', { name: /salvar todas as alterações/i }));

    expect(onSaveAll).toHaveBeenCalledWith(
      expect.objectContaining({
        timelineSteps: [
          expect.objectContaining({ phase: 1, title: 'Segunda Etapa' }),
          expect.objectContaining({ phase: 2, title: 'Primeira Etapa' }),
        ],
      })
    );
  });
});

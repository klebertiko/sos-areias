import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SupportersWall } from '../SupportersWall';
import { BudgetItem, Supporter } from '../../types';

const budgetItems: BudgetItem[] = [
  { id: 'a', category: 'Materiais', description: '', cost: 100, theme: 'yellow', status: 'planejado' },
  { id: 'b', category: 'Mão de Obra', description: '', cost: 50, theme: 'cyan', status: 'planejado' },
];

const supporter: Supporter = {
  id: '1',
  name: 'Fulano',
  stance: 'Simpatizante',
  amount: 40,
  date: 'Agora mesmo',
  message: 'Salve!',
  likes: 0,
};

describe('SupportersWall — donation allocation', () => {
  it('shows which budget category each donation was directed to', () => {
    render(
      <SupportersWall
        supporters={[supporter]}
        budgetItems={budgetItems}
        onAddSupporter={vi.fn()}
        onLikeSupporter={vi.fn()}
        onOpenDonation={vi.fn()}
      />
    );

    expect(screen.getByText(/materiais/i)).toBeInTheDocument();
  });
});

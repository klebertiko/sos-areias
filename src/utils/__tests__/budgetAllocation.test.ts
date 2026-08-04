import { describe, expect, it } from 'vitest';
import { allocateDonationsToBudget } from '../budgetAllocation';
import { BudgetItem, Supporter } from '../../types';

const budgetItems: BudgetItem[] = [
  { id: 'a', category: 'Materiais', description: '', cost: 100, theme: 'yellow', status: 'planejado' },
  { id: 'b', category: 'Mão de Obra', description: '', cost: 50, theme: 'cyan', status: 'planejado' },
];

function supporter(id: string, amount: number): Supporter {
  return { id, name: 'X', stance: 'Simpatizante', amount, date: '', message: '', likes: 0 };
}

describe('allocateDonationsToBudget', () => {
  it('allocates the oldest donation to the first budget category', () => {
    // Array is newest-first (matches API/App ordering); id '1' is chronologically first.
    const supporters = [supporter('2', 30), supporter('1', 40)];
    const result = allocateDonationsToBudget(supporters, budgetItems);
    expect(result.get('1')).toEqual(['Materiais']);
  });

  it('splits a donation across two categories when it crosses a funding boundary', () => {
    const supporters = [supporter('2', 90), supporter('1', 40)];
    const result = allocateDonationsToBudget(supporters, budgetItems);
    expect(result.get('2')).toEqual(['Materiais', 'Mão de Obra']);
  });

  it('returns an empty array once all budget categories are already fully funded', () => {
    const supporters = [supporter('2', 20), supporter('1', 150)];
    const result = allocateDonationsToBudget(supporters, budgetItems);
    expect(result.get('2')).toEqual([]);
  });
});

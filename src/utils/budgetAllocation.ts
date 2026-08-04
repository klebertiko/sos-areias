import { BudgetItem, Supporter } from '../types';

/**
 * Maps each donation to the budget category/categories it funded, based on
 * cumulative chronological order. `supporters` is expected newest-first
 * (matching the API/App ordering), so it's processed in reverse.
 */
export function allocateDonationsToBudget(
  supportersNewestFirst: Supporter[],
  budgetItems: BudgetItem[]
): Map<string, string[]> {
  const chronological = [...supportersNewestFirst].reverse();
  const result = new Map<string, string[]>();

  let cumulativeBefore = 0;
  for (const supporter of chronological) {
    const cumulativeAfter = cumulativeBefore + supporter.amount;
    const categories: string[] = [];

    let itemCumulativeBefore = 0;
    for (const item of budgetItems) {
      const itemCumulativeAfter = itemCumulativeBefore + item.cost;
      if (cumulativeBefore < itemCumulativeAfter && cumulativeAfter > itemCumulativeBefore) {
        categories.push(item.category);
      }
      itemCumulativeBefore = itemCumulativeAfter;
    }

    result.set(supporter.id, categories);
    cumulativeBefore = cumulativeAfter;
  }

  return result;
}

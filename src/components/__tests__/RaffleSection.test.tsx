import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RaffleSection } from '../RaffleSection';
import { Raffle } from '../../types';

const raffle: Raffle = {
  id: 'reforma-areias-1',
  title: 'Rifa Reforma Areias Skate Plaza',
  description: 'Compre seu número e ajude a arrecadar para a reforma.',
  url: 'https://rifapersonalizada.com.br/reforma-areias-skate-plaza-uCWWyw',
  status: 'ativa',
};

describe('RaffleSection', () => {
  it('renders a raffle as an external link with safe target/rel attributes', () => {
    render(<RaffleSection raffles={[raffle]} />);

    const link = screen.getByRole('link', { name: /participar da rifa/i });
    expect(link).toHaveAttribute('href', raffle.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('renders nothing when there are no active raffles', () => {
    const { container } = render(<RaffleSection raffles={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

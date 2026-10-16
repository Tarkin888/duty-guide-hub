import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AtAGlancePanel from '@/components/board-papers/AtAGlancePanel';
import { emptyContent, normaliseAtAGlance, normaliseContent } from '@/lib/boardPaperContent';

describe('Board Papers At a glance', () => {
  it('preserves the content shape of older snapshots and hides the panel', () => {
    const old = emptyContent();
    expect(normaliseContent(old)).toEqual(old);
    const { container } = render(<AtAGlancePanel value={normaliseContent(old).at_a_glance} />);
    expect(container).toBeEmptyDOMElement();
  });
  it('hides whitespace-only content', () => {
    const { container } = render(<AtAGlancePanel value={{ conclusion: ' ', key_messages: [' '], board_asks: [] }} />);
    expect(container).toBeEmptyDOMElement();
  });
  it('renders only human-entered non-empty fields', () => {
    render(<AtAGlancePanel value={{ conclusion: 'Human conclusion', key_messages: ['Message', ''], board_asks: ['Approve review'] }} />);
    expect(screen.getByText('Human conclusion')).toBeVisible();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
  it('limits arrays and input lengths', () => {
    const value = normaliseAtAGlance({ key_messages: Array(4).fill('x'.repeat(230)), board_asks: Array(4).fill('x'.repeat(170)) });
    expect(value.key_messages).toHaveLength(3);
    expect(value.key_messages[0]).toHaveLength(220);
    expect(value.board_asks).toHaveLength(3);
    expect(value.board_asks[0]).toHaveLength(160);
  });
});
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ChallengeQuestionsPanel from '@/components/board-papers/ChallengeQuestionsPanel';
import { CHALLENGE_QUESTION_KEYS, emptyContent, normaliseChallengeQuestions, normaliseContent } from '@/lib/boardPaperContent';
import { buildPack, readPack } from '@/lib/boardPaperPack';

describe('Board challenge questions', () => {
  it.each(CHALLENGE_QUESTION_KEYS)('limits %s to three questions', (key) => {
    const data = normaliseChallengeQuestions({ [key]: ['one', 'two', 'three', 'four'] });
    expect(data[key]).toEqual(['one', 'two', 'three']);
  });
  it.each(CHALLENGE_QUESTION_KEYS)('limits each %s question to 220 characters', (key) => {
    const data = normaliseChallengeQuestions({ [key]: ['x'.repeat(221)] });
    expect(data[key][0]).toBe('x'.repeat(220));
  });
  it('keeps older content without the optional key unchanged', () => {
    const old = emptyContent();
    expect(normaliseContent(old)).toEqual(old);
    expect(readPack({ content: old }).content).not.toHaveProperty('challenge_questions');
  });
  it('never prefills added questions and prevents a fourth question', () => {
    const onChange = vi.fn();
    const { rerender } = render(<ChallengeQuestionsPanel area="Products" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Products: add question' }));
    expect(onChange).toHaveBeenCalledWith(['']);
    rerender(<ChallengeQuestionsPanel area="Products" value={['one', 'two', 'three']} onChange={onChange} />);
    expect(screen.getByRole('button', { name: 'Products: add question' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Products: remove question 2' }));
    expect(onChange).toHaveBeenLastCalledWith(['one', 'three']);
  });
  it('retains exactly the human-authored questions in the frozen pack round trip', () => {
    const content = { ...emptyContent(), challenge_questions: normaliseChallengeQuestions({ products_services: ['What evidence supports this?'] }) };
    const pack = buildPack({ title: 'Test', firm_name: '', reporting_period: '', committee: '', author: '' }, content, { ratings: [], checked: new Set() });
    expect(readPack(JSON.parse(JSON.stringify(pack))).content.challenge_questions).toEqual(content.challenge_questions);
  });
});
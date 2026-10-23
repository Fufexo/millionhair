import { describe, expect, it } from 'vitest';
import { formatDuration, formatPrice } from './format';

describe('formatDuration', () => {
  it.each([
    [30, '30 min'],
    [60, '1 h'],
    [75, '1 h 15 min'],
  ])('%i → %s', (minutes, expected) => {
    expect(formatDuration(minutes)).toBe(expected);
  });
});

describe('formatPrice', () => {
  it('antepone el símbolo del sol', () => {
    expect(formatPrice(60)).toBe('S/ 60');
  });
});

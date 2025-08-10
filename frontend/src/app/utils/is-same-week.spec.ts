import { isSameWeek } from './is-same-week';

describe('isSameWeek', () => {
  it('returns true for dates in the same week (Mon-based)', () => {
    const d1 = new Date('2025-01-06');
    const d2 = new Date('2025-01-12');
    expect(isSameWeek(d1, d2)).toBe(true);
  });

  it('returns false for dates in adjacent weeks', () => {
    const d1 = new Date('2025-01-12');
    const d2 = new Date('2025-01-13');
    expect(isSameWeek(d1, d2)).toBe(false);
  });

  it('handles year boundaries correctly', () => {
    const d1 = new Date('2024-12-30');
    const d2 = new Date('2025-01-05');
    expect(isSameWeek(d1, d2)).toBe(true);
  });
});

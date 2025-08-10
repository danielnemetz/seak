import { isSameDate } from './is-same-date';

describe('isSameDate', () => {
  it('returns true for identical date values', () => {
    const d1 = new Date('2025-05-15');
    const d2 = new Date('2025-05-15');
    expect(isSameDate(d1, d2)).toBe(true);
  });

  it('returns false for different day with same month/year', () => {
    const d1 = new Date('2025-05-15');
    const d2 = new Date('2025-05-16');
    expect(isSameDate(d1, d2)).toBe(false);
  });

  it('returns false for different month or year', () => {
    expect(isSameDate(new Date('2025-05-15'), new Date('2025-06-15'))).toBe(
      false,
    );
    expect(isSameDate(new Date('2025-05-15'), new Date('2026-05-15'))).toBe(
      false,
    );
  });
});

import { isSameMonth } from './is-same-month';

describe('isSameMonth', () => {
  it('returns true for same year and month', () => {
    const d1 = new Date('2025-05-01');
    const d2 = new Date('2025-05-31');
    expect(isSameMonth(d1, d2)).toBe(true);
  });

  it('returns false for different month or year', () => {
    expect(isSameMonth(new Date('2025-05-15'), new Date('2025-06-01'))).toBe(
      false,
    );
    expect(isSameMonth(new Date('2025-05-15'), new Date('2026-05-01'))).toBe(
      false,
    );
  });
});

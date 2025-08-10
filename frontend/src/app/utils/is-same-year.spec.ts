import { isSameYear } from './is-same-year';

describe('isSameYear', () => {
  it('returns true for same year', () => {
    expect(isSameYear(new Date('2025-01-01'), new Date('2025-12-31'))).toBe(
      true,
    );
  });

  it('returns false for different years', () => {
    expect(isSameYear(new Date('2025-01-01'), new Date('2024-12-31'))).toBe(
      false,
    );
  });
});

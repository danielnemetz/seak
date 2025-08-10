import { calculateDuration } from './calculate-duration';

describe('calculateDuration', () => {
  it('returns positive duration when end > start', () => {
    expect(calculateDuration(0, 30)).toBe(30);
    expect(calculateDuration(480, 540)).toBe(60);
  });

  it('returns zero when end equals start', () => {
    expect(calculateDuration(100, 100)).toBe(0);
  });

  it('returns negative when end < start (caller must handle)', () => {
    expect(calculateDuration(200, 100)).toBe(-100);
  });
});

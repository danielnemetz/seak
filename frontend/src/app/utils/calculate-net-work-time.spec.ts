import { calculateNetWorkTime } from './calculate-net-work-time';

describe('calculateNetWorkTime', () => {
  it('subtracts break from total work window', () => {
    expect(calculateNetWorkTime(480, 1020, 720, 780)).toBe(480);
  });

  it('handles no break (zero-length break)', () => {
    expect(calculateNetWorkTime(480, 1020, 600, 600)).toBe(540);
  });

  it('handles break equal to work duration', () => {
    expect(calculateNetWorkTime(480, 540, 480, 540)).toBe(0);
  });

  it('handles break outside work window (negative result allowed)', () => {
    expect(calculateNetWorkTime(600, 660, 540, 1080)).toBe(-480);
  });

  it('handles reversed inputs producing negatives (caller responsibility)', () => {
    expect(calculateNetWorkTime(600, 540, 610, 620)).toBe(-70);
  });
});

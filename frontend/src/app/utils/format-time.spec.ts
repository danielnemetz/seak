import { formatTime } from './format-time';

describe('formatTime', () => {
  it('formats 0 minutes as 00:00', () => {
    expect(formatTime(0)).toBe('00:00');
  });

  it('formats minutes less than an hour with leading zeros', () => {
    expect(formatTime(5)).toBe('00:05');
    expect(formatTime(59)).toBe('00:59');
  });

  it('formats exact hours correctly', () => {
    expect(formatTime(60)).toBe('01:00');
    expect(formatTime(600)).toBe('10:00');
  });

  it('formats mixed hours and minutes', () => {
    expect(formatTime(75)).toBe('01:15');
    expect(formatTime(490)).toBe('08:10');
  });

  it('handles end-of-day and beyond', () => {
    expect(formatTime(1439)).toBe('23:59');
    expect(formatTime(1440)).toBe('24:00');
    expect(formatTime(1501)).toBe('25:01');
  });
});

import { Arbeitszeit } from '@seak/types';
import { normalizeArbeitszeitenToDisplay } from './arbeitszeit.normalizer';

describe('normalizeArbeitszeitenToDisplay', () => {
  it('aggregates minutes per month and formats as HH:MM', () => {
    const data: Arbeitszeit[] = [
      { id: 1, datum: '2025-01-10', arbeitszeit: 60 },
      { id: 1, datum: '2025-01-11', arbeitszeit: 120 },
      { id: 1, datum: '2025-02-01', arbeitszeit: 30 },
    ];

    const result = normalizeArbeitszeitenToDisplay(data);

    expect(result.length).toBe(2);
    const jan = result.find((r) => r.monat.toLowerCase().includes('januar'))!;
    const feb = result.find((r) => r.monat.toLowerCase().includes('februar'))!;
    expect(jan.stunden).toBe('03:00');
    expect(feb.stunden).toBe('00:30');
    expect(jan.monat).toBe('Januar 2025');
    expect(feb.monat).toBe('Februar 2025');
    expect(jan.monatDate.getMonth()).toBe(0);
    expect(jan.monatDate.getFullYear()).toBe(2025);
    expect(feb.monatDate.getMonth()).toBe(1);
    expect(feb.monatDate.getFullYear()).toBe(2025);
  });

  it('returns empty when no data', () => {
    expect(normalizeArbeitszeitenToDisplay([])).toEqual([]);
  });
});

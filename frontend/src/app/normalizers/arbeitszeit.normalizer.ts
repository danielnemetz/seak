import { Arbeitszeit } from '@seak/types';
import { ArbeitszeitDisplay } from '../models';
import { formatTime } from '../utils/format-time';

export function normalizeArbeitszeitenToDisplay(
  arbeitszeiten: ReadonlyArray<Arbeitszeit>,
): ArbeitszeitDisplay[] {
  const monthlyData = new Map<string, { totalMinutes: number; date: Date }>();

  for (const arbeitszeit of arbeitszeiten) {
    const date = new Date(arbeitszeit.datum);
    const month = date.toLocaleDateString('de-DE', {
      month: 'long',
      year: 'numeric',
    });
    const monthKey = `${month}`;
    const minutes = arbeitszeit.arbeitszeit;

    const existing = monthlyData.get(monthKey);
    if (existing) {
      existing.totalMinutes += minutes;
    } else {
      monthlyData.set(monthKey, {
        totalMinutes: minutes,
        date: new Date(date.getFullYear(), date.getMonth(), 1),
      });
    }
  }

  return Array.from(monthlyData.entries()).map(
    ([monat, { totalMinutes, date }], index) => ({
      id: index + 1,
      monat,
      monatDate: date,
      stunden: formatTime(totalMinutes),
    }),
  );
}

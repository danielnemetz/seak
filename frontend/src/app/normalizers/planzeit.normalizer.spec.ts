import { Planzeit } from '@seak/types';
import { normalizePlanzeitenToDisplay } from './planzeit.normalizer';

describe('normalizePlanzeitenToDisplay', () => {
  it('maps planzeiten to display model with formatted fields', () => {
    const data: Planzeit[] = [
      {
        id: 1,
        datum: '2025-05-12',
        planvon: 480,
        planbis: 960,
        pausevon: 720,
        pausebis: 780,
      },
    ];

    const result = normalizePlanzeitenToDisplay(data);
    expect(result.length).toBe(1);
    const row = result[0];
    expect(row.planung).toBe('08:00-16:00');
    expect(row.pause).toBe('12:00-13:00');
    expect(row.workTime).toEqual({ start: 480, end: 960 });
    expect(row.breakTime).toEqual({ start: 720, end: 780 });
  });

  it('provides default totalTime when no work', () => {
    const data: Planzeit[] = [
      {
        id: 2,
        datum: '2025-05-13',
        planvon: 0,
        planbis: 0,
        pausevon: 0,
        pausebis: 0,
      },
    ];

    const result = normalizePlanzeitenToDisplay(data);
    expect(result[0].totalTime).toEqual({ start: 480, end: 960 });
  });
});

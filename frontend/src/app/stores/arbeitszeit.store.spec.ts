import { toObservable } from '@angular/core/rxjs-interop';
import { TestBed } from '@angular/core/testing';
import { Arbeitszeit, Person } from '@seak/types';
import { firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
import { createArbeitszeitStoreWith } from '../testing/test-helpers';

describe('ArbeitszeitStore', () => {
  it('emits filtered arbeitszeiten by selected person and year', async () => {
    const person: Person = { id: 1, name: 'Alice' };
    const date = new Date('2025-05-10');
    const data: Arbeitszeit[] = [
      { id: 1, datum: '2025-05-01', arbeitszeit: 120 },
      { id: 1, datum: '2024-05-01', arbeitszeit: 60 },
      { id: 2, datum: '2025-05-02', arbeitszeit: 30 },
    ];
    const store = createArbeitszeitStoreWith(person, date, data);
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        (
          toObservable(store.arbeitszeiten) as import('rxjs').Observable<
            Arbeitszeit[]
          >
        ).pipe(filter((a: Arbeitszeit[]) => a.length > 0)),
      ),
    );
    expect(result.length).toBe(1);
    expect(result[0].datum).toBe('2025-05-01');
  });

  it('emits empty array when no person selected', async () => {
    const date = new Date('2025-05-10');
    const store = createArbeitszeitStoreWith(undefined, date, []);
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(toObservable(store.arbeitszeiten)),
    );
    expect(result).toEqual([]);
  });
});

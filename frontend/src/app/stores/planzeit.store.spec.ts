import { toObservable } from '@angular/core/rxjs-interop';
import { TestBed } from '@angular/core/testing';
import { Person, Planzeit } from '@seak/types';
import { firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
import { createPlanzeitStoreWith } from '../testing/test-helpers';

describe('PlanzeitStore', () => {
  it('emits filtered planzeiten by selected person and same week', async () => {
    const person: Person = { id: 1, name: 'Alice' };
    const date = new Date('2025-05-14');
    const data: Planzeit[] = [
      {
        id: 1,
        datum: '2025-05-12',
        planvon: 480,
        planbis: 960,
        pausevon: 720,
        pausebis: 780,
      },
      {
        id: 1,
        datum: '2025-05-19',
        planvon: 480,
        planbis: 960,
        pausevon: 720,
        pausebis: 780,
      },
      {
        id: 2,
        datum: '2025-05-13',
        planvon: 480,
        planbis: 960,
        pausevon: 720,
        pausebis: 780,
      },
    ];
    const store = createPlanzeitStoreWith(person, date, data);
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        (
          toObservable(store.planzeiten) as import('rxjs').Observable<
            Planzeit[]
          >
        ).pipe(filter((a: Planzeit[]) => a.length > 0)),
      ),
    );
    expect(result.length).toBe(1);
    expect(result[0].datum).toBe('2025-05-12');
  });

  it('emits empty array when no person selected', async () => {
    const date = new Date('2025-05-14');
    const store = createPlanzeitStoreWith(undefined, date, []);
    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(toObservable(store.planzeiten)),
    );
    expect(result).toEqual([]);
  });
});

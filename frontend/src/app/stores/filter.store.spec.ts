import { toObservable } from '@angular/core/rxjs-interop';
import { TestBed } from '@angular/core/testing';
import { Person } from '@seak/types';
import { firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { ApiServiceMock } from '../testing/api-service.mock';
import { FilterStore } from './filter.store';

describe('FilterStore', () => {
  it('updates selected person and date', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        FilterStore,
        { provide: ApiService, useValue: new ApiServiceMock({ persons: [] }) },
      ],
    });
    const store = TestBed.inject(FilterStore);
    const person: Person = { id: 1, name: 'Alice' };
    const date = new Date('2025-06-01');

    store.setSelectedPerson(person);
    store.setSelectedDate(date);

    const selPerson = await TestBed.runInInjectionContext(() =>
      firstValueFrom(toObservable(store.selectedPerson)),
    );
    const selDate = await TestBed.runInInjectionContext(() =>
      firstValueFrom(toObservable(store.selectedDate)),
    );
    expect(selPerson).toEqual(person);
    expect(selDate.getTime()).toBe(date.getTime());
  });

  it('loads persons and auto-selects first when none selected', async () => {
    const persons: Person[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        FilterStore,
        { provide: ApiService, useValue: new ApiServiceMock({ persons }) },
      ],
    });
    const store = TestBed.inject(FilterStore);

    const loaded = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        toObservable(store.persons).pipe(filter((p) => p.length === 2)),
      ),
    );
    const selected = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        toObservable(store.selectedPerson).pipe(
          filter((p): p is Person => !!p),
        ),
      ),
    );
    const loading = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        toObservable(store.loading).pipe(filter((l) => l === false)),
      ),
    );

    expect(loaded).toEqual(persons);
    expect(selected).toEqual(persons[0]);
    expect(loading).toBeFalse();
  });

  it('sets error when load fails', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        FilterStore,
        {
          provide: ApiService,
          useValue: new ApiServiceMock({ persons: [], throwPersons: true }),
        },
      ],
    });
    const store = TestBed.inject(FilterStore);
    const error = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        toObservable(store.error).pipe(filter((e): e is string => !!e)),
      ),
    );
    const loading = await TestBed.runInInjectionContext(() =>
      firstValueFrom(
        toObservable(store.loading).pipe(filter((l) => l === false)),
      ),
    );
    expect(typeof error).toBe('string');
    expect(loading).toBeFalse();
  });
});

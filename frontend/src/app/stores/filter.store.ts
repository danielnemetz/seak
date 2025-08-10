import { DestroyRef, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Person } from '@seak/types';
import { EMPTY, catchError, tap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { getUserFriendlyMessage, logError } from '../utils/error-handler';

export interface FilterState {
  persons: Person[];
  selectedPerson: Person | undefined;
  selectedDate: Date;
  loading: boolean;
  error: string | undefined;
}

const initialState: FilterState = {
  persons: [],
  selectedPerson: undefined,
  selectedDate: new Date(),
  loading: false,
  error: undefined,
};

export const FilterStore = signalStore(
  withState<FilterState>(initialState),
  withMethods((store) => {
    const apiService = inject(ApiService);
    const destroyRef = inject(DestroyRef);

    const loadPersons = () => {
      patchState(store, { loading: true, error: undefined });

      const subscription = apiService
        .getPersons()
        .pipe(
          tap((persons) => {
            patchState(store, {
              persons,
              loading: false,
              error: undefined,
            });
            if (persons.length > 0 && !store.selectedPerson()) {
              patchState(store, { selectedPerson: persons[0] });
            }
          }),
          catchError((error: unknown) => {
            logError('FilterStore.loadPersons', error);
            const message = getUserFriendlyMessage(error);
            patchState(store, { error: message, loading: false });
            return EMPTY;
          }),
        )
        .subscribe();

      destroyRef.onDestroy(() => subscription.unsubscribe());
    };

    return {
      setSelectedPerson(person: Person): void {
        patchState(store, { selectedPerson: person });
      },

      setSelectedDate(date: Date): void {
        patchState(store, { selectedDate: date });
      },

      loadPersons,
    };
  }),
  withHooks({
    onInit(store) {
      store.loadPersons();
    },
  }),
);

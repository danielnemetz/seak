import { DestroyRef, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Arbeitszeit } from '@seak/types';
import { catchError, combineLatest, EMPTY, switchMap, tap } from 'rxjs';
import { ArbeitszeitDisplay } from '../models';
import { normalizeArbeitszeitenToDisplay } from '../normalizers/arbeitszeit.normalizer';
import { ApiService } from '../services/api.service';
import { getUserFriendlyMessage, logError } from '../utils/error-handler';
import { isSameYear } from '../utils/is-same-year';
import { FilterStore } from './filter.store';

export interface ArbeitszeitState {
  arbeitszeiten: Arbeitszeit[];
  arbeitszeitenDisplay: ArbeitszeitDisplay[];
  loading: boolean;
  error: string | undefined;
}

const initialState: ArbeitszeitState = {
  arbeitszeiten: [],
  arbeitszeitenDisplay: [],
  loading: false,
  error: undefined,
};

export const ArbeitszeitStore = signalStore(
  withState<ArbeitszeitState>(initialState),
  withMethods((store) => {
    const filterStore = inject(FilterStore);
    const apiService = inject(ApiService);
    const destroyRef = inject(DestroyRef);

    const loadForSelection = () => {
      const subscription = combineLatest([
        toObservable(filterStore.selectedDate),
        toObservable(filterStore.selectedPerson),
      ])
        .pipe(
          switchMap(([date, person]) => {
            if (!person) {
              patchState(store, {
                arbeitszeiten: [],
                loading: false,
                error: undefined,
              });
              return EMPTY;
            }
            patchState(store, { loading: true, error: undefined });
            return apiService.getArbeitszeiten().pipe(
              tap((arbeitszeiten) => {
                const filteredArbeitszeiten = arbeitszeiten.filter(
                  (arbeitszeit) =>
                    arbeitszeit.id === person.id &&
                    isSameYear(new Date(arbeitszeit.datum), date),
                );
                patchState(store, {
                  arbeitszeiten: filteredArbeitszeiten,
                  arbeitszeitenDisplay: normalizeArbeitszeitenToDisplay(
                    filteredArbeitszeiten,
                  ),
                  loading: false,
                  error: undefined,
                });
              }),
              catchError((error: unknown) => {
                logError('ArbeitszeitStore.loadForSelection', error);
                const message = getUserFriendlyMessage(error);
                patchState(store, { error: message, loading: false });
                return EMPTY;
              }),
            );
          }),
        )
        .subscribe();

      destroyRef.onDestroy(() => subscription.unsubscribe());
    };

    return {
      loadForSelection,
    };
  }),
  withHooks({
    onInit(store) {
      store.loadForSelection();
    },
  }),
);

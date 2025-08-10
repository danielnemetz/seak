import { DestroyRef, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Planzeit } from '@seak/types';
import { catchError, combineLatest, EMPTY, switchMap, tap } from 'rxjs';
import { PlanzeitDisplay } from '../models';
import { normalizePlanzeitenToDisplay } from '../normalizers/planzeit.normalizer';
import { ApiService } from '../services/api.service';
import { getUserFriendlyMessage, logError } from '../utils/error-handler';
import { isSameWeek } from '../utils/is-same-week';
import { FilterStore } from './filter.store';

export interface PlanzeitState {
  planzeiten: Planzeit[];
  planzeitenDisplay: PlanzeitDisplay[];
  loading: boolean;
  error: string | undefined;
}

const initialState: PlanzeitState = {
  planzeiten: [],
  planzeitenDisplay: [],
  loading: false,
  error: undefined,
};

export const PlanzeitStore = signalStore(
  withState<PlanzeitState>(initialState),
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
                planzeiten: [],
                loading: false,
                error: undefined,
              });
              return EMPTY;
            }
            patchState(store, { loading: true, error: undefined });
            return apiService.getPlanzeiten().pipe(
              tap((planzeiten) => {
                const filteredPlanzeiten = planzeiten.filter(
                  (planzeit) =>
                    planzeit.id === person.id &&
                    isSameWeek(new Date(planzeit.datum), date),
                );
                patchState(store, {
                  planzeiten: filteredPlanzeiten,
                  planzeitenDisplay:
                    normalizePlanzeitenToDisplay(filteredPlanzeiten),
                  loading: false,
                  error: undefined,
                });
              }),
              catchError((error: unknown) => {
                logError('PlanzeitStore.loadForSelection', error);
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

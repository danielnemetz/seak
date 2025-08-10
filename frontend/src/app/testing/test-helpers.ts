import { TestBed } from '@angular/core/testing';
import { Arbeitszeit, Person, Planzeit } from '@seak/types';
import { ApiService } from '../services/api.service';
import { ArbeitszeitStore } from '../stores/arbeitszeit.store';
import { FilterStore } from '../stores/filter.store';
import { PlanzeitStore } from '../stores/planzeit.store';
import { ApiServiceMock } from './api-service.mock';

export function runInCtx<T>(factory: () => T): T {
  TestBed.configureTestingModule({});
  return TestBed.runInInjectionContext(factory);
}

export function createArbeitszeitStoreWith(
  person: Person | undefined,
  date: Date,
  arbeitszeiten: Arbeitszeit[],
): any {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [
      ArbeitszeitStore,
      FilterStore,
      { provide: ApiService, useValue: new ApiServiceMock({ arbeitszeiten }) },
    ],
  });
  const filter = TestBed.inject(FilterStore);
  if (person) {
    filter.setSelectedPerson(person);
  }
  filter.setSelectedDate(date);
  return TestBed.inject(ArbeitszeitStore);
}

export function createPlanzeitStoreWith(
  person: Person | undefined,
  date: Date,
  planzeiten: Planzeit[],
): any {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [
      PlanzeitStore,
      FilterStore,
      { provide: ApiService, useValue: new ApiServiceMock({ planzeiten }) },
    ],
  });
  const filter = TestBed.inject(FilterStore);
  if (person) {
    filter.setSelectedPerson(person);
  }
  filter.setSelectedDate(date);
  return TestBed.inject(PlanzeitStore);
}

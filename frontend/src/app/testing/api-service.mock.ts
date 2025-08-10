import { Arbeitszeit, Person, Planzeit } from '@seak/types';
import { Observable, of, throwError } from 'rxjs';

type ApiMockOptions = {
  persons?: Person[];
  arbeitszeiten?: Arbeitszeit[];
  planzeiten?: Planzeit[];
  throwPersons?: boolean;
  throwArbeitszeiten?: boolean;
  throwPlanzeiten?: boolean;
};

export class ApiServiceMock {
  private readonly persons: Person[];
  private readonly arbeitszeiten: Arbeitszeit[];
  private readonly planzeiten: Planzeit[];
  private readonly throwPersons: boolean;
  private readonly throwArbeitszeiten: boolean;
  private readonly throwPlanzeiten: boolean;

  constructor(options: ApiMockOptions = {}) {
    this.persons = options.persons ?? [];
    this.arbeitszeiten = options.arbeitszeiten ?? [];
    this.planzeiten = options.planzeiten ?? [];
    this.throwPersons = options.throwPersons ?? false;
    this.throwArbeitszeiten = options.throwArbeitszeiten ?? false;
    this.throwPlanzeiten = options.throwPlanzeiten ?? false;
  }

  getPersons(): Observable<Person[]> {
    return this.throwPersons
      ? throwError(() => new Error('failed'))
      : of(this.persons);
  }

  getArbeitszeiten(): Observable<Arbeitszeit[]> {
    return this.throwArbeitszeiten
      ? throwError(() => new Error('failed'))
      : of(this.arbeitszeiten);
  }

  getPlanzeiten(): Observable<Planzeit[]> {
    return this.throwPlanzeiten
      ? throwError(() => new Error('failed'))
      : of(this.planzeiten);
  }
}

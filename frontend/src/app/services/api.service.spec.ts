import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Arbeitszeit, Person } from '@seak/types';
import { ApiService } from './api.service';

describe('ApiService (with simple observable cache)', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    service.clearCache();
  });

  it('caches persons: multiple subscribers share one request and later calls use the cached value', () => {
    const mockPersons: Person[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];

    let firstEmission: Person[] | undefined;
    let secondEmission: Person[] | undefined;
    service.getPersons().subscribe((v) => (firstEmission = v));
    service.getPersons().subscribe((v) => (secondEmission = v));

    const req = httpMock.expectOne(`${baseUrl}/persons`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPersons);

    expect(firstEmission).toEqual(mockPersons);
    expect(secondEmission).toEqual(mockPersons);

    let thirdEmission: Person[] | undefined;
    service.getPersons().subscribe((v) => (thirdEmission = v));
    httpMock.expectNone(`${baseUrl}/persons`);
    expect(thirdEmission).toEqual(mockPersons);
  });

  it('resets persons cache on error and retries successfully afterwards', () => {
    let errorCaught = false;
    service.getPersons().subscribe({ error: () => (errorCaught = true) });
    const req1 = httpMock.expectOne(`${baseUrl}/persons`);
    req1.flush('boom', { status: 500, statusText: 'Server Error' });
    expect(errorCaught).toBeTrue();

    const mockPersons: Person[] = [{ id: 1, name: 'Alice' }];
    let emission: Person[] | undefined;
    service.getPersons().subscribe((v) => (emission = v));
    const req2 = httpMock.expectOne(`${baseUrl}/persons`);
    expect(req2.request.method).toBe('GET');
    req2.flush(mockPersons);
    expect(emission).toEqual(mockPersons);
  });

  it('caches arbeitszeiten similarly', () => {
    const mockArbeitszeiten: Arbeitszeit[] = [
      { id: 1, datum: '2025-05-01', arbeitszeit: 60 },
    ];

    let a: Arbeitszeit[] | undefined;
    service.getArbeitszeiten().subscribe((v) => (a = v));
    const req = httpMock.expectOne(`${baseUrl}/arbeitszeiten`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArbeitszeiten);
    expect(a).toEqual(mockArbeitszeiten);

    service
      .getArbeitszeiten()
      .subscribe((v) => expect(v).toEqual(mockArbeitszeiten));
    httpMock.expectNone(`${baseUrl}/arbeitszeiten`);
  });
});

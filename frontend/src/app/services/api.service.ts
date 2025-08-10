import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arbeitszeit, Person, Planzeit } from '@seak/types';
import { Observable, catchError, shareReplay, throwError } from 'rxjs';

interface ApiError {
  message: string;
  status?: number;
  originalError?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000/api';

  private personsCache$?: Observable<Person[]>;
  private arbeitszeitenCache$?: Observable<Arbeitszeit[]>;
  private planzeitenCache$?: Observable<Planzeit[]>;

  constructor(private http: HttpClient) {}

  private handleError(endpoint: string, error: unknown): Observable<never> {
    let apiError: ApiError;

    if (error instanceof HttpErrorResponse) {
      // HTTP Error (4xx, 5xx)
      apiError = {
        message: this.getHttpErrorMessage(error),
        status: error.status,
        originalError: error,
      };
    } else if (error instanceof Error) {
      // JavaScript Error
      apiError = {
        message: `API Error: ${error.message}`,
        originalError: error,
      };
    } else {
      // Unknown Error
      apiError = {
        message: `Unexpected error occurred while fetching ${endpoint}`,
        originalError: error,
      };
    }

    console.error(`API Error in ${endpoint}:`, apiError);

    return throwError(() => apiError);
  }

  private getHttpErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'Network error - please check your connection';
      case 401:
        return 'Unauthorized - please log in again';
      case 403:
        return 'Access forbidden';
      case 404:
        return 'Resource not found';
      case 500:
        return 'Server error - please try again later';
      case 502:
        return 'Bad gateway - server temporarily unavailable';
      case 503:
        return 'Service unavailable - please try again later';
      case 504:
        return 'Gateway timeout - server is slow to respond';
      default:
        return `HTTP ${error.status}: ${error.statusText || 'Unknown error'}`;
    }
  }

  getPersons(): Observable<Person[]> {
    if (!this.personsCache$) {
      this.personsCache$ = this.http
        .get<Person[]>(`${this.baseUrl}/persons`)
        .pipe(
          shareReplay({ bufferSize: 1, refCount: false }),
          catchError((err: unknown) => {
            this.personsCache$ = undefined;
            return this.handleError('persons', err);
          }),
        );
    }
    return this.personsCache$;
  }

  getArbeitszeiten(): Observable<Arbeitszeit[]> {
    if (!this.arbeitszeitenCache$) {
      this.arbeitszeitenCache$ = this.http
        .get<Arbeitszeit[]>(`${this.baseUrl}/arbeitszeiten`)
        .pipe(
          shareReplay({ bufferSize: 1, refCount: false }),
          catchError((err: unknown) => {
            this.arbeitszeitenCache$ = undefined;
            return this.handleError('arbeitszeiten', err);
          }),
        );
    }
    return this.arbeitszeitenCache$;
  }

  getPlanzeiten(): Observable<Planzeit[]> {
    if (!this.planzeitenCache$) {
      this.planzeitenCache$ = this.http
        .get<Planzeit[]>(`${this.baseUrl}/planzeiten`)
        .pipe(
          shareReplay({ bufferSize: 1, refCount: false }),
          catchError((err: unknown) => {
            this.planzeitenCache$ = undefined;
            return this.handleError('planzeiten', err);
          }),
        );
    }
    return this.planzeitenCache$;
  }

  clearCache(): void {
    this.personsCache$ = undefined;
    this.arbeitszeitenCache$ = undefined;
    this.planzeitenCache$ = undefined;
  }
}

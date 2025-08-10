import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MondayFirstDayDateAdapter } from './utils/monday-first-day-date-adapter';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: MAT_DATE_LOCALE,
      useFactory: () =>
        typeof navigator !== 'undefined' && navigator.language
          ? navigator.language
          : 'en-US',
    },
    { provide: DateAdapter, useClass: MondayFirstDayDateAdapter },
  ],
};

import { CommonModule } from '@angular/common';
import { Component, Signal, computed, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Person } from '@seak/types';
import { ArbeitszeitDisplay, PlanzeitDisplay } from '../../models';
import { ArbeitszeitStore, PlanzeitStore } from '../../stores';
import { FilterStore } from '../../stores/filter.store';
import { ArbeitszeitComponent } from '../arbeitszeit/arbeitszeit.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { PersonComponent } from '../person/person.component';
import { PlanungComponent } from '../planung/planung.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    PersonComponent,
    DatePickerComponent,
    ArbeitszeitComponent,
    PlanungComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [FilterStore, ArbeitszeitStore, PlanzeitStore],
})
export class LayoutComponent {
  persons: Signal<Person[]>;
  arbeitszeiten: Signal<ArbeitszeitDisplay[]>;
  planzeiten: Signal<PlanzeitDisplay[]>;
  selectedPerson: Signal<Person | undefined>;
  selectedDate: Signal<Date>;
  loading: Signal<boolean>;
  errors: Signal<string[]>;

  private filterStore = inject(FilterStore);
  private arbeitszeitStore = inject(ArbeitszeitStore);
  private planzeitStore = inject(PlanzeitStore);

  constructor() {
    this.persons = this.filterStore.persons;
    this.selectedPerson = this.filterStore.selectedPerson;
    this.selectedDate = this.filterStore.selectedDate;

    this.loading = computed(() => {
      const filterLoading = this.filterStore.loading();
      const arbeitszeitLoading = this.arbeitszeitStore.loading();
      const planzeitLoading = this.planzeitStore.loading();

      return filterLoading || arbeitszeitLoading || planzeitLoading;
    });

    this.errors = computed(() => {
      const filterError = this.filterStore.error();
      const arbeitszeitError = this.arbeitszeitStore.error();
      const planzeitError = this.planzeitStore.error();

      if (!filterError && !arbeitszeitError && !planzeitError) {
        return [];
      }

      const errors: string[] = [];
      if (filterError) {
        errors.push(filterError);
      }
      if (arbeitszeitError) {
        errors.push(arbeitszeitError);
      }
      if (planzeitError) {
        errors.push(planzeitError);
      }

      return errors;
    });

    this.arbeitszeiten = this.arbeitszeitStore.arbeitszeitenDisplay;
    this.planzeiten = this.planzeitStore.planzeitenDisplay;
  }

  onPersonSelect(person: Person): void {
    this.filterStore.setSelectedPerson(person);
  }

  onDateChange(date: Date): void {
    this.filterStore.setSelectedDate(date);
  }
}

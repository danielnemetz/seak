import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FilterStore } from '../../stores/filter.store';
import { isSameMonth } from '../../utils/is-same-month';

interface ArbeitszeitDisplay {
  id: number;
  monat: string;
  monatDate: Date;
  stunden: string;
  isCurrentMonth?: boolean;
}

@Component({
  selector: 'app-arbeitszeit',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './arbeitszeit.component.html',
  styleUrl: './arbeitszeit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArbeitszeitComponent {
  arbeitszeiten = input<ArbeitszeitDisplay[]>([]);

  private filterStore = inject(FilterStore);

  get selectedDate(): Date {
    return this.filterStore.selectedDate();
  }

  arbeitszeitenWithCurrentMonth = computed(() => {
    const arbeitszeiten = this.arbeitszeiten();
    const selectedDate = this.selectedDate;

    return arbeitszeiten.map((arbeit) => ({
      ...arbeit,
      isCurrentMonth: isSameMonth(arbeit.monatDate, selectedDate),
    }));
  });
}

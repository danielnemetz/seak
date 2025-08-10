import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterStore } from '../../stores/filter.store';
import { TimeVisualizationComponent } from '../time-visualization/time-visualization.component';

interface PlanzeitDisplay {
  id: number;
  tag: string;
  planung: string;
  pause: string;
  einsatz: string;
  workTime: { start: number; end: number };
  breakTime: { start: number; end: number };
  totalTime: { start: number; end: number };
  isCurrentDay?: boolean;
}

@Component({
  selector: 'app-planung',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTooltipModule,
    TimeVisualizationComponent,
  ],
  templateUrl: './planung.component.html',
  styleUrl: './planung.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanungComponent {
  planzeiten = input<PlanzeitDisplay[]>([]);

  showGrid = false;

  private filterStore = inject(FilterStore);

  private static readonly DAY_NAMES = [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
  ] as const;

  toggleGrid(event: MatSlideToggleChange): void {
    this.showGrid = event.checked;
  }

  get selectedDate(): Date {
    return this.filterStore.selectedDate();
  }

  planzeitenWithCurrentDay = computed(() => {
    const selectedDate = this.selectedDate;
    const selectedDay = PlanungComponent.DAY_NAMES[selectedDate.getDay()];

    return this.planzeiten().map((element) => ({
      ...element,
      isCurrentDay: element.tag.includes(selectedDay),
    }));
  });
}

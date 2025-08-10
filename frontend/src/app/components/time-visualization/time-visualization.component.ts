import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

interface TimeRange {
  start: number;
  end: number;
}

@Component({
  selector: 'app-time-visualization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-visualization.component.html',
  styleUrls: ['./time-visualization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeVisualizationComponent {
  workTime = input<TimeRange>({ start: 0, end: 0 });
  breakTime = input<TimeRange>({ start: 0, end: 0 });
  showGrid = input<boolean>(true);

  workDayStart = input<number>(6 * 60);
  workDayEnd = input<number>(18 * 60);

  workDayDuration = computed(() => this.workDayEnd() - this.workDayStart());

  private formatPercentage(value: number): string {
    return `${Math.round(value * 100) / 100}%`;
  }

  hourLines = computed(() => {
    const startHour = Math.floor(this.workDayStart() / 60);
    const endHour = Math.ceil(this.workDayEnd() / 60);
    const hourCount = endHour - startHour + 1;

    if (hourCount <= 0) {
      return [];
    }

    const workDayStart = this.workDayStart();
    const workDayDuration = this.workDayDuration();

    return Array.from({ length: hourCount }, (_, i) => {
      const hour = startHour + i;
      const position = ((hour * 60 - workDayStart) / workDayDuration) * 100;
      return {
        hour,
        position: this.formatPercentage(Math.max(0, Math.min(100, position))),
      };
    });
  });

  hasWorkTime = computed(() => {
    const wt = this.workTime();
    return wt.end > wt.start;
  });

  hasBreakTime = computed(() => {
    const bt = this.breakTime();
    return bt.end > bt.start;
  });

  workTimeLeft = computed(() => {
    const wt = this.workTime();
    if (wt.end <= wt.start) {
      return '0%';
    }

    const workDayStart = this.workDayStart();
    const workDayDuration = this.workDayDuration();
    const workStartOffset = wt.start - workDayStart;

    if (workStartOffset < 0) {
      return '0%';
    }
    if (workStartOffset >= workDayDuration) {
      return '100%';
    }

    return this.formatPercentage((workStartOffset / workDayDuration) * 100);
  });

  workTimeWidth = computed(() => {
    const wt = this.workTime();
    if (wt.end <= wt.start) {
      return '0%';
    }
    const workDuration = wt.end - wt.start;
    return this.formatPercentage((workDuration / this.workDayDuration()) * 100);
  });

  breakTimeLeft = computed(() => {
    const wt = this.workTime();
    const bt = this.breakTime();
    if (wt.end <= wt.start || bt.end <= bt.start) {
      return '0%';
    }

    const workDuration = wt.end - wt.start;
    const breakStartOffset = bt.start - wt.start;
    if (workDuration <= 0) {
      return '0%';
    }
    return this.formatPercentage((breakStartOffset / workDuration) * 100);
  });

  breakTimeWidth = computed(() => {
    const wt = this.workTime();
    const bt = this.breakTime();
    if (wt.end <= wt.start || bt.end <= bt.start) {
      return '0%';
    }

    const workDuration = wt.end - wt.start;
    const breakDuration = bt.end - bt.start;
    if (workDuration <= 0) {
      return '0%';
    }
    return this.formatPercentage((breakDuration / workDuration) * 100);
  });
}

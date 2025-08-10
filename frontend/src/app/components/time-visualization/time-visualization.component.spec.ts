import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeVisualizationComponent } from './time-visualization.component';

describe('TimeVisualizationComponent', () => {
  let component: TimeVisualizationComponent;
  let fixture: ComponentFixture<TimeVisualizationComponent>;

  const mockWorkTime = { start: 8 * 60, end: 17 * 60 };
  const mockBreakTime = { start: 12 * 60, end: 12 * 60 + 45 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeVisualizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeVisualizationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('workDayDuration', () => {
    it('should calculate correct work day duration', () => {
      fixture.componentRef.setInput('workDayStart', 6 * 60);
      fixture.componentRef.setInput('workDayEnd', 18 * 60);

      expect(component.workDayDuration()).toBe(12 * 60);
    });

    it('should update when work day times change', () => {
      fixture.componentRef.setInput('workDayStart', 7 * 60);
      fixture.componentRef.setInput('workDayEnd', 19 * 60);

      expect(component.workDayDuration()).toBe(12 * 60);
    });
  });

  describe('hourLines', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('workDayStart', 6 * 60);
      fixture.componentRef.setInput('workDayEnd', 18 * 60);
    });

    it('should generate correct number of hour lines', () => {
      const result = component.hourLines();
      expect(result).toHaveSize(13);
    });

    it('should calculate correct positions for hour lines', () => {
      const result = component.hourLines();

      expect(result[0].hour).toBe(6);
      expect(result[0].position).toBe('0%');

      expect(result[6].hour).toBe(12);
      expect(result[6].position).toBe('50%');

      expect(result[12].hour).toBe(18);
      expect(result[12].position).toBe('100%');
    });

    it('should handle different work day ranges', () => {
      fixture.componentRef.setInput('workDayStart', 9 * 60);
      fixture.componentRef.setInput('workDayEnd', 17 * 60);

      const result = component.hourLines();
      expect(result).toHaveSize(9);
      expect(result[0].hour).toBe(9);
      expect(result[8].hour).toBe(17);
    });
  });

  describe('hasWorkTime', () => {
    it('should return true when work time is valid', () => {
      fixture.componentRef.setInput('workTime', mockWorkTime);
      expect(component.hasWorkTime()).toBeTrue();
    });

    it('should return false when work time is invalid', () => {
      fixture.componentRef.setInput('workTime', {
        start: 17 * 60,
        end: 8 * 60,
      });
      expect(component.hasWorkTime()).toBeFalse();
    });

    it('should return false when work time has same start and end', () => {
      fixture.componentRef.setInput('workTime', { start: 8 * 60, end: 8 * 60 });
      expect(component.hasWorkTime()).toBeFalse();
    });
  });

  describe('hasBreakTime', () => {
    it('should return true when break time is valid', () => {
      fixture.componentRef.setInput('breakTime', mockBreakTime);
      expect(component.hasBreakTime()).toBeTrue();
    });

    it('should return false when break time is invalid', () => {
      fixture.componentRef.setInput('breakTime', {
        start: 12 * 60 + 45,
        end: 12 * 60,
      });
      expect(component.hasBreakTime()).toBeFalse();
    });
  });

  describe('workTimeLeft', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('workDayStart', 6 * 60);
      fixture.componentRef.setInput('workDayEnd', 18 * 60);
    });

    it('should calculate correct left position for work time', () => {
      fixture.componentRef.setInput('workTime', mockWorkTime);

      const result = component.workTimeLeft();
      expect(result).toBe('16.67%');
    });

    it('should return 0% when work time starts before work day', () => {
      fixture.componentRef.setInput('workTime', {
        start: 5 * 60,
        end: 17 * 60,
      });
      expect(component.workTimeLeft()).toBe('0%');
    });

    it('should return 100% when work time starts after work day end', () => {
      fixture.componentRef.setInput('workTime', {
        start: 19 * 60,
        end: 20 * 60,
      });
      expect(component.workTimeLeft()).toBe('100%');
    });
  });

  describe('workTimeWidth', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('workDayStart', 6 * 60);
      fixture.componentRef.setInput('workDayEnd', 18 * 60);
    });

    it('should calculate correct width for work time', () => {
      fixture.componentRef.setInput('workTime', mockWorkTime);

      const result = component.workTimeWidth();
      expect(result).toBe('75%');
    });

    it('should return 0% when work time is invalid', () => {
      fixture.componentRef.setInput('workTime', {
        start: 17 * 60,
        end: 8 * 60,
      });
      expect(component.workTimeWidth()).toBe('0%');
    });
  });

  describe('breakTimeLeft', () => {
    it('should calculate correct left position for break time relative to work time', () => {
      fixture.componentRef.setInput('workTime', mockWorkTime);
      fixture.componentRef.setInput('breakTime', mockBreakTime);

      const result = component.breakTimeLeft();
      expect(result).toBe('44.44%');
    });

    it('should return 0% when work time is invalid', () => {
      fixture.componentRef.setInput('workTime', {
        start: 17 * 60,
        end: 8 * 60,
      });
      fixture.componentRef.setInput('breakTime', mockBreakTime);
      expect(component.breakTimeLeft()).toBe('0%');
    });
  });

  describe('breakTimeWidth', () => {
    it('should calculate correct width for break time relative to work time', () => {
      fixture.componentRef.setInput('workTime', mockWorkTime);
      fixture.componentRef.setInput('breakTime', mockBreakTime);

      const result = component.breakTimeWidth();
      expect(result).toBe('8.33%');
    });

    it('should return 0% when work time is invalid', () => {
      fixture.componentRef.setInput('workTime', {
        start: 17 * 60,
        end: 8 * 60,
      });
      fixture.componentRef.setInput('breakTime', mockBreakTime);
      expect(component.breakTimeWidth()).toBe('0%');
    });
  });

  describe('default values', () => {
    it('should have correct default work day times', () => {
      expect(component.workDayStart()).toBe(6 * 60);
      expect(component.workDayEnd()).toBe(18 * 60);
    });

    it('should have correct default showGrid value', () => {
      expect(component.showGrid()).toBeTrue();
    });
  });
});

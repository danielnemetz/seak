import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FilterStore } from '../../stores/filter.store';
import { PlanungComponent } from './planung.component';

describe('PlanungComponent', () => {
  let component: PlanungComponent;
  let fixture: ComponentFixture<PlanungComponent>;
  let mockFilterStore: { selectedDate: ReturnType<typeof signal<Date>> };

  const mockPlanzeiten = [
    {
      id: 1,
      tag: 'Montag',
      planung: '8 Stunden',
      pause: '45 Minuten',
      einsatz: 'Vollzeit',
      workTime: { start: 8 * 60, end: 17 * 60 },
      breakTime: { start: 12 * 60, end: 12 * 60 + 45 },
      totalTime: { start: 8 * 60, end: 17 * 60 },
    },
    {
      id: 2,
      tag: 'Dienstag',
      planung: '8 Stunden',
      pause: '45 Minuten',
      einsatz: 'Vollzeit',
      workTime: { start: 8 * 60, end: 17 * 60 },
      breakTime: { start: 12 * 60, end: 12 * 60 + 45 },
      totalTime: { start: 8 * 60, end: 17 * 60 },
    },
    {
      id: 3,
      tag: 'Mittwoch',
      planung: '8 Stunden',
      pause: '45 Minuten',
      einsatz: 'Vollzeit',
      workTime: { start: 8 * 60, end: 17 * 60 },
      breakTime: { start: 12 * 60, end: 12 * 60 + 45 },
      totalTime: { start: 8 * 60, end: 17 * 60 },
    },
  ];

  beforeEach(async () => {
    const mockSelectedDate = signal(new Date(2024, 1, 13));

    mockFilterStore = {
      selectedDate: mockSelectedDate,
    };

    await TestBed.configureTestingModule({
      imports: [PlanungComponent],
      providers: [{ provide: FilterStore, useValue: mockFilterStore }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanungComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('planzeitenWithCurrentDay', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('planzeiten', mockPlanzeiten);
    });

    it('should add isCurrentDay property to all planzeiten', () => {
      const result = component.planzeitenWithCurrentDay();

      expect(result).toHaveSize(3);
      expect(result[0].isCurrentDay).toBeFalse();
      expect(result[1].isCurrentDay).toBeTrue();
      expect(result[2].isCurrentDay).toBeFalse();
    });

    it('should preserve all original properties', () => {
      const result = component.planzeitenWithCurrentDay();

      result.forEach((planzeit, index) => {
        expect(planzeit.id).toBe(mockPlanzeiten[index].id);
        expect(planzeit.tag).toBe(mockPlanzeiten[index].tag);
        expect(planzeit.planung).toBe(mockPlanzeiten[index].planung);
        expect(planzeit.pause).toBe(mockPlanzeiten[index].pause);
        expect(planzeit.einsatz).toBe(mockPlanzeiten[index].einsatz);
        expect(planzeit.workTime).toBe(mockPlanzeiten[index].workTime);
        expect(planzeit.breakTime).toBe(mockPlanzeiten[index].breakTime);
        expect(planzeit.totalTime).toBe(mockPlanzeiten[index].totalTime);
        expect(planzeit.isCurrentDay).toBeDefined();
      });
    });

    it('should update when selectedDate changes', () => {
      let result = component.planzeitenWithCurrentDay();
      expect(result[1].isCurrentDay).toBeTrue();

      mockFilterStore.selectedDate.set(new Date(2024, 1, 12));

      result = component.planzeitenWithCurrentDay();
      expect(result[0].isCurrentDay).toBeTrue();
      expect(result[1].isCurrentDay).toBeFalse();
    });

    it('should handle empty planzeiten array', () => {
      fixture.componentRef.setInput('planzeiten', []);
      const result = component.planzeitenWithCurrentDay();

      expect(result).toHaveSize(0);
    });

    it('should handle different day names correctly', () => {
      mockFilterStore.selectedDate.set(new Date(2024, 1, 11));

      const result = component.planzeitenWithCurrentDay();
      result.forEach((planzeit) => {
        expect(planzeit.isCurrentDay).toBeFalse();
      });
    });
  });

  describe('toggleGrid', () => {
    it('should update showGrid when toggleGrid is called', () => {
      const mockEvent = { checked: true } as MatSlideToggleChange;

      component.toggleGrid(mockEvent);
      expect(component.showGrid).toBeTrue();

      const mockEvent2 = { checked: false } as MatSlideToggleChange;
      component.toggleGrid(mockEvent2);
      expect(component.showGrid).toBeFalse();
    });
  });

  describe('selectedDate', () => {
    it('should return selected date from filter store', () => {
      const expectedDate = new Date(2024, 1, 13);
      mockFilterStore.selectedDate.set(expectedDate);

      expect(component.selectedDate).toBe(expectedDate);
    });
  });

  describe('showGrid', () => {
    it('should initialize as false', () => {
      expect(component.showGrid).toBeFalse();
    });
  });
});

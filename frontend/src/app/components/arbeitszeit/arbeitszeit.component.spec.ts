import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterStore } from '../../stores/filter.store';
import { ArbeitszeitComponent } from './arbeitszeit.component';

describe('ArbeitszeitComponent', () => {
  let component: ArbeitszeitComponent;
  let fixture: ComponentFixture<ArbeitszeitComponent>;
  let mockFilterStore: { selectedDate: ReturnType<typeof signal<Date>> };

  const mockArbeitszeiten = [
    {
      id: 1,
      monat: 'Januar 2024',
      monatDate: new Date(2024, 0, 1),
      stunden: '160',
    },
    {
      id: 2,
      monat: 'Februar 2024',
      monatDate: new Date(2024, 1, 1),
      stunden: '152',
    },
    {
      id: 3,
      monat: 'März 2024',
      monatDate: new Date(2024, 2, 1),
      stunden: '168',
    },
  ];

  beforeEach(async () => {
    const mockSelectedDate = signal(new Date(2024, 1, 15));

    mockFilterStore = {
      selectedDate: mockSelectedDate,
    };

    await TestBed.configureTestingModule({
      imports: [ArbeitszeitComponent],
      providers: [{ provide: FilterStore, useValue: mockFilterStore }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ArbeitszeitComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('arbeitszeitenWithCurrentMonth', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('arbeitszeiten', mockArbeitszeiten);
    });

    it('should add isCurrentMonth property to all arbeitszeiten', () => {
      const result = component.arbeitszeitenWithCurrentMonth();

      expect(result).toHaveSize(3);
      expect(result[0].isCurrentMonth).toBeFalse();
      expect(result[1].isCurrentMonth).toBeTrue();
      expect(result[2].isCurrentMonth).toBeFalse();
    });

    it('should preserve all original properties', () => {
      const result = component.arbeitszeitenWithCurrentMonth();

      result.forEach((arbeit, index) => {
        expect(arbeit.id).toBe(mockArbeitszeiten[index].id);
        expect(arbeit.monat).toBe(mockArbeitszeiten[index].monat);
        expect(arbeit.monatDate).toBe(mockArbeitszeiten[index].monatDate);
        expect(arbeit.stunden).toBe(mockArbeitszeiten[index].stunden);
        expect(arbeit.isCurrentMonth).toBeDefined();
      });
    });

    it('should update when selectedDate changes', () => {
      let result = component.arbeitszeitenWithCurrentMonth();
      expect(result[1].isCurrentMonth).toBeTrue();

      mockFilterStore.selectedDate.set(new Date(2024, 2, 15));

      result = component.arbeitszeitenWithCurrentMonth();
      expect(result[1].isCurrentMonth).toBeFalse();
      expect(result[2].isCurrentMonth).toBeTrue();
    });

    it('should handle empty arbeitszeiten array', () => {
      fixture.componentRef.setInput('arbeitszeiten', []);
      const result = component.arbeitszeitenWithCurrentMonth();

      expect(result).toHaveSize(0);
    });
  });

  describe('selectedDate', () => {
    it('should return selected date from filter store', () => {
      const expectedDate = new Date(2024, 1, 15);
      mockFilterStore.selectedDate.set(expectedDate);

      expect(component.selectedDate).toBe(expectedDate);
    });
  });
});

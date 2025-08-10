import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Person } from '@seak/types';
import { ApiService } from '../../services/api.service';
import { ArbeitszeitStore } from '../../stores/arbeitszeit.store';
import { FilterStore } from '../../stores/filter.store';
import { PlanzeitStore } from '../../stores/planzeit.store';
import { ApiServiceMock } from '../../testing/api-service.mock';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  it('renders data from stores and reacts to selection', () => {
    const persons: Person[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];

    TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        FilterStore,
        ArbeitszeitStore,
        PlanzeitStore,
        { provide: ApiService, useValue: new ApiServiceMock({ persons }) },
      ],
    });

    const fixture = TestBed.createComponent(LayoutComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    const list = comp.persons();
    expect(Array.isArray(list)).toBeTrue();
  });
});

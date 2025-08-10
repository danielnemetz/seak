import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Person } from '@seak/types';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent {
  persons = input<Person[]>([]);
  selectedPerson = input<Person | undefined>(undefined);
  personSelected = output<Person>();

  onPersonSelect(person: Person): void {
    this.personSelected.emit(person);
  }
}

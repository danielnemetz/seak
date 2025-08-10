export type { Arbeitszeit, Person, Planzeit } from '@seak/types';
export interface ArbeitszeitDisplay {
  id: number;
  monat: string;
  monatDate: Date;
  stunden: string;
}

export interface PlanzeitDisplay {
  id: number;
  tag: string;
  planung: string;
  pause: string;
  einsatz: string;
  workTime: { start: number; end: number };
  breakTime: { start: number; end: number };
  totalTime: { start: number; end: number };
}

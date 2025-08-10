import { calculateDuration } from './calculate-duration';

export const calculateNetWorkTime = (
  workStart: number,
  workEnd: number,
  breakStart: number,
  breakEnd: number,
): number => {
  const workTime = calculateDuration(workStart, workEnd);
  const breakTime = calculateDuration(breakStart, breakEnd);

  return workTime - breakTime;
};

import { Planzeit } from '@seak/types';
import { PlanzeitDisplay } from '../models';
import { calculateNetWorkTime } from '../utils/calculate-net-work-time';
import { formatTime } from '../utils/format-time';

export function normalizePlanzeitenToDisplay(
  planzeiten: ReadonlyArray<Planzeit>,
): PlanzeitDisplay[] {
  return planzeiten.map((plan) => {
    const date = new Date(plan.datum);
    const tag = date.toLocaleDateString('de-DE', { weekday: 'long' });

    const netWorkTime = calculateNetWorkTime(
      plan.planvon,
      plan.planbis,
      plan.pausevon,
      plan.pausebis,
    );

    const hasWork = plan.planvon > 0 && plan.planbis > 0;
    const defaultStart = 480;
    const defaultEnd = 960;

    return {
      id: plan.id,
      tag,
      planung: `${formatTime(plan.planvon)}-${formatTime(plan.planbis)}`,
      pause: `${formatTime(plan.pausevon)}-${formatTime(plan.pausebis)}`,
      einsatz: formatTime(netWorkTime),
      workTime: { start: plan.planvon, end: plan.planbis },
      breakTime: { start: plan.pausevon, end: plan.pausebis },
      totalTime: hasWork
        ? { start: plan.planvon, end: plan.planbis }
        : { start: defaultStart, end: defaultEnd },
    };
  });
}

export const isSameWeek = (date1: Date, date2: Date): boolean => {
  const weekStart1 = getWeekStart(date1);
  const weekStart2 = getWeekStart(date2);

  return (
    weekStart1.getFullYear() === weekStart2.getFullYear() &&
    weekStart1.getMonth() === weekStart2.getMonth() &&
    weekStart1.getDate() === weekStart2.getDate()
  );
};

const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

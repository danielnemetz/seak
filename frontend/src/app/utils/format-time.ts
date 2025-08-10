export const formatTime = (minutes: number): string => {
  if (minutes === 0) {
    return '00:00';
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

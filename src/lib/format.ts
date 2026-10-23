/** 75 → "1 h 15 min" */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

/** 60 → "S/ 60" */
export function formatPrice(soles: number): string {
  return `S/ ${soles}`;
}

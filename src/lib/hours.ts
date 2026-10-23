import { site, type OpeningDay } from '@/data/site';

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Hora actual en Lima, sin depender de la zona horaria del visitante. */
export function nowInTimezone(timezone: string = site.timezone, date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return {
    day: days.indexOf(get('weekday')),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

export interface OpenStatus {
  open: boolean;
  /** Texto principal, p. ej. "Abierto hoy hasta las 21:00" */
  label: string;
}

export function getOpenStatus(hours: readonly OpeningDay[] = site.hours, now = nowInTimezone()): OpenStatus {
  const today = hours.find((h) => h.day === now.day);
  if (today?.opens && today.closes) {
    const opens = toMinutes(today.opens);
    const closes = toMinutes(today.closes);
    if (now.minutes >= opens && now.minutes < closes) {
      return { open: true, label: `Abierto hoy hasta las ${today.closes}` };
    }
    if (now.minutes < opens) {
      return { open: false, label: `Abrimos hoy a las ${today.opens}` };
    }
  }
  // Busca el próximo día con horario
  for (let i = 1; i <= 7; i++) {
    const next = hours.find((h) => h.day === (now.day + i) % 7);
    if (next?.opens) {
      const when = i === 1 ? 'mañana' : `el ${next.label.toLowerCase()}`;
      return { open: false, label: `Cerrado · abrimos ${when} a las ${next.opens}` };
    }
  }
  return { open: false, label: 'Cerrado' };
}

/** Resumen compacto para mostrar sin JS: "Lunes a sábado, 10:00–21:00". */
export function hoursSummary(hours: readonly OpeningDay[] = site.hours): string {
  const openDays = hours.filter((h) => h.opens);
  const first = openDays[0];
  const last = openDays[openDays.length - 1];
  const sameHours = openDays.every((h) => h.opens === first.opens && h.closes === first.closes);
  if (sameHours) {
    return `${first.label} a ${last.label.toLowerCase()}, ${first.opens}–${first.closes}`;
  }
  return openDays.map((h) => `${h.label} ${h.opens}–${h.closes}`).join(', ');
}

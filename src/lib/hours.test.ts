import { describe, expect, it } from 'vitest';
import type { OpeningDay } from '@/data/site';
import { getOpenStatus, hoursSummary, nowInTimezone } from './hours';

const weekdays: OpeningDay[] = [
  { day: 1, label: 'Lunes', opens: '10:00', closes: '21:00' },
  { day: 2, label: 'Martes', opens: '10:00', closes: '21:00' },
  { day: 3, label: 'Miércoles', opens: '10:00', closes: '21:00' },
  { day: 4, label: 'Jueves', opens: '10:00', closes: '21:00' },
  { day: 5, label: 'Viernes', opens: '10:00', closes: '21:00' },
  { day: 6, label: 'Sábado', opens: '10:00', closes: '21:00' },
  { day: 0, label: 'Domingo', opens: null, closes: null },
];

const at = (day: number, hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return { day, minutes: h * 60 + m };
};

describe('nowInTimezone', () => {
  it('usa la hora de Lima (UTC−5) sin importar la zona del equipo', () => {
    // Viernes 23/10/2026 15:30 UTC = viernes 10:30 en Lima
    expect(nowInTimezone('America/Lima', new Date('2026-10-23T15:30:00Z'))).toEqual(at(5, '10:30'));
  });

  it('cambia de día cuando en UTC ya es mañana', () => {
    // Sábado 24/10/2026 02:00 UTC = viernes 21:00 en Lima
    expect(nowInTimezone('America/Lima', new Date('2026-10-24T02:00:00Z'))).toEqual(at(5, '21:00'));
  });
});

describe('getOpenStatus', () => {
  it('abierto dentro del horario', () => {
    expect(getOpenStatus(weekdays, at(3, '15:00'))).toEqual({ open: true, label: 'Abierto hoy hasta las 21:00' });
  });

  it('antes de abrir avisa la hora de hoy', () => {
    expect(getOpenStatus(weekdays, at(3, '08:00'))).toEqual({ open: false, label: 'Abrimos hoy a las 10:00' });
  });

  it('a la hora de cierre ya está cerrado', () => {
    expect(getOpenStatus(weekdays, at(3, '21:00')).open).toBe(false);
  });

  it('el sábado de noche salta el domingo cerrado', () => {
    expect(getOpenStatus(weekdays, at(6, '22:00')).label).toBe('Cerrado · abrimos el lunes a las 10:00');
  });

  it('el domingo abre mañana', () => {
    expect(getOpenStatus(weekdays, at(0, '12:00')).label).toBe('Cerrado · abrimos mañana a las 10:00');
  });
});

describe('hoursSummary', () => {
  it('resume un horario uniforme', () => {
    expect(hoursSummary(weekdays)).toBe('Lunes a sábado, 10:00–21:00');
  });

  it('lista los días cuando los horarios cambian', () => {
    const mixed = [weekdays[0], { ...weekdays[5], closes: '18:00' }];
    expect(hoursSummary(mixed)).toBe('Lunes 10:00–21:00, Sábado 10:00–18:00');
  });
});

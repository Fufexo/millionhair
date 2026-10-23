import { describe, expect, it } from 'vitest';
import { barberShopSchema, openingHoursSpecification } from './schema';

describe('openingHoursSpecification', () => {
  it('agrupa los días con el mismo horario y omite los cerrados', () => {
    const spec = openingHoursSpecification([
      { day: 1, label: 'Lunes', opens: '10:00', closes: '21:00' },
      { day: 2, label: 'Martes', opens: '10:00', closes: '21:00' },
      { day: 6, label: 'Sábado', opens: '09:00', closes: '18:00' },
      { day: 0, label: 'Domingo', opens: null, closes: null },
    ]);
    expect(spec).toEqual([
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday'], opens: '10:00', closes: '21:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '18:00' },
    ]);
  });
});

describe('barberShopSchema', () => {
  const schema = barberShopSchema(new URL('https://example.com'), 'https://example.com/og.jpg');

  it('usa el dominio recibido para @id y url', () => {
    expect(schema['@id']).toBe('https://example.com/#barbershop');
    expect(schema.url).toBe('https://example.com/');
  });

  it('calcula el rango de precios desde los servicios', () => {
    expect(schema.priceRange).toMatch(/^S\/\d+–S\/\d+$/);
  });
});

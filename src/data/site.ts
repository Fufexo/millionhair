/**
 * Datos del negocio. Todo lo que el dueño podría querer cambiar vive aquí
 * (y en los otros archivos de /data), no en los componentes.
 */

/** Ficha de Millionhair en Fresha */
const FRESHA = 'https://www.fresha.com/es/a/millionhair-miraflores-avenida-la-paz-683-ltgt8x8y';

/** Reserva con un servicio ya elegido (id de la variante del servicio en Fresha) */
export const bookService = (serviceId: string) => `${FRESHA}/booking?offerItems=sv%3A${serviceId}`;

/** Reserva con un barbero ya elegido (id del profesional en Fresha) */
export const bookWith = (employeeId: string) => `${FRESHA}/booking?employeeId=${employeeId}`;

export interface OpeningDay {
  /** 0 = domingo … 6 = sábado (igual que Date#getDay) */
  day: number;
  label: string;
  /** "HH:MM" en hora de Lima; null = cerrado */
  opens: string | null;
  closes: string | null;
}

export const site = {
  name: 'Millionhair',
  tagline: 'Elevamos el concepto de barbería',
  description:
    'Barbería en Miraflores, Lima. Cortes, fades, barba y cuidado facial con reserva online y confirmación al instante.',
  timezone: 'America/Lima',
  address: {
    street: 'Av. La Paz 683',
    district: 'Miraflores',
    city: 'Lima',
    region: 'Lima',
    country: 'PE',
  },
  /** Ficha de Google Maps de Millionhair y su ubicación exacta */
  mapsUrl:
    'https://www.google.com/maps/place/Millionhair/@-12.1244808,-77.0267334,17z/data=!4m6!3m5!1s0x9105c9002ce52629:0x25984570654160d7!8m2!3d-12.1244808!4d-77.0267334!16s%2Fg%2F11xcxrvfd6',
  geo: { lat: -12.1244808, lng: -77.0267334 },
  instagram: {
    handle: '@millionhair.pe',
    url: 'https://www.instagram.com/millionhair.pe/',
  },
  /** Reserva general: abre la lista de todos los servicios */
  bookingUrl: `${FRESHA}/all-offer?venue=true`,
  reviewsUrl: `${FRESHA}?reviews=true`,
  parking: true,
  rating: {
    value: '5,0',
    count: 219, // Fresha no expone el total por API: se copia de la ficha
    source: 'Fresha',
  },
  hours: [
    { day: 1, label: 'Lunes', opens: '10:00', closes: '21:00' },
    { day: 2, label: 'Martes', opens: '10:00', closes: '21:00' },
    { day: 3, label: 'Miércoles', opens: '10:00', closes: '21:00' },
    { day: 4, label: 'Jueves', opens: '10:00', closes: '21:00' },
    { day: 5, label: 'Viernes', opens: '10:00', closes: '21:00' },
    { day: 6, label: 'Sábado', opens: '10:00', closes: '21:00' },
    { day: 0, label: 'Domingo', opens: null, closes: null },
  ] satisfies OpeningDay[],
} as const;

export const nav = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#experience', label: 'Experience' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#lookbook', label: 'Lookbook' },
  { href: '#visitanos', label: 'Visítanos' },
] as const;

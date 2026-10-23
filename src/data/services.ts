import { bookService } from './site';

export interface Service {
  name: string;
  /** minutos */
  duration: number;
  /** soles */
  price: number;
  note?: string;
  featured?: boolean;
  bookingUrl: string;
}

/** Los más pedidos. Fresha tiene 12 en total: el resto se ve allá. */
export const services: Service[] = [
  { name: 'Millionhair Basic', duration: 60, price: 60, bookingUrl: bookService('22797385') },
  {
    name: 'Kaleb Millionhair Experience',
    duration: 60,
    price: 70,
    note: 'Con Kaleb',
    featured: true,
    bookingUrl: bookService('23609999'),
  },
  { name: 'Haircut Express', duration: 75, price: 80, bookingUrl: bookService('22797384') },
  { name: 'Millionhair Premium', duration: 75, price: 100, bookingUrl: bookService('22797378') },
  { name: 'Millionhair Face Care', duration: 75, price: 110, bookingUrl: bookService('23868453') },
  { name: 'Ritual de Barba', duration: 30, price: 40, bookingUrl: bookService('22797383') },
];

export const totalServicesOnFresha = 12;

const featured = services.find((s) => s.featured);
if (!featured) {
  throw new Error('services.ts: marca un servicio con `featured: true` (lo usa la sección Experience).');
}
/** El servicio que protagoniza la sección Experience. */
export const featuredService: Service = featured;

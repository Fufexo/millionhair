import type { ImageMetadata } from 'astro';
import kaleb from '@/assets/team/kaleb.jpg';
import james from '@/assets/team/james.jpg';
import willcar from '@/assets/team/willcar.jpg';
import { bookWith } from './site';

export interface Barber {
  name: string;
  role?: string;
  instagram: { handle: string; url: string };
  photo: ImageMetadata;
  /** foco del recorte (object-position) */
  focus?: string;
  /** Clip corto que aparece al pasar el mouse (ruta base sin extensión) */
  video?: string;
  /** Reserva en Fresha con este barbero ya elegido */
  bookingUrl: string;
}

export const team: Barber[] = [
  {
    name: 'Kaleb',
    role: 'Fundador',
    instagram: { handle: '@kalebfloresh', url: 'https://www.instagram.com/kalebfloresh/' },
    photo: kaleb,
    focus: 'center 40%',
    video: '/video/team-kaleb',
    bookingUrl: bookWith('4601939'),
  },
  {
    name: 'James',
    instagram: { handle: '@jamesruiz_barber', url: 'https://www.instagram.com/jamesruiz_barber/' },
    photo: james,
    focus: 'center 35%',
    video: '/video/team-james',
    bookingUrl: bookWith('5402787'),
  },
  {
    name: 'Willcar',
    instagram: { handle: '@willcar.castillo', url: 'https://www.instagram.com/willcar.castillo/' },
    photo: willcar,
    focus: 'center 20%',
    video: '/video/team-willcar',
    bookingUrl: bookWith('4769945'),
  },
];

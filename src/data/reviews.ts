/**
 * Reseñas reales y textuales de Fresha (solo se corrigieron tildes; los
 * recortes van marcados con "…"). Para actualizar: copia la cita tal cual de
 * Fresha y pon nombre e inicial del apellido como aparece allí.
 * El número total de reseñas y la calificación están en site.ts.
 */

export interface Review {
  quote: string;
  author: string;
  /** Mes y año de la reseña (Fresha muestra fechas relativas) */
  date: string;
  service: string;
  barber: string;
  /** Idioma de la cita si no es español, para lectores de pantalla */
  lang?: string;
}

export interface Snippet {
  quote: string;
  author: string;
  lang?: string;
}

/**
 * Citas grandes que van rotando con un fundido (una por barbero).
 * La primera es la que se ve si el usuario prefiere menos movimiento.
 */
export const featured: Review[] = [
  {
    // Original: "…Algunos les dices lo quiero de una manera y te hacen cualquier cosa, pero Kaleb es un crack."
    quote: 'Hizo el corte exactamente como en el video… Kaleb es un crack.',
    author: 'Junior A.',
    date: 'oct. 2026',
    service: 'Kaleb Millionhair Experience',
    barber: 'Kaleb',
  },
  {
    quote: 'Me quedó muy bien, me recomendó este corte y me bajó un par de años. 100/10',
    author: 'Carlos Enrique S.',
    date: 'oct. 2026',
    service: 'Millionhair Basic',
    barber: 'Willcar',
  },
  {
    // Recortada de una reseña más larga
    quote: 'He’s professional, takes real pride in his craft, and has an excellent eye for detail.',
    author: 'Jody A.',
    date: 'sep. 2026',
    service: 'Millionhair Premium',
    barber: 'James',
    lang: 'en',
  },
];

/** Frases cortas de la franja que se desliza (no repiten las citas grandes) */
export const snippets: Snippet[] = [
  { quote: 'Impecable como siempre', author: 'Pedro R.' },
  { quote: 'Kaleb, un tipo A1', author: 'Juan L.' },
  { quote: 'No cambiaré este lugar por nada', author: 'Juan L.' },
  { quote: 'Excelente como siempre', author: 'Ydelfonso R.' },
  { quote: 'Excelente servicio', author: 'Stefano G.' },
];

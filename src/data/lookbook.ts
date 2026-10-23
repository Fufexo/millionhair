import type { ImageMetadata } from 'astro';
import slickBack from '@/assets/lookbook/slick-back.jpg';
import lowFade from '@/assets/lookbook/low-fade.jpg';
import taper from '@/assets/lookbook/taper.jpg';
import volumen from '@/assets/lookbook/volumen.jpg';
import skinFade from '@/assets/lookbook/skin-fade.jpg';
import burstFade from '@/assets/lookbook/burst-fade.jpg';
import platinado from '@/assets/lookbook/platinado.jpg';
import frenchCrop from '@/assets/lookbook/french-crop.jpg';
import crewCut from '@/assets/lookbook/crew-cut.jpg';
import taperRizado from '@/assets/lookbook/taper-rizado.jpg';

export interface Look {
  name: string;
  image: ImageMetadata;
  alt: string;
}

/** Cortes del lookbook, en el orden en que aparecen en el carrusel. */
export const looks: Look[] = [
  { name: 'Slick back con barba', image: slickBack, alt: 'Perfil de un corte peinado hacia atrás con barba perfilada' },
  { name: 'French crop', image: frenchCrop, alt: 'French crop con flequillo texturizado, fade a los lados y candado' },
  { name: 'Low fade texturizado', image: lowFade, alt: 'Perfil de un low fade con textura arriba' },
  { name: 'Burst fade rizado', image: burstFade, alt: 'Perfil de un burst fade con rizos arriba y la nuca más larga' },
  { name: 'Skin fade', image: skinFade, alt: 'Skin fade con raya marcada y barba' },
  { name: 'Taper rizado', image: taperRizado, alt: 'Perfil de un taper bajo con rizos definidos arriba' },
  { name: 'Taper crop', image: taper, alt: 'Vista posterior de un taper con crop' },
  { name: 'Mechas platinadas', image: platinado, alt: 'Perfil de un corte texturizado con mechas platinadas y fade' },
  { name: 'Crew cut con diseño', image: crewCut, alt: 'Crew cut con fade, línea marcada y un diseño en la sien' },
  { name: 'Volumen clásico', image: volumen, alt: 'Corte con volumen peinado hacia atrás y bigote' },
];

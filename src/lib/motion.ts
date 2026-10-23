/**
 * Utilidades del navegador para los videos y animaciones. Solo se importan
 * desde los <script> de los componentes, nunca en el frontmatter.
 */

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Carga el video si estaba en preload="none" y lo reproduce sin audio. */
export function playMuted(video: HTMLVideoElement): Promise<boolean> {
  if (reducedMotion.matches) return Promise.resolve(false);
  if (video.preload === 'none') video.preload = 'auto';
  video.muted = true;
  return video.play().then(
    () => true,
    () => false, // autoplay bloqueado: se queda en el póster
  );
}

/** Ejecuta `callback` cada vez que el usuario activa "reducir movimiento". */
export function onReducedMotion(callback: () => void) {
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) callback();
  });
}

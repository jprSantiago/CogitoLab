/**
 * Revelação progressiva ao rolar (progressive enhancement).
 *
 * - Só atua quando <html> possui a classe `reveal-ready` (adicionada no
 *   <head> apenas quando há JS e o usuário NÃO preferiu reduced-motion).
 * - Elementos com `.reveal` começam invisíveis e surgem ao entrar na viewport.
 * - Ao terminar a transição, removemos as classes para não conflitar com
 *   hover/transform dos próprios cards (ex.: `.card-3d:hover`).
 * - Sem IntersectionObserver, tudo é revelado imediatamente (acessível).
 */

function initReveal() {
  const root = document.documentElement;

  // Só ativa a revelação quando há JS e o usuário não preferiu reduced-motion.
  // Assim, se o script não carregar, nenhum conteúdo fica oculto (0 JS seguro).
  let reduce = false;
  try {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
    /* sem suporte: revela tudo */
  }
  if (reduce) return;
  root.classList.add('reveal-ready');

  // Marca alvos para revelação (exceto slides do carrossel e a navbar).
  const targets = document.querySelectorAll<HTMLElement>(
    'section, footer, .card-3d:not(.carousel__slide), [data-reveal]'
  );
  targets.forEach((el) => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
  });

  const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
  if (els.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add('is-visible');
        el.addEventListener(
          'transitionend',
          () => {
            el.classList.remove('reveal', 'is-visible');
          },
          { once: true }
        );
        io.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  els.forEach((el) => io.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal);
} else {
  initReveal();
}

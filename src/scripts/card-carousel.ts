/**
 * Carrossel / roleta de cards (Projetos e Publicações).
 *
 * Comportamento:
 * - O card ativo fica à frente (centro, escala 1, opacidade 1).
 * - O card anterior e o próximo aparecem em segundo plano, ATRÁS do ativo,
 *   com escala e opacidade menores (visíveis pelas laterais).
 * - Botões de seta (prev/next) e teclado (←/→) navegam entre os visíveis.
 * - Respeita o filtro de lista (`[data-filter-item]` com `hidden`): só
 *   os itens não-ocultos participam da roleta.
 *
 * Progressive enhancement: sem JS, a lista aparece normalmente (grid/fluxo).
 */

interface CarouselRoot extends HTMLElement {
  __cogitoCarousel?: { go: (dir: number) => void };
}

function initCarousel(root: CarouselRoot) {
  const track = root.querySelector<HTMLElement>('.carousel__track');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll<HTMLElement>('.carousel__slide'));
  if (slides.length === 0) return;

  const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');

  // Ativa o modo carrossel (esconde os cards em fluxo normal e posiciona).
  root.classList.add('is-carousel');

  let active = 0;

  const visibleSlides = () => slides.filter((s) => !s.hidden);

  function relayout() {
    const vis = visibleSlides();
    if (vis.length === 0) {
      active = 0;
      return;
    }
    if (active >= vis.length) active = vis.length - 1;
    if (active < 0) active = 0;

    vis.forEach((s, i) => {
      const offset = i - active;
      let tx = 0;
      let scale = 1;
      let opacity = 1;
      let z = 5;

      if (offset === 0) {
        tx = 0;
        scale = 1;
        opacity = 1;
        z = 5;
      } else if (offset === -1 || offset === 1) {
        tx = offset * 50;
        scale = 0.82;
        opacity = 0.5;
        z = 3;
      } else {
        tx = offset < 0 ? -85 : 85;
        scale = 0.7;
        opacity = 0;
        z = 1;
      }

      s.style.transform = `translate(-50%, -50%) translateX(${tx}%) scale(${scale})`;
      s.style.opacity = String(opacity);
      s.style.zIndex = String(z);
      s.style.pointerEvents = offset === 0 || offset === -1 || offset === 1 ? 'auto' : 'none';
    });

    // Itens filtrados (hidden) ficam totalmente ocultos da roleta.
    slides.forEach((s) => {
      if (s.hidden) {
        s.style.opacity = '0';
        s.style.pointerEvents = 'none';
      }
    });

    // Ajusta a altura do trilho ao card ativo (suporta <details> expandido).
    const activeEl = vis.length ? vis[active] : null;
    if (activeEl && track) {
      track.style.height = `${activeEl.offsetHeight + 48}px`;
    }

    const disabled = vis.length <= 1;
    [prev, next].forEach((b) => b && b.toggleAttribute('disabled', disabled));
  }

  function go(dir: number) {
    const vis = visibleSlides();
    if (vis.length === 0) return;
    active = (active + dir + vis.length) % vis.length;
    relayout();
    const entering = vis[active];
    if (entering) {
      entering.classList.remove('is-entering');
      // Força reflow para reiniciar a animação a cada troca.
      void entering.offsetWidth;
      entering.classList.add('is-entering');
    }
  }

  root.__cogitoCarousel = { go };

  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });

  // Reage a mudanças de filtro (atributo `hidden` dos itens).
  slides.forEach((s) =>
    new MutationObserver(() => relayout()).observe(s, {
      attributes: true,
      attributeFilter: ['hidden'],
    })
  );

  // <details> expandido altera a altura do card ativo.
  track.addEventListener(
    'toggle',
    (e) => {
      if ((e.target as HTMLElement).closest('.carousel__slide')) {
        window.setTimeout(relayout, 280);
      }
    },
    true
  );

  window.addEventListener('resize', relayout, { passive: true });
  window.addEventListener('load', relayout);

  relayout();
}

document.querySelectorAll<CarouselRoot>('[data-carousel]').forEach(initCarousel);

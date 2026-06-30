/* ============================================================
   CONFIGURACIÓN — edita solo esta línea con tu número real.
   Formato: código de país + número, sin "+", sin espacios.
   Ejemplos:  USA  ->  '13055551234'
              México->  '5218112345678'
   ============================================================ */
const WHATSAPP_NUMBER = '525620476756';

/* Aplica el número a TODOS los botones de WhatsApp del sitio,
   conservando el mensaje (?text=) de cada botón. */
document.querySelectorAll('a[href*="wa.me/"]').forEach((a) => {
  a.href = a.href.replace(/wa\.me\/\d+/, 'wa.me/' + WHATSAPP_NUMBER);
});

/* ---------- Menú móvil ---------- */
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

/* ---------- Año del footer ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Reveal al hacer scroll (aparece con movimiento) ---------- */
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* ---------- Sombra del header al hacer scroll ---------- */
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Pop-up de Mayoría de Edad (18+) ---------- */
const ageBarrier = document.getElementById('age-barrier');
const btnAccept = document.getElementById('btn-accept-age');
if (ageBarrier && btnAccept) {
  // Se muestra siempre al cargar la página para facilitar pruebas de diseño
  setTimeout(() => {
    ageBarrier.classList.add('show');
  }, 1000);

  btnAccept.addEventListener('click', () => {
    ageBarrier.classList.remove('show');
    localStorage.setItem('age_accepted_v2', 'true');
  });
}

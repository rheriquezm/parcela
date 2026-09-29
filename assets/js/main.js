/* =========================================================
   Parcela Don Misa — Interacciones
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Año dinámico ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header al hacer scroll ---------- */
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menú móvil ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  function closeNav() {
    document.body.classList.remove('nav-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- Animación de aparición ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCaption = document.getElementById('lbCaption');
  var lbClose = document.getElementById('lbClose');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var groups = document.querySelectorAll('[data-gallery]');
  var items = [];
  var index = 0;

  function show(i) {
    if (!items.length) return;
    index = (i + items.length) % items.length;
    var img = items[index];
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lbCaption.textContent = img.alt || '';
  }

  function openLightbox(list, i) {
    items = list;
    show(i);
    lightbox.hidden = false;
    requestAnimationFrame(function () { lightbox.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () { lightbox.hidden = true; }, 320);
  }

  if (groups.length && lightbox) {
    groups.forEach(function (group) {
      var list = Array.prototype.slice.call(group.querySelectorAll('.lb-trigger img'));
      list.forEach(function (img, i) {
        img.parentElement.addEventListener('click', function () { openLightbox(list, i); });
      });
    });
    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', function (e) { e.stopPropagation(); show(index - 1); });
    lbNext.addEventListener('click', function (e) { e.stopPropagation(); show(index + 1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lb-figure')) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }

  /* ---------- Formulario de contacto ----------
     Sitio estático: arma un correo con los datos ingresados.
     Para recibirlo automáticamente, cambia este bloque por
     el endpoint de un servicio como Formspree. */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var data = new FormData(form);
      var asunto = 'Consulta Parcela Don Misa — ' + (data.get('motivo') || '');
      var cuerpo =
        'Nombre: ' + data.get('nombre') + '\n' +
        'Correo: ' + data.get('email') + '\n' +
        'Motivo: ' + data.get('motivo') + '\n\n' +
        data.get('mensaje');

      window.location.href = 'mailto:rodrigohenriquez@gmail.com' +
        '?subject=' + encodeURIComponent(asunto) +
        '&body=' + encodeURIComponent(cuerpo);

      if (note) note.textContent = 'Abriendo tu aplicación de correo… ¡gracias por escribir!';
      form.reset();
    });
  }
})();

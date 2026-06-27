/* Spriha Associate — complete interactive layer 2026 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  var raf = window.requestAnimationFrame || function (cb) { return setTimeout(cb, 16); };

  /* ── Footer year ──────────────────────────────────────────────── */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ══════════════════════════════════════════════════════════════
     PRELOADER
  ══════════════════════════════════════════════════════════════ */
  var preloader = document.getElementById('preloader');
  var fillEl = document.getElementById('preloaderFill');
  var pctEl = document.getElementById('preloaderPct');

  if (preloader && !reduceMotion) {
    var pct = 0;
    var tickInterval = setInterval(function () {
      var increment = pct < 60 ? Math.random() * 12 + 4 : Math.random() * 5 + 1;
      pct = Math.min(pct + increment, 98);
      if (fillEl) fillEl.style.width = pct + '%';
      if (pctEl) pctEl.textContent = Math.floor(pct) + '%';
    }, 80);

    function finishPreloader() {
      clearInterval(tickInterval);
      if (fillEl) fillEl.style.width = '100%';
      if (pctEl) pctEl.textContent = '100%';
      setTimeout(function () {
        preloader.classList.add('is-done');
      }, 300);
    }

    if (document.readyState === 'complete') {
      setTimeout(finishPreloader, 600);
    } else {
      window.addEventListener('load', function () {
        setTimeout(finishPreloader, 300);
      });
      setTimeout(finishPreloader, 2800);
    }
  } else if (preloader) {
    preloader.classList.add('is-done');
  }

  /* ══════════════════════════════════════════════════════════════
     CUSTOM CURSOR
  ══════════════════════════════════════════════════════════════ */
  if (!isTouchDevice && !reduceMotion) {
    var cursorDot = document.getElementById('cursorDot');
    var cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing) {
      var mx = -200, my = -200;
      var rx = -200, ry = -200;

      document.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        cursorDot.style.left = mx + 'px';
        cursorDot.style.top = my + 'px';
      });

      (function animRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        cursorRing.style.left = rx + 'px';
        cursorRing.style.top = ry + 'px';
        raf(animRing);
      })();

      document.querySelectorAll('a, button, .js-magnetic, .svc, .feature, .equip, .ind-card').forEach(function (el) {
        el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
        el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
      });
      document.addEventListener('mousedown', function () { document.body.classList.add('cursor-click'); });
      document.addEventListener('mouseup', function () { document.body.classList.remove('cursor-click'); });
    }
  }

  /* ══════════════════════════════════════════════════════════════
     HERO CANVAS — PARTICLE NETWORK
  ══════════════════════════════════════════════════════════════ */
  if (!reduceMotion) {
    var canvas = document.getElementById('heroCanvas');
    if (canvas) {
      var ctx = canvas.getContext('2d');
      var particles = [];
      var PARTICLE_COUNT = 55;
      var CONNECT_DIST = 120;

      function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      function Particle() {
        this.reset();
      }
      Particle.prototype.reset = function () {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - .5) * .4;
        this.vy = (Math.random() - .5) * .4;
        this.r = Math.random() * 2 + 1;
        this.alpha = Math.random() * .4 + .1;
      };
      Particle.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;
      };

      for (var i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

      function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var a = 0; a < particles.length; a++) {
          particles[a].update();
          ctx.beginPath();
          ctx.arc(particles[a].x, particles[a].y, particles[a].r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(226,27,34,' + particles[a].alpha + ')';
          ctx.fill();
          for (var b = a + 1; b < particles.length; b++) {
            var dx = particles[a].x - particles[b].x;
            var dy = particles[a].y - particles[b].y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECT_DIST) {
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.strokeStyle = 'rgba(226,27,34,' + (1 - dist / CONNECT_DIST) * .15 + ')';
              ctx.lineWidth = .6;
              ctx.stroke();
            }
          }
        }
        raf(drawParticles);
      }
      drawParticles();
    }
  }

  /* ══════════════════════════════════════════════════════════════
     MOBILE NAV
  ══════════════════════════════════════════════════════════════ */
  var toggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  function closeMobileNav() {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.hidden = true;
  }
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      mobileNav.hidden = open;
    });
    mobileNav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMobileNav); });
  }

  /* ══════════════════════════════════════════════════════════════
     SMOOTH ANCHOR SCROLLING
  ══════════════════════════════════════════════════════════════ */
  var header = document.querySelector('.site-header');
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMobileNav();
      var offset = (header ? header.offsetHeight : 0) + 16;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  /* ══════════════════════════════════════════════════════════════
     HERO SLIDER
  ══════════════════════════════════════════════════════════════ */
  (function () {
    var slider = document.getElementById('heroSlider');
    if (!slider) return;
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.slide'));
    var dotsWrap = document.getElementById('slideDots');
    var prevBtn = document.getElementById('slidePrev');
    var nextBtn = document.getElementById('slideNext');
    var curEl = document.getElementById('sliderCur');
    if (slides.length < 2) return;

    var current = 0, timer = null, INTERVAL = 6500;

    var dots = slides.map(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      if (i === 0) b.classList.add('is-active');
      b.addEventListener('click', function () { go(i, true); });
      if (dotsWrap) dotsWrap.appendChild(b);
      return b;
    });

    function updateCounter(n) {
      if (curEl) curEl.textContent = ('0' + (n + 1)).slice(-2);
    }

    function go(n, user) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
      updateCounter(current);
      if (user) restart();
    }
    function next() { go(current + 1); }
    function prev() { go(current - 1); }
    function start() { if (!reduceMotion) timer = setInterval(next, INTERVAL); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', start);
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { next(); restart(); }
      else if (e.key === 'ArrowLeft') { prev(); restart(); }
    });
    var x0 = null;
    slider.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) { dx < 0 ? next() : prev(); restart(); }
      x0 = null;
    }, { passive: true });
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    start();
  })();

  /* ══════════════════════════════════════════════════════════════
     SCROLL REVEAL
  ══════════════════════════════════════════════════════════════ */
  (function () {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    els.forEach(function (el) { obs.observe(el); });
  })();

  /* ══════════════════════════════════════════════════════════════
     ANIMATED STAT COUNTERS + SVG RINGS
  ══════════════════════════════════════════════════════════════ */
  (function () {
    var stats = document.querySelectorAll('.stat');
    if (!stats.length) return;

    function animStat(statEl) {
      var numEl = statEl.querySelector('[data-count]');
      var arc = statEl.querySelector('.stat__arc');
      if (!numEl) return;

      var target = parseInt(numEl.getAttribute('data-count'), 10) || 0;
      var full = arc ? parseFloat(arc.getAttribute('data-full')) || 213.6 : 213.6;

      if (reduceMotion) {
        numEl.textContent = target.toLocaleString();
        if (arc) arc.style.strokeDashoffset = '0';
        return;
      }

      var duration = 1800, startTime = null;
      function tick(ts) {
        if (!startTime) startTime = ts;
        var p = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        numEl.textContent = Math.floor(eased * target).toLocaleString();
        if (arc) arc.style.strokeDashoffset = full * (1 - eased);
        if (p < 1) raf(tick);
        else numEl.textContent = target.toLocaleString();
      }
      raf(tick);
    }

    if (!('IntersectionObserver' in window) || reduceMotion) {
      stats.forEach(animStat);
    } else {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animStat(e.target); obs.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      stats.forEach(function (s) { obs.observe(s); });
    }
  })();

  /* ══════════════════════════════════════════════════════════════
     INFINITE MARQUEE — DUPLICATE TRACK CONTENT
  ══════════════════════════════════════════════════════════════ */
  if (!reduceMotion) {
    document.querySelectorAll('[data-marquee]').forEach(function (m) {
      var track = m.querySelector('.marquee__track');
      if (track) track.innerHTML += track.innerHTML;
    });
  }

  /* ══════════════════════════════════════════════════════════════
     SCROLLSPY NAV
  ══════════════════════════════════════════════════════════════ */
  (function () {
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
    if (!navLinks.length || !('IntersectionObserver' in window)) return;
    var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  })();

  /* ══════════════════════════════════════════════════════════════
     SCROLL HANDLER: PROGRESS BAR + HEADER HIDE/SHOW
  ══════════════════════════════════════════════════════════════ */
  var progress = document.getElementById('scrollProgress');
  var lastY = window.pageYOffset, ticking = false;

  function onScroll() {
    var y = window.pageYOffset;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';
    if (header) {
      header.classList.toggle('is-scrolled', y > 8);
      var navOpen = toggle && toggle.getAttribute('aria-expanded') === 'true';
      if (!navOpen) {
        header.classList.toggle('is-hidden', y > lastY && y > 320);
        if (y <= lastY) header.classList.remove('is-hidden');
      }
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; raf(onScroll); }
  }, { passive: true });
  onScroll();

  /* ══════════════════════════════════════════════════════════════
     3D CARD TILT
  ══════════════════════════════════════════════════════════════ */
  if (!isTouchDevice && !reduceMotion) {
    document.querySelectorAll('.js-tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - .5;
        var y = (e.clientY - rect.top) / rect.height - .5;
        card.style.transform = 'perspective(700px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg) translateZ(8px)';
        card.style.transition = 'transform .08s linear';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
        card.style.transform = '';
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════
     MAGNETIC BUTTONS
  ══════════════════════════════════════════════════════════════ */
  if (!isTouchDevice && !reduceMotion) {
    document.querySelectorAll('.js-magnetic').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.28) + 'px,' + (y * 0.28) + 'px)';
        btn.style.transition = 'transform .12s linear';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
        btn.style.transform = '';
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════
     PARALLAX CTA BACKGROUND
  ══════════════════════════════════════════════════════════════ */
  if (!reduceMotion && !isTouchDevice) {
    var ctaBg = document.querySelector('.cta-band__bg');
    if (ctaBg) {
      var ctaBand = ctaBg.closest('.cta-band');
      window.addEventListener('scroll', function () {
        if (!ctaBand) return;
        var rect = ctaBand.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        var rel = rect.top / window.innerHeight;
        ctaBg.style.transform = 'translateY(' + (rel * 30) + 'px)';
      }, { passive: true });
    }
  }

  /* ══════════════════════════════════════════════════════════════
     CONTACT FORM — WHATSAPP SUBMIT
  ══════════════════════════════════════════════════════════════ */
  var form = document.getElementById('repairForm');
  var formNote = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      if (!name || !phone) {
        if (formNote) {
          formNote.textContent = 'Please add your name and phone so we can reach you.';
          formNote.className = 'form__note';
        }
        return;
      }
      var msg = 'Repair request from ' + name +
        (form.company.value.trim() ? ' (' + form.company.value.trim() + ')' : '') +
        '%0APhone: ' + phone +
        (form.equipment.value.trim() ? '%0AEquipment: ' + form.equipment.value.trim() : '') +
        (form.message.value.trim() ? '%0AFault: ' + form.message.value.trim() : '');
      if (formNote) {
        formNote.textContent = 'Opening WhatsApp with your details…';
        formNote.className = 'form__note ok';
      }
      window.open('https://api.whatsapp.com/send?phone=919712800416&text=' + msg, '_blank', 'noopener');
      form.reset();
    });
  }

})();

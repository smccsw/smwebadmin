(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getTheme() {
    var t = document.documentElement.dataset.theme;
    return (t === 'light' || t === 'dark' || t === 'blend') ? t : 'dark';
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch (e) {}
    syncThemeUi();
  }

  function syncThemeUi() {
    var theme = getTheme();

    var toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      var nextLabel = theme === 'dark' ? 'light' : (theme === 'light' ? 'blend' : 'dark');
      toggle.setAttribute('aria-pressed', theme !== 'dark' ? 'true' : 'false');
      toggle.setAttribute('aria-label', 'Switch to ' + nextLabel + ' mode');
      var label = toggle.querySelector('.theme-toggle__label');
      if (label) label.textContent = nextLabel.charAt(0).toUpperCase() + nextLabel.slice(1) + ' mode';
    }

    var logo = document.getElementById('site-logo');
    if (logo) {
      var lightSrc = logo.getAttribute('data-logo-light');
      var darkSrc = logo.getAttribute('data-logo-dark');
      var nextSrc = (theme === 'light') ? lightSrc : darkSrc;
      if (nextSrc && logo.getAttribute('src') !== nextSrc) {
        logo.setAttribute('src', nextSrc);
      }
    }

    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', theme === 'light' ? '#f6f7f9' : (theme === 'blend' ? '#141c21' : '#0f1419'));
    }
  }

  syncThemeUi();

  var themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = getTheme();
      var next = current === 'dark' ? 'light' : (current === 'light' ? 'blend' : 'dark');
      setTheme(next);
    });
  }

  // Hero fade-in on load
  function initHero() {
    if (document.querySelector('.hero-content')) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          document.body.classList.add('hero-loaded');
        });
      });
    }
  }
  initHero();

  // Scroll-linked: fade hero shapes when scrolled past hero
  var hero = document.querySelector('.hero');
  if (hero && !reducedMotion) {
    var heroHeight = hero.offsetHeight;
    function updateScrollState() {
      if (window.scrollY > heroHeight * 0.4) {
        document.body.classList.add('scroll-past-hero');
      } else {
        document.body.classList.remove('scroll-past-hero');
      }
    }
    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
  }

  // Mouse-follow: spotlight + parallax on hero shapes
  var spotlight = document.querySelector('.hero-spotlight');
  if ((spotlight || hero) && !reducedMotion) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      var y = (e.clientY - rect.top) / rect.height;
      var mx = x * 2 - 1;
      var my = y * 2 - 1;
      hero.style.setProperty('--mx', mx);
      hero.style.setProperty('--my', my);
      if (spotlight) {
        spotlight.style.setProperty('--spotlight-x', (x * 100) + '%');
        spotlight.style.setProperty('--spotlight-y', (y * 100) + '%');
      }
    });
    hero.addEventListener('mouseleave', function () {
      hero.style.setProperty('--mx', '0');
      hero.style.setProperty('--my', '0');
      if (spotlight) {
        spotlight.style.setProperty('--spotlight-x', '50%');
        spotlight.style.setProperty('--spotlight-y', '50%');
      }
    });
  }

  // Hamburger: toggle mobile nav
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open);
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Contact details obfuscation (injected at runtime)
  var contactsHost = document.getElementById('contact-links');
  if (contactsHost) {
    var emailUser = 'hello';
    var emailDomain = 'smwebadmin.com';
    var emailAddress = emailUser + '@' + emailDomain;
    var telE164 = '+44' + '7624428679';
    var phoneHref = 'tel:' + telE164;
    var whatsappHref = 'https://wa.me/' + '447624428679';
    var phoneLabel =
      'Call ' + ('07624' + ' ' + '428679') + ', international ' + telE164;

    var iconPhone =
      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
    var iconMail =
      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 7L2 7"/></svg>';
    var iconWhatsApp =
      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.983.998-3.648-.235-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.029 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.449-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.496 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.058 24l6.304-1.654a11.882 11.882 0 005.684 1.448h.005c6.554 0 11.892-5.336 11.892-11.893a11.814 11.814 0 00-3.48-8.413z"/></svg>';

    contactsHost.innerHTML =
      '<a class="contact-links__btn" href="' + phoneHref + '" aria-label="' + phoneLabel + '">' + iconPhone + '</a>' +
      '<a class="contact-links__btn" href="mailto:' + emailAddress + '" aria-label="Email ' + emailAddress + '">' + iconMail + '</a>' +
      '<a class="contact-links__btn" href="' + whatsappHref + '" target="_blank" rel="noopener noreferrer" aria-label="Message SM Web Admin on WhatsApp (opens WhatsApp in a new tab)">' + iconWhatsApp + '</a>';
  }
})();

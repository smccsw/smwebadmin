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
  var emailElement = document.getElementById('email');
  if (emailElement) {
    var emailUser = 'hello';
    var emailDomain = 'smwebadmin.com';
    var emailAddress = emailUser + '@' + emailDomain;
    emailElement.innerHTML =
      '<a href="mailto:' + emailAddress + '">' + emailAddress + '</a>';
  }

  var phoneElement = document.getElementById('phone');
  if (phoneElement) {
    var phoneHref = 'tel:' + '07624' + '428679';
    phoneElement.innerHTML =
      '<a class="btn btn-primary" href="' + phoneHref + '">' +
      'Call ' + '07624' + ' ' + '428679' +
      '</a>';
  }
})();

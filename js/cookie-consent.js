(function () {
  'use strict';

  var STORAGE_KEY = 'smwa_cookie_consent_v1';
  var ACCEPTED = 'accepted';
  var REJECTED = 'rejected';

  function getChoice() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setChoice(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      // ignore
    }
  }

  function updateConsent(granted) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied'
    });
  }

  function hideBanner(banner) {
    if (!banner) return;
    banner.setAttribute('hidden', '');
  }

  function showBanner(banner) {
    if (!banner) return;
    banner.removeAttribute('hidden');
  }

  function wireUI(banner) {
    var acceptBtn = banner.querySelector('[data-cookie-action="accept"]');
    var rejectBtn = banner.querySelector('[data-cookie-action="reject"]');
    var settingsBtns = document.querySelectorAll('[data-cookie-action="settings"]');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        setChoice(ACCEPTED);
        updateConsent(true);
        hideBanner(banner);
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', function () {
        setChoice(REJECTED);
        updateConsent(false);
        hideBanner(banner);
      });
    }

    settingsBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        try { window.localStorage.removeItem(STORAGE_KEY); } catch (err) {}
        showBanner(banner);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;

    wireUI(banner);

    var choice = getChoice();
    if (choice === ACCEPTED) {
      updateConsent(true);
      hideBanner(banner);
      return;
    }

    if (choice === REJECTED) {
      updateConsent(false);
      hideBanner(banner);
      return;
    }

    // No choice yet
    showBanner(banner);
  });
})();

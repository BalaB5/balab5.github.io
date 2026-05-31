(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    }
    return document.querySelector(el);
  };

  // Navbar links active state on scroll
  const navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  // Scroll to element with offset
  const scrollto = (el) => {
    let header = select('#header');
    let offset = header.offsetHeight + 16;
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };

  // Mobile nav toggle
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  on('click', '.mobile-nav-toggle', function(e) {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('show');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault();
      const navMenu = document.getElementById('nav-menu');
      navMenu.classList.remove('show');
      const toggle = select('.mobile-nav-toggle');
      toggle.classList.add('bi-list');
      toggle.classList.remove('bi-x');
      scrollto(this.hash);
    }
  }, true);

  // Hash links on page load
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        setTimeout(() => scrollto(window.location.hash), 100);
      }
    }
  });

  // Typed effect
  const typed = select('.typed');
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Lightbox
  GLightbox({ selector: '.portfolio-lightbox' });

  // Smooth scroll-triggered fade-up via CSS .reveal + IntersectionObserver

})();

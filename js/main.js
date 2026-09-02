document.addEventListener('DOMContentLoaded', function () {

  /* Sticky header shadow */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
      backToTop && backToTop.classList.toggle('show', window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Mobile nav */
  var navToggle = document.querySelector('.nav-toggle');
  var navClose = document.querySelector('.mobile-nav-close');
  var backdrop = document.querySelector('.nav-backdrop');
  var body = document.body;

  function openNav() { body.classList.add('nav-open'); }
  function closeNav() { body.classList.remove('nav-open'); }

  if (navToggle) navToggle.addEventListener('click', openNav);
  if (navClose) navClose.addEventListener('click', closeNav);
  if (backdrop) backdrop.addEventListener('click', closeNav);

  document.querySelectorAll('.mobile-nav > ul > li > a').forEach(function (link) {
    var parentLi = link.parentElement;
    var sub = parentLi.querySelector('.sub');
    if (sub) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        sub.classList.toggle('open');
        parentLi.classList.toggle('open');
      });
    }
  });

  /* Back to top */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Enquiry form */
  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var successBox = document.getElementById('form-success');

      var data = new FormData(form);
      var subject = encodeURIComponent('Enquiry from ' + (data.get('company') || data.get('name') || 'Website'));
      var lines = [
        'Contact Person: ' + data.get('name'),
        'Company Name: ' + data.get('company'),
        'Country: ' + data.get('country'),
        'Email: ' + data.get('email'),
        'Contact Number: ' + data.get('phone'),
        'Mobile Number: ' + data.get('mobile'),
        'Fax: ' + data.get('fax'),
        'Enquiry For: ' + data.get('enquiry_for'),
        '',
        'Details:',
        data.get('details')
      ];
      var body = encodeURIComponent(lines.join('\n'));
      var mailto = 'mailto:info@mikadoenterprise.com?subject=' + subject + '&body=' + body;

      if (successBox) successBox.classList.add('show');
      form.reset();

      window.location.href = mailto;
    });
  }

});

document.addEventListener("DOMContentLoaded", function () {
  (function () {
    const prefersReduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.reveal');

    if (prefersReduced || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('active'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.2,
      rootMargin: "0px"
    });

    targets.forEach(el => observer.observe(el));
  })();
});

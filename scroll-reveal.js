(function () {
  // if user prefers less motion, show everything immediately
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.reveal');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('active'));
    return;
  }

  // Create the observer
  // threshold: 0.2 means "when 20% of the element is visible"
  // rootMargin: tweak when it triggers relative to viewport edges
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the class to trigger CSS transition
        entry.target.classList.add('active');

        // Run once per element
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,            // viewport
    threshold: 0.2,        // trigger when 20% visible
    rootMargin: '0px 0px -10% 0px' // start a tad before fully in view (optional)
  });

  // Observe all targets
  targets.forEach(el => observer.observe(el));
})();

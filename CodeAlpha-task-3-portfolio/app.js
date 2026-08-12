// ---------- Typed hero line ----------
  const typedText = document.getElementById('typedText');
  const phrase = "Current status: Open to internship_";
  let i = 0;
  function typeChar(){
    if(i <= phrase.length){
      typedText.textContent = phrase.slice(0, i);
      i++;
      setTimeout(typeChar, 38);
    }
  }
  typeChar();

  // ---------- Mobile nav toggle ----------
  const railToggle = document.getElementById('railToggle');
  const railNav = document.getElementById('railNav');
  railToggle.addEventListener('click', () => {
    const isOpen = railNav.classList.toggle('open');
    railToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav after clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      railNav.classList.remove('open');
      railToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ---------- Active nav link on scroll ----------
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-link[data-section="${id}"]`);
      if(!link) return;
      if(entry.isIntersecting){
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { threshold: 0.4, rootMargin: '-10% 0px -60% 0px' });

  sections.forEach(sec => {
    if(sec.id !== 'hero') navObserver.observe(sec);
  });

  // ---------- Contact form (demo submit) ----------
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sent ✓';
    btn.style.background = 'var(--signal-bright)';
    form.reset();
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
    }, 2400);
  });

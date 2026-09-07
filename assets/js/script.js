document.getElementById('year').textContent = new Date().getFullYear();

const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');
if (btn && nav) {
  btn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

function activateLink(id) {
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('href').replace('#','');
    activateLink(targetId);
  });
});

let ticking = false;
function updateActiveOnScroll(){
  const offset = 140;
  let currentId = sections[0] ? sections[0].id : '';

  sections.forEach(section => {
    const top = section.offsetTop - offset;
    if (window.scrollY >= top) currentId = section.id;
  });

  if (currentId) activateLink(currentId);
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateActiveOnScroll);
    ticking = true;
  }
}, { passive: true });

window.addEventListener('load', updateActiveOnScroll);
window.addEventListener('resize', updateActiveOnScroll);

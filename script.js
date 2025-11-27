// Rok ve footeru
const _yearEl = document.getElementById('year');
if(_yearEl) _yearEl.textContent = new Date().getFullYear();

// Přepínání sekcí
const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section');

links.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href') || '';
    if(!href.startsWith('#')) return;
    e.preventDefault();
    const targetId = href.substring(1);
    const target = document.getElementById(targetId);
    if(!target) return;

    // optional: keep sections 'active' class behaviour if used for styling
    sections.forEach(sec => sec.classList.remove('active'));
    target.classList.add('active');

    // smooth scroll to the section and update URL hash without blurring
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    try { history.replaceState(null, '', '#' + targetId); } catch(err) {}

    // close mobile nav if present
    const _nav = document.getElementById('navLinks');
    if(_nav && _nav.classList.contains('show')) _nav.classList.remove('show');
  });
});

// --- Additional site-wide scripts moved from inline blocks in index.html ---
// hamburger toggle
const ham = document.getElementById('hamburger');
const nav = document.getElementById('navLinks');
if(ham && nav){
  ham.addEventListener('click', ()=> nav.classList.toggle('show'));
}

// reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('show');
  });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// stats counting
function animateCount(id, to, suffix=''){
  const el = document.getElementById(id);
  if(!el) return;
  const dur = 1400;
  const step = ()=>{
    const progress = Math.min(1, (performance.now()-startTime)/dur);
    el.textContent = Math.floor(progress * to) + suffix;
    if(progress < 1) requestAnimationFrame(step);
  }
  let startTime = performance.now();
  requestAnimationFrame(step);
}

// start counts when visible
const statsEl = document.querySelector('#stat1');
const statsObserver = new IntersectionObserver((entries, obs)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      animateCount('stat1', 256);
      animateCount('stat2', 18);
      // for percent, animate to 95 and append %
      const el3 = document.getElementById('stat3');
      let _start=performance.now();
      const _dur=1400;
      (function tick(){
        const progress=Math.min(1,(performance.now()-_start)/_dur);
        if(el3) el3.textContent = Math.floor(progress*95) + '%';
        if(progress<1) requestAnimationFrame(tick);
      })();
      obs.disconnect();
    }
  });
}, {threshold:0.3});
if(statsEl) statsObserver.observe(statsEl);

// smooth close mobile nav on link click
document.querySelectorAll('#navLinks a').forEach(a=>{
  a.addEventListener('click', ()=> nav && nav.classList.remove('show'));
});

// little keyboard accessibility: close nav with ESC
document.addEventListener('keydown', e=>{
  if(e.key === 'Escape' && nav) nav.classList.remove('show');
});

// SPLIT TEXT REVEAL ON SCROLL ANIMATION
const initSplitTextAnimation = ()=>{
  const splitTargets = document.querySelectorAll('h2.reveal, h3.reveal, .section-title h3');
  splitTargets.forEach(el=>{
    const text = el.textContent;
    const chars = text.split('').map((char, idx)=>{
      const span = document.createElement('span');
      span.className = 'split-text-char';
      span.textContent = (char === ' ') ? '\u00A0' : char;
      span.style.animationDelay = idx * 0.04 + 's';
      return span;
    });
    el.textContent = '';
    chars.forEach(span=> el.appendChild(span));
  });
};

// Initialize split text on page load
document.addEventListener('DOMContentLoaded', initSplitTextAnimation);

// Animate split text chars when they come into view
const splitObserver = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      const chars = en.target.querySelectorAll('.split-text-char');
      chars.forEach(char=> char.classList.add('show'));
      splitObserver.unobserve(en.target);
    }
  });
}, {threshold:0.3});

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.split-text-char').forEach(el=>{
    if(el.parentElement) splitObserver.observe(el.parentElement);
  });
});

// Match avatar width to the widest member name so both photos stay identical and centered
function syncAvatarSize(){
  const members = Array.from(document.querySelectorAll('.member'));
  if(members.length === 0) return;
  let maxNameW = 0;
  members.forEach(member=>{
    const nameEl = member.querySelector('strong');
    if(!nameEl) return;
    const w = nameEl.offsetWidth;
    if(w > maxNameW) maxNameW = w;
  });
  const desiredW = Math.min(Math.max(maxNameW + 48, 120), 420); // clamp
  const desiredH = Math.round(desiredW * 1.6);
  members.forEach(member=>{
    const avatar = member.querySelector('.avatar');
    if(!avatar) return;
    avatar.style.width = desiredW + 'px';
    avatar.style.height = desiredH + 'px';
    avatar.style.margin = '12px auto 0';
  });
}
window.addEventListener('load', syncAvatarSize);
let _avatarResizeTimer = null;
window.addEventListener('resize', ()=>{ clearTimeout(_avatarResizeTimer); _avatarResizeTimer = setTimeout(syncAvatarSize, 120); });

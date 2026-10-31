const spreads = [
  {left:`<div class="page-inner cover-page"><span class="page-kicker">A PERSONAL COLLECTION</span><div class="cover-mark">M<span>.</span></div><div><p class="small-label">THE WORK OF</p><h2>M Mobeen</h2><p>Web developer & curious maker.</p></div><div class="page-bottom"><span>PORTFOLIO BOOK</span><span>VOL. 01</span></div></div>`,right:`<div class="page-inner welcome"><span class="page-kicker">A NOTE FROM THE MAKER</span><div><span class="chapter">01 / INTRODUCTION</span><h2>Hello,<br><em>I'm Mobeen.</em></h2><p>I'm a web developer. Welcome to a collection of my experience, skills and projects.</p><p>Turn the page to look around.</p></div><div class="page-bottom"><span>WELCOME IN</span><span>01</span></div></div>`},
  {left:`<div class="page-inner"><span class="page-kicker">THE STORY SO FAR</span><div><span class="chapter">02 / EXPERIENCE</span><h2>Work<br><em>experience.</em></h2><p class="lead">A timeline of web development work.</p><div class="timeline"><div><b>2020 — 2021</b><span>Web developing</span></div><div><b>2021 — 2022</b><span>Web developing</span></div><div><b>2023 — 2024</b><span>Web developing</span></div></div></div><div class="page-bottom"><span>EXPERIENCE</span><span>02</span></div></div>`,right:`<div class="page-inner"><span class="page-kicker">ALWAYS LEARNING</span><div><span class="chapter">03 / EDUCATION</span><h2>Learning<br><em>as I go.</em></h2><p class="lead">Education and the continued pursuit of new ideas.</p><div class="timeline"><div><b>2020 — 2021</b><span>Web developing</span></div><div><b>2021 — 2022</b><span>Web developing</span></div><div><b>2023 — 2024</b><span>Web developing</span></div></div></div><div class="page-bottom"><span>EDUCATION</span><span>03</span></div></div>`},
  {left:`<div class="page-inner"><span class="page-kicker">WHAT I DO</span><div><span class="chapter">04 / SERVICES</span><h2>Made with<br><em>purpose.</em></h2><div class="list"><div><span>01</span><strong>Web development</strong><i>↗</i></div><div><span>02</span><strong>Creative design</strong><i>↗</i></div><div><span>03</span><strong>Digital marketing</strong><i>↗</i></div><div><span>04</span><strong>Arduino</strong><i>↗</i></div></div></div><div class="page-bottom"><span>SERVICES</span><span>04</span></div></div>`,right:`<div class="page-inner"><span class="page-kicker">THE TOOLKIT</span><div><span class="chapter">05 / SKILLS</span><h2>A few tools<br><em>of the trade.</em></h2><div class="skill-group"><b>FRONT-END</b><p>HTML / CSS / JavaScript / React / Bootstrap / Tailwind</p></div><div class="skill-group"><b>BACK-END</b><p>Python / Java / MongoDB / Node</p></div><div class="skill-group"><b>DESIGN</b><p>Figma</p></div></div><div class="page-bottom"><span>SKILLS</span><span>05</span></div></div>`},
  {left:`<div class="page-inner"><span class="page-kicker">SELECTED WORK</span><div><span class="chapter">06 / PROJECTS</span><h2>Work in<br><em>progress.</em></h2><div class="project-art" aria-label="Decorative abstract artwork"><span>✳</span><div></div><small>IDEAS<br>IN MOTION</small></div><p class="caption">Project details and links to be added.</p></div><div class="page-bottom"><span>PROJECTS</span><span>06</span></div></div>`,right:`<div class="page-inner contact"><span class="page-kicker">THE LAST PAGE, FOR NOW</span><div><span class="chapter">07 / CONTACT</span><h2>Let's make<br><em>something.</em></h2><p class="lead">Have a project in mind? Contact details can be added here.</p><div class="contact-mark">✳</div></div><div class="page-bottom"><span>THANKS FOR READING</span><span>07</span></div></div>`}
];
const left = document.querySelector('#left-page'), right = document.querySelector('#right-page'), prev = document.querySelector('#prev'), next = document.querySelector('#next'), status = document.querySelector('#status'), book = document.querySelector('#book-pages');
let current = 0, locked = false;
function render() { left.innerHTML = spreads[current].left; right.innerHTML = spreads[current].right; prev.disabled = current === 0; next.disabled = current === spreads.length - 1; status.textContent = `SPREAD ${String(current + 1).padStart(2,'0')} / ${String(spreads.length).padStart(2,'0')}`; }
async function turn(direction) {
  const target = current + direction;
  if (locked || target < 0 || target >= spreads.length) return;
  locked = true;
  book.setAttribute('aria-busy', 'true');
  prev.disabled = next.disabled = true;
  const sheet = document.createElement('div');
  sheet.className = 'turning-sheet ' + (direction > 0 ? 'forward' : 'backward');
  sheet.setAttribute('aria-hidden', 'true');
  sheet.inert = true;
  const front = direction > 0 ? spreads[current].right : spreads[current].left;
  const back = direction > 0 ? spreads[target].left : spreads[target].right;
  sheet.innerHTML = `<div class="sheet-face sheet-front">${front}</div><div class="sheet-face sheet-back">${back}</div>`;
  book.append(sheet);
  if (direction > 0) right.innerHTML = spreads[target].right;
  else left.innerHTML = spreads[target].left;
  try {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const animation = sheet.animate([
        { transform: 'rotateY(0deg)' },
        { transform: `rotateY(${direction > 0 ? -180 : 180}deg)` }
      ], { duration: 850, easing: 'cubic-bezier(.35,.05,.2,1)', fill: 'forwards' });
      await animation.finished;
    }
  } catch (_) { /* A cancelled animation still settles on its requested spread. */ }
  finally {
    current = target;
    render();
    sheet.remove();
    locked = false;
    book.removeAttribute('aria-busy');
  }
}
prev.addEventListener('click', () => turn(-1)); next.addEventListener('click', () => turn(1));
book.addEventListener('click', e => { if (e.target.closest('a, button')) return; const rect = book.getBoundingClientRect(); const position = (e.clientX - rect.left) / rect.width; if (position < .25) turn(-1); else if (position > .75) turn(1); });
book.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); turn(e.key === 'ArrowRight' ? 1 : -1); } });
let touchStart = null; book.addEventListener('touchstart', e => { touchStart = {x:e.touches[0].clientX,y:e.touches[0].clientY}; }, {passive:true}); book.addEventListener('touchend', e => { if (!touchStart) return; const dx = e.changedTouches[0].clientX - touchStart.x, dy = e.changedTouches[0].clientY - touchStart.y; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) turn(dx < 0 ? 1 : -1); touchStart = null; }, {passive:true}); render();

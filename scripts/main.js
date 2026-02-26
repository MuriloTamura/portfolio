// ─────────────────────────────────────────
// TYPING EFFECT
// ─────────────────────────────────────────
const typingPhrases = [
  'Full Stack Developer',
  'Web Developer',
  'Java & Spring Boot',
  'Criador de Interfaces',
  'Em constante evolução',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function typeLoop() {
  const current = typingPhrases[phraseIdx];
  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    typingEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % typingPhrases.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 40);
  }
}
setTimeout(typeLoop, 1400);

// ─────────────────────────────────────────
// CUSTOM CURSOR
// ─────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    cursorTrail.style.transform = 'translate(-50%, -50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// ─────────────────────────────────────────
// NAV SCROLL
// ─────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ─────────────────────────────────────────
// SKILLS DATA
// ─────────────────────────────────────────
const skills = [
  { name: 'Java',             kana: '術', level: 65, tag: 'Backend'      },
  { name: 'Spring Boot',      kana: '春', level: 55, tag: 'Framework'    },
  { name: 'JavaScript',       kana: '動', level: 70, tag: 'Frontend'     },
  { name: 'HTML & CSS',       kana: '形', level: 80, tag: 'Frontend'     },
  { name: 'PostgreSQL / SQL', kana: 'デ', level: 60, tag: 'Database'     },
  { name: 'Git & GitHub',     kana: '流', level: 65, tag: 'Ferramentas'  },
];

const skillsGrid = document.getElementById('skillsGrid');
skills.forEach((s, i) => {
  const card = document.createElement('div');
  card.className = `skill-card reveal reveal-delay-${(i % 4) + 1}`;
  card.innerHTML = `
    <span class="skill-icon">${s.kana}</span>
    <div class="skill-name">${s.name}</div>
    <div class="skill-bar-bg"><div class="skill-bar-fill" data-width="${s.level}"></div></div>
    <div class="skill-level">${s.tag} — ${s.level}%</div>
  `;
  skillsGrid.appendChild(card);
});

// ─────────────────────────────────────────
// PROJECTS DATA
// ─────────────────────────────────────────
const projects = [
  {
    title: 'HolyDress',
    desc: 'Loja virtual cristã, desenvolvida com foco em proporcionar uma experiência de compra agradável, segura e acolhedora, alinhada aos princípios e valores cristãos.',
    tags: ['Javascrpipt', 'CSS', 'HTML'],
    kana: '登',
    icon: '⚙',
    wip: false,
    image: 'assets/holydress-preview.png',
    link: 'https://github.com/lucaspgouv/Holydress',
  },
  {
    title: 'Sigej',
    desc: 'Sistema de Gestão de Jardinagem e Manutenção do Campus Maracanaú. Projeto acadêmico desenvolvido para a disciplina de Banco de Dados',
    tags: ['Java', 'Spring Boot', 'PostgresSql', 'Docker', 'Thymeleaf', 'CSS + HTML'],
    kana: '頁',
    icon: '◻',
    wip: false,
    image: 'assets/sigej-preview.png',
    link: 'https://github.com/MuriloTamura/sigej',
  },
  {
    title: 'Em Breve...',
    desc: 'Novos projetos estão sendo desenvolvidos. Acompanhe meu GitHub para ver o que estou construindo.',
    tags: ['???', 'Em Breve'],
    kana: '未',
    icon: '✦',
    wip: true,
  },
];

const projectsGrid = document.getElementById('projectsGrid');
projects.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = `project-card reveal reveal-delay-${i + 1}`;
  card.innerHTML = `
    <div class="project-thumb">
      ${p.image
        ? `<img src="${p.image}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;display:block;">`
        : `<span class="thumb-kana">${p.kana}</span><span class="thumb-icon">${p.icon}</span>`
      }
      <div class="project-overlay">
        <a href="${p.link || 'https://github.com/MuriloTamura'}" target="_blank">Ver no GitHub →</a>
      </div>
    </div>
    <div class="project-body">
      <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
      <h3 class="project-title">${p.title}</h3>
      <p class="project-desc">${p.desc}</p>
      ${p.wip ? '<div class="project-wip"><span class="wip-dot"></span> Em desenvolvimento</div>' : ''}
    </div>
  `;
  projectsGrid.appendChild(card);
});

// ─────────────────────────────────────────
// INTERSECTION OBSERVER — Reveal + Skill Bars
// ─────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Skill bar animation on scroll
document.querySelectorAll('.skill-card').forEach(el => {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
        }, 300);
      }
    });
  }, { threshold: 0.3 }).observe(el);
});

// ─────────────────────────────────────────
// FORM SUBMIT
// ─────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  btn.textContent = 'Mensagem Enviada ✓';
  btn.style.background = '#4A5240';
  setTimeout(() => {
    btn.textContent = 'Enviar Mensagem →';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

// ─────────────────────────────────────────
// SMOOTH REVEAL ON LOAD
// ─────────────────────────────────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});
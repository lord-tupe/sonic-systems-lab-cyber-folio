// Viewport height fix for mobile
(function setViewportHeight() {
    const updateVh = () => { document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px'); };
    updateVh();
    window.addEventListener('resize', updateVh);
})();

// Loader
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1800);
});

// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
});

function animRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .glass-card, .skill-tag, .theme-nav-dot, .contact-icon-btn, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// Scroll to top
document.getElementById('scroll-top').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show/hide scroll to top button
const fab = document.getElementById('scroll-top');
window.addEventListener('scroll', () => fab.classList.toggle('visible', window.scrollY > 400), { passive: true });

// Nav scroll effect
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), { passive: true });

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const ioNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const id = entry.target.id;
            const active = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.3 });
sections.forEach(s => ioNav.observe(s));

// Theme nav dots
const themeDots = document.querySelectorAll('.theme-nav-dot');
const trackedSections = ['hero', 'about', 'skills', 'projects', 'contact'];
const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const idx = trackedSections.indexOf(entry.target.id);
            if (idx !== -1) themeDots.forEach((d, i) => d.classList.toggle('active', i === idx));
        }
    });
}, { threshold: 0.4 });
trackedSections.forEach(id => { const el = document.getElementById(id); if (el) heroObserver.observe(el); });

themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const target = document.getElementById(dot.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Fade-in animations
const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    hamburger.setAttribute('aria-expanded', menuOpen);
    const spans = hamburger.querySelectorAll('span');
    if (menuOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        spans[2].style.width = '24px';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
        spans[2].style.width = '24px';
    }
});

document.getElementById('mobileClose').addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
    spans[2].style.width = '24px';
}

mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Theme toggle
const darkToggle = document.getElementById('dark-mode-toggle');
const darkToggleMobile = document.getElementById('dark-mode-toggle-mobile');
const icon = darkToggle?.querySelector('i');
const iconMobile = darkToggleMobile?.querySelector('i');

function setTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
        if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
        if (iconMobile) { iconMobile.classList.remove('fa-sun'); iconMobile.classList.add('fa-moon'); }
        if (darkToggleMobile) darkToggleMobile.querySelector('span').textContent = 'Dark Mode';
    } else {
        document.body.classList.remove('light-mode');
        if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
        if (iconMobile) { iconMobile.classList.remove('fa-moon'); iconMobile.classList.add('fa-sun'); }
        if (darkToggleMobile) darkToggleMobile.querySelector('span').textContent = 'Light Mode';
    }
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') setTheme(true);

function toggleTheme() { setTheme(!document.body.classList.contains('light-mode')); }
if (darkToggle) darkToggle.addEventListener('click', toggleTheme);
if (darkToggleMobile) darkToggleMobile.addEventListener('click', toggleTheme);

// Contact form
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Message Sent <i class="fas fa-check text-xs"></i>';
    btn.style.background = 'linear-gradient(135deg, #69f0ae, #00c853)';
    setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        e.target.reset();
    }, 2500);
});

// Music visualizer
const vizContainer = document.getElementById('musicViz');
if (vizContainer) {
    for (let i = 0; i < 60; i++) {
        const bar = document.createElement('div');
        bar.className = 'viz-bar';
        bar.style.setProperty('--bar-height', (8 + Math.random() * 45) + 'px');
        bar.style.animationDelay = (Math.random() * 1.5) + 's';
        bar.style.animationDuration = (0.6 + Math.random() * 0.8) + 's';
        vizContainer.appendChild(bar);
    }
}

// Hero canvas animation
(function() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const pts = [];
    const COUNT = 70;
    for (let i = 0; i < COUNT; i++) {
        pts.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.25,
            size: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.4 + 0.1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Grid
        ctx.strokeStyle = 'rgba(79,195,247,0.025)';
        ctx.lineWidth = 1;
        const gs = 50;
        for (let x = 0; x < canvas.width; x += gs) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gs) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Particles
        for (let i = 0; i < pts.length; i++) {
            const p = pts[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(79,195,247,${p.alpha})`;
            ctx.fill();
            
            for (let j = i + 1; j < pts.length; j++) {
                const q = pts[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const d = Math.sqrt(dx*dx + dy*dy);
                if (d < 140) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(79,195,247,${0.05 * (1 - d/140)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        // Flowing waves
        const t = Date.now() * 0.001;
        for (let w = 0; w < 3; w++) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79,195,247,${0.06 + Math.sin(t + w) * 0.03})`;
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 4) {
                const y = canvas.height * 0.25 + Math.sin(x * 0.004 + t + w * 1.2) * 60 + w * 70;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        
        requestAnimationFrame(draw);
    }
    draw();
})();

// Parallax effect
window.addEventListener('scroll', () => {
    document.querySelectorAll('.hero-bg-image').forEach(bg => {
        const section = bg.closest('.hero-section');
        const rect = section.getBoundingClientRect();
        bg.style.transform = `translateY(${rect.top * 0.3}px) scale(1.1)`;
    });
}, { passive: true });

/**
 * Atupele Nathan Mkagula - Interactive Portfolio Engine
 * High-performance vanilla JS with zero external framework overhead.
 */

// ==========================================================================
// 1. Viewport & Loader Management
// ==========================================================================
(function setViewportHeight() {
    const updateVh = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    updateVh();
    window.addEventListener('resize', updateVh, { passive: true });
})();

// Fast, smooth loader dismiss
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => loader.classList.add('hidden'), 300);
    }
});

// ==========================================================================
// 2. Custom Cursor with Elastic Trail & Accessibility
// ==========================================================================
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
let rx = mx, ry = my;
let isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouch && cursor && ring) {
    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.left = `${mx}px`;
        cursor.style.top = `${my}px`;
    }, { passive: true });

    function animRing() {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.left = `${rx}px`;
        ring.style.top = `${ry}px`;
        requestAnimationFrame(animRing);
    }
    animRing();

    const hoverSelectors = 'a, button, .glass-card, .skill-tag, .theme-nav-dot, .contact-chip-btn, .filter-btn, input, textarea, .project-card, .audio-play-btn, .audio-preset-btn';
    
    function attachCursorHover(container = document) {
        container.querySelectorAll(hoverSelectors).forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }
    attachCursorHover();
}

// ==========================================================================
// 3. Theme Toggle (Dark / Light) with Storage
// ==========================================================================
const darkToggle = document.getElementById('dark-mode-toggle');
const darkToggleMobile = document.getElementById('dark-mode-toggle-mobile');

function setTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
    
    const icon = darkToggle?.querySelector('i');
    const iconMobile = darkToggleMobile?.querySelector('i');
    
    if (icon) {
        icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    }
    if (iconMobile) {
        iconMobile.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    }
    if (darkToggleMobile) {
        const textSpan = darkToggleMobile.querySelector('span');
        if (textSpan) textSpan.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    }
    
    localStorage.setItem('theme_preference', isLight ? 'light' : 'dark');
}

const savedTheme = localStorage.getItem('theme_preference');
if (savedTheme === 'light') {
    setTheme(true);
} else if (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches) {
    setTheme(true);
}

function toggleTheme() {
    const isCurrentlyLight = document.body.classList.contains('light-mode');
    setTheme(!isCurrentlyLight);
    showToast(!isCurrentlyLight ? 'Light theme activated' : 'Dark theme activated', 'fas fa-circle-half-stroke');
}

if (darkToggle) darkToggle.addEventListener('click', toggleTheme);
if (darkToggleMobile) darkToggleMobile.addEventListener('click', toggleTheme);

// ==========================================================================
// 4. Navigation & Scroll Indicators
// ==========================================================================
const nav = document.getElementById('mainNav');
const fab = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', scrollY > 60);
    if (fab) fab.classList.toggle('visible', scrollY > 400);
}, { passive: true });

if (fab) {
    fab.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Active Nav link highlight (ScrollSpy)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

const ioNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.3 });

sections.forEach(s => ioNav.observe(s));

// Theme navigation dots
const themeDots = document.querySelectorAll('.theme-nav-dot');
const trackedSections = ['hero', 'about', 'skills', 'projects', 'contact'];
const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const idx = trackedSections.indexOf(entry.target.id);
            if (idx !== -1) {
                themeDots.forEach((d, i) => d.classList.toggle('active', i === idx));
            }
        }
    });
}, { threshold: 0.35 });

trackedSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) heroObserver.observe(el);
});

themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const target = document.getElementById(dot.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Fade-in element animations on scroll
const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Mobile Navigation Drawer
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

function toggleMobileMenu(open) {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('open', open);
    if (hamburger) hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
}

if (hamburger) hamburger.addEventListener('click', () => toggleMobileMenu(true));
if (mobileClose) mobileClose.addEventListener('click', () => toggleMobileMenu(false));

mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => toggleMobileMenu(false));
});

// ==========================================================================
// 5. Canvas Particle & Dynamic Wave Animation (Hero)
// ==========================================================================
(function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    function resize() {
        if (!canvas.parentElement) return;
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const pts = [];
    const COUNT = Math.min(65, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < COUNT; i++) {
        pts.push({
            x: Math.random() * (canvas.width || 800),
            y: Math.random() * (canvas.height || 600),
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 0.8,
            alpha: Math.random() * 0.45 + 0.15
        });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    window.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    }, { passive: true });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Tech grid
        ctx.strokeStyle = document.body.classList.contains('light-mode') 
            ? 'rgba(30, 144, 255, 0.04)' 
            : 'rgba(0, 229, 255, 0.03)';
        ctx.lineWidth = 1;
        const gs = 60;
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

        // Particles & Connections
        for (let i = 0; i < pts.length; i++) {
            const p = pts[i];
            p.x += p.vx;
            p.y += p.vy;

            // Bounce on canvas edges
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            // Subtle mouse interaction
            const dxm = p.x - mouseX;
            const dym = p.y - mouseY;
            const distM = Math.sqrt(dxm * dxm + dym * dym);
            if (distM < 100) {
                p.x += (dxm / distM) * 0.8;
                p.y += (dym / distM) * 0.8;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha})`;
            ctx.fill();

            for (let j = i + 1; j < pts.length; j++) {
                const q = pts[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(0, 229, 255, ${0.08 * (1 - d / 130)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        // Flowing Sine Waves
        const t = Date.now() * 0.0012;
        for (let w = 0; w < 2; w++) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.04 + Math.sin(t + w) * 0.02})`;
            ctx.lineWidth = 1.2;
            for (let x = 0; x < canvas.width; x += 5) {
                const y = canvas.height * 0.35 + Math.sin(x * 0.003 + t + w * 1.5) * 45 + (w * 50);
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        animationFrameId = requestAnimationFrame(draw);
    }
    draw();
})();

// ==========================================================================
// 6. Interactive Terminal Engine
// ==========================================================================
(function initTerminal() {
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('terminalOutput');
    const terminalBody = document.getElementById('terminalBody');
    if (!input || !output) return;

    const commandHistory = [];
    let historyIdx = -1;

    const banner = 
`Atupele Nathan Mkagula [CLI v2.4.0]
Type 'help' to inspect available commands.\n`;
    output.textContent = banner;

    const commands = {
        help: () => `Available commands:
  whoami       - Executive identity & summary
  skills       - Core capabilities & technical stack
  projects     - Selected key projects & case studies
  experience   - Career trajectory & recent roles
  certs        - Professional certifications
  contact      - Direct communication channels
  socials      - External profiles (GitHub, LinkedIn, X)
  theme        - Toggle light/dark interface mode
  matrix       - Digital rain simulation
  quote        - Systems thinking perspective
  clear        - Reset terminal window`,

        whoami: () => `Atupele Nathan Mkagula
Role: Customer Support Agent @ betPawa | IT Consultant | Systems Thinker
Location: Lilongwe / Blantyre, Malawi 🌍
Specialization: Cybersecurity Architecture, Risk Mitigation, Customer Experience Optimization.`,

        skills: () => `Technical & Strategic Domains:
• Cybersecurity: Threat Assessment, Zero-Trust Architecture, Incident Response, KYC/AML
• Infrastructure: System Diagnostics, Linux, Cloud Architecture, Network Engineering
• Customer Experience: Multi-channel Support, 75%+ FCR, pawaDesk, Quality SLA Management
• Creative Technology: Audio Engineering, Sound Synthesis, Systems Design`,

        projects: () => `Featured Case Studies:
1. Enterprise Security Architecture [Zero-Trust framework, 70% incident response speedup]
2. Cloud Migration & Modernization [40% operational cost reduction, 99.99% uptime]
3. Immersive Sound Synthesis [Generative audio-visual digital installation]
4. Support Operations Scaling [Exceeded betPawa FCR benchmark with 75%+ resolution rate]
(Click on any project card below for the full case study modal)`,

        experience: () => `Career History:
[2025 - Present] Customer Support Agent @ betPawa (High FCR, fraud mitigation, tech support)
[2024 - 2025]    Credit Officer @ Yellow Solar Africa (Risk assessment, portfolio management)
[2020 - Present] IT Consultant & Freelancer (Diagnostics, infrastructure setup, IT training)`,

        certs: () => `Certificates & Distinctions:
• 6× pawaTech Global Training Excellence Certificates (betPawa)
• Certificate in Music Production (University of Malawi, Chancellor College, 2022)
• Level 4 Diploma in Computing (NACIT, 2020)
• Malawi School Certificate of Education (Chinsapo Secondary School, 2017)`,

        contact: () => `Direct Contacts:
Email:    atupelemkagulaofficial@gmail.com
Phone:    +265 881 762 894
Website:  https://about.me/atupele.mkagula`,

        socials: () => `Social Connections:
• LinkedIn: https://linkedin.com/in/atupele-mkagula
• GitHub:   https://github.com/lord-tupe
• X:        https://x.com/lord_tupe`,

        theme: () => {
            toggleTheme();
            return `Theme switched.`;
        },

        quote: () => `"Music taught me pattern recognition, harmonic balance, and flow. I apply the exact same principles to zero-trust networks and resilient systems." — Atupele Nathan Mkagula`,

        matrix: () => `Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐇\n[01000001 01010100 01010101 01010000 01000101 01001100 01000101]`,

        sudo: () => `Permission denied: You are already in root guest mode.`,

        clear: () => {
            output.textContent = '';
            return null;
        }
    };

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const rawCmd = input.value.trim();
            const cmd = rawCmd.toLowerCase();
            input.value = '';

            if (rawCmd) {
                commandHistory.push(rawCmd);
                historyIdx = commandHistory.length;
            }

            output.textContent += `\n$ ${rawCmd}\n`;

            if (cmd === '') return;

            if (commands[cmd]) {
                const result = commands[cmd]();
                if (result !== null) {
                    output.textContent += `${result}\n`;
                }
            } else {
                output.textContent += `Command not recognized: '${rawCmd}'. Type 'help' for command list.\n`;
            }

            if (terminalBody) {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIdx > 0) {
                historyIdx--;
                input.value = commandHistory[historyIdx] || '';
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIdx < commandHistory.length - 1) {
                historyIdx++;
                input.value = commandHistory[historyIdx] || '';
            } else {
                historyIdx = commandHistory.length;
                input.value = '';
            }
        }
    });

    // Keep focus when clicking inside terminal
    document.querySelector('.terminal-window')?.addEventListener('click', () => {
        input.focus();
    });
})();

// ==========================================================================
// 7. Project Data, Filter System & Rich Detail Modals
// ==========================================================================
const projectsData = {
    'proj-security': {
        category: 'Cybersecurity',
        title: 'Enterprise Zero-Trust Security Architecture',
        badge: 'Zero-Trust · SIEM · Incident Response',
        summary: 'Engineered a comprehensive cybersecurity defense matrix for small-to-medium enterprise operations, reducing incident triage time by 70% and fortifying multi-factor access protocols.',
        problem: 'Distributed organizations often struggle with fragmented access controls, credential leakage risks, and delayed threat detection across disparate endpoints in low-bandwidth contexts.',
        solution: 'Designed and deployed an adaptive zero-trust security perimeter incorporating centralized identity verification (MFA/KYC), automated network anomaly monitoring, and rigorous privilege separation.',
        stats: [
            { num: '70%', label: 'Triage Time Reduction' },
            { num: '99.9%', label: 'Access Policy Compliance' },
            { num: '24/7', label: 'Telemetry Monitoring' }
        ],
        technologies: ['Zero Trust', 'SIEM', 'Linux Hardening', 'MFA / KYC Protocols', 'Network Segmentation', 'Risk Analysis'],
        image: 'https://image.qwenlm.ai/public_source/144a8f24-32eb-43b6-8595-df52c7e305fd/17b21a600-d319-4112-8dde-2990cd58a8eb.png'
    },
    'proj-cloud': {
        category: 'Infrastructure',
        title: 'Cloud Migration & Infrastructure Optimization',
        badge: 'Cloud Architecture · DevOps · Automation',
        summary: 'Led end-to-end migration of legacy on-premises services to high-availability cloud infrastructure, securing 40% cost reduction and 99.99% operational uptime.',
        problem: 'Legacy local servers faced frequent power volatility, maintenance downtime, and lack of resilient backup pipelines.',
        solution: 'Architected automated containerized deployments, zero-downtime failovers, encrypted data storage pipelines, and elastic load scaling to handle high traffic spikes.',
        stats: [
            { num: '40%', label: 'Infrastructure Cost Saved' },
            { num: '99.99%', label: 'Service Uptime' },
            { num: '< 50ms', label: 'Average Response Time' }
        ],
        technologies: ['AWS / Cloud VPS', 'Docker', 'Linux CLI', 'Nginx Reverse Proxy', 'Automated Backups', 'CI/CD Pipelines'],
        image: 'https://image.qwenlm.ai/public_source/144a8f24-32eb-43b6-8595-df52c7e305fd/118f781c4-9589-4b15-96e2-075fc6b50a1f.png'
    },
    'proj-sound': {
        category: 'Creative',
        title: 'Immersive Generative Sound Synthesis',
        badge: 'Audio Engineering · DSP · Sound Design',
        summary: 'An interactive audio-visual installation exploring mathematical pattern generation, harmonic synthesis, and soundscape architecture for media and live exhibitions.',
        problem: 'Connecting complex algorithmic data streams with emotional, engaging auditory narratives in real-time performance.',
        solution: 'Built synthesized sound matrices and frequency-modulated textures that translate visual frequency responses into cohesive sonic compositions.',
        stats: [
            { num: '32-Bit', label: 'Audio Processing Float' },
            { num: '100%', label: 'Synthesized In Real-Time' },
            { num: '0ms', label: 'Perceived Audio Latency' }
        ],
        technologies: ['Ableton Live', 'Web Audio API', 'Digital Signal Processing (DSP)', 'Sound Spatialization', 'Acoustic Modeling'],
        image: 'https://image.qwenlm.ai/public_source/144a8f24-32eb-43b6-8595-df52c7e305fd/185372d74-94ef-4c2d-911c-3f621d01d6dd.png'
    },
    'proj-support': {
        category: 'Support',
        title: 'High-Velocity CX & Fraud Escalation System',
        badge: 'Customer Operations · FCR Optimization · Compliance',
        summary: 'Streamlined ticket lifecycle workflows and account recovery protocols at betPawa, sustaining a 75%+ First Contact Resolution (FCR) rate across thousands of daily transactions.',
        problem: 'High concurrency user spikes during major sporting events created surge bottlenecks for OTP verification, deposit escalations, and account security lockouts.',
        solution: 'Implemented structured triage playbooks, rapid verification paths for OTP validation, and coordinated cross-functional fraud escalations with risk teams.',
        stats: [
            { num: '75%+', label: 'First Contact Resolution' },
            { num: '1,000+', label: 'Daily Interactions' },
            { num: '6×', label: 'Excellence Certifications' }
        ],
        technologies: ['pawaDesk Ticketing', 'RNG & Sportsbook Systems', 'Identity Verification', 'Responsible Gambling', 'Risk Escalation'],
        image: 'https://image.qwenlm.ai/public_source/144a8f24-32eb-43b6-8595-df52c7e305fd/171272083-df59-4b28-b823-ca50ac943d42.png'
    }
};

// Project Filter Buttons
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            const cat = card.dataset.category;
            if (filter === 'all' || cat === filter) {
                card.style.display = 'flex';
                card.classList.add('fade-in', 'visible');
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Project Detail Modal Handler
const projectModal = document.getElementById('projectModal');
const projectModalContent = document.getElementById('projectModalContent');
const projectModalClose = document.getElementById('projectModalClose');

function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !projectModalContent || !projectModal) return;

    projectModalContent.innerHTML = `
        <span class="modal-badge">${data.category}</span>
        <h2 class="modal-title">${data.title}</h2>
        <p class="modal-text"><strong>${data.summary}</strong></p>
        
        <div class="modal-stats-grid">
            ${data.stats.map(s => `
                <div class="modal-stat-box">
                    <div class="modal-stat-num">${s.num}</div>
                    <div class="modal-stat-lbl">${s.label}</div>
                </div>
            `).join('')}
        </div>

        <h3 class="modal-section-title">The Challenge</h3>
        <p class="modal-text">${data.problem}</p>

        <h3 class="modal-section-title">The Solution & Architecture</h3>
        <p class="modal-text">${data.solution}</p>

        <h3 class="modal-section-title">Technologies & Core Tools</h3>
        <div class="skill-tags" style="margin-top: 0.5rem;">
            ${data.technologies.map(t => `<span class="skill-tag">${t}</span>`).join('')}
        </div>

        <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="#contact" class="btn-glow" onclick="closeAllModals()">Discuss Similar Project <i class="fas fa-arrow-right text-xs"></i></a>
        </div>
    `;

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const id = card.dataset.projectId;
        if (id) openProjectModal(id);
    });
});

// ==========================================================================
// 8. CV / Resume Modal & Print Trigger
// ==========================================================================
const cvModal = document.getElementById('cvModal');
const cvModalClose = document.getElementById('cvModalClose');
const cvOpenBtns = document.querySelectorAll('.open-cv-btn');

cvOpenBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        if (cvModal) {
            cvModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    });
});

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
}

if (projectModalClose) projectModalClose.addEventListener('click', closeAllModals);
if (cvModalClose) cvModalClose.addEventListener('click', closeAllModals);

document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) closeAllModals();
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeAllModals();
        toggleMobileMenu(false);
    }
});

// ==========================================================================
// 9. Web Audio API Ambient Sound Synthesizer & Visualizer
// ==========================================================================
let audioCtx = null;
let isPlayingAudio = false;
let synthOsc1 = null;
let synthOsc2 = null;
let synthGain = null;
let synthFilter = null;
let synthAnalyser = null;
let synthAnimId = null;

const playAudioBtn = document.getElementById('playAudioBtn');
const audioStatusText = document.getElementById('audioStatusText');
const presetBtns = document.querySelectorAll('.audio-preset-btn');
const vizBars = document.querySelectorAll('.viz-bar');

const audioPresets = {
    cyber: { f1: 110, f2: 164.81, type1: 'sawtooth', type2: 'sine', filterFreq: 800, desc: 'Ambient Cyber (A2 + E3)' },
    space: { f1: 73.42, f2: 146.83, type1: 'sine', type2: 'triangle', filterFreq: 450, desc: 'Deep Space Drone (D2 + D3)' },
    harmonic: { f1: 130.81, f2: 196.00, type1: 'triangle', type2: 'sine', filterFreq: 1200, desc: 'Harmonic Resonance (C3 + G3)' }
};

let currentPreset = audioPresets.cyber;

function initAudioEngine() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
    }
}

function startSynth() {
    initAudioEngine();
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    synthGain = audioCtx.createGain();
    synthFilter = audioCtx.createBiquadFilter();
    synthAnalyser = audioCtx.createAnalyser();
    synthAnalyser.fftSize = 64;

    synthFilter.type = 'lowpass';
    synthFilter.frequency.setValueAtTime(currentPreset.filterFreq, audioCtx.currentTime);

    // Oscillator 1
    synthOsc1 = audioCtx.createOscillator();
    synthOsc1.type = currentPreset.type1;
    synthOsc1.frequency.setValueAtTime(currentPreset.f1, audioCtx.currentTime);

    // Oscillator 2
    synthOsc2 = audioCtx.createOscillator();
    synthOsc2.type = currentPreset.type2;
    synthOsc2.frequency.setValueAtTime(currentPreset.f2, audioCtx.currentTime);

    // Subtle LFO modulation for warmth
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.setValueAtTime(0.2, audioCtx.currentTime);
    lfoGain.gain.setValueAtTime(80, audioCtx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(synthFilter.frequency);
    lfo.start();

    // Volume ramp-in
    synthGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    synthGain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 1.2);

    // Connections
    synthOsc1.connect(synthFilter);
    synthOsc2.connect(synthFilter);
    synthFilter.connect(synthGain);
    synthGain.connect(synthAnalyser);
    synthAnalyser.connect(audioCtx.destination);

    synthOsc1.start();
    synthOsc2.start();
    isPlayingAudio = true;

    if (playAudioBtn) {
        playAudioBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playAudioBtn.setAttribute('aria-label', 'Pause Ambient Sound');
    }
    if (audioStatusText) {
        audioStatusText.textContent = `Playing: ${currentPreset.desc}`;
    }

    animateVisualizerWithAudio();
}

function stopSynth() {
    if (!isPlayingAudio) return;
    if (synthGain && audioCtx) {
        synthGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);
        setTimeout(() => {
            try {
                synthOsc1?.stop();
                synthOsc2?.stop();
                synthOsc1?.disconnect();
                synthOsc2?.disconnect();
            } catch (e) {}
            isPlayingAudio = false;
        }, 650);
    } else {
        isPlayingAudio = false;
    }

    if (playAudioBtn) {
        playAudioBtn.innerHTML = '<i class="fas fa-play"></i>';
        playAudioBtn.setAttribute('aria-label', 'Play Ambient Sound');
    }
    if (audioStatusText) {
        audioStatusText.textContent = 'Sound synthesizer paused. Click play to listen.';
    }
    if (synthAnimId) cancelAnimationFrame(synthAnimId);
}

function animateVisualizerWithAudio() {
    if (!synthAnalyser || !isPlayingAudio) return;
    const bufferLength = synthAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    synthAnalyser.getByteFrequencyData(dataArray);

    vizBars.forEach((bar, index) => {
        const val = dataArray[index % bufferLength] || 0;
        const h = Math.max(6, (val / 255) * 60);
        bar.style.height = `${h}px`;
    });

    synthAnimId = requestAnimationFrame(animateVisualizerWithAudio);
}

if (playAudioBtn) {
    playAudioBtn.addEventListener('click', () => {
        if (isPlayingAudio) {
            stopSynth();
        } else {
            startSynth();
            showToast('Ambient Synthesizer started', 'fas fa-volume-high');
        }
    });
}

presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.dataset.preset;
        if (audioPresets[key]) {
            currentPreset = audioPresets[key];
            if (isPlayingAudio) {
                stopSynth();
                setTimeout(startSynth, 700);
            } else if (audioStatusText) {
                audioStatusText.textContent = `Preset selected: ${currentPreset.desc}`;
            }
        }
    });
});

// Setup default dynamic visualizer bars if idle
const vizContainer = document.getElementById('musicViz');
if (vizContainer && vizBars.length === 0) {
    for (let i = 0; i < 48; i++) {
        const bar = document.createElement('div');
        bar.className = 'viz-bar';
        bar.style.height = `${Math.floor(Math.random() * 25 + 6)}px`;
        vizContainer.appendChild(bar);
    }
}

// ==========================================================================
// 10. Clipboard Helpers & Toast Notification System
// ==========================================================================
function showToast(message, iconClass = 'fas fa-info-circle') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

// Copy to clipboard helper
document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy');
        if (navigator.clipboard && textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied to clipboard: ${textToCopy}`, 'fas fa-check');
            }).catch(() => {
                fallbackCopy(textToCopy);
            });
        } else if (textToCopy) {
            fallbackCopy(textToCopy);
        }
    });
});

function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied: ${text}`, 'fas fa-check');
}

// ==========================================================================
// 11. Contact Form Handler
// ==========================================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        const name = nameInput?.value.trim() || '';
        const email = emailInput?.value.trim() || '';
        const subject = subjectInput?.value.trim() || 'Portfolio Inquiry';
        const msg = messageInput?.value.trim() || '';

        if (!name || !email || !msg) {
            showToast('Please fill out all required fields', 'fas fa-triangle-exclamation');
            return;
        }

        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin text-xs"></i>';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check text-xs"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #00e676, #00b0ff)';
            showToast(`Thank you, ${name}! Your message has been logged.`, 'fas fa-paper-plane');

            // Open mailto fallback client as seamless option
            const mailtoUrl = `mailto:atupelemkagulaofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`)}`;
            
            setTimeout(() => {
                window.location.href = mailtoUrl;
                submitBtn.innerHTML = originalBtnHtml;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 1200);
        }, 900);
    });
}


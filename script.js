/* =========================================================================
   Karthikeyan P M — Portfolio scripts (vanilla JS, no dependencies)
   ========================================================================= */
(() => {
    'use strict';

    /* ---------- CONFIG: edit these values ---------- */
    const CONFIG = {
        email: 'karthikeyanpmbe@gmail.com',
        whatsapp: '916380538769',
        linkedin: 'https://www.linkedin.com/in/karthikeyan-pm-494761210',
        cv: 'Karthikeyan_PM_AdvancedMendixDeveloper.pdf',
        careerStart: '2022-03-01',          // used to keep "years of experience" correct automatically
        timeZone: 'Asia/Kolkata',
        // Optional: paste a Formspree endpoint (https://formspree.io → New form) to receive
        // messages directly in your inbox without opening the visitor's mail app.
        // Example: 'https://formspree.io/f/abcdwxyz'
        formEndpoint: '',
        roles: ['Mendix Advanced Developer', 'AI RegTech SaaS Engineer', 'Software Engineer @ CUBE', 'Power Apps & Power BI Developer', 'Workflow Automation Builder']
    };

    /* ---------- Project case studies (shown in the modal) ---------- */
    const PROJECTS = {
        searchportal: {
            title: 'Search Portal',
            platform: 'regtech', platformLabel: 'Flagship · 4CRisk.ai → CUBE',
            period: 'Sep 2025 – Present',
            summary: "Search Portal is 4CRisk.ai's AI-driven RegTech platform, now part of CUBE. Compliance teams use it to research regulations, turn them into rule books and obligations, map them to their own controls and policies, and manage regulatory change — in one secure, multi-tenant SaaS product.",
            goal: 'Help compliance teams go from "what does this regulation say?" to "are we covered, and what do we need to change?" faster, with AI doing the heavy lifting and people staying in control.',
            role: 'Software Developer at 4CRisk.ai, then Software Engineer at CUBE after the acquisition. I build and enhance modules across the platform in Mendix — domain models, microflows, workflows and UI — integrate the proprietary AI / SLM services, and implement role, organisation and tenant-level security. I own features end to end in Agile sprints with peer code reviews.',
            stack: ['Mendix Studio Pro', 'Microflows & Workflows', 'AI / SLM service integration', 'REST & JSON mappings', 'Multi-tenancy', 'Entity access & module roles', 'Sankey charts', 'Excel / PDF processing'],
            modules: [
                { id: 'research', icon: 'bx-search-alt', title: 'Regulatory Research',
                  desc: 'Search across authoritative sources — regulators, laws and standards — and dive into authority documents.',
                  features: ['Keyword and exact-phrase search', 'AI Smart Search for natural-language questions that suggests filters', 'Faceted filters, saved filters and a default filter', 'Upcoming regulation changes with added / deleted text highlighted'] },
                { id: 'rulebook', icon: 'bx-book-bookmark', title: 'Rule Book',
                  desc: 'Turn regulations into rule books the organisation can work with.',
                  features: ['Pin rules from search, or auto-generate a rule book for a whole regulation', 'Three roll-up levels of granularity', 'Edit, group, merge statements and comment with user tagging', 'Organisation-hierarchy applicability (AI pre-filled), audit trail and Excel export'] },
                { id: 'obligations', icon: 'bx-list-check', title: 'Obligations',
                  desc: 'Generate obligations from rule books and connect them to the GRC programme.',
                  features: ['Generate obligations from a rule book, optionally grouped by topic or taxonomy', 'Themes and sub-themes', 'AI-generated policy, control and risk statements per obligation', 'Editing, comments, audit trail and export'] },
                { id: 'cmap', icon: 'bx-git-repo-forked', title: 'Compliance Map & Unified Compliance Map',
                  desc: 'Map primary sources to secondary sources and see coverage and gaps.',
                  features: ['Sources: rules, obligations, policies, controls, control objectives, risks, issues, procedures', 'Sankey traceability with Strong / Partial / Minimal match filters', 'Edit AI-recommended mappings, with explainability for each match', 'Ask ARIA recommendations for unmapped statements; PDF / Excel export'] },
                { id: 'impact', icon: 'bx-pulse', title: 'Impact Assessment',
                  desc: 'Shows how newly published regulatory updates affect what the organisation already has.',
                  features: ['Counts of impacted rule books, obligations and compliance maps', 'Regulatory difference view: existing vs. amended text', 'Jump straight to the impacted rule book or obligation', 'Date-range filters and Excel export'] },
                { id: 'rcm', icon: 'bx-bell', title: 'Regulatory Change Management (RCM)',
                  desc: 'Monitor regulatory updates and take each one through a controlled workflow.',
                  features: ['Dashboard with regulatory-source and alert-status / ageing charts', 'Five stages: Scoping → Applicability → Impact Assessment → Manage Actions → Completed', 'Triage admin assignment, collaborator access with hold-for-approval', 'AI summaries, synopsis and tags; related-alert linking; channel subscriptions'] },
                { id: 'grc', icon: 'bx-cloud-upload', title: 'GRC Uploads',
                  desc: "Import the organisation's existing GRC data so it can feed rule books, maps and more.",
                  features: ['Bulk Excel upload for controls, policies, risks, rules, procedures, issues and control objectives', 'Dynamic mapping of file columns to system attributes', 'AI-parsed policy PDFs, available to Compliance Map and Ask ARIA', 'Confidence levels, review flow (accept / modify / mark as error) and status report'] },
                { id: 'libraries', icon: 'bx-shield-quarter', title: 'GRC Libraries',
                  desc: 'Controls, Control Objectives, Policies, Risks and Issues — the enterprise objects that every other module maps against.',
                  features: ['Organisation-scoped GRC objects', 'Used as sources in Compliance Maps and Impact Assessment', 'Fed by GRC Uploads', 'Role and tenant-level access control'] },
                { id: 'aria', icon: 'bx-bot', title: 'Ask ARIA',
                  desc: 'The GenAI co-pilot built into the platform.',
                  features: ['Powers natural-language Smart Search', 'Recommends mappings to close compliance gaps', 'Answers questions over uploaded policies', 'Integrated with proprietary AI / SLM services'] }
            ]
        },
        imanage: {
            title: 'I-Manage',
            platform: 'mendix', platformLabel: 'Mendix · Intelizign',
            summary: 'A project & resource management system that lets delivery leaders allocate employees to projects and delivery groups, and see cost and revenue in one place.',
            goal: 'Replace scattered allocation tracking with a single application that shows who is working on what, and what it costs.',
            features: [
                'Allocate employees to projects and delivery groups',
                'Cost and revenue analysis for resource planning',
                'Consolidated reports with interactive charts',
                'Workload & allocation dashboards (Apache ECharts)'
            ],
            role: 'Designed the domain model and microflows, built the allocation logic, reports and dashboard UI.',
            stack: ['Mendix Studio Pro', 'Microflows', 'PostgreSQL', 'Apache ECharts', 'Excel import/export']
        },
        doa: {
            title: 'Delegation of Authority (DOA)',
            platform: 'mendix', platformLabel: 'Mendix · Intelizign',
            summary: 'An approval-workflow application for sensitive documents, where requests are routed to delegated authorities and escalated when required.',
            goal: 'Give the business a controlled, traceable way to raise, review and approve sensitive documents.',
            features: [
                'Requesters raise approval requests with supporting documents',
                'Review and verification by delegated authorities',
                'Escalation to higher authorities',
                'Requesters track approvals and rejections with comments'
            ],
            role: 'Built the workflow, approval routing, notifications and the requester feedback loop.',
            stack: ['Mendix Workflows', 'Microflows', 'Email notifications', 'Role-based security']
        },
        npm: {
            title: 'NPM Planning Tool',
            platform: 'powerapps', platformLabel: 'Power Apps · DICV',
            summary: 'A Network Planning & Maintenance tool built for Daimler India Commercial Vehicles that digitises the planning process and automates hand-offs between teams.',
            goal: 'Move the planning process off manual sheets into a guided app with automated follow-up.',
            features: [
                'Digitised planning workflow in a Power Apps canvas app',
                'Automated approvals and notifications with Power Automate',
                'Centralised planning data for all stakeholders'
            ],
            role: 'Built the app screens, data model and Power Automate flows.',
            stack: ['Power Apps', 'Power Automate', 'SharePoint / Dataverse']
        },
        series: {
            title: 'Series Referencing Dashboard',
            platform: 'powerbi', platformLabel: 'Power BI · DICV',
            summary: 'An interactive Power BI dashboard for Daimler India Commercial Vehicles to analyse and track product series references across multiple data sources.',
            goal: 'Give teams one trusted view of product series references instead of manual cross-checking.',
            features: [
                'Data integrated from multiple sources',
                'Advanced calculations with DAX measures',
                'Interactive filters and drill-downs'
            ],
            role: 'Modelled the data, wrote the DAX measures and designed the report pages.',
            stack: ['Power BI', 'DAX', 'Power Query', 'Data modelling']
        },
        orgchart: {
            title: 'CE Org Chart',
            platform: 'powerapps', platformLabel: 'Power Apps · DICV',
            summary: 'An interactive organisational chart for Daimler India Commercial Vehicles, showing employee hierarchy and reporting structures.',
            goal: 'Make reporting lines easy to explore and keep them in sync with source data.',
            features: [
                'Interactive, navigable hierarchy view',
                'Reporting structures pulled from Dataverse',
                'SharePoint integration for employee data'
            ],
            role: 'Built the Power Apps UI, hierarchy logic and data integration.',
            stack: ['Power Apps', 'Dataverse', 'SharePoint']
        }
    };

    /* ---------- Helpers ---------- */
    const $ = (s, el = document) => el.querySelector(s);
    const $$ = (s, el = document) => [...el.querySelectorAll(s)];
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    const store = {
        get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } },
        del(k) { try { localStorage.removeItem(k); } catch (e) { /* storage unavailable */ } }
    };
    const track = (category, action, label) => {
        if (typeof window.gtag === 'function') window.gtag('event', action, { event_category: category, event_label: label });
    };

    /* ---------- Toasts ---------- */
    function toast(message, type = 'success', ms = 3200) {
        const stack = $('#toast-stack');
        if (!stack) return;
        const icons = { success: 'bx-check-circle', error: 'bx-error-circle', info: 'bx-info-circle' };
        const el = document.createElement('div');
        el.className = `toast ${type}`;
        el.innerHTML = `<i class="bx ${icons[type] || icons.info}"></i><span></span>`;
        el.querySelector('span').textContent = message;
        stack.appendChild(el);
        setTimeout(() => {
            el.classList.add('leaving');
            el.addEventListener('animationend', () => el.remove(), { once: true });
        }, ms);
    }

    /* ---------- Clipboard ---------- */
    async function copyText(text, label = 'Copied to clipboard') {
        try {
            await navigator.clipboard.writeText(text);
        } catch (e) {
            const ta = Object.assign(document.createElement('textarea'), { value: text });
            ta.style.cssText = 'position:fixed;opacity:0';
            document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); } catch (err) { toast('Could not copy — please copy manually', 'error'); ta.remove(); return; }
            ta.remove();
        }
        toast(label, 'success');
    }

    function initCopyButtons() {
        $$('[data-copy]').forEach(btn => btn.addEventListener('click', () => {
            const value = btn.dataset.copy;
            copyText(value, value.includes('@') ? 'Email address copied' : `Copied ${value}`);
        }));
        $$('[data-copy-target]').forEach(btn => btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.copyTarget);
            if (target) copyText(target.innerText, 'Code copied');
        }));
    }

    /* ---------- Preloader ---------- */
    function initPreloader() {
        const pre = $('#preloader');
        if (!pre) return;
        const seen = (() => { try { return sessionStorage.getItem('visited'); } catch (e) { return null; } })();
        const hide = () => { pre.classList.add('done'); setTimeout(() => pre.remove(), 600); };
        if (seen || reduceMotion) { pre.remove(); return; }
        try { sessionStorage.setItem('visited', '1'); } catch (e) { /* ignore */ }
        const start = performance.now();
        const finish = () => setTimeout(hide, Math.max(0, 700 - (performance.now() - start)));
        if (document.readyState === 'complete') finish(); else window.addEventListener('load', finish, { once: true });
        setTimeout(hide, 2500); // safety net
    }

    /* ---------- Theme (with circular view-transition) ---------- */
    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        store.set('theme', theme);
    }

    function toggleTheme(e) {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        if (!document.startViewTransition || reduceMotion) { setTheme(next); return; }
        const btn = $('#theme-toggle').getBoundingClientRect();
        const x = e && e.clientX ? e.clientX : btn.left + btn.width / 2;
        const y = e && e.clientY ? e.clientY : btn.top + btn.height / 2;
        const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        const vt = document.startViewTransition(() => setTheme(next));
        vt.ready.then(() => {
            root.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
                { duration: 550, easing: 'cubic-bezier(.16,1,.3,1)', pseudoElement: '::view-transition-new(root)' }
            );
        }).catch(() => {});
        track('Theme', 'toggle', next);
    }

    function initTheme() {
        $('#theme-toggle')?.addEventListener('click', toggleTheme);
        // Follow OS changes if the visitor never picked a theme
        window.matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', ev => {
            if (!store.get('theme')) root.setAttribute('data-theme', ev.matches ? 'light' : 'dark');
        });
    }

    /* ---------- Dynamic facts: years of experience, year, clock ---------- */
    function initDynamicFacts() {
        const start = new Date(CONFIG.careerStart);
        const now = new Date();
        let years = now.getFullYear() - start.getFullYear();
        if (now.getMonth() < start.getMonth() || (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())) years--;
        years = Math.max(1, years);

        const counter = $('#years-counter');
        if (counter) { counter.dataset.target = years; counter.textContent = years; }
        $$('.js-years').forEach(el => (el.textContent = `${years}+`));
        $$('.js-years-num').forEach(el => (el.textContent = years));

        const yearEl = $('#year');
        if (yearEl) yearEl.textContent = now.getFullYear();

        const timeEl = $('#local-time');
        if (timeEl) {
            const fmt = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: CONFIG.timeZone });
            const tick = () => { timeEl.textContent = `${fmt.format(new Date())} IST`; };
            tick(); setInterval(tick, 30000);
        }

        $$('.kbd-mod').forEach(el => (el.textContent = isMac ? '⌘' : 'Ctrl'));
    }

    /* ---------- Typing effect ---------- */
    function initTyping() {
        const el = $('#typed-text');
        if (!el) return;
        if (reduceMotion) { el.textContent = CONFIG.roles[0]; return; }
        let r = 0, i = 0, deleting = false;
        const step = () => {
            const word = CONFIG.roles[r];
            i += deleting ? -1 : 1;
            el.textContent = word.slice(0, i);
            let delay = deleting ? 35 : 75;
            if (!deleting && i === word.length) { deleting = true; delay = 1800; }
            else if (deleting && i === 0) { deleting = false; r = (r + 1) % CONFIG.roles.length; delay = 350; }
            setTimeout(step, delay);
        };
        el.textContent = '';
        setTimeout(step, 900);
    }

    /* ---------- Scroll reveal ---------- */
    function initReveal() {
        const items = $$('.reveal');
        if (!('IntersectionObserver' in window) || reduceMotion) { items.forEach(el => el.classList.add('in')); return; }
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                el.classList.add('in');
                if (el.classList.contains('code-window')) typeCode(el);
                io.unobserve(el);
                // Once revealed, drop the .reveal class so hover/tilt transforms work normally
                const delay = (+el.dataset.delay || 0) * 90;
                setTimeout(() => el.classList.remove('reveal'), 1000 + delay);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        items.forEach(el => io.observe(el));

        const code = $('.code-window');
        if (code) {
            $$('.ln', code).forEach((ln, idx) => ln.style.setProperty('--i', idx));
            code.classList.add('typing');
        }
    }

    function typeCode(win) {
        setTimeout(() => { win.classList.remove('typing'); win.classList.add('typed'); }, 250);
    }

    /* ---------- Animated counters ---------- */
    function initCounters() {
        const counters = $$('.counter');
        const animate = el => {
            const target = +el.dataset.target;
            if (reduceMotion) { el.textContent = target; return; }
            const dur = 1400, t0 = performance.now();
            const frame = t => {
                const p = Math.min(1, (t - t0) / dur);
                el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4)));
                if (p < 1) requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
        };
        const io = new IntersectionObserver(entries => entries.forEach(e => {
            if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
        }), { threshold: 0.6 });
        counters.forEach(c => io.observe(c));
    }

    /* ---------- Scroll-driven UI (navbar, progress, back-to-top, timeline) ---------- */
    function initScrollUI() {
        const navbar = $('#navbar');
        const progress = $('#scroll-progress');
        const toTop = $('#to-top');
        const ring = $('#to-top-ring');
        const timeline = $('#timeline');
        const tProgress = $('#timeline-progress');
        const hero = $('#home');
        const CIRC = 2 * Math.PI * 21;
        let lastY = window.scrollY, ticking = false;

        const update = () => {
            const y = window.scrollY;
            const max = document.documentElement.scrollHeight - innerHeight;
            const p = max > 0 ? y / max : 0;

            navbar.classList.toggle('scrolled', y > 20);
            const menuOpen = $('#nav-menu').classList.contains('active');
            navbar.classList.toggle('nav-hidden', !menuOpen && y > 500 && y > lastY + 4);
            if (y < lastY - 4) navbar.classList.remove('nav-hidden');

            progress.style.setProperty('--p', p.toFixed(4));
            // Scroll-linked hero exit (fade, lift and shrink as you scroll away)
            if (hero && y < innerHeight * 1.2) hero.style.setProperty('--hp', Math.min(1, y / (innerHeight * 0.9)).toFixed(3));
            toTop.classList.toggle('visible', y > 600);
            ring.style.strokeDashoffset = (CIRC * (1 - p)).toFixed(1);

            if (timeline && tProgress) {
                const r = timeline.getBoundingClientRect();
                const tp = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
                tProgress.style.setProperty('--tp', tp.toFixed(3));
            }
            lastY = y;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) { requestAnimationFrame(update); ticking = true; }
        }, { passive: true });
        update();

        toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
    }

    /* ---------- Active nav link (scroll-spy) ---------- */
    function initScrollSpy() {
        const links = $$('.nav-link');
        const map = new Map(links.map(l => [l.getAttribute('href').slice(1), l]));
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                links.forEach(l => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
                const link = map.get(entry.target.id);
                if (link) { link.classList.add('active'); link.setAttribute('aria-current', 'true'); }
                track('Section', 'view', entry.target.id);
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        $$('main section[id]').forEach(s => io.observe(s));
    }

    /* ---------- Mobile menu ---------- */
    function initMenu() {
        const burger = $('#hamburger');
        const menu = $('#nav-menu');
        const overlay = $('#nav-overlay');
        const setOpen = open => {
            burger.classList.toggle('active', open);
            menu.classList.toggle('active', open);
            overlay.hidden = !open;
            burger.setAttribute('aria-expanded', String(open));
            burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            document.body.classList.toggle('no-scroll', open);
            if (open) setTimeout(() => $('.nav-link', menu)?.focus(), 300);
        };
        burger.addEventListener('click', () => setOpen(!menu.classList.contains('active')));
        overlay.addEventListener('click', () => setOpen(false));
        $$('a', menu).forEach(a => a.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('active')) { setOpen(false); burger.focus(); } });
        window.addEventListener('resize', () => { if (innerWidth > 1180 && menu.classList.contains('active')) setOpen(false); });
    }

    /* ---------- Pointer effects: spotlight, tilt, magnetic, cursor glow ---------- */
    function initPointerFX() {
        if (!finePointer) return;

        $$('.spotlight').forEach(el => el.addEventListener('pointermove', e => {
            const r = el.getBoundingClientRect();
            el.style.setProperty('--mx', `${e.clientX - r.left}px`);
            el.style.setProperty('--my', `${e.clientY - r.top}px`);
        }));

        if (reduceMotion) return;

        $$('.tilt').forEach(el => {
            const max = +el.dataset.tiltMax || 6;
            el.addEventListener('pointermove', e => {
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`;
            });
            el.addEventListener('pointerleave', () => { el.style.transform = ''; });
        });

        $$('.magnetic').forEach(btn => {
            btn.addEventListener('pointermove', e => {
                const r = btn.getBoundingClientRect();
                const x = (e.clientX - r.left - r.width / 2) * 0.25;
                const y = (e.clientY - r.top - r.height / 2) * 0.35;
                btn.style.transform = `translate(${x}px, ${y}px)`;
            });
            btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
        });

        const glow = $('#cursor-glow');
        if (glow) {
            let x = 0, y = 0, raf = null;
            window.addEventListener('pointermove', e => {
                x = e.clientX; y = e.clientY;
                glow.classList.add('active');
                if (!raf) raf = requestAnimationFrame(() => {
                    glow.style.setProperty('--cx', `${x}px`);
                    glow.style.setProperty('--cy', `${y}px`);
                    raf = null;
                });
            }, { passive: true });
            document.addEventListener('pointerleave', () => glow.classList.remove('active'));
        }
    }

    /* ---------- Project filter ---------- */
    function initProjectFilter() {
        const bar = $('.filter-bar');
        if (!bar) return;
        const btns = $$('.filter-btn', bar);
        const indicator = $('.filter-indicator', bar);
        const cards = $$('.project-card');

        const moveIndicator = btn => {
            indicator.style.width = `${btn.offsetWidth}px`;
            indicator.style.transform = `translateX(${btn.offsetLeft}px)`;
        };

        btns.forEach(btn => btn.addEventListener('click', () => {
            btns.forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-selected', String(b === btn)); });
            moveIndicator(btn);
            btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
            const f = btn.dataset.filter;
            let i = 0;
            cards.forEach(card => {
                const show = f === 'all' || card.dataset.category.split(' ').includes(f);
                card.classList.remove('is-entering');
                card.classList.toggle('is-hidden', !show);
                if (show) {
                    card.classList.add('in');
                    card.style.setProperty('--i', i++);
                    void card.offsetWidth; // restart animation
                    card.classList.add('is-entering');
                }
            });
            track('Projects', 'filter', f);
        }));

        const sync = () => moveIndicator($('.filter-btn.active', bar));
        sync();
        window.addEventListener('resize', sync);
        document.fonts?.ready.then(sync);
    }

    /* ---------- Project modal ---------- */
    function initProjectModal() {
        const modal = $('#project-modal');
        const content = $('#modal-content');
        let currentId = null, lastFocus = null;

        const visibleIds = () => $$('.project-card:not(.is-hidden)').map(c => c.dataset.project);

        const render = (id, focus) => {
            const p = PROJECTS[id];
            if (!p) return;
            currentId = id;
            const li = arr => arr.map(f => `<li><i class="bx bx-check-circle"></i><span>${f}</span></li>`).join('');
            let html = `
                <span class="platform-tag ${p.platform}">${p.platformLabel}</span>
                <h3 id="modal-title">${p.title}</h3>
                ${p.period ? `<p class="modal-period"><i class="bx bx-time-five"></i> ${p.period}</p>` : ''}
                <p class="modal-summary">${p.summary}</p>
                <div class="modal-block"><h4><i class="bx bx-target-lock"></i> Goal</h4><p>${p.goal}</p></div>`;
            if (p.modules) {
                html += `<div class="modal-block"><h4><i class="bx bx-user"></i> My role</h4><p>${p.role}</p></div>
                <div class="modal-block"><h4><i class="bx bx-grid-alt"></i> Modules I've worked on</h4>
                    <nav class="module-nav" aria-label="Jump to module">${p.modules.map(m => `<button type="button" data-jump="${m.id}"><i class="bx ${m.icon}"></i>${m.title.split(' (')[0].split(' & ')[0]}</button>`).join('')}</nav>
                    <div class="module-sections">${p.modules.map(m => `
                        <section class="module-section" id="mod-${m.id}">
                            <h5><span class="module-ic"><i class="bx ${m.icon}"></i></span>${m.title}</h5>
                            <p>${m.desc}</p>
                            <ul class="modal-grid">${li(m.features)}</ul>
                        </section>`).join('')}
                    </div>
                </div>`;
            } else {
                html += `<div class="modal-block"><h4><i class="bx bx-list-check"></i> Key features</h4><ul class="modal-grid">${li(p.features)}</ul></div>
                <div class="modal-block"><h4><i class="bx bx-user"></i> My role</h4><p>${p.role}</p></div>`;
            }
            html += `<div class="modal-block"><h4><i class="bx bx-code-alt"></i> Tech</h4><div class="tag-row">${p.stack.map(s => `<span class="tag">${s}</span>`).join('')}</div></div>`;
            content.innerHTML = html;
            const panel = modal.querySelector('.modal-panel');
            panel.scrollTop = 0;
            $$('[data-jump]', content).forEach(b => b.addEventListener('click', () => jumpTo(b.dataset.jump)));
            history.replaceState(null, '', `#project/${id}${focus ? '/' + focus : ''}`);
        };

        const jumpTo = mid => {
            const sec = document.getElementById(`mod-${mid}`);
            const panel = modal.querySelector('.modal-panel');
            if (!sec) return;
            const top = sec.getBoundingClientRect().top - panel.getBoundingClientRect().top + panel.scrollTop - 70;
            panel.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
            sec.classList.remove('flash'); void sec.offsetWidth; sec.classList.add('flash');
        };

        const open = (id, focus) => {
            if (!PROJECTS[id]) return;
            lastFocus = document.activeElement;
            render(id, focus);
            modal.hidden = false;
            modal.classList.remove('closing');
            document.body.classList.add('no-scroll');
            setTimeout(() => {
                $('.modal-close', modal).focus({ preventScroll: true });
                if (focus) requestAnimationFrame(() => jumpTo(focus));
            }, 120);
            track('Projects', 'open', id);
        };

        const close = () => {
            if (modal.hidden) return;
            modal.classList.add('closing');
            setTimeout(() => {
                modal.hidden = true;
                modal.classList.remove('closing');
                document.body.classList.remove('no-scroll');
                history.replaceState(null, '', '#projects');
                lastFocus?.focus();
            }, reduceMotion ? 0 : 240);
        };

        const step = dir => {
            const ids = visibleIds();
            const idx = ids.indexOf(currentId);
            render(ids[(idx + dir + ids.length) % ids.length]);
        };

        $$('.project-card').forEach(card => {
            card.setAttribute('tabindex', '0');
            card.addEventListener('click', () => open(card.dataset.project));
            card.addEventListener('keydown', e => {
                if (e.target !== card) return;
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card.dataset.project); }
            });
        });
        $$('.module-tile').forEach(tile => tile.addEventListener('click', e => {
            e.stopPropagation();
            open(tile.closest('.project-card').dataset.project, tile.dataset.module);
        }));
        $$('[data-close]', modal).forEach(el => el.addEventListener('click', close));
        $('#modal-prev').addEventListener('click', () => step(-1));
        $('#modal-next').addEventListener('click', () => step(1));

        modal.addEventListener('keydown', e => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
            if (e.key === 'Tab') trapFocus(e, modal);
        });

        // Deep link: /#project/imanage opens that case study
        const fromHash = () => {
            const m = location.hash.match(/^#project\/(\w+)(?:\/(\w+))?/);
            if (m && PROJECTS[m[1]]) open(m[1], m[2]);
        };
        fromHash();
        window.addEventListener('hashchange', fromHash);

        return { open };
    }

    function trapFocus(e, container) {
        const f = $$('a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])', container).filter(el => el.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    /* ---------- Command palette (Ctrl/Cmd + K) ---------- */
    function initPalette(modalApi) {
        const palette = $('#palette');
        const input = $('#palette-input');
        const list = $('#palette-list');
        let items = [], selected = 0, lastFocus = null;

        const go = id => () => document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        const commands = [
            { group: 'Navigate', icon: 'bx-home', label: 'Home', run: go('home') },
            { group: 'Navigate', icon: 'bx-user', label: 'About', run: go('about') },
            { group: 'Navigate', icon: 'bx-briefcase', label: 'Experience', run: go('experience') },
            { group: 'Navigate', icon: 'bx-layer', label: 'Skills', run: go('skills') },
            { group: 'Navigate', icon: 'bx-cog', label: 'Services', run: go('services') },
            { group: 'Navigate', icon: 'bx-grid-alt', label: 'Projects', run: go('projects') },
            { group: 'Navigate', icon: 'bx-award', label: 'Certifications', run: go('certifications') },
            { group: 'Navigate', icon: 'bx-envelope', label: 'Contact', run: go('contact') },
            ...Object.entries(PROJECTS).map(([id, p]) => ({ group: 'Projects', icon: 'bx-folder-open', label: p.title, hint: p.platformLabel, run: () => modalApi.open(id) })),
            ...PROJECTS.searchportal.modules.map(m => ({ group: 'Search Portal modules', icon: m.icon, label: m.title, run: () => modalApi.open('searchportal', m.id) })),
            { group: 'Certificates', icon: 'bx-award', label: 'Mendix Advanced Developer certificate', hint: 'PDF', run: () => window.open('assets/certificates/Mendix-Advanced-Developer-53718.pdf', '_blank', 'noopener') },
            { group: 'Certificates', icon: 'bx-award', label: 'Mendix Intermediate Developer certificate', hint: 'PDF', run: () => window.open('assets/certificates/Mendix-Intermediate-Developer-42485.pdf', '_blank', 'noopener') },
            { group: 'Certificates', icon: 'bx-award', label: 'Mendix Rapid Developer certificate', hint: 'PDF', run: () => window.open('assets/certificates/Mendix-Rapid-Developer-35311.pdf', '_blank', 'noopener') },
            { group: 'Certificates', icon: 'bx-award', label: 'Java with Selenium & Oracle certificate', hint: 'PDF', run: () => window.open('assets/certificates/Java-Selenium-Oracle-Greens-Technology.pdf', '_blank', 'noopener') },
            { group: 'Actions', icon: 'bx-download', label: 'Download CV', hint: 'PDF', run: () => { const a = document.createElement('a'); a.href = CONFIG.cv; a.download = CONFIG.cv; a.click(); } },
            { group: 'Actions', icon: 'bx-copy', label: 'Copy email address', run: () => copyText(CONFIG.email, 'Email address copied') },
            { group: 'Actions', icon: 'bx-adjust', label: 'Toggle dark / light theme', hint: 'T', run: () => toggleTheme() },
            { group: 'Links', icon: 'bxl-linkedin', label: 'Open LinkedIn', run: () => window.open(CONFIG.linkedin, '_blank', 'noopener') },
            { group: 'Links', icon: 'bxl-whatsapp', label: 'Chat on WhatsApp', run: () => window.open(`https://wa.me/${CONFIG.whatsapp}`, '_blank', 'noopener') },
            { group: 'Links', icon: 'bx-envelope', label: 'Send an email', run: () => { location.href = `mailto:${CONFIG.email}`; } }
        ];

        const render = () => {
            const q = input.value.trim().toLowerCase();
            items = commands.filter(c => !q || `${c.label} ${c.group} ${c.hint || ''}`.toLowerCase().includes(q));
            selected = Math.min(selected, Math.max(0, items.length - 1));
            if (!items.length) { list.innerHTML = '<li class="palette-empty">No results. Try “projects” or “cv”.</li>'; return; }
            let html = '', group = '';
            items.forEach((c, i) => {
                if (c.group !== group) { group = c.group; html += `<li class="palette-group" role="presentation">${group}</li>`; }
                html += `<li class="palette-item${i === selected ? ' selected' : ''}" role="option" id="pal-${i}" data-i="${i}" aria-selected="${i === selected}">
                    <i class="bx ${c.icon}"></i><span>${c.label}</span>${c.hint ? `<span class="hint">${c.hint}</span>` : ''}</li>`;
            });
            list.innerHTML = html;
            input.setAttribute('aria-activedescendant', `pal-${selected}`);
            $('.palette-item.selected', list)?.scrollIntoView({ block: 'nearest' });
        };

        const open = () => {
            lastFocus = document.activeElement;
            palette.hidden = false;
            input.value = ''; selected = 0; render();
            document.body.classList.add('no-scroll');
            setTimeout(() => input.focus(), 20);
            track('Palette', 'open', '');
        };
        const close = () => {
            palette.hidden = true;
            if ($('#project-modal').hidden) document.body.classList.remove('no-scroll');
            lastFocus?.focus?.();
        };
        const run = i => { const c = items[i]; if (!c) return; close(); setTimeout(c.run, 60); };

        $('#palette-open')?.addEventListener('click', open);
        $$('[data-close]', palette).forEach(el => el.addEventListener('click', close));
        input.addEventListener('input', () => { selected = 0; render(); });
        list.addEventListener('click', e => { const li = e.target.closest('.palette-item'); if (li) run(+li.dataset.i); });
        list.addEventListener('pointermove', e => {
            const li = e.target.closest('.palette-item');
            if (li && +li.dataset.i !== selected) { selected = +li.dataset.i; render(); }
        });
        palette.addEventListener('keydown', e => {
            if (e.key === 'ArrowDown') { e.preventDefault(); selected = (selected + 1) % items.length; render(); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); selected = (selected - 1 + items.length) % items.length; render(); }
            else if (e.key === 'Enter') { e.preventDefault(); run(selected); }
            else if (e.key === 'Escape') { e.preventDefault(); close(); }
        });

        document.addEventListener('keydown', e => {
            const typing = /input|textarea|select/i.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                palette.hidden ? open() : close();
            } else if (!typing && palette.hidden && $('#project-modal').hidden) {
                if (e.key === '/') { e.preventDefault(); open(); }
                if (e.key.toLowerCase() === 't' && !e.metaKey && !e.ctrlKey && !e.altKey) toggleTheme();
            }
        });
    }

    /* ---------- Contact form ---------- */
    function initContactForm() {
        const form = $('#contact-form');
        if (!form) return;
        const fields = { name: $('#name'), email: $('#email'), subject: $('#subject'), message: $('#message') };
        const counter = $('#char-count');
        const DRAFT_KEY = 'contact-draft';
        const MAX = 1000;
        let channel = 'email';

        const rules = {
            name: v => (v.length < 2 ? 'Please enter your name' : ''),
            email: v => (!v ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? 'Please enter a valid email address' : ''),
            message: v => (v.length < 10 ? 'Message should be at least 10 characters' : '')
        };

        const validate = key => {
            if (!rules[key]) return true;
            const el = fields[key];
            const msg = rules[key](el.value.trim());
            const wrap = el.closest('.field');
            wrap.classList.toggle('invalid', !!msg);
            wrap.classList.toggle('valid', !msg);
            $(`#${key}-error`).textContent = msg;
            el.setAttribute('aria-invalid', String(!!msg));
            return !msg;
        };

        const updateCount = () => {
            const n = fields.message.value.length;
            counter.textContent = `${n} / ${MAX}`;
            counter.classList.toggle('warn', n > MAX * 0.9);
        };

        // Restore unsent draft
        try {
            const draft = JSON.parse(store.get(DRAFT_KEY) || 'null');
            if (draft) Object.keys(fields).forEach(k => { if (draft[k]) fields[k].value = draft[k]; });
        } catch (e) { /* ignore */ }
        updateCount();

        const saveDraft = () => store.set(DRAFT_KEY, JSON.stringify(Object.fromEntries(Object.entries(fields).map(([k, el]) => [k, el.value]))));

        Object.entries(fields).forEach(([key, el]) => {
            el.addEventListener('blur', () => { if (el.value) validate(key); });
            el.addEventListener('input', () => {
                if (el.closest('.field').classList.contains('invalid')) validate(key);
                if (key === 'message') updateCount();
                saveDraft();
            });
        });

        // Service "Discuss a project" links pre-fill the subject
        $$('[data-subject]').forEach(a => a.addEventListener('click', () => {
            fields.subject.value = a.dataset.subject;
            saveDraft();
            setTimeout(() => fields.name.focus({ preventScroll: true }), 700);
        }));

        $$('[data-channel]', form).forEach(b => b.addEventListener('click', () => { channel = b.dataset.channel; }));

        form.addEventListener('submit', async e => {
            e.preventDefault();
            if (e.submitter?.dataset.channel) channel = e.submitter.dataset.channel;
            if (form._gotcha.value) return; // bot

            const ok = ['name', 'email', 'message'].map(validate).every(Boolean);
            if (!ok) {
                toast('Please fix the highlighted fields', 'error');
                form.querySelector('.field.invalid input, .field.invalid textarea')?.focus();
                return;
            }

            const data = Object.fromEntries(Object.entries(fields).map(([k, el]) => [k, el.value.trim()]));
            const subject = data.subject || `Portfolio enquiry from ${data.name}`;
            const body = `Hi Karthikeyan,\n\n${data.message}\n\n— ${data.name}\n${data.email}`;

            if (channel === 'whatsapp') {
                const text = `Hello Karthikeyan! 👋\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Subject:* ${subject}\n\n${data.message}`;
                window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
                toast('Opening WhatsApp with your message…', 'info');
                done();
                track('Contact', 'submit', 'whatsapp');
                return;
            }

            if (CONFIG.formEndpoint) {
                const btn = $('#send-email');
                btn.classList.add('loading'); btn.disabled = true;
                try {
                    const res = await fetch(CONFIG.formEndpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                        body: JSON.stringify({ ...data, subject, _replyto: data.email })
                    });
                    if (!res.ok) throw new Error(res.statusText);
                    toast('Thanks! Your message has been sent.', 'success', 4500);
                    done();
                } catch (err) {
                    toast('Could not send right now — opening your email app instead.', 'error', 4500);
                    openMail(subject, body);
                } finally {
                    btn.classList.remove('loading'); btn.disabled = false;
                }
            } else {
                openMail(subject, body);
                toast('Opening your email app with the message ready to send…', 'info', 4500);
                done();
            }
            track('Contact', 'submit', 'email');
        });

        function openMail(subject, body) {
            location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }

        function done() {
            form.reset();
            $$('.field', form).forEach(f => f.classList.remove('valid', 'invalid'));
            store.del(DRAFT_KEY);
            updateCount();
        }
    }

    /* ---------- Outbound click tracking (works if you add Google Analytics) ---------- */
    function initTracking() {
        document.addEventListener('click', e => {
            const a = e.target.closest('a');
            if (!a) return;
            if (a.hasAttribute('download')) track('CV', 'download', a.getAttribute('href'));
            else if (a.target === '_blank') track('Outbound', 'click', a.href);
        });
    }

    /* ---------- Boot ---------- */
    initPreloader();
    initTheme();
    initDynamicFacts();
    initTyping();
    initReveal();
    initCounters();
    initScrollUI();
    initScrollSpy();
    initMenu();
    initPointerFX();
    initCopyButtons();
    initProjectFilter();
    const modalApi = initProjectModal();
    initPalette(modalApi);
    initContactForm();
    initTracking();

    console.log(
        '%c<K/> Karthikeyan P M %c Mendix Advanced Certified Developer\n%cLike what you see? Let\'s talk → ' + CONFIG.email,
        'background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;padding:4px 8px;border-radius:4px;font-weight:700',
        'color:#8b5cf6;font-weight:600',
        'color:#64748b'
    );
})();

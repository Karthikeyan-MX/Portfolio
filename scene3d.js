/* =========================================================================
   3D background — "Data Constellation"
   A GPU particle system (raw WebGL, no libraries) that morphs between six 3D
   forms as you scroll through the page:

     Hero ............ Data Globe with orbit ring  (a world of regulations & data)
     About/Experience  Double Helix                (career growth)
     Skills/Services . Torus Knot                  (integrations — everything connected)
     Projects ........ Module Cube (tesseract)     (a core module inside the platform)
     Certifications .. Spiral Galaxy               (levels & progression)
     Contact/Footer .. Calm Wave Field             (let's talk)

   Performance:
   - Zero dependencies (~10 KB). Starts after the page has loaded, so it never delays first paint or SEO.
   - Morphing, drift, waves and mouse interaction all run in the vertex shader — no per-particle CPU work per frame.
   - Particle count and pixel ratio adapt to the device; quality steps down automatically if FPS drops.
   - Pauses when the tab is hidden, handles WebGL context loss, respects prefers-reduced-motion.
   ========================================================================= */
(() => {
    'use strict';

    const host = document.getElementById('scene3d');
    if (!host) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const whenIdle = cb => ('requestIdleCallback' in window) ? requestIdleCallback(cb, { timeout: 1000 }) : setTimeout(cb, 200);
    const boot = () => whenIdle(() => { try { init(); } catch (e) { /* CSS background remains as fallback */ } });
    if (document.readyState === 'complete') boot(); else window.addEventListener('load', boot, { once: true });

    /* ---------------- Shape generators (each returns N xyz positions) ---------------- */
    const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

    function globe(N) {
        const out = new Float32Array(N * 3);
        const ringCount = Math.floor(N * 0.18);
        const sphereCount = N - ringCount;
        const R = 2.6, golden = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < sphereCount; i++) {
            const y = 1 - (i / (sphereCount - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const th = golden * i;
            const shell = R * (Math.random() < 0.85 ? 1 : rand(1.04, 1.18));
            out.set([Math.cos(th) * r * shell, y * shell, Math.sin(th) * r * shell], i * 3);
        }
        // tilted orbital ring
        const tilt = 0.42;
        for (let i = sphereCount; i < N; i++) {
            const a = rand(0, Math.PI * 2), rr = rand(3.4, 4.3);
            const x = Math.cos(a) * rr, z = Math.sin(a) * rr, y = gauss() * 0.06;
            out.set([x, y * Math.cos(tilt) - z * Math.sin(tilt), y * Math.sin(tilt) + z * Math.cos(tilt)], i * 3);
        }
        return out;
    }

    function helix(N) {
        const out = new Float32Array(N * 3);
        const H = 8.5, turns = 3.2, R = 1.5;
        for (let i = 0; i < N; i++) {
            const t = Math.random();
            const a = t * turns * Math.PI * 2;
            const y = (t - 0.5) * H;
            if (Math.random() < 0.22) {
                // rungs between the two strands
                const k = Math.round(t * 40) / 40, ak = k * turns * Math.PI * 2, yk = (k - 0.5) * H;
                const u = Math.random();
                const x1 = Math.cos(ak) * R, z1 = Math.sin(ak) * R;
                out.set([x1 + (-2 * x1) * u, yk + gauss() * 0.03, z1 + (-2 * z1) * u], i * 3);
            } else {
                const strand = Math.random() < 0.5 ? 0 : Math.PI;
                const j = 0.12;
                out.set([Math.cos(a + strand) * R + gauss() * j, y + gauss() * j, Math.sin(a + strand) * R + gauss() * j], i * 3);
            }
        }
        return out;
    }

    function torusKnot(N) {
        const out = new Float32Array(N * 3);
        const p = 2, q = 3, R = 2.0, tube = 0.5;
        for (let i = 0; i < N; i++) {
            const u = Math.random() * Math.PI * 2;
            const pt = u2 => {
                const cu = Math.cos(u2), su = Math.sin(u2), qu = (q / p) * u2;
                const cs = Math.cos(qu);
                return [R * (2 + cs) * 0.5 * cu, R * (2 + cs) * 0.5 * su, R * Math.sin(qu) * 0.5];
            };
            const P1 = pt(u), P2 = pt(u + 0.01);
            // build a frame around the curve
            const T = [P2[0] - P1[0], P2[1] - P1[1], P2[2] - P1[2]];
            const Nn = [P2[0] + P1[0], P2[1] + P1[1], P2[2] + P1[2]];
            let B = [T[1] * Nn[2] - T[2] * Nn[1], T[2] * Nn[0] - T[0] * Nn[2], T[0] * Nn[1] - T[1] * Nn[0]];
            let Nv = [B[1] * T[2] - B[2] * T[1], B[2] * T[0] - B[0] * T[2], B[0] * T[1] - B[1] * T[0]];
            const nb = Math.hypot(...B) || 1, nn = Math.hypot(...Nv) || 1;
            B = B.map(v => v / nb); Nv = Nv.map(v => v / nn);
            const v = Math.random() * Math.PI * 2, rr = tube * Math.sqrt(Math.random() * 0.35 + 0.65);
            const cx = -rr * Math.cos(v), cy = rr * Math.sin(v);
            out.set([P1[0] + cx * Nv[0] + cy * B[0], P1[1] + cx * Nv[1] + cy * B[1], P1[2] + cx * Nv[2] + cy * B[2]], i * 3);
        }
        return out;
    }

    function lattice(N) {
        // "Module Cube": a tesseract-style wireframe — an outer cube, an inner cube (the core module)
        // and 8 struts linking their corners. Clean lines + glowing vertices, baked at an isometric angle.
        const out = new Float32Array(N * 3);
        const C = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
        const E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
        const RO = 1.75, RI = 0.8;
        const segs = [];
        E.forEach(([p, q]) => segs.push([C[p].map(v => v * RO), C[q].map(v => v * RO)]));
        E.forEach(([p, q]) => segs.push([C[p].map(v => v * RI), C[q].map(v => v * RI)]));
        C.forEach(k => segs.push([k.map(v => v * RI), k.map(v => v * RO)]));
        const lens = segs.map(([A, B]) => Math.hypot(B[0] - A[0], B[1] - A[1], B[2] - A[2]));
        const total = lens.reduce((x, y) => x + y, 0);
        const cum = []; lens.reduce((acc, l, i) => (cum[i] = acc + l), 0);
        const verts = C.map(k => k.map(v => v * RO)).concat(C.map(k => k.map(v => v * RI)));
        const rx = 0.6, ry = 0.785, cxr = Math.cos(rx), sxr = Math.sin(rx), cyr = Math.cos(ry), syr = Math.sin(ry);
        for (let i = 0; i < N; i++) {
            let x, y, z;
            if (Math.random() < 0.1) {
                const v = verts[Math.floor(Math.random() * verts.length)];
                x = v[0] + gauss() * 0.04; y = v[1] + gauss() * 0.04; z = v[2] + gauss() * 0.04;
            } else {
                const r = Math.random() * total;
                let si = 0; while (cum[si] < r) si++;
                const [A, B] = segs[si], u = Math.random(), j = 0.01;
                x = A[0] + (B[0] - A[0]) * u + gauss() * j;
                y = A[1] + (B[1] - A[1]) * u + gauss() * j;
                z = A[2] + (B[2] - A[2]) * u + gauss() * j;
            }
            const x1 = x * cyr + z * syr, z1 = -x * syr + z * cyr;
            const y2 = y * cxr - z1 * sxr, z2 = y * sxr + z1 * cxr;
            out.set([x1, y2, z2], i * 3);
        }
        return out;
    }

    function galaxy(N) {
        const out = new Float32Array(N * 3);
        const arms = 4;
        for (let i = 0; i < N; i++) {
            const r = Math.pow(Math.random(), 1.6) * 4.6 + 0.15;
            const arm = (i % arms) / arms * Math.PI * 2;
            const a = arm + r * 1.15 + gauss() * (0.35 / (r * 0.6 + 0.4));
            const y = gauss() * 0.35 * (1 - r / 5.2);
            // tilt the disc towards the camera so the spiral reads clearly
            const gx = Math.cos(a) * r, gz = Math.sin(a) * r, tl = 1.05;
            out.set([gx, y * Math.cos(tl) - gz * Math.sin(tl), y * Math.sin(tl) + gz * Math.cos(tl)], i * 3);
        }
        return out;
    }

    function waveField(N) {
        const out = new Float32Array(N * 3);
        const cols = Math.ceil(Math.sqrt(N * 1.6)), rows = Math.ceil(N / cols);
        const W = 14, D = 8;
        for (let i = 0; i < N; i++) {
            const cx = i % cols, cz = Math.floor(i / cols);
            out.set([(cx / (cols - 1) - 0.5) * W, -1.2, (cz / (rows - 1) - 0.5) * D], i * 3);
        }
        return out;
    }

    /* ---------------- Shaders ---------------- */
    const VERT = `
        precision highp float;
        attribute vec3 s0; attribute vec3 s1; attribute vec3 s2;
        attribute vec3 s3; attribute vec3 s4; attribute vec3 s5;
        attribute float aRand; attribute float aSize;
        uniform mat4 uP; uniform mat4 uMV;
        uniform float uMorph; uniform float uTime; uniform float uSize; uniform float uPixel;
        uniform vec2 uMouse; uniform float uAspect; uniform float uLight;
        varying float vRand; varying float vAlpha; varying float vBurst; varying float vLight;

        vec3 shape(float i) {
            if (i < 0.5) return s0;
            if (i < 1.5) return s1;
            if (i < 2.5) return s2;
            if (i < 3.5) return s3;
            if (i < 4.5) return s4;
            return s5;
        }

        void main() {
            float a = floor(uMorph);
            float t = uMorph - a;
            float b = min(a + 1.0, 5.0);
            float d = aRand * 0.35;                       // staggered departure
            float k = smoothstep(d, d + 0.65, t);
            vec3 pa = shape(a);
            vec3 pb = shape(b);
            vec3 p = mix(pa, pb, k);

            float burst = sin(k * 3.14159);               // dramatic outward burst mid-transition
            vec3 jitter = vec3(sin(aRand * 41.0), cos(aRand * 29.0), sin(aRand * 17.0 + 1.3));
            p += normalize(pa + pb + jitter + 0.001) * burst * (0.5 + aRand * 1.6);

            p += vec3(sin(uTime * 0.6 + aRand * 31.0), cos(uTime * 0.5 + aRand * 23.0), sin(uTime * 0.45 + aRand * 13.0)) * 0.04;

            float latW = 1.0 - clamp(abs(uMorph - 3.0), 0.0, 1.0); // lattice gently 'breathes' apart
            p += p * sin(uTime * 0.9) * 0.05 * latW;

            float waveW = smoothstep(4.0, 5.0, uMorph);   // ocean motion for the final form
            p.y += waveW * (sin(p.x * 0.85 + uTime * 1.1) * 0.38 + cos(p.z * 1.2 + uTime * 0.8) * 0.22);

            vec4 mv = uMV * vec4(p, 1.0);
            gl_Position = uP * mv;

            vec2 ndc = gl_Position.xy / gl_Position.w;    // mouse repulsion in screen space
            vec2 diff = (ndc - uMouse) * vec2(uAspect, 1.0);
            float f = smoothstep(0.32, 0.0, length(diff));
            gl_Position.xy += normalize(diff + 0.0001) * f * 0.09 * gl_Position.w / vec2(uAspect, 1.0);

            gl_PointSize = max(1.0, uSize * aSize * uPixel * (1.0 + burst * 0.7) * (1.0 - uLight * 0.3) / -mv.z);
            vRand = aRand;
            vLight = uLight;
            vBurst = burst;
            vAlpha = smoothstep(22.0, 5.0, -mv.z);
        }
    `;

    const FRAG = `
        precision mediump float;
        uniform vec3 uC1; uniform vec3 uC2; uniform vec3 uC3;
        uniform float uOpacity;
        varying float vRand; varying float vAlpha; varying float vBurst; varying float vLight;
        void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            if (d > 0.5) discard;
            float a = pow(smoothstep(0.5, 0.0, d), mix(1.7, 0.9, vLight));   // harder-edged dots on light backgrounds
            vec3 col = vRand < 0.5 ? mix(uC1, uC2, vRand * 2.0) : mix(uC2, uC3, (vRand - 0.5) * 2.0);
            col += vBurst * 0.25 * (1.0 - vLight);       // glow only on dark backgrounds
            float alpha = a * uOpacity * vAlpha;
            gl_FragColor = vec4(col * alpha, alpha);       // premultiplied alpha
        }
    `;

    const STAR_VERT = `
        precision highp float;
        attribute vec3 aPos; attribute float aTw;
        uniform mat4 uP; uniform mat4 uMV; uniform float uPixel; uniform float uTime;
        varying float vTw;
        void main() {
            vec4 mv = uMV * vec4(aPos, 1.0);
            gl_Position = uP * mv;
            vTw = 0.55 + 0.45 * sin(uTime * (0.6 + aTw * 1.6) + aTw * 40.0);
            gl_PointSize = (1.2 + aTw * 1.6) * uPixel;
        }
    `;
    const STAR_FRAG = `
        precision mediump float;
        uniform vec3 uColor; uniform float uOpacity;
        varying float vTw;
        void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float al = smoothstep(0.5, 0.0, d) * uOpacity * vTw;
            gl_FragColor = vec4(uColor * al, al);
        }
    `;

    /* ---------------- Tiny matrix helpers (column-major, like WebGL) ---------------- */
    const M = {
        perspective(fovy, aspect, near, far) {
            const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
            return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
        },
        lookAt(e, c, u) {
            let zx = e[0] - c[0], zy = e[1] - c[1], zz = e[2] - c[2];
            let l = Math.hypot(zx, zy, zz) || 1; zx /= l; zy /= l; zz /= l;
            let xx = u[1] * zz - u[2] * zy, xy = u[2] * zx - u[0] * zz, xz = u[0] * zy - u[1] * zx;
            l = Math.hypot(xx, xy, xz) || 1; xx /= l; xy /= l; xz /= l;
            const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
            return new Float32Array([xx, yx, zx, 0, xy, yy, zy, 0, xz, yz, zz, 0,
                -(xx * e[0] + xy * e[1] + xz * e[2]), -(yx * e[0] + yy * e[1] + yz * e[2]), -(zx * e[0] + zy * e[1] + zz * e[2]), 1]);
        },
        mul(a, b) {
            const o = new Float32Array(16);
            for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
                o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
            }
            return o;
        },
        model(tx, ty, tz, rx, ry, s) {
            // T * Ry * Rx * S
            const cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry);
            return new Float32Array([
                cy * s, 0, -sy * s, 0,
                sy * sx * s, cx * s, cy * sx * s, 0,
                sy * cx * s, -sx * s, cy * cx * s, 0,
                tx, ty, tz, 1
            ]);
        }
    };

    function compile(gl, vs, fs) {
        const mk = (type, src) => {
            const sh = gl.createShader(type);
            gl.shaderSource(sh, src); gl.compileShader(sh);
            if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
            return sh;
        };
        const p = gl.createProgram();
        gl.attachShader(p, mk(gl.VERTEX_SHADER, vs));
        gl.attachShader(p, mk(gl.FRAGMENT_SHADER, fs));
        gl.linkProgram(p);
        if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
        return p;
    }

    const hex = h => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255];

    /* ---------------- Scene ---------------- */
    function init() {
        const root = document.documentElement;
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, powerPreference: 'high-performance' });
        if (!gl) return;
        host.appendChild(canvas);

        const isSmall = () => innerWidth < 768;
        const coarse = window.matchMedia('(pointer: coarse)').matches;
        const cores = navigator.hardwareConcurrency || 4;
        const N = coarse || isSmall() ? 5000 : cores >= 8 ? 14000 : 9000;
        let pixelCap = coarse ? 1.5 : 1.75;
        let dpr = Math.min(window.devicePixelRatio || 1, pixelCap);

        /* --- particle program & buffers --- */
        const prog = compile(gl, VERT, FRAG);
        const shapes = [globe(N), helix(N), torusKnot(N), lattice(N), galaxy(N), waveField(N)];
        const rnd = new Float32Array(N), size = new Float32Array(N);
        for (let i = 0; i < N; i++) {
            rnd[i] = Math.random();
            size[i] = Math.random() < 0.03 ? rand(2.4, 3.6) : rand(0.6, 1.6);
        }
        const attribs = [];
        const bindAttr = (program, name, data, sizePer) => {
            const loc = gl.getAttribLocation(program, name);
            if (loc < 0) return;
            const buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            attribs.push({ program, loc, buf, sizePer });
        };
        shapes.forEach((arr, i) => bindAttr(prog, `s${i}`, arr, 3));
        bindAttr(prog, 'aRand', rnd, 1);
        bindAttr(prog, 'aSize', size, 1);
        const U = name => gl.getUniformLocation(prog, name);
        const u = {
            P: U('uP'), MV: U('uMV'), morph: U('uMorph'), time: U('uTime'), size: U('uSize'), pixel: U('uPixel'),
            mouse: U('uMouse'), aspect: U('uAspect'), c1: U('uC1'), c2: U('uC2'), c3: U('uC3'), opacity: U('uOpacity'), light: U('uLight')
        };

        /* --- star dust program & buffers --- */
        const SN = coarse ? 500 : 1200;
        const sPos = new Float32Array(SN * 3), sTw = new Float32Array(SN);
        for (let i = 0; i < SN; i++) { sPos.set([rand(-26, 26), rand(-42, 16), rand(-20, -4)], i * 3); sTw[i] = Math.random(); }
        const sProg = compile(gl, STAR_VERT, STAR_FRAG);
        bindAttr(sProg, 'aPos', sPos, 3);
        bindAttr(sProg, 'aTw', sTw, 1);
        const su = { P: gl.getUniformLocation(sProg, 'uP'), MV: gl.getUniformLocation(sProg, 'uMV'), pixel: gl.getUniformLocation(sProg, 'uPixel'),
            time: gl.getUniformLocation(sProg, 'uTime'), color: gl.getUniformLocation(sProg, 'uColor'), opacity: gl.getUniformLocation(sProg, 'uOpacity') };

        const maxAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
        const useProgram = program => {
            gl.useProgram(program);
            // enable only this program's attributes
            for (let i = 0; i < maxAttribs; i++) gl.disableVertexAttribArray(i);
            attribs.filter(a => a.program === program).forEach(a => {
                gl.bindBuffer(gl.ARRAY_BUFFER, a.buf);
                gl.enableVertexAttribArray(a.loc);
                gl.vertexAttribPointer(a.loc, a.sizePer, gl.FLOAT, false, 0, 0);
            });
        };

        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);

        /* --- theme --- */
        let light = false, baseOpacity = 0.9, colors = [], starColor = [], starOpacity = 0.5;
        const applyTheme = () => {
            light = root.getAttribute('data-theme') === 'light';
            colors = light ? [hex('#1d4ed8'), hex('#6d28d9'), hex('#0e7490')] : [hex('#3b82f6'), hex('#8b5cf6'), hex('#22d3ee')];
            starColor = light ? hex('#64748b') : hex('#cbd5e1');
            starOpacity = light ? 0.4 : 0.6;
            baseOpacity = light ? 0.6 : 0.9;
            requestRender();
        };
        new MutationObserver(applyTheme).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

        /* --- scroll keyframes: section -> form, placement, scale, brightness --- */
        // Forms sit in the empty space beside the content (edges / behind the photo), never centred under body text
        const SECTION_MAP = [
            { id: 'home',           shape: 0, x:  4.3, y:  0.6, s: 0.92, o: 1.00 },
            { id: 'about',          shape: 1, x:  5.4, y:  0.0, s: 0.95, o: 0.60 },
            { id: 'experience',     shape: 1, x: -6.2, y:  0.0, s: 0.95, o: 0.50 },
            { id: 'skills',         shape: 2, x:  6.0, y:  0.2, s: 0.95, o: 0.55 },
            { id: 'services',       shape: 2, x: -6.0, y:  0.0, s: 0.95, o: 0.55 },
            { id: 'projects',       shape: 3, x:  5.2, y:  1.9, s: 0.85, o: 0.70 },
            { id: 'certifications', shape: 4, x: -5.4, y:  0.4, s: 1.00, o: 0.65 },
            { id: 'contact',        shape: 5, x:  0.0, y: -1.2, s: 1.00, o: 0.85 }
        ];
        let keys = [];
        const computeKeys = () => {
            keys = SECTION_MAP.map(m => {
                const el = document.getElementById(m.id);
                return el ? Object.assign({}, m, { top: el.getBoundingClientRect().top + scrollY - innerHeight * 0.4 }) : null;
            }).filter(Boolean);
            if (keys.length) keys[0].top = 0;
        };

        const ease = t => t * t * (3 - 2 * t);
        const target = { morph: 0, x: 0, y: 0, s: 1, o: 1 };
        const state = { morph: 0, x: 0, y: 0, s: 1, o: 1 };
        const readScroll = () => {
            if (!keys.length) return;
            const y = scrollY;
            let i = 0;
            while (i < keys.length - 1 && y >= keys[i + 1].top) i++;
            const A = keys[i], B = keys[Math.min(i + 1, keys.length - 1)];
            const span = Math.max(1, B.top - A.top);
            // hold each form for most of its section, then morph during the last 45%
            const t = A === B ? 0 : ease(Math.min(1, Math.max(0, ((y - A.top) / span - 0.55) / 0.45)));
            const small = isSmall();
            target.morph = A.shape + (B.shape - A.shape) * t;
            target.x = small ? 0 : A.x + (B.x - A.x) * t;
            target.y = small && A.shape === 0 && t < 0.5 ? 2.2 : A.y + (B.y - A.y) * t;
            target.s = (A.s + (B.s - A.s) * t) * (small ? 0.72 : 1);
            target.o = (A.o + (B.o - A.o) * t) * (small ? (i === 0 && t < 0.5 ? 0.8 : 0.45) : 1);
            requestRender();
        };

        /* --- pointer --- */
        const mouse = { x: 0, y: 0, tx: 0, ty: 0, ndcX: 9, ndcY: 9 };
        window.addEventListener('pointermove', e => {
            mouse.tx = (e.clientX / innerWidth) * 2 - 1;
            mouse.ty = -(e.clientY / innerHeight) * 2 + 1;
            mouse.ndcX = mouse.tx; mouse.ndcY = mouse.ty;
            requestRender();
        }, { passive: true });
        document.addEventListener('pointerleave', () => { mouse.ndcX = 9; mouse.ndcY = 9; });

        /* --- sizing --- */
        let W = 1, H = 1, aspect = 1, proj, camZ = 10, pixelScale = 1;
        const onResize = () => {
            W = innerWidth; H = innerHeight; aspect = W / H;
            canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
            canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
            gl.viewport(0, 0, canvas.width, canvas.height);
            camZ = W < 768 ? 12 : 10;
            proj = M.perspective(55 * Math.PI / 180, aspect, 0.1, 100);
            pixelScale = dpr * Math.min(1.2, H / 900 + 0.3);
            computeKeys(); readScroll();
            requestRender();
        };
        let rT;
        window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(onResize, 120); });
        window.addEventListener('scroll', readScroll, { passive: true });
        if ('ResizeObserver' in window) new ResizeObserver(() => { computeKeys(); readScroll(); }).observe(document.body);

        /* --- render --- */
        let time = 0, drawCount = N, running = true, lost = false;
        const cam = { x: 0, y: 0 };

        function step(dt) {
            const k = 1 - Math.exp(-dt * 3.2);
            state.morph += (target.morph - state.morph) * k;
            state.x += (target.x - state.x) * k;
            state.y += (target.y - state.y) * k;
            state.s += (target.s - state.s) * k;
            state.o += (target.o - state.o) * k;
            mouse.x += (mouse.tx - mouse.x) * k;
            mouse.y += (mouse.ty - mouse.y) * k;
            cam.x += (mouse.x * 0.4 - cam.x) * k;
            cam.y += (mouse.y * 0.25 - cam.y) * k;
        }

        function draw() {
            if (lost) return;
            const sp = scrollY * 0.00045;
            const view = M.lookAt([cam.x, cam.y, camZ], [state.x * 0.25, 0, 0], [0, 1, 0]);
            const model = M.model(state.x, state.y, 0, 0.18 + mouse.y * 0.22 + Math.sin(sp * 2) * 0.15, time * 0.06 + sp + mouse.x * 0.35, state.s);
            const mv = M.mul(view, model);

            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            // stars
            useProgram(sProg);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            const starModel = M.model(0, scrollY * 0.0025, 0, 0, time * 0.004, 1);
            gl.uniformMatrix4fv(su.P, false, proj);
            gl.uniformMatrix4fv(su.MV, false, M.mul(view, starModel));
            gl.uniform1f(su.pixel, dpr);
            gl.uniform1f(su.time, time);
            gl.uniform3fv(su.color, starColor);
            gl.uniform1f(su.opacity, starOpacity);
            gl.drawArrays(gl.POINTS, 0, SN);

            // morphing particles
            useProgram(prog);
            // dark: additive glow; light: normal 'ink' blending so colours stay rich on a pale page
            if (light) gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); else gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.uniformMatrix4fv(u.P, false, proj);
            gl.uniformMatrix4fv(u.MV, false, mv);
            gl.uniform1f(u.morph, state.morph);
            gl.uniform1f(u.time, time);
            gl.uniform1f(u.size, 44);
            gl.uniform1f(u.pixel, pixelScale);
            gl.uniform2f(u.mouse, mouse.ndcX, mouse.ndcY);
            gl.uniform1f(u.aspect, aspect);
            gl.uniform3fv(u.c1, colors[0]); gl.uniform3fv(u.c2, colors[1]); gl.uniform3fv(u.c3, colors[2]);
            gl.uniform1f(u.opacity, baseOpacity * state.o);
            gl.uniform1f(u.light, light ? 1 : 0);
            gl.drawArrays(gl.POINTS, 0, drawCount);
        }

        let rafPending = false;
        function requestRender() {
            if (!reduceMotion || rafPending) return;
            rafPending = true;
            requestAnimationFrame(() => { rafPending = false; step(1); draw(); });
        }

        // adaptive quality
        let last = performance.now(), frames = 0, slow = 0, quality = 2;
        function loop(now) {
            if (!running) return;
            requestAnimationFrame(loop);
            const dt = Math.min((now - last) / 1000, 0.1);
            last = now;
            time += dt;
            step(dt);
            draw();
            frames++;
            if (dt > 0.028) slow += dt; else slow = Math.max(0, slow - dt * 0.5);
            if (frames > 120 && slow > 1.5 && quality > 0) {
                quality--; slow = 0;
                if (quality === 1) { pixelCap = 1; dpr = 1; onResize(); }
                else drawCount = Math.floor(N * 0.55);
            }
        }

        document.addEventListener('visibilitychange', () => {
            if (reduceMotion) return;
            running = !document.hidden;
            if (running) { last = performance.now(); requestAnimationFrame(loop); }
        });
        canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); lost = true; running = false; host.classList.remove('ready'); });

        applyTheme();
        onResize();
        Object.assign(state, target);
        root.classList.add('webgl');
        requestAnimationFrame(() => host.classList.add('ready'));
        if (reduceMotion) { step(1); draw(); } else requestAnimationFrame(t => { last = t; loop(t); });
    }
})();

/* ============================================================
   shared.js — lógica común (música, RSVP, PDF, confetti, conteo)
   No necesitas editar este archivo.
   ============================================================ */
(function () {
  const C = window.CONFIG || {};

  /* ---------- Rellenar textos desde config.js ---------- */
  function applyConfig() {
    document.querySelectorAll('[data-cfg]').forEach(el => {
      const k = el.getAttribute('data-cfg');
      if (C[k] != null && C[k] !== '') el.textContent = C[k];
    });
    document.querySelectorAll('[data-cfg-href]').forEach(el => {
      const k = el.getAttribute('data-cfg-href');
      if (C[k]) el.setAttribute('href', C[k]);
    });
  }
  window.applyConfig = applyConfig;

  /* ---------- Música (Web Audio, sin archivos, no infringe copyright) ---------- */
  const MusicBox = (function () {
    let ctx = null, master = null, playing = false, i = 0, nextT = 0, timer = null;
    const N = { C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99,A5:880.00,B5:987.77,
                C6:1046.50,D6:1174.66,E6:1318.51, R:0 };
    // Melodía tipo cajita musical (kawaii), en pares [nota, duración seg]
    const mel = [
      ['E5',.22],['G5',.22],['C6',.30],['B5',.22],['G5',.22],['A5',.30],['G5',.22],['E5',.30],
      ['D5',.22],['E5',.22],['G5',.30],['E5',.22],['D5',.22],['C5',.46],['R',.16],
      ['E5',.22],['G5',.22],['C6',.30],['D6',.22],['B5',.22],['C6',.30],['A5',.22],['G5',.30],
      ['E5',.22],['G5',.22],['A5',.30],['G5',.22],['E5',.22],['C5',.50],['R',.22],
    ];
    function note(f, t, d) {
      if (!f) return;
      const o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'triangle'; o2.type = 'sine';
      o.frequency.value = f; o2.frequency.value = f * 2; o2.detune.value = 4;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.20, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d * 0.95);
      o.connect(g); o2.connect(g); g.connect(master);
      o.start(t); o2.start(t); o.stop(t + d); o2.stop(t + d);
    }
    function loop() {
      const now = ctx.currentTime;
      while (nextT < now + 0.4) {
        const [n, d] = mel[i];
        note(N[n], nextT, d);
        nextT += d; i = (i + 1) % mel.length;
      }
      timer = setTimeout(loop, 120);
    }
    function start() {
      if (playing) return;
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      if (!master) { master = ctx.createGain(); master.gain.value = 0.5; master.connect(ctx.destination); }
      playing = true; nextT = ctx.currentTime + 0.1; loop();
    }
    function stop() { playing = false; clearTimeout(timer); }
    function toggle() { playing ? stop() : start(); return playing; }
    return { start, stop, toggle, get playing() { return playing; } };
  })();
  window.MusicBox = MusicBox;

  /* ---------- Confetti ---------- */
  window.fiesta = function () {
    if (typeof confetti !== 'function') return;
    const colors = ['#ff5d8f','#ff9ec7','#ffd1dc','#ffe08a','#ffffff','#c58bff'];
    confetti({ particleCount: 130, spread: 85, origin: { y: .6 }, colors });
    setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0 }, colors }), 150);
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1 }, colors }), 300);
  };

  /* ---------- RSVP a Supabase (con respaldo por WhatsApp) ---------- */
  let sb = null;
  function getSB() {
    if (sb) return sb;
    if (window.supabase && C.supabaseUrl && C.supabaseAnonKey) {
      sb = window.supabase.createClient(C.supabaseUrl, C.supabaseAnonKey);
    }
    return sb;
  }
  window.enviarRSVP = async function (data, which) {
    const client = getSB();
    if (client) {
      const { error } = await client.from('confirmaciones').insert({
        nombre: data.nombre, personas: data.personas, mensaje: data.mensaje || null, invitacion: which
      });
      if (error) throw error;
      return 'ok';
    }
    // Respaldo: abrir WhatsApp con el mensaje listo
    const txt = encodeURIComponent(
      `¡Hola! Confirmo mi asistencia al cumple de ${C.nombre} 🎀\n` +
      `Nombre: ${data.nombre}\nPersonas: ${data.personas}` +
      (data.mensaje ? `\nMensaje: ${data.mensaje}` : ''));
    window.open(`https://wa.me/${C.whatsapp}?text=${txt}`, '_blank');
    return 'whatsapp';
  };

  /* ---------- Descargar PDF ---------- */
  window.descargarPDF = async function (sel, filename, bg) {
    const el = document.querySelector(sel);
    if (!el || typeof html2canvas === 'undefined' || !window.jspdf) { window.print(); return; }
    const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: bg || null });
    const img = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: canvas.width > canvas.height ? 'l' : 'p', unit: 'px', format: [canvas.width, canvas.height] });
    pdf.addImage(img, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(filename || 'invitacion.pdf');
  };

  /* ---------- Conteo regresivo ---------- */
  window.countdown = function (elId) {
    const el = document.getElementById(elId);
    if (!el) return;
    const target = C.fechaISO ? new Date(C.fechaISO).getTime() : NaN;
    const box = (v, l) => `<div class="cd-box"><b>${String(v).padStart(2,'0')}</b><span>${l}</span></div>`;
    function tick() {
      if (isNaN(target)) { el.innerHTML = '<span class="cd-hoy">¡Muy pronto! 🎀</span>'; return; }
      const diff = target - Date.now();
      if (diff <= 0) { el.innerHTML = '<span class="cd-hoy">¡Hoy es la fiesta! 🎉</span>'; return; }
      const d = Math.floor(diff/864e5), h = Math.floor(diff%864e5/36e5),
            m = Math.floor(diff%36e5/6e4), s = Math.floor(diff%6e4/1e3);
      el.innerHTML = box(d,'días') + box(h,'hrs') + box(m,'min') + box(s,'seg');
    }
    tick(); setInterval(tick, 1000);
  };

  /* ---------- Lluvia de elementos ---------- */
  window.lluvia = function (container, chars) {
    const host = typeof container === 'string' ? document.querySelector(container) : container;
    if (!host) return;
    setInterval(() => {
      const s = document.createElement('span');
      s.className = 'cae';
      s.textContent = chars[Math.floor(Math.random() * chars.length)];
      s.style.left = Math.random() * 100 + '%';
      s.style.fontSize = (14 + Math.random() * 22) + 'px';
      s.style.animationDuration = (5 + Math.random() * 6) + 's';
      s.style.opacity = 0.5 + Math.random() * 0.5;
      host.appendChild(s);
      setTimeout(() => s.remove(), 11000);
    }, 450);
  };

  document.addEventListener('DOMContentLoaded', applyConfig);
})();

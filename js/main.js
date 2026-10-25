const toggle = document.getElementById('navToggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => {
  const abierto = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', abierto);
});
menu.addEventListener('click', e => { if (e.target.tagName === 'A') menu.classList.remove('open'); });

const paginas = document.getElementById('paginas');
const precio = document.getElementById('precio');
const resultado = document.getElementById('resultado');

function calcular() {
  const total = Math.max(0, Number(paginas.value) || 0) * Math.max(0, Number(precio.value) || 0);
  resultado.textContent = '$' + total.toLocaleString('en-US'); 
}
paginas.addEventListener('input', calcular);
precio.addEventListener('input', calcular);
document.getElementById('btnCalcular').addEventListener('click', calcular);
calcular();

const form = document.getElementById('formContacto');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  if (!nombre || !form.mensaje.value.trim() || !form.correo.validity.valid || !form.correo.value) {
    msg.className = 'err';
    msg.textContent = 'Completa tu nombre, un correo válido y tu mensaje para poder enviarlo.';
    return;
  }
  msg.className = 'ok';
  msg.textContent = `Gracias, ${nombre}. Recibimos tu mensaje y te respondemos en 24 horas.`;
  form.reset();
});

if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero .l', { yPercent: 110, duration: 0.8, stagger: 0.12 })
    .from('.hero p, .hero .cta', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.3')
    .from('.codewin', { x: 60, opacity: 0, duration: 0.9 }, '-=0.9')
    .from('.codewin .ln', { opacity: 0, x: -12, stagger: 0.08 }, '-=0.4');

  gsap.from('.svc', {
    scrollTrigger: { trigger: '#servicios', start: 'top 70%' },
    y: 50, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out'
  });

  document.querySelectorAll('[data-count]').forEach(el => {
    const fin = Number(el.dataset.count), obj = { v: 0 };
    el.textContent = '0';
    gsap.to(obj, {
      v: fin, duration: 1.8, ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => { el.textContent = Math.round(obj.v); }
    });
  });

  gsap.from('.proj', {
    scrollTrigger: { trigger: '#proyectos', start: 'top 70%' },
    scale: 0.92, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.4)'
  });
}

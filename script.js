// Ruth Zela - script limpio sin duplicados
let currentLang = 'es';
let isLight = localStorage.getItem('theme') === 'light';

const translations = {
  es: {
    heroTitle: "Desarrolladora Full Stack",
    heroSub: "basada en Arequipa, Perú",
    heroDesc: "Construyo plataformas de reservas y gestión a medida: desde sistemas médicos con agenda para pacientes y doctores, hasta webs gastronómicas con menú digital y salones de belleza con reserva online.",
    btnProjects: "Ver Proyectos →",
    btnCV: "📄 Ver CV",
    sectionProjects: "PROYECTOS DESTACADOS",
    sectionContact: "HABLEMOS DE TU PROYECTO",
    contactSub: "¿Tienes una idea en Arequipa? Te respondo en menos de 24h.",
    p1: "Plataforma para agendar citas médicas con gestión de pacientes y doctores.",
    p2: "Web gastronómica con menú digital interactivo y pedidos online.",
    p3: "Sistema de reservas online para salón de belleza con recordatorios.",
    btnSend: "Enviar mensaje →"
  },
  en: {
    heroTitle: "Full Stack Developer",
    heroSub: "based in Arequipa, Peru",
    heroDesc: "I build custom booking and management platforms: from medical systems with patient and doctor scheduling, to restaurant websites with digital menus and beauty salons with online booking.",
    btnProjects: "View Projects →",
    btnCV: "📄 View CV",
    sectionProjects: "FEATURED PROJECTS",
    sectionContact: "LET'S TALK ABOUT YOUR PROJECT",
    contactSub: "Do you have an idea in Arequipa? I reply within 24h.",
    p1: "Platform to schedule medical appointments with patient and doctor management.",
    p2: "Restaurant website with interactive digital menu and online orders.",
    p3: "Online booking system for beauty salon with reminders.",
    btnSend: "Send message →"
  }
};

function applyLang(lang) {
  const t = translations[lang];
  const set = (id, val) => {
    const el = document.getElementById(id);
    if(el) el.textContent = val;
  };
  set('heroTitle', t.heroTitle);
  set('heroSub', t.heroSub);
  set('heroP1', t.heroDesc);
  set('btnProyectos', t.btnProjects);
  set('btnCV', t.btnCV);
  set('titleProyectos', t.sectionProjects);
  set('contactTitle', t.sectionContact);
  set('contactSub', t.contactSub);
  set('proj1Desc', t.p1);
  set('proj2Desc', t.p2);
  set('proj3Desc', t.p3);
  set('btnEnviar', t.btnSend);
}

// Botones YA existentes en HTML
const langBtn = document.getElementById('langToggle');
const themeBtn = document.getElementById('themeToggle');

if (isLight) {
  document.body.classList.add('light');
  if(themeBtn) themeBtn.textContent = '☀️';
}

langBtn?.addEventListener('click', () => {
  currentLang = currentLang === 'es'? 'en' : 'es';
  langBtn.textContent = currentLang === 'es'? 'ES | EN' : 'EN | ES';
  applyLang(currentLang);
});

themeBtn?.addEventListener('click', () => {
  isLight =!isLight;
  document.body.classList.toggle('light', isLight);
  themeBtn.textContent = isLight? '☀️' : '🌙';
  localStorage.setItem('theme', isLight? 'light' : 'dark');
});

// Nav + scroll con offset para header fijo
document.querySelectorAll('.header nav a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    e.preventDefault();
    const id = this.getAttribute('href');
    if(id === '#inicio'){
      window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
      const target = document.querySelector(id);
      if(target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
    document.querySelectorAll('.header nav a').forEach(x=>x.classList.remove('active'));
    this.classList.add('active');
  });
});

// Form mailto
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;
    window.location.href = `mailto:ruthzela2303@gmail.com?subject=${encodeURIComponent(asunto + ' - de ' + nombre)}&body=${encodeURIComponent(mensaje + '\n\nContacto: ' + email + '\nNombre: ' + nombre)}`;
    const msg = document.getElementById('formMsg');
    msg.style.display='block';
    msg.textContent = currentLang === 'es'? `¡Gracias ${nombre}! Abriendo tu correo...` : `Thanks ${nombre}! Opening your mail...`;
    form.reset();
    setTimeout(()=> msg.style.display='none', 4000);
  });
}
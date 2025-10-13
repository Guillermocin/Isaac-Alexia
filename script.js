// Fecha del evento (8 de noviembre de 2025, 6:00 PM)
const eventDate = new Date("Nov 8, 2025 18:00:00").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days < 10 ? "0" + days : days;
  document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;

  if (distance < 0) {
    clearInterval(countdown);
    document.querySelector(".countdown").innerHTML = "<p>¡El gran día ha llegado!</p>";
  }
}, 1000);


let currentIndex = 0;

function initCarousel() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.dots');

  // Crear puntos
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    if (index === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });

  showSlide(currentIndex);

  document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // Auto cambio
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 4000);
}

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dots span');

  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

document.addEventListener('DOMContentLoaded', initCarousel);



function enviarWhatsApp() {
  const nombre = document.querySelector('input[name="nombre"]').value;
  const acompanante = document.querySelector('input[name="acompanante"]').value;
  const asistencia = document.querySelector('input[name="asistencia"]:checked')?.value || "No especificado";

  const mensaje = `Hola, confirmo mi asistencia a la boda 💍%0A` +
                  `Nombre: ${nombre}%0A` +
                  `Acompañante: ${acompanante}%0A` +
                  `Asistencia: ${asistencia}`;

  const url = `https://wa.me/527531250330?text=${mensaje}`;
  window.open(url, '_blank');
}




// 🔗 Pega aquí la URL del Web App desplegado (termina en /exec)
const webAppUrl = "https://docs.google.com/spreadsheets/d/13jHfveE5Po4cTLuZOoWa7Nvk9p-hUli4aSijjZi1wks/edit?usp=sharing";

function enviarFirma() {
  const nombre = document.querySelector('input[name="firma_nombre"]').value.trim();
  const mensaje = document.querySelector('textarea[name="firma_mensaje"]').value.trim();

  if (!nombre || !mensaje) {
    alert("Por favor ingresa tu nombre y un mensaje.");
    return;
  }

  // 📤 Enviar datos a Google Sheets
  fetch(webAppUrl, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      nombre: nombre,
      acompanante: "",
      asistencia: "Mensaje",
      mensaje: mensaje
    })
  });

  // 🟢 Confirmar en WhatsApp también (opcional)
  const wa = encodeURIComponent(
    `Libro de firmas 📖\nNombre: ${nombre}\nMensaje: ${mensaje}`
  );
  window.open(`https://wa.me/527531250330?text=${wa}`, "_blank");

  // 👍 Cambiar texto del botón
  const btn = document.querySelector('.send-button');
  btn.textContent = "¡Enviado!";
  btn.disabled = true;

  // 🧽 Limpiar después
  setTimeout(() => {
    document.querySelector('input[name="firma_nombre"]').value = "";
    document.querySelector('textarea[name="firma_mensaje"]').value = "";
    btn.textContent = "ENVIAR";
    btn.disabled = false;
  }, 2000);
}

// 👇 Asegurar que la función esté disponible
window.enviarFirma = enviarFirma;







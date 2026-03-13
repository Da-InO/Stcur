// Comprobar si hay usuario logueado
const user = localStorage.getItem('reina_username');
if (!user) {
    window.location.href = 'login.html';
} else {
    const mainContent = document.getElementById('mainContent');
    if (mainContent) mainContent.style.display = 'flex';
}

// Mostrar menú de docente si es la profesora
if (user === "Profesora reina") {
    const menu = document.getElementById("menu-docente");
    if (menu) menu.style.display = "block";
}

const btnLeft = document.getElementById('btnLeft');
const btnRight = document.getElementById('btnRight');
const illustration = document.getElementById('illustration');
const text = document.getElementById('text');

const slides = [
    { src: "imagenes/Happy_Book.png", alt: "Ilustración Happy Book", text: "¡Vamos a aprender jugando!", link: "eco-aventura.html" }
];

let currentIndex = 0;

function updateSlide() {
    // PROTECCIÓN: Si el elemento es un VIDEO, no hacemos el cambio de imagen
    if (illustration && illustration.tagName === 'VIDEO') {
        console.log("Modo video detectado: ignorando carrusel de imágenes.");
        return; 
    }

    if (!illustration || !text) return;

    const slide = slides[currentIndex];
    illustration.src = slide.src;
    illustration.alt = slide.alt;
    text.textContent = slide.text;
}

// Navegación con protección para evitar errores
if (btnLeft) {
    btnLeft.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide();
    });
}

if (btnRight) {
    btnRight.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
    });
}

// Cerrar sesión
const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('reina_username');
        window.location.href = 'login.html';
    });
}

// --- Lógica para redirigir al hacer clic en el video ---
const videoBtn = document.getElementById('illustration');

if (videoBtn) {
    videoBtn.style.cursor = 'pointer'; // Cambia el cursor para indicar que es clicable
    videoBtn.addEventListener('click', () => {
        // Redirige a la página de colores
        window.location.href = 'colores.html';
    });
}

// Ejecutar al cargar
updateSlide();
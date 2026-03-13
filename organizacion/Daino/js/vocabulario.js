import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCIgbuAkRg8ZfecTlGRTqVatIvOxcYl3A",
    authDomain: "aventurasonoramagica.firebaseapp.com",
    projectId: "aventurasonoramagica",
    storageBucket: "aventurasonoramagica.appspot.com",
    messagingSenderId: "544708290123",
    appId: "1:544708290123:web:ad5413929dd5fd12b68fce",
    measurementId: "G-C753SEVD4D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const alumno = localStorage.getItem('reina_username') || 'Invitado';

// Elementos del DOM
const message = document.getElementById('message');
const listenMessage = document.getElementById('listen-message');
const palabraElemento = document.getElementById('palabra-actual');
const palabraImagen = document.getElementById('palabra-imagen');
const btnSiguiente = document.getElementById('btn-siguiente');
const nivelTitulo = document.getElementById('nivel-actual');
const levelEmoji = document.getElementById('level-emoji');
const palabraCard = document.querySelector('.palabra-card');

const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackVideo = document.getElementById('feedback-video');

listenMessage.style.display = 'none';

// =============================================================
// ===== INICIO DE LA NUEVA ESTRUCTURA DE DATOS DE VOCABULARIO =====
// =============================================================

const vocabularioCompleto = {
    'A': {
        facil: [
            { palabra: 'Agua', imagen: 'imagenes/Vocabulario/Agua_potable.webp' },
            { palabra: 'Ala', imagen: 'imagenes/Vocabulario/ala.png' },
            { palabra: 'Arco', imagen: 'imagenes/Vocabulario/Arco.png' },
            { palabra: 'Ave', imagen: 'imagenes/Vocabulario/ave.webp' },
            { palabra: 'Alto', imagen: 'imagenes/Vocabulario/aguja.webp' }
        ],
        intermedio: [
            { palabra: 'Amigo', imagen: 'imagenes/Vocabulario/amigo.jpg' },
            { palabra: 'Azul', imagen: 'imagenes/Vocabulario/azul.jpg' },
            { palabra: 'Aroma', imagen: 'imagenes/Vocabulario/aroma.jpg' },
            { palabra: 'Animal', imagen: 'imagenes/Vocabulario/animal.jpg' },
            { palabra: 'Amarillo', imagen: 'imagenes/Vocabulario/amarillo.jpg' }
        ],
        dificil: [
            { palabra: 'Abundante', imagen: 'imagenes/Vocabulario/abundante.jpg' },
            { palabra: 'Acelerado', imagen: 'imagenes/Vocabulario/acelerado.jpg' },
            { palabra: 'Armonioso', imagen: 'imagenes/Vocabulario/armonioso.jpg' },
            { palabra: 'Ambicioso', imagen: 'imagenes/Vocabulario/ambicioso.jpg' },
            { palabra: 'Absoluto', imagen: 'imagenes/Vocabulario/absoluto.jpg' }
        ]
    },
    'E': {
        facil: [
            { palabra: 'Elefante', imagen: 'imagenes/vocabulario/elefante.jpg' },
            { palabra: 'Estrella', imagen: 'imagenes/vocabulario/estrella.jpg' },
            { palabra: 'Escoba', imagen: 'imagenes/vocabulario/escoba.jpg' },
            { palabra: 'Enano', imagen: 'imagenes/vocabulario/enano.jpg' },
            { palabra: 'Espada', imagen: 'imagenes/vocabulario/espada.jpg' }
        ],
        intermedio: ['Ensalada', 'Edificio', 'Elegante', 'Estudiante', 'Equipo'],
        
        dificil: ['Espectacular', 'Eficiente', 'Elaborado', 'Ecosistema', 'Eternidad']
    },
    'I': {
        facil: [
            { palabra: 'Isla', imagen: 'imagenes/isla.jpg' },
            { palabra: 'Imán', imagen: 'imagenes/iman.jpg' },
            { palabra: 'Iglesia', imagen: 'imagenes/iglesia.jpg' },
            { palabra: 'Iglú', imagen: 'imagenes/iglu.jpg' },
            { palabra: 'Idea', imagen: 'imagenes/idea.jpg' }
        ],
        intermedio: ['Iguana', 'Invierno', 'Inteligente', 'Importante', 'Incendio'],
        dificil: ['Inolvidable', 'Imaginación', 'Independiente', 'Investigación', 'Infinito']
    },
    'O': {
        facil: [
            { palabra: 'Oso', imagen: 'imagenes/oso.jpg' },
            { palabra: 'Ojo', imagen: 'imagenes/ojo.jpg' },
            { palabra: 'Oveja', imagen: 'imagenes/oveja.jpg' },
            { palabra: 'Ola', imagen: 'imagenes/ola.jpg' },
            { palabra: 'Oro', imagen: 'imagenes/oro.jpg' }
        ],
        intermedio: ['Oreja', 'Oruga', 'Orquesta', 'Océano', 'Otoño'],
        dificil: ['Omnipotente', 'Oportunidad', 'Organización', 'Ornamento', 'Obstáculo']
    },
    'U': {
        facil: [
            { palabra: 'Uva', imagen: 'imagenes/uva.jpg' },
            { palabra: 'Uno', imagen: 'imagenes/uno.jpg' },
            { palabra: 'Uña', imagen: 'imagenes/uña.jpg' },
            { palabra: 'Urna', imagen: 'imagenes/urna.jpg' },
            { palabra: 'Útil', imagen: 'imagenes/util.jpg' }
        ],
        intermedio: ['Universo', 'Uniforme', 'Urgente', 'Último', 'Ubicación'],
        dificil: ['Ubicuidad', 'Usufructo', 'Unánime', 'Utilitario', 'Utopía']
    },
    'M': {
        facil: [
            { palabra: 'Mano', imagen: 'imagenes/mano.jpg' },
            { palabra: 'Mamá', imagen: 'imagenes/mama.jpg' },
            { palabra: 'Mesa', imagen: 'imagenes/mesa.jpg' },
            { palabra: 'Moto', imagen: 'imagenes/moto.jpg' },
            { palabra: 'Mapa', imagen: 'imagenes/mapa.jpg' }
        ],
        intermedio: ['Manzana', 'Montaña', 'Mochila', 'Martillo', 'Mariposa'],
        dificil: ['Murciélago', 'Matemáticas', 'Magnífico', 'Melancolía', 'Metamorfosis']
    },
    'P': {
        facil: [
            { palabra: 'Papá', imagen: 'imagenes/papa.jpg' },
            { palabra: 'Pato', imagen: 'imagenes/pato.jpg' },
            { palabra: 'Perro', imagen: 'imagenes/perro.jpg' },
            { palabra: 'Pan', imagen: 'imagenes/pan.jpg' },
            { palabra: 'Pie', imagen: 'imagenes/pie.jpg' }
        ],
        intermedio: ['Pelota', 'Pintura', 'Playa', 'Puente', 'Princesa'],
        dificil: ['Paralelepípedo', 'Perseverancia', 'Precipitación', 'Psicología', 'Planeta']
    },
    'L': {
        facil: [
            { palabra: 'Luna', imagen: 'imagenes/luna.jpg' },
            { palabra: 'León', imagen: 'imagenes/leon.jpg' },
            { palabra: 'Lápiz', imagen: 'imagenes/lapiz.jpg' },
            { palabra: 'Lobo', imagen: 'imagenes/lobo.jpg' },
            { palabra: 'Lata', imagen: 'imagenes/lata.jpg' }
        ],
        intermedio: ['Lámpara', 'Libro', 'Limón', 'Lengua', 'Lagarto'],
        dificil: ['Luminiscente', 'Laberinto', 'Locuacidad', 'Longitudinal', 'Legislación']
    },
    'S': {
        facil: [
            { palabra: 'Sol', imagen: 'imagenes/sol.jpg' },
            { palabra: 'Sapo', imagen: 'imagenes/sapo.jpg' },
            { palabra: 'Sopa', imagen: 'imagenes/sopa.jpg' },
            { palabra: 'Silla', imagen: 'imagenes/silla.jpg' },
            { palabra: 'Seis', imagen: 'imagenes/seis.jpg' }
        ],
        intermedio: ['Serpiente', 'Sombrero', 'Semáforo', 'Sandía', 'Silencio'],
        dificil: ['Sintetizador', 'Subterráneo', 'Simultáneo', 'Sostenibilidad', 'Significado']
    },
    // ... (se añadirían el resto de letras de forma similar)
    'T': {
        facil: [
            { palabra: 'Taza', imagen: 'imagenes/taza.jpg' },
            { palabra: 'Tigre', imagen: 'imagenes/tigre.jpg' },
            { palabra: 'Tomate', imagen: 'imagenes/tomate.jpg' }
        ],
        intermedio: ['Teléfono', 'Tiburón', 'Tractor'],
        dificil: ['Tecnología', 'Transformación', 'Transparente']
    },
    'D': {
        facil: [
            { palabra: 'Dado', imagen: 'imagenes/dado.jpg' },
            { palabra: 'Dedo', imagen: 'imagenes/dedo.jpg' },
            { palabra: 'Dos', imagen: 'imagenes/dos.jpg' }
        ],
        intermedio: ['Dinosaurio', 'Delfín', 'Diamante'],
        dificil: ['Determinación', 'Desarrollo', 'Democracia']
    },
    'F': {
        facil: [
            { palabra: 'Foca', imagen: 'imagenes/foca.jpg' },
            { palabra: 'Fuego', imagen: 'imagenes/fuego.jpg' },
            { palabra: 'Foto', imagen: 'imagenes/foto.jpg' }
        ],
        intermedio: ['Fantasma', 'Fresa', 'Fábrica'],
        dificil: ['Fenomenal', 'Filosofía', 'Fotografía']
    },
    'B': {
        facil: [
            { palabra: 'Bebé', imagen: 'imagenes/bebe.jpg' },
            { palabra: 'Boca', imagen: 'imagenes/boca.jpg' },
            { palabra: 'Barco', imagen: 'imagenes/barco.jpg' }
        ],
        intermedio: ['Ballena', 'Bicicleta', 'Bandera'],
        dificil: ['Biblioteca', 'Biodegradable', 'Benevolencia']
    },
    'R': {
        facil: [
            { palabra: 'Ratón', imagen: 'imagenes/raton.jpg' },
            { palabra: 'Rosa', imagen: 'imagenes/rosa.jpg' },
            { palabra: 'Rana', imagen: 'imagenes/rana.jpg' }
        ],
        intermedio: ['Reloj', 'Regalo', 'Robot'],
        dificil: ['Responsabilidad', 'Revolución', 'Resplandeciente']
    },
    'RR': {
        facil: [
            { palabra: 'Carro', imagen: 'imagenes/carro.jpg' },
            { palabra: 'Perro', imagen: 'imagenes/perro.jpg' },
            { palabra: 'Torre', imagen: 'imagenes/torre.jpg' }
        ],
        intermedio: ['Guitarra', 'Ferrocarril', 'Arroz'],
        dificil: ['Desarrollo', 'Irreverente', 'Párrafo']
    },
    'C': {
        facil: [
            { palabra: 'Casa', imagen: 'imagenes/casa.jpg' },
            { palabra: 'Cama', imagen: 'imagenes/cama.jpg' },
            { palabra: 'Copa', imagen: 'imagenes/copa.jpg' }
        ],
        intermedio: ['Conejo', 'Caballo', 'Corazón'],
        dificil: ['Comunicación', 'Conocimiento', 'Característica']
    },
    'CH': {
        facil: [
            { palabra: 'Chino', imagen: 'imagenes/chino.jpg' },
            { palabra: 'Leche', imagen: 'imagenes/leche.jpg' },
            { palabra: 'Ocho', imagen: 'imagenes/ocho.jpg' }
        ],
        intermedio: ['Chocolate', 'Mochila', 'Cuchara'],
        dificil: ['Chimichurri', 'Rechoncho', 'Chicharrón']
    },
    'Q': {
        facil: [
            { palabra: 'Queso', imagen: 'imagenes/queso.jpg' }
        ],
        intermedio: ['Quince', 'Química', 'Paquete'],
        dificil: ['Quirófano', 'Esquizofrénico', 'Aquiescencia']
    },
    'Ñ': {
        facil: [
            { palabra: 'Ñu', imagen: 'imagenes/ñu.jpg' },
            { palabra: 'Piña', imagen: 'imagenes/piña.jpg' }
        ],
        intermedio: ['Montaña', 'Araña', 'Pañuelo'],
        dificil: ['Añoranza', 'Engañar', 'Compañía']
    }
};

const levelEmojis = {
    facil: '😊',
    intermedio: '🤔',
    dificil: '🤯'
};

// =============================================================
// ===== FIN DE LA NUEVA ESTRUCTURA DE DATOS =====
// =============================================================

const niveles = ['facil', 'intermedio', 'dificil'];
let nivelActual = 0;
let indicePalabra = 0;

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ----- CAMBIO IMPORTANTE -----
// Seleccionamos el grupo de palabras correcto basado en la letra de la URL
const letra = getQueryParam('letra')?.toUpperCase() || 'A';
const palabrasPorNivel = vocabularioCompleto[letra] || vocabularioCompleto['A'];
// Si la letra no existe, usamos la 'A' por defecto.

function mostrarPalabra() {
    const nivel = niveles[nivelActual];
    const lista = palabrasPorNivel[nivel];

    if (!lista || lista.length === 0) {
        avanzarPalabra(); // Si un nivel no tiene palabras, lo salta.
        return;
    }

    const itemActual = lista[indicePalabra];
    let palabra, imagen;

    if (typeof itemActual === 'object' && itemActual !== null) {
        palabra = itemActual.palabra;
        imagen = itemActual.imagen;
    } else {
        palabra = itemActual;
        imagen = null;
    }

    palabraElemento.textContent = palabra;

    if (imagen) {
        palabraImagen.src = imagen;
        palabraImagen.alt = `Imagen de ${palabra}`;
        palabraImagen.style.display = 'block';
    } else {
        palabraImagen.style.display = 'none';
    }

    nivelTitulo.textContent = `Nivel ${nivel.charAt(0).toUpperCase() + nivel.slice(1)}`;
    levelEmoji.textContent = levelEmojis[nivel];
}

function avanzarPalabra() {
    const nivel = niveles[nivelActual];
    const lista = palabrasPorNivel[nivel] || [];

    indicePalabra++;
    if (indicePalabra < lista.length) {
        mostrarPalabra();
    } else {
        nivelActual++;
        indicePalabra = 0;
        if (nivelActual < niveles.length) {
            mostrarPalabra();
        } else {
            palabraElemento.textContent = "🎉 ¡Has completado todo!";
            palabraImagen.style.display = 'none';
            nivelTitulo.textContent = "¡Felicidades!";
            levelEmoji.textContent = "🏆";
        }
    }
}

// Función mejorada para limpiar texto
function normalizeText(text) {
    return text
        .toLowerCase() // 1. Pone todo en minúsculas
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // 2. Quita acentos
        .replace(/[.,!?;:()"]/g, "") // 3. QUITA SIGNOS DE PUNTUACIÓN (la clave del arreglo)
        .trim(); // 4. Quita espacios al inicio y al final
}

function guardarResultado(palabra, letra, resultado) {
    const fecha = new Date().toISOString();
    addDoc(collection(db, "practicas"), {
        alumno, palabra, letra, resultado, fecha
    }).catch(error => console.error("Error guardando resultado:", error));
}

function playFeedbackVideo(videoSrc, onEndedCallback) {
  feedbackVideo.src = videoSrc;
  feedbackOverlay.classList.add('show');
  feedbackVideo.play();

  // Escuchamos el evento 'ended' que se dispara cuando el video termina
  feedbackVideo.onended = () => {
    feedbackOverlay.classList.remove('show'); // Ocultamos el video
    if (onEndedCallback) {
      onEndedCallback(); // Ejecutamos la acción que queramos al final (como avanzar de palabra)
    }
  };
}

function iniciarReconocimiento() {
    if (!SpeechRecognition) {
        alert("Tu navegador no soporta reconocimiento de voz.");
        return;
    }
    const palabra = palabraElemento.textContent;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    listenMessage.style.display = 'block';
    message.textContent = "";
    recognition.start();

    recognition.onresult = (event) => {
        const transcriptOriginal = event.results[0][0].transcript.trim();
        const dicho = normalizeText(transcriptOriginal);
        const palabraCorrecta = normalizeText(palabra);

        listenMessage.style.display = 'none';

        if (dicho === palabraCorrecta) {
            // SI ES CORRECTO
            message.textContent = `✅ ¡Correcto!`;
            guardarResultado(palabra, letra, "correcto");
            // Reproducimos el video de confeti y, CUANDO TERMINE, avanzamos de palabra
            playFeedbackVideo('video/Video_confeti_transparente.webm', () => {
                avanzarPalabra();
                message.textContent = "";
            });
        } else {
            // SI ES INCORRECTO
            message.textContent = `❌ Intenta de nuevo. Dijiste: "${transcriptOriginal}"`;
            guardarResultado(palabra, letra, "incorrecto");
            // Reproducimos el video de caritas tristes
            playFeedbackVideo('video/video_lluvia_transparente.webm');
        }
    };

    recognition.onerror = (event) => {
        listenMessage.style.display = 'none';
        message.textContent = `⚠️ Error de micrófono. Asegúrate de darle permiso.`;
    };
    recognition.onend = () => {
        listenMessage.style.display = 'none';
    };
}

palabraCard.addEventListener('click', () => {
    const palabra = palabraElemento.textContent;
    const utterance = new SpeechSynthesisUtterance(palabra);
    utterance.lang = 'es-ES';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setTimeout(iniciarReconocimiento, 500);
});

// Inicialización
if (!letra || !vocabularioCompleto[letra]) {
    mostrarPalabra();
} else {
    mostrarPalabra();
}
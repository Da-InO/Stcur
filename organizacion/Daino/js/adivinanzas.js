// Lista de adivinanzas
const adivinanzas = [
    {
        texto: "Tengo agujas pero no pincho, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/almohada.png", correct: false, alt: "almohada" },
            { src: "imagenes/Adivinanzas/reloj.png", correct: true, alt: "reloj" },
            { src: "imagenes/Adivinanzas/teclado.png", correct: false, alt: "teclado" }
        ]
    },
    {
        texto: "Es una casa con muchas ventanas, ¿qué es?",
        respuestas: [
            { src: "imagenes/Adivinanzas/ventilador.png", correct: false, alt: "ventilador" },
            { src: "imagenes/Adivinanzas/television.png", correct: true, alt: "televisión" },
            { src: "imagenes/Adivinanzas/nevera.png", correct: false, alt: "nevera" }
        ]
    },
    {
        texto: "Cae pero nunca se rompe, ¿qué es?",
        respuestas: [
            { src: "imagenes/Adivinanzas/nieve.png", correct: true, alt: "nieve" },
            { src: "imagenes/Adivinanzas/platano.png", correct: true, alt: "platano" },
            { src: "imagenes/Adivinanzas/piedra.png", correct: false, alt: "piedra" }
        ]
    },
    {
        texto: "Es redondo y brilla en el cielo, ¿qué es?",
        respuestas: [
            { src: "imagenes/Adivinanzas/luna.png", correct: false, alt: "luna" },
            { src: "imagenes/Adivinanzas/sol.png", correct: true, alt: "sol" },
            { src: "imagenes/Adivinanzas/estrella.png", correct: false, alt: "estrella" }
        ]
    },
    {
        texto: "No es un coche, pero tiene ruedas. ¿Qué es?",
        respuestas: [
            { src: "imagenes/Adivinanzas/bicicleta.png", correct: true, alt: "bicicleta" },
            { src: "imagenes/Adivinanzas/pelota.png", correct: false, alt: "pelota" },
            { src: "imagenes/Adivinanzas/zapatillas.png", correct: false, alt: "zapatillas" }
        ]
    },
    {
        texto: "Me ves en el cielo cuando llueve, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/arcoiris.png", correct: true, alt: "arcoiris" },
            { src: "imagenes/Adivinanzas/sol.png", correct: false, alt: "sol" },
            { src: "imagenes/Adivinanzas/avion.png", correct: true, alt: "avion" },
            //
        ]
    },
    {
        texto: "Me como con pan, soy muy sabroso. ¿Quién soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/queso.png", correct: true, alt: "queso" },
            { src: "imagenes/Adivinanzas/jamon.png", correct: false, alt: "jamon" },
            { src: "imagenes/Adivinanzas/ensalada.png", correct: false, alt: "ensalada" }
        ]
    },
    {
        texto: "No soy animal, pero hago mucho ruido. ¿Quién soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/coche.png", correct: true, alt: "coche" },
            { src: "imagenes/Adivinanzas/perro.png", correct: false, alt: "perro" },
            { src: "imagenes/Adivinanzas/juguetes.png", correct: false, alt: "juguetes" },
        ]
    },
    {
        texto: "Tengo un cuerpo largo y puedo volar, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/avion.png", correct: true, alt: "avion" },
            { src: "imagenes/Adivinanzas/corredor.png", correct: false, alt: "corredor" },
            { src: "imagenes/Adivinanzas/bote.png", correct: false, alt: "bote" }
        ]
    },
    {
        texto: "Me encuentro dentro de una caja, pero no soy una sorpresa, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/computadora.png", correct: true, alt: "computadora" },
            { src: "imagenes/Adivinanzas/campana.png", correct: false, alt: "campana" },
            { src: "imagenes/Adivinanzas/bocadillos.png", correct: false, alt: "bocadillos" }
        ]
    },
    {
        texto: "Soy una fruta amarilla, pero no soy limón, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/mango.png", correct: false, alt: "mango" },
            { src: "imagenes/Adivinanzas/platano.png", correct: true, alt: "platano" },
            { src: "imagenes/Adivinanzas/pera.png", correct: false, alt: "pera" }
        ]
    },
    {
        texto: "Vivo en el mar, pero no soy pez, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/ballena.png", correct: true, alt: "ballena" },
            { src: "imagenes/Adivinanzas/nube.png", correct: false, alt: "nube" },
            //
            { src: "imagenes/Adivinanzas/estrella-mar.png", correct: false, alt: "estrella mar" }
        ]
    },
    {
        texto: "Cuanto más quito, más grande me hago, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/agujero.png", correct: true, alt: "agujero" },
            { src: "imagenes/Adivinanzas/montaña.png", correct: false, alt: "montaña" },
            { src: "imagenes/Adivinanzas/cuaderno.png", correct: false, alt: "cuaderno" }
        ]
    },
    {
        texto: "No tiene boca pero siempre come, ¿qué es?",
        respuestas: [
            { src: "imagenes/Adivinanzas/fuego.png", correct: true, alt: "fuego" },
            { src: "imagenes/Adivinanzas/animal.png", correct: false, alt: "animal" },
            { src: "imagenes/Adivinanzas/planta.png", correct: false, alt: "planta" }
        ]
    },
    {
        texto: "Aunque tiene dientes, no puede morder. ¿Qué es?",
        respuestas: [
            { src: "imagenes/Adivinanzas/peine.png", correct: true, alt: "peine" },
            { src: "imagenes/Adivinanzas/rio.png", correct: false, alt: "rio" },
            { src: "imagenes/Adivinanzas/relampago.png", correct: false, alt: "relampago" }
        ]
    },
    {
        texto: "Soy invisible pero todo lo cubro, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/viento.png", correct: true, alt: "viento" },
            { src: "imagenes/Adivinanzas/delfin.png", correct: false, alt: "delfin" },
            { src: "imagenes/Adivinanzas/luz.png", correct: false, alt: "luz" }
        ]
    }
];


let currentQuestionIndex = 0;

// Función para cargar la adivinanza actual
function loadAdivinanza() {
    const adivinanza = adivinanzas[currentQuestionIndex];
    document.getElementById("adivinanza-texto").textContent = adivinanza.texto;

    // Seleccionar las imágenes de respuestas específicas por clase
    const respuesta1 = document.querySelector(".respuesta1");
    const respuesta2 = document.querySelector(".respuesta2");
    const respuesta3 = document.querySelector(".respuesta3");

    // Actualizar las imágenes de acuerdo con la adivinanza
    respuesta1.src = adivinanza.respuestas[0].src;
    respuesta1.alt = adivinanza.respuestas[0].alt;
    respuesta1.setAttribute("data-correct", adivinanza.respuestas[0].correct);

    respuesta2.src = adivinanza.respuestas[1].src;
    respuesta2.alt = adivinanza.respuestas[1].alt;
    respuesta2.setAttribute("data-correct", adivinanza.respuestas[1].correct);

    respuesta3.src = adivinanza.respuestas[2].src;
    respuesta3.alt = adivinanza.respuestas[2].alt;
    respuesta3.setAttribute("data-correct", adivinanza.respuestas[2].correct);
}

//Función para mostrar el resultado
function showResult(isCorrect) {
    const resultado = document.getElementById("resultado");
    const resultadoTexto = document.getElementById("resultado-texto");

    resultado.style.display = "flex"; 
    if (isCorrect) {
        resultadoTexto.textContent = "✅¡Correcto!";
    } else {
        resultadoTexto.textContent = "❌¡Intenta de nuevo!";
    }

    setTimeout(() => {
        resultado.style.display = "none"; 

        if (isCorrect) {  // Solo avanzar si la respuesta es correcta
            currentQuestionIndex++;
            if (currentQuestionIndex < adivinanzas.length) {
                loadAdivinanza(); // Cargar la siguiente adivinanza
            } else {
                alert("¡Felicidades! Has completado todas las adivinanzas.");
            }
        }
    }, 2000);
}
// Función para manejar la selección de respuestas
function checkAnswer(e) {
    const isCorrect = e.target.getAttribute("data-correct") === "true";
    showResult(isCorrect);
}

// Asignar el evento de clic a las imágenes de respuesta (por cada clase específica)
document.querySelector(".respuesta1").addEventListener("click", checkAnswer);
document.querySelector(".respuesta2").addEventListener("click", checkAnswer);
document.querySelector(".respuesta3").addEventListener("click", checkAnswer);

// Cargar la primera adivinanza
loadAdivinanza();


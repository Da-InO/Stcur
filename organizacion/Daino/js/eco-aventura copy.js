document.addEventListener("DOMContentLoaded", () => {
    const startVoiceButton = document.getElementById("start-voice");
    const currentContent = document.getElementById("current-content");
    const currentLevel = document.getElementById("current-level");
    const feedback = document.getElementById("feedback");
    const progressBar = document.getElementById("progress-bar");
    const wordImage = document.getElementById("word-image");

    const content = [
        // Nivel inicial
        { text: "Mamá", level: "Inicial", image: "imagenes/madre.png" },
        { text: "Papá", level: "Inicial", image: "imagenes/padre.png" },
        { text: "Sol", level: "Inicial", image: "imagenes/sol.png" },
        { text: "Luna", level: "Inicial", image: "imagenes/luna.png" },
        { text: "Taza", level: "Inicial", image: "imagenes/taza.png" },
        { text: "Casa", level: "Inicial", image: "imagenes/casa.png" },
        // Nivel intermedio
        { text: "Elefante", level: "Intermedio", image: "imagenes/elefante.png" },
        { text: "Montaña", level: "Intermedio", image: "imagenes/montaña.png" },
        { text: "Computadora", level: "Intermedio", image: "imagenes/computadora.png" },
        { text: "Murciélago", level: "Intermedio", image: "imagenes/murcielago.png" },
        // Nivel avanzado
        { text: "La rana salta y canta", level: "Avanzado", image: "imagenes/rana.png" },
        { text: "El gato en el zapato", level: "Avanzado", image: "imagenes/gato.png" },
        { text: "Tres tristes tigres comen trigo", level: "Avanzado", image: "imagenes/tigres.png" },
        { text: "El perro de San Roque no tiene rabo", level: "Avanzado", image: "imagenes/perro.png" }
    ];

    let currentIndex = 0;

    // Verifica si el navegador soporta la API de reconocimiento de voz
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        feedback.textContent = "Tu navegador no soporta el reconocimiento de voz.";
        startVoiceButton.disabled = true;
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.interimResults = false;

    // Función para normalizar texto (eliminar tildes, convertir a minúsculas, etc.)
    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .normalize("NFD") // Descompone caracteres con tildes
            .replace(/[\u0300-\u036f]/g, "") // Elimina marcas diacríticas
            .trim(); // Elimina espacios adicionales
    };

    // Función para iniciar el reconocimiento de voz
    startVoiceButton.addEventListener("click", () => {
        startVoiceButton.style.display = "none"; // Ocultar el botón al iniciar
        if (currentIndex >= content.length) {
            feedback.textContent = "¡Felicidades! Has completado todos los niveles.";
            return;
        }

        // Mostrar elementos ocultos
        document.getElementById("current-level").style.display = "block";
        document.getElementById("feedback").style.display = "block";
        document.getElementById("progress-container").style.display = "block";
        document.getElementById("word-image").style.display = "block"; // Mostrar la imagen

        const currentItem = content[currentIndex];
        currentContent.textContent = currentItem.text;
        currentLevel.textContent = `Nivel: ${currentItem.level}`;
        wordImage.src = currentItem.image;
        wordImage.alt = currentItem.text;
        feedback.textContent = "Escuchando..."; // Feedback más grande
        recognition.start();
    });

    // Manejar el resultado del reconocimiento de voz
    recognition.addEventListener("result", (event) => {
        const transcript = normalizeText(event.results[0][0].transcript);
        const expected = normalizeText(content[currentIndex].text);

        if (transcript === expected) {
            feedback.textContent = "¡Correcto! Avanzando al siguiente contenido.";
            currentIndex++;
            updateProgressBar();

            if (currentIndex < content.length) {
                const nextItem = content[currentIndex];
                currentContent.textContent = nextItem.text;
                currentLevel.textContent = `Nivel: ${nextItem.level}`;
                wordImage.src = nextItem.image;
                wordImage.alt = nextItem.text;
                recognition.start(); // Continuar escuchando automáticamente
            } else {
                currentContent.textContent = "¡Has completado todos los niveles!";
                currentLevel.textContent = "Nivel: Completado";
                wordImage.style.display = "none";
                feedback.textContent = "¡Felicidades! Has completado todo.";
            }
        } else {
            feedback.textContent = `Incorrecto. Escuché: "${transcript}". Intenta de nuevo.`;
            recognition.start(); // Reintentar automáticamente
        }
    });

    recognition.addEventListener("error", (event) => {
        feedback.textContent = `Error: ${event.error}`;
    });

    recognition.addEventListener("end", () => {
        if (currentIndex < content.length) {
            recognition.start(); // Continuar escuchando automáticamente
        }
    });

    // Función para actualizar la barra de progreso
    const updateProgressBar = () => {
        // Calcular el porcentaje de progreso basado en el índice actual
        const progressPercentage = (currentIndex / content.length) * 100;

        // Actualizamos el ancho de la barra de progreso
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = `${progressPercentage}%`; // Establece el ancho de la barra de progreso

        // Mostramos el porcentaje dentro de la barra
        progressBar.textContent = `${Math.round(progressPercentage)}%`; // Muestra el porcentaje dentro de la barra

        // Asegurarnos de que el texto esté centrado dentro de la barra de progreso
        progressBar.style.display = 'flex'; // Usar flexbox para centrar el texto
        progressBar.style.justifyContent = 'center'; // Centrar horizontalmente
        progressBar.style.alignItems = 'center'; // Centrar verticalmente
    };

    // Llamar a la función cuando se actualice el progreso
    updateProgressBar();
});
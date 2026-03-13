// tongue-twisters.js

// Definición de los trabalenguas
const tongueTwisters = [
    {
        id: "loro",
        text: "amigos y enemigos",
        image: "imagenes/loro.png",
        video: "video/Loro.mp4",
        background: "url('../imagenes/loro.png')"
    },
    {
        id: "amor",
        text: "amigos y enemigos",
        image: "imagenes/amor.png",
        video: "video/amor.mp4",
        background: "url('../imagenes/amor.png')"
    }
];

// Variables globales
let currentTwisterIndex = 0;
let recognition;
let isListening = false;
let finalTranscript = '';
let timeout;
let allCompleted = false; // Nueva variable para controlar si todo está completado
const SPEECH_TIMEOUT = 3000;

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar reconocimiento de voz
    initSpeechRecognition();
    
    // Configurar eventos para las imágenes de inicio
    const startVideoImage = document.getElementById("start-video");
    const startVideoImage2 = document.getElementById("start-video2");
    const videoPlayer = document.getElementById("video-player");
    const videoPlayer2 = document.getElementById("video-player2");
    const speechButton = document.getElementById("speech-button");
    const speechStatus = document.getElementById("speech-status");
    const currentText = document.getElementById("current-text");
    const progressBar = document.getElementById("progress-bar");

    // Mostrar el primer trabalenguas
    showCurrentTwister();

    // Manejar clic en la imagen para iniciar el video
    startVideoImage.addEventListener("click", () => {
        startVideoImage.style.display = "none";
        videoPlayer.style.display = "block";
        videoPlayer.play().catch(error => {
            console.error("Error al reproducir el video:", error);
        });
    });

    startVideoImage2.addEventListener("click", () => {
        startVideoImage2.style.display = "none";
        videoPlayer2.style.display = "block";
        videoPlayer2.play().catch(error => {
            console.error("Error al reproducir el video:", error);
        });
    });

    // Manejar clic en el botón de reconocimiento de voz
    speechButton.addEventListener("click", toggleSpeechRecognition);

    // Actualizar barra de progreso
    function updateProgressBar() {
        const progress = ((currentTwisterIndex) / tongueTwisters.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Mostrar el trabalenguas actual
    function showCurrentTwister() {
        const current = tongueTwisters[currentTwisterIndex];
        currentText.textContent = current.text;
        updateProgressBar();
    }

    // Cambiar el fondo de la página
    function changeBackground() {
        const current = tongueTwisters[currentTwisterIndex];
        document.body.style.backgroundImage = current.background;
    }

    // Ocultar elementos del trabalenguas anterior
    function hidePreviousElements() {
        if (currentTwisterIndex === 1) {
            document.getElementById("stories-container").style.display = "none";
            document.getElementById("video-player").style.display = "none";
            document.getElementById("video-player").pause();
            document.getElementById("stories-container2").style.display = "block";
        }
    }

    // Detener completamente el reconocimiento de voz
    function stopSpeechRecognition() {
        if (recognition && isListening) {
            recognition.stop();
            isListening = false;
        }
        speechButton.style.display = "none";
        allCompleted = true;
    }

    // Inicializar reconocimiento de voz
    function initSpeechRecognition() {
        // Verificar si el navegador soporta reconocimiento de voz
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            speechStatus.textContent = "Tu navegador no soporta reconocimiento de voz. Prueba con Chrome.";
            speechStatus.className = "speech-status error";
            speechStatus.style.display = "block";
            speechButton.disabled = true;
            return;
        }

        // Crear instancia de reconocimiento de voz
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        // Configurar reconocimiento continuo para capturar pausas
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'es-ES';

        // Manejar resultados provisionales
        recognition.onresult = function(event) {
            // Si ya completamos todo, ignorar cualquier reconocimiento
            if (allCompleted) {
                recognition.stop();
                return;
            }
            
            clearTimeout(timeout);
            
            let interimTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }
            
            // Mostrar texto provisional
            const displayText = finalTranscript + interimTranscript;
            speechStatus.textContent = `Escuchando: "${displayText}"`;
            
            // Configurar timeout para procesar después de una pausa
            timeout = setTimeout(() => {
                processFinalTranscript();
            }, SPEECH_TIMEOUT);
        };

        // Manejar errores
        recognition.onerror = function(event) {
            console.error("Error en reconocimiento de voz:", event.error);
            speechStatus.textContent = "Error: " + getErrorMessage(event.error);
            speechStatus.className = "speech-status error";
            speechButton.textContent = "Comenzar a hablar";
            isListening = false;
            finalTranscript = '';
        };

        // Cuando termina el reconocimiento
        recognition.onend = function() {
            isListening = false;
            if (!allCompleted && speechButton.textContent !== "Intentar de nuevo") {
                speechButton.textContent = "Comenzar a hablar";
            }
        };
    }

    // Procesar el texto final después de una pausa
    function processFinalTranscript() {
        if (finalTranscript.trim() === '' || allCompleted) return;
        
        speechStatus.textContent = "Procesando...";
        speechStatus.className = "speech-status processing";
        
        const currentTwister = tongueTwisters[currentTwisterIndex].text.toLowerCase();
        const spokenText = finalTranscript.toLowerCase().trim();
        
        // Comparar lo dicho con el trabalenguas
        setTimeout(() => {
            if (compareTexts(spokenText, currentTwister)) {
                // Éxito: pronunciación correcta
                speechStatus.textContent = "¡Correcto! Has dicho el trabalenguas perfectamente.";
                speechStatus.className = "speech-status success";
                
                // Avanzar al siguiente trabalenguas después de un breve delay
                setTimeout(() => {
                    currentTwisterIndex++;
                    if (currentTwisterIndex < tongueTwisters.length) {
                        // Cambiar el fondo
                        changeBackground();
                        
                        // Ocultar elementos anteriores y mostrar nuevos
                        hidePreviousElements();
                        
                        // Mostrar el nuevo trabalenguas
                        showCurrentTwister();
                        
                        speechStatus.style.display = "none";
                        speechButton.textContent = "Comenzar a hablar";
                        finalTranscript = '';
                        
                    } else {
                        // Todos los trabalenguas completados
                        speechStatus.textContent = "¡Felicidades! Has completado todos los trabalenguas.";
                        speechStatus.className = "speech-status success";
                        
                        // Detener el reconocimiento de voz completamente
                        stopSpeechRecognition();
                        
                        currentText.textContent = "¡Excelente trabajo!";
                        
                        // Ocultar también el segundo contenedor de imágenes
                        document.getElementById("stories-container2").style.display = "none";
                        document.getElementById("video-player2").style.display = "none";
                        document.getElementById("video-player2").pause();
                    }
                }, 2000);
            } else {
                // Error: pronunciación incorrecta
                speechStatus.textContent = "No coincide. Intenta de nuevo.";
                speechStatus.className = "speech-status error";
                speechButton.textContent = "Intentar de nuevo";
                finalTranscript = '';
            }
        }, 1000);
    }

    // Alternar reconocimiento de voz
    function toggleSpeechRecognition() {
        // Si ya completamos todo, no hacer nada
        if (allCompleted) return;
        
        if (isListening) {
            recognition.stop();
            isListening = false;
            speechButton.textContent = "Comenzar a hablar";
            finalTranscript = '';
        } else {
            speechStatus.textContent = "Escuchando... Di el trabalenguas completo:";
            speechStatus.className = "speech-status listening";
            speechStatus.style.display = "block";
            recognition.start();
            isListening = true;
            speechButton.textContent = "Detener";
            finalTranscript = '';
        }
    }

    // Comparar textos (con tolerancia a errores menores)
    function compareTexts(spoken, expected) {
        // Normalizar textos: eliminar acentos, puntuación y convertir a minúsculas
        const normalizeText = (text) => {
            return text
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
                .toLowerCase()
                .trim();
        };
        
        const spokenNormalized = normalizeText(spoken);
        const expectedNormalized = normalizeText(expected);
        
        // Dividir en palabras
        const spokenWords = spokenNormalized.split(/\s+/).filter(word => word.length > 0);
        const expectedWords = expectedNormalized.split(/\s+/).filter(word => word.length > 0);
        
        // Si la cantidad de palabras es muy diferente, probablemente incorrecto
        if (Math.abs(spokenWords.length - expectedWords.length) > 3) {
            return false;
        }
        
        // Calcular similitud (algoritmo simple)
        let matches = 0;
        for (let i = 0; i < Math.min(spokenWords.length, expectedWords.length); i++) {
            if (i < spokenWords.length && i < expectedWords.length) {
                // Considerar coincidencia si las palabras son similares
                if (spokenWords[i] === expectedWords[i] || 
                    (spokenWords[i].length > 2 && expectedWords[i].length > 2 && 
                     (spokenWords[i].includes(expectedWords[i].substring(0, 3)) ||
                      expectedWords[i].includes(spokenWords[i].substring(0, 3)) ||
                      calculateSimilarity(spokenWords[i], expectedWords[i]) > 0.7))) {
                    matches++;
                }
            }
        }
        
        // Calcular porcentaje de coincidencia
        const similarity = matches / expectedWords.length;
        
        // Considerar correcto si hay al menos 75% de coincidencia
        return similarity >= 0.75;
    }

    // Calcular similitud entre dos palabras
    function calculateSimilarity(word1, word2) {
        const longer = word1.length > word2.length ? word1 : word2;
        const shorter = word1.length > word2.length ? word2 : word1;
        
        if (longer.length === 0) return 1.0;
        
        return (longer.length - editDistance(longer, shorter)) / parseFloat(longer.length);
    }

    // Calcular distancia de edición (Levenshtein)
    function editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
        
        const costs = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0) {
                    costs[j] = j;
                } else if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    }
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
            if (i > 0) costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    // Obtener mensaje de error legible
    function getErrorMessage(error) {
        switch(error) {
            case 'not-allowed':
            case 'permission-denied':
                return 'Permiso de micrófono denegado. Por favor, permite el acceso al micrófono.';
            case 'audio-capture':
                return 'No se pudo capturar audio. Verifica tu micrófono.';
            case 'network':
                return 'Error de red. Verifica tu conexión a Internet.';
            default:
                return 'Error desconocido: ' + error;
        }
    }
});
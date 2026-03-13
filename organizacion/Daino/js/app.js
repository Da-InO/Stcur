import { showBackButton, setupOptions } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    const levelButtons = document.querySelectorAll(".level-button");
    const levelSection = document.getElementById("level-section");
    const voiceSection = document.getElementById("voice-section");
    const selectedLevelTitle = document.getElementById("selected-level-title");
    const videoPlayer = document.getElementById("video-player");
    const optionsContainer = document.getElementById("options-container");
    const backToMenuButton = document.getElementById("back-to-menu");

    videoPlayer.style.display = "none";
    optionsContainer.style.display = "none";
    backToMenuButton.style.display = "none";

    const pausePoints = [
        { time: 20, correctWord: "enorme", incorrectWord: "pequeña" },
        { time: 42, correctWord: "raíz", incorrectWord: "hoja" },
        { time: 70, correctWord: "lago", incorrectWord: "río" },
        { time: 97, correctWord: "lombrices", incorrectWord: "mariposas" },
        { time: 137, correctWord: "dinosaurio", incorrectWord: "elefante" },
        { time: 161, correctWord: "gruta", incorrectWord: "cueva" },
        { time: 168, correctWord: "hormiga", incorrectWord: "abeja" },
        { time: 234, correctWord: "fiesta", incorrectWord: "trabajo" }
    ];

    let currentPauseIndex = 0;

    levelButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const selectedLevelId = parseInt(event.target.dataset.level, 10);

            if (selectedLevelId === 3) {
                levelSection.style.display = "none";
                voiceSection.style.display = "block";
                videoPlayer.style.display = "block";
                optionsContainer.style.display = "none";

                selectedLevelTitle.textContent = "Cuentos que Hablan";
                videoPlayer.src = "video/Muchos túneles y un problema.mp4";
                videoPlayer.currentTime = 0;
                videoPlayer.play();

                showBackButton(backToMenuButton, voiceSection, levelSection);
            }
        });
    });

    videoPlayer.addEventListener("timeupdate", () => {
        if (currentPauseIndex < pausePoints.length) {
            const pausePoint = pausePoints[currentPauseIndex];
            if (Math.floor(videoPlayer.currentTime) === pausePoint.time) {
                videoPlayer.pause();
                optionsContainer.style.display = "block";

                setupOptions(videoPlayer, optionsContainer, pausePoint, () => {
                    currentPauseIndex++;
                    videoPlayer.play();
                });
            }
        }
    });

    const levelImages = document.querySelectorAll(".level-image");
    const leftArrow = document.getElementById("left-arrow");
    const rightArrow = document.getElementById("right-arrow");
    let currentImageIndex = 0;

    function updateCarousel() {
        levelImages.forEach((image, index) => {
            image.style.transform = `translateX(${(index - currentImageIndex) * 100}%)`;
        });
    }

    leftArrow.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + levelImages.length) % levelImages.length;
        updateCarousel();
    });

    rightArrow.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % levelImages.length;
        updateCarousel();
    });

    // Inicializar el carrusel
    updateCarousel();
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.game-button');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const mainTitle = document.querySelector('h1'); // Seleccionar el título principal
    let currentIndex = 0;

    const titles = [
        "Eco Aventura",
        "Karaoke Mágico",
        "Cuentos que Hablan"
    ];

    function showButton(index) {
        buttons.forEach(button => button.classList.remove('active'));
        buttons[index].classList.add('active');
        // Actualizar el título
        mainTitle.textContent = titles[index];
    }

    // Inicializar
    showButton(currentIndex);

    prevArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        showButton(currentIndex);
    });

    nextArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % buttons.length;
        showButton(currentIndex);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Audio para transiciones
    const transitionSound = new Audio('audio/transition.mp3');
    
    // Temporizador para inactividad
    let inactivityTimer;
    let isMessageShowing = false;
    
    // Crear mensaje de inactividad
    const inactivityMessage = document.createElement('div');
    inactivityMessage.className = 'inactivity-message';
    inactivityMessage.textContent = '¡Toca para continuar!';
    document.querySelector('.single-button-container').appendChild(inactivityMessage);

    // Función para mostrar mensaje de inactividad
    function showInactivityMessage() {
        if (!isMessageShowing) {
            inactivityMessage.classList.add('show');
            isMessageShowing = true;
        }
    }

    // Función para ocultar mensaje de inactividad
    function hideInactivityMessage() {
        if (isMessageShowing) {
            inactivityMessage.classList.remove('show');
            isMessageShowing = false;
        }
    }

    // Reiniciar temporizador de inactividad
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        hideInactivityMessage();
        inactivityTimer = setTimeout(showInactivityMessage, 5000);
    }

    // Event listeners para detectar actividad
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);

    // Iniciar temporizador
    resetInactivityTimer();

    // Modificar la función showButton existente
    function showButton(index) {
        buttons.forEach(button => button.classList.remove('active'));
        buttons[index].classList.add('active');
        mainTitle.textContent = titles[index];
        
        // Reproducir sonido al cambiar de sección
        transitionSound.currentTime = 0;
        transitionSound.play().catch(error => {
            console.log('Auto-play prevented:', error);
        });
    }

    // Event listener para botones de navegación
    prevArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        showButton(currentIndex);
    });

    nextArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % buttons.length;
        showButton(currentIndex);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.volume = 0.5; // Ajustamos el volumen al 50%

    // Función para manejar la reproducción del sonido de fondo
    function handleBackgroundMusic() {
        // Intentar reproducir el audio inmediatamente
        backgroundMusic.play().catch(error => {
            console.log('Autoplay bloqueado:', error);
            
            // Si el autoplay es bloqueado, agregar un evento de clic global
            document.addEventListener('click', () => {
                if (backgroundMusic.paused) {
                    backgroundMusic.play().catch(error => {
                        console.log('Error al intentar reproducir el audio tras clic:', error);
                    });
                }
            }, { once: true }); // Aseguramos que el clic solo active la música una vez
        });


        // Si se navega fuera de la página, pausar la música
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                backgroundMusic.pause();
            });
        });
    }
    handleBackgroundMusic();
});


function showButton(index) {
    buttons.forEach(button => button.classList.remove('active'));
    buttons[index].classList.add('active');
    
    // Animar el título
    mainTitle.textContent = titles[index];
    mainTitle.classList.remove('animate');
    void mainTitle.offsetWidth; // Forzar reflow
    mainTitle.classList.add('animate');
    
    // Reproducir sonido de transición
    const transitionSound = new Audio('audio/transition.mp3');
    transitionSound.volume = 1.0; // Volumen al máximo
    transitionSound.currentTime = 0;
    
    // Asegurarnos de que el sonido se reproduzca completamente
    const playSound = async () => {
        try {
            await transitionSound.play();
        } catch (error) {
            console.log('Error playing transition sound:', error);
        }
    };
    
    playSound();
}

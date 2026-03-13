document.addEventListener("DOMContentLoaded", () => {
    // ---- 1. CONFIGURACIÓN DE LOS VIDEOS (CON PAUSEPOINTS INCLUIDOS) ----
    const videos = [
        {
            introSrc: "video/video_transparente.webm",
            mainSrc: "video/Raton.mp4", // Asegúrate de que el nombre sea "Rolo Ratón.mp4"
            vttSrc: "video/Raton.vtt",
            pausePoints: [
                { time: 18, phrases: ["Abre, cierra, abre, cierra, Da una palmadita"] },
                { time: 27, phrases: ["Abre, cierra, abre, cierra, Ponla en tu regazo"] },
                { time: 36, phrases: ["Grande y pequeño, Grande, pequeño, grande, pequeño"] },
                { time: 45, phrases: ["Grande, grande, grande, grande, pequeño, Grande, pequeño"] },
                { time: 49, phrases: ["grande, pequeño, Grande, grande, grande, grande, pequeño"] },
                { time: 57, phrases: ["Por favor. No, gracias, Por favor. No gracias"] },
                { time: 62, phrases: ["Por favor. No gracias, Por favor, por favor"] },
                { time: 67, phrases: ["No gracias, Por favor. No gracias. Por favor"] },
                { time: 72, phrases: ["No gracias, Por favor, por favor. No gracias"] },
                { time: 75, phrases: ["Rápido y lento, Rápido, lento, rápido, lento"] },
                { time: 84, phrases: ["Rápido, rápido, rápido, rápido, lento, lento, lento"] },
                { time: 95, phrases: ["Rápido, lento, rápido, lento, Rápido, rápido, rápido"] },
                { time: 103, phrases: ["rápido, lento, lento, lento, Fuerte y silencioso"] },
                { time: 108, phrases: ["Fuerte, silencioso, fuerte, silencioso, Fuerte, fuerte, fuerte"] },
                { time: 112, phrases: ["fuerte Shh... silencioso, Fuerte, silencioso, fuerte, silencioso"] },
                { time: 117, phrases: ["Fuerte, fuerte, fuerte, fuerte Shh... silencio, Me escondo"] },
                { time: 123, phrases: ["y aquí estoy, Me escondo, aquí estoy"] },
                { time: 125, phrases: ["Me escondo, aquí estoy, Me escondo, me escondo"] },
                { time: 130, phrases: ["aquí estoy, Me escondo, aquí estoy, Me escondo"] },
                { time: 134, phrases: ["aquí estoy, Me escondo, me escondo, aquí estoy"] }
            ]
        },
        {
            introSrc: "video/Amigoskaraoke.webm",
            mainSrc: "video/GraciasKaraoke.mp4",
            vttSrc: "video/GraciasKaraoke.vtt",
            pausePoints: [
                { time: 20, phrases: ["Doy gracias por las flores, También los árboles"] },
                { time: 25, phrases: ["Doy gracias por las aves, También las abejas"] },
                { time: 30, phrases: ["Doy gracias por los maestros También por mi familia"] },
                { time: 40, phrases: ["Doy gracias por mis amigos Y los que juegan conmigo"] },
                { time: 51, phrases: ["Doy gracias por los abrazos Doy gracias por lo que haces"] },
                { time: 70, phrases: ["Doy gracias por todo el amor Doy gracias que tú eres tú"] },
                { time: 75, phrases: ["Gracias, gracias, gracias, gracias Gracias, gracias, gracias"] },
                { time: 80, phrases: ["Doy gracias por las flores También los árboles"] },
                { time: 85, phrases: ["Doy gracias por las aves También las abejas"] },
                { time: 90, phrases: ["Doy gracias por los maestros También por mi familia"] },
                { time: 100, phrases: ["Doy gracias por mis amigos Y los que juegan conmigo"] },
                { time: 111, phrases: ["Doy gracias por los abrazos Doy gracias por lo que haces"] },
                { time: 118, phrases: ["Doy gracias por todo el amor Doy gracias que tú eres tú"] }
            ]
        }
    ];

    // ---- 2. LÓGICA DEL CARRUSEL ----
    const carouselContainer = document.getElementById('video-carousel-container');
    const carousel = document.getElementById('video-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentVideoIndex = 0;

    videos.forEach((videoData, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.dataset.index = index;
        const videoEl = document.createElement('video');
        videoEl.src = videoData.introSrc;
        videoEl.autoplay = true;
        videoEl.loop = true;
        videoEl.muted = true;
        videoEl.playsInline = true;
        slide.appendChild(videoEl);
        carousel.appendChild(slide);
    });

    const slides = document.querySelectorAll('.carousel-slide');

    function showVideo(index) {
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    }

    prevBtn.addEventListener('click', () => {
        currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
        showVideo(currentVideoIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        showVideo(currentVideoIndex);
    });

    // ---- 3. LÓGICA PARA INICIAR EL KARAOKE ----
    const karaokeVideo = document.getElementById("karaoke-video");
    const karaokeContent = document.getElementById("karaoke-content");
    const karaokePhrase = document.getElementById("karaoke-phrase");
    const karaokeFeedback = document.getElementById("karaoke-feedback");
    const retryButton = document.getElementById("retry-button");

    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            if (slide.classList.contains('active')) {
                const videoIndex = parseInt(slide.dataset.index, 10);
                startKaraoke(videos[videoIndex]);
            }
        });
    });

    function startKaraoke(videoData) {
        carouselContainer.style.display = "none";

        karaokeVideo.innerHTML = '';
        const source = document.createElement('source');
        source.src = videoData.mainSrc;
        source.type = 'video/mp4';
        karaokeVideo.appendChild(source);

        if (videoData.vttSrc) {
            const track = document.createElement('track');
            track.src = videoData.vttSrc;
            track.kind = 'subtitles';
            track.srclang = 'es';
            track.default = true;
            karaokeVideo.appendChild(track);
        }

        karaokeVideo.load();
        karaokeVideo.style.display = "block";
        karaokeContent.style.display = "block";
        karaokeVideo.muted = false;
        karaokeVideo.play();
        karaokeFeedback.textContent = "¡Canta cuando el video se detenga!";

        // AQUÍ ES DONDE SE JUNTAN: Pasamos los puntos de pausa de ESTE video a la lógica del karaoke
        setupKaraokeLogic(videoData.pausePoints);
    }

    // ---- 4. FUNCIÓN QUE HACE QUE LA MÚSICA SE DETENGA (Y LA LÓGICA DE VOZ) ----
    function setupKaraokeLogic(pausePoints) {
        let currentPauseIndex = 0;
        let currentPhraseIndex = 0;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            karaokeFeedback.textContent = "Tu navegador no soporta el reconocimiento de voz.";
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "es-ES";
        recognition.continuous = true;
        recognition.interimResults = false;

        const normalizeText = (text) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
        const displayPhrases = (phrases) => {
            karaokePhrase.innerHTML = phrases.map((phrase, index) => `<span class="karaoke-phrase" data-index="${index}">${phrase}</span>`).join(" ");
        };

        // El vigilante del tiempo del video
        karaokeVideo.ontimeupdate = () => {
            if (currentPauseIndex >= pausePoints.length) return;
            const pausePoint = pausePoints[currentPauseIndex];
            if (Math.abs(karaokeVideo.currentTime - pausePoint.time) < 0.5 && !karaokeVideo.paused) {
                karaokeVideo.pause();
                currentPhraseIndex = 0;
                displayPhrases(pausePoint.phrases);
                karaokeFeedback.textContent = "¡Tu turno! Repite la primera frase.";
                retryButton.style.display = "none";
                recognition.start();
            }
        };

        // Lógica del reconocimiento de voz
        // --- ESTA ES LA SECCIÓN CORREGIDA ---
        recognition.onresult = (event) => {
            // 1. Limpiamos lo que el niño dijo (esto ya lo hacías bien)
            const transcript = normalizeText(event.results[event.results.length - 1][0].transcript);

            // 2. Obtenemos TODAS las frases esperadas para esta pausa
            const phrasesToSay = pausePoints[currentPauseIndex].phrases;

            // 3. Comprobamos si lo que dijo el niño incluye CADA UNA de las frases esperadas
            let allSaidCorrectly = true;
            for (const phrase of phrasesToSay) {
                // Limpiamos cada frase esperada antes de compararla
                const cleanPhrase = normalizeText(phrase);
                if (!transcript.includes(cleanPhrase)) {
                    allSaidCorrectly = false;
                    break; // Si una frase falta, dejamos de comprobar
                }
            }

            if (allSaidCorrectly) {
                karaokeFeedback.textContent = "¡Excelente! Continuando...";
                currentPauseIndex++;
                recognition.stop();
                setTimeout(() => karaokeVideo.play(), 1000);
            } else {
                karaokeFeedback.textContent = `Escuché: "${event.results[event.results.length - 1][0].transcript}". Inténtalo de nuevo.`;
            }
        };

        recognition.onerror = (event) => {
            karaokeFeedback.textContent = `Error de micrófono: ${event.error}. Intenta de nuevo.`;
            retryButton.style.display = "block";
        };

        retryButton.addEventListener("click", () => {
            retryButton.style.display = "none";
            karaokeFeedback.textContent = "Escuchando...";
            recognition.start();
        });
    }

    // Inicializar el carrusel
    showVideo(currentVideoIndex);
});
import { setupOptions } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const startVideoImage = document.getElementById("start-video");
    const videoPlayer = document.getElementById("video-player");
    const optionsContainer = document.getElementById("options-container");

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

    // Manejar clic en la imagen para iniciar el video
    startVideoImage.addEventListener("click", () => {
        startVideoImage.style.display = "none"; // Ocultar la imagen
        videoPlayer.style.display = "block"; // Mostrar el video
        videoPlayer.play().catch(error => {
            console.error("Error al reproducir el video:", error);
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
});

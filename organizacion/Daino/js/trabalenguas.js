import { setupOptions } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const startVideoImage = document.getElementById("start-video");
    const videoPlayer = document.getElementById("video-player");
    const optionsContainer = document.getElementById("options-container");


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

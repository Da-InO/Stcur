// Mostrar la flecha de regreso
export function showBackButton(backButton, targetSection, menuSection) {
    backButton.style.display = "block";
    backButton.addEventListener("click", (event) => {
        event.preventDefault();
        targetSection.style.display = "none";
        menuSection.style.display = "block";
        backButton.style.display = "none";
    });
}

// Configurar opciones interactivas
export function setupOptions(videoPlayer, optionsContainer, pausePoint, onCorrect) {
    const correctButton = document.createElement("button");
    correctButton.textContent = pausePoint.correctWord;
    correctButton.classList.add("option-button");
    correctButton.dataset.correct = "true";

    const incorrectButton = document.createElement("button");
    incorrectButton.textContent = pausePoint.incorrectWord;
    incorrectButton.classList.add("option-button");
    incorrectButton.dataset.correct = "false";

    optionsContainer.innerHTML = "";
    optionsContainer.appendChild(correctButton);
    optionsContainer.appendChild(incorrectButton);

    [correctButton, incorrectButton].forEach(button => {
        button.addEventListener("click", (event) => {
            const isCorrect = event.target.dataset.correct === "true";
            if (isCorrect) {
                optionsContainer.style.display = "none";
                onCorrect();
            } else {
                alert("Respuesta incorrecta. Intenta de nuevo.");
            }
        });
    });
}

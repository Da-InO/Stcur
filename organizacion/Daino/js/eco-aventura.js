document.addEventListener('DOMContentLoaded', () => {

  const allLetters = [
    // Etapa 1
    'A', 'E', 'I', 'O', 'U',
    // Etapa 2
    'M', 'P', 'L', 'S', 'T',
    // Etapa 3
    'N', 'D', 'F',
    // Etapa 4
    'G', 'C', 'B', 'V', 'R',
    // Etapa 5
    'J', 'H', 'Q', 'Ñ', 'Y', 'Z', 'X', 'RR', 'CH'
  ];

  const letterImage = document.getElementById('letterImage');
  const btnLeft = document.getElementById('btnLeft');
  const btnRight = document.getElementById('btnRight');

  // ----- INICIO DEL CÓDIGO NUEVO -----
  // 1. Selecciona los nuevos elementos del buscador
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  // ----- FIN DEL CÓDIGO NUEVO -----

  let currentIndex = 0;

  function displayLetter() {
    const currentLetter = allLetters[currentIndex];

    letterImage.style.opacity = 0;
    setTimeout(() => {
      letterImage.src = `imagenes/Letras/Letra${currentLetter}.png`;
      letterImage.alt = `Letra ${currentLetter}`;
      letterImage.setAttribute('data-letter', currentLetter);
      letterImage.style.opacity = 1;
    }, 150);
  }

  btnLeft.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + allLetters.length) % allLetters.length;
    displayLetter();
  });

  btnRight.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % allLetters.length;
    displayLetter();
  });

  letterImage.addEventListener('click', () => {
    const letter = letterImage.getAttribute('data-letter');
    if (letter) {
      window.location.href = `vocabulario.html?letra=${letter}`;
    }
  });

  letterImage.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      letterImage.click();
    }
  });

  // ----- INICIO DEL CÓDIGO NUEVO -----
  // 2. Agrega el listener para el formulario de búsqueda
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita que la página se recargue

      // Obtiene la letra, la pone en mayúsculas y quita espacios
      const searchTerm = searchInput.value.toUpperCase().trim();

      if (!searchTerm) return; // Si está vacío, no hace nada

      // 3. Busca el ÍNDICE de la letra en tu array
      const letterIndex = allLetters.indexOf(searchTerm);

      // 4. Comprueba si la letra existe
      if (letterIndex > -1) {
        // Si se encontró, actualiza el carrusel
        currentIndex = letterIndex; // Actualiza el índice
        displayLetter(); // Muestra la letra
      } else {
        // Opcional: Avisa si no se encuentra
        alert(`La letra "${searchTerm}" no fue encontrada.`);
      }

      // 5. Limpia el buscador
      searchInput.value = '';
    });
  }
  // ----- FIN DEL CÓDIGO NUEVO -----


  displayLetter(); // Muestra la primera letra al cargar
});

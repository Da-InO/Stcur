document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.btn-pildora');

    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const color = boton.getAttribute('data-color');
            
            // Si es el color rojo, el HTML ya maneja la redirección con onclick
            // Aquí solo pondremos un log en consola para que no salte el aviso
            console.log("Navegando a: " + color);
        });
    });
});
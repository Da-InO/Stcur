import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
    getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

/* ---- Firebase Config ---- */
const firebaseConfig = {
    apiKey: "AIzaSyCIgbuAkRg8ZfecTlGRTqVatIvOxcYl3A",
    authDomain: "aventurasonoramagica.firebaseapp.com",
    projectId: "aventurasonoramagica",
    storageBucket: "aventurasonoramagica.appspot.com",
    messagingSenderId: "544708290123",
    appId: "1:544708290123:web:ad5413929dd5fd12b68fce",
    measurementId: "G-C753SEVD4D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ---- Elementos del DOM ---- */
const addBtn = document.getElementById('addBtn');
const modal = document.getElementById('modalForm');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const container = document.getElementById('cardsContainer');
const modalTitle = document.getElementById('modalTitle');

let editId = null; // Para saber si estamos editando un Noobini existente

/* ---- Cargar Datos en Tiempo Real ---- */
// Esta función creará la colección "noobinis" automáticamente si no existe
onSnapshot(collection(db, "noobinis"), (snapshot) => {
    container.innerHTML = '';
    snapshot.forEach((snap) => {
        const data = snap.data();
        const id = snap.id;
        renderCard(data, id);
    });
});

function renderCard(data, id) {
    const cardDiv = document.createElement('div');
    cardDiv.className = `card ${data.category}`;
    cardDiv.innerHTML = `
        <div class="rarity-badge">${data.category.toUpperCase()}</div>
        <img src="${data.image}" alt="${data.name}">
        <div class="card-footer">
            <p>${data.name}</p>
            <div class="actions">
                <button class="edit-btn" onclick="prepareEdit('${id}', '${data.name}', '${data.category}')">✎</button>
                <button class="delete-btn" onclick="deleteNoobini('${id}')">🗑</button>
            </div>
        </div>
    `;
    container.appendChild(cardDiv);
}

/* ---- Guardar o Editar Noobini ---- */
saveBtn.onclick = async () => {
    const name = document.getElementById('cardName').value.trim();
    const category = document.getElementById('cardCategory').value;
    const imageInput = document.getElementById('cardImage');

    if (!name) {
        alert("¡Ponle un nombre!");
        return;
    }

    const processSave = async (imageData) => {
        try {
            if (editId) {
                // Modo Edición
                const docRef = doc(db, "noobinis", editId);
                const updateData = { name, category };
                if (imageData) updateData.image = imageData;
                await updateDoc(docRef, updateData);
                editId = null;
            } else {
                // Modo Creación
                if (!imageData) {
                    alert("Debes seleccionar una imagen.");
                    return;
                }
                await addDoc(collection(db, "noobinis"), { name, category, image: imageData });
            }
            modal.style.display = 'none';
        } catch (error) {
            console.error("Error Firebase:", error);
        }
    };

    if (imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => processSave(e.target.result);
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        processSave(null);
    }
};

/* ---- Funciones Globales para los botones de las tarjetas ---- */
window.prepareEdit = (id, name, category) => {
    editId = id;
    modalTitle.innerText = "Editar Noobini";
    document.getElementById('cardName').value = name;
    document.getElementById('cardCategory').value = category;
    modal.style.display = 'block';
};

window.deleteNoobini = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este Noobini de la nube?")) {
        await deleteDoc(doc(db, "noobinis", id));
    }
};

/* ---- Eventos de Interfaz ---- */
addBtn.onclick = () => {
    editId = null;
    modalTitle.innerText = "Agregar Nuevo Noobini";
    document.getElementById('cardName').value = '';
    document.getElementById('cardCategory').value = 'comun';
    document.getElementById('cardImage').value = '';
    modal.style.display = 'block';
};

cancelBtn.onclick = () => {
    modal.style.display = 'none';
};

// Buscador
window.searchCards = () => {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const cards = document.getElementsByClassName('card');
    Array.from(cards).forEach(card => {
        const name = card.querySelector('p').innerText.toLowerCase();
        card.style.display = name.includes(input) ? "" : "none";
    });
};
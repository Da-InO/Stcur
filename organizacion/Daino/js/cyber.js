import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
    getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

/* ---- Firebase Config (Misma que Cursed) ---- */
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
const totalCounter = document.getElementById('totalCounter');

let editId = null;

/* ---- Cargar Datos en Tiempo Real (Colección: cyber_items) ---- */
onSnapshot(collection(db, "cyber_items"), (snapshot) => {
    container.innerHTML = '';
    
    if (totalCounter) {
        totalCounter.innerText = snapshot.size;
    }

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
                <button class="edit-btn" onclick="prepareEditCyber('${id}', '${data.name}', '${data.category}')">✎</button>
                <button class="delete-btn" onclick="deleteCyberItem('${id}')">🗑</button>
            </div>
        </div>
    `;
    container.appendChild(cardDiv);
}

/* ---- Guardar o Editar Item Cyber ---- */
saveBtn.onclick = async () => {
    const name = document.getElementById('cardName').value.trim();
    const category = document.getElementById('cardCategory').value;
    const imageInput = document.getElementById('cardImage');

    if (!name) {
        alert("¡Ingresa un nombre para el sistema!");
        return;
    }

    const processSave = async (imageData) => {
        try {
            if (editId) {
                const docRef = doc(db, "cyber_items", editId);
                const updateData = { name, category };
                if (imageData) updateData.image = imageData;
                await updateDoc(docRef, updateData);
                editId = null;
            } else {
                if (!imageData) {
                    alert("Sube un archivo de imagen.");
                    return;
                }
                await addDoc(collection(db, "cyber_items"), { name, category, image: imageData });
            }
            modal.style.display = 'none';
        } catch (error) {
            console.error("Error en el Core de Firebase:", error);
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

/* ---- Funciones Globales para Cyber ---- */
window.prepareEditCyber = (id, name, category) => {
    editId = id;
    modalTitle.innerText = "Actualizar Cyber Item";
    document.getElementById('cardName').value = name;
    document.getElementById('cardCategory').value = category;
    modal.style.display = 'block';
};

window.deleteCyberItem = async (id) => {
    if (confirm("¿Eliminar este registro de la base de datos Cyber?")) {
        await deleteDoc(doc(db, "cyber_items", id));
    }
};

window.filterByRarity = (rarity) => {
    const cards = document.getElementsByClassName('card');
    const buttons = document.getElementsByClassName('filter-btn');

    Array.from(buttons).forEach(btn => {
        btn.classList.remove('active');
        if (btn.classList.contains(`f-${rarity}`) || (rarity === 'all' && btn.innerText === 'Todos')) {
            btn.classList.add('active');
        }
    });

    Array.from(cards).forEach(card => {
        if (rarity === 'all') {
            card.style.display = "";
        } else {
            card.style.display = card.classList.contains(rarity) ? "" : "none";
        }
    });
};

/* ---- Eventos de Interfaz ---- */
addBtn.onclick = () => {
    editId = null;
    modalTitle.innerText = "Cargar Nuevo Cyber Item";
    document.getElementById('cardName').value = '';
    document.getElementById('cardCategory').value = 'comun';
    document.getElementById('cardImage').value = '';
    modal.style.display = 'block';
};

cancelBtn.onclick = () => {
    modal.style.display = 'none';
};

window.searchCards = () => {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const cards = document.getElementsByClassName('card');
    Array.from(cards).forEach(card => {
        const name = card.querySelector('p').innerText.toLowerCase();
        card.style.display = name.includes(input) ? "" : "none";
    });
};
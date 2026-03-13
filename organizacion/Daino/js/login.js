import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore, collection, query, where, getDocs, addDoc, doc, updateDoc, arrayUnion
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

/* ---- Firebase ---- */
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

/* ---- DOM Elements ---- */
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('username');
const errorMsg = document.getElementById('msg');
const emojiBtn = document.getElementById('emojiBtn');
const popup = document.getElementById('popup');
const perfilContainer = document.getElementById('perfilContainer');
const addBtn = document.getElementById('addBtn');
const addPanel = document.getElementById('addPanel');
const addName = document.getElementById('addName');
const addTeacher = document.getElementById('addTeacher');
const createBtn = document.getElementById('createBtn');
const cancelBtn = document.getElementById('cancelBtn');

/* ---- Login Logic ---- */
async function handleLogin() {
  const username = (usernameInput.value || '').trim();
  if (!username) { errorMsg.textContent = 'Por favor, ingresa tu nombre y apellido'; return; }
  errorMsg.textContent = '';
  try {
    const alumnosRef = collection(db, "alumnos");
    const alumnoQuery = query(alumnosRef, where("nombre", "==", username), where("activo", "==", true));
    const alumnoSnapshot = await getDocs(alumnoQuery);
    if (alumnoSnapshot.empty) { errorMsg.textContent = 'Alumno no encontrado o inactivo.'; return; }
    const maestrosRef = collection(db, "maestros");
    const maestrosQuery = query(maestrosRef, where("activo", "==", true));
    const maestrosSnapshot = await getDocs(maestrosQuery);
    let alumnoAsignado = false;
    maestrosSnapshot.forEach(d => {
      const maestro = d.data();
      if (Array.isArray(maestro.alumnos) && maestro.alumnos.includes(username)) alumnoAsignado = true;
    });
    if (!alumnoAsignado) { errorMsg.textContent = 'Alumno no está asignado a ningún maestro activo.'; return; }
    localStorage.setItem('reina_username', username);
    window.location.href = 'index.html';
  } catch (err) {
    console.error(err);
    errorMsg.textContent = 'Error al conectar con la base de datos.';
  }
}

/* ---- Default Avatars ---- */
const PROFILE_IMAGES_LOCAL = ['imagenes/perfiles/perfil1.png', 'imagenes/perfiles/perfil2.png', 'imagenes/perfiles/perfil3.png', 'imagenes/perfiles/perfil4.png', 'imagenes/perfiles/perfil5.png', 'imagenes/perfiles/perfil6.png', 'imagenes/perfiles/perfil7.png'];
const FALLBACK_DEFAULTS = ['imagenes/default_nino.png', 'imagenes/default_nina.png'];
function makeNoRepeatPicker(arr) {
  const pool = (arr?.length ? [...arr] : [...FALLBACK_DEFAULTS]);
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[pool[i], pool[j]] = [pool[j], pool[i]]; }
  let idx = 0; return () => pool[(idx++) % pool.length];
}

/* ---- Load Profiles into Popup ---- */
async function cargarPerfiles() {
  perfilContainer.innerHTML = '';
  const pickDefault = makeNoRepeatPicker(PROFILE_IMAGES_LOCAL);
  try {
    const qs = await getDocs(query(collection(db, "alumnos"), where("activo", "==", true)));
    qs.forEach(snap => {
      const a = snap.data();
      const card = document.createElement('div');
      card.className = 'perfil';
      const img = document.createElement('img');
      img.className = 'perfil-img';
      img.src = a.fotoURL || pickDefault();
      img.alt = a.nombre;
      const p = document.createElement('p');
      p.textContent = a.nombre;
      card.append(img, p);
      card.addEventListener('click', () => {
        usernameInput.value = a.nombre;
        document.body.classList.remove('popup-active');
        popup.classList.remove('show');
      });
      perfilContainer.appendChild(card);
    });
  } catch (err) {
    console.error('Error al cargar perfiles:', err);
  }
}

/* ---- Add Student Panel Logic ---- */
async function toggleAddPanel() {
  addTeacher.innerHTML = '<option value="">Selecciona maestro</option>';
  try {
    const qs = await getDocs(query(collection(db, 'maestros'), where('activo', '==', true)));
    qs.forEach(d => {
      const data = d.data();
      const opt = document.createElement('option');
      opt.value = d.id;
      opt.textContent = data?.nombre || '(sin nombre)';
      addTeacher.appendChild(opt);
    });
  } catch (err) {
    console.error('No se pudieron cargar los maestros:', err);
  }
  addPanel.classList.toggle('show');
  addPanel.setAttribute('aria-hidden', addPanel.classList.contains('show') ? 'false' : 'true');
  if (addPanel.classList.contains('show')) setTimeout(() => addName.focus(), 0);
}

/* ---- Create Student Logic ---- */
// En login.js, reemplaza tu función createAlumno con esta

async function createAlumno() {
  const nombre = (addName.value || '').trim();
  const maestroId = addTeacher.value;
  if (!nombre || !maestroId) return;

  // --- 1. INICIA EL ESTADO DE CARGA ---
  createBtn.classList.add('loading');
  createBtn.disabled = true;
  cancelBtn.disabled = true;
  addName.disabled = true;
  addTeacher.disabled = true;

  try {
    const dup = await getDocs(query(collection(db, 'alumnos'), where('nombre', '==', nombre), where('activo', '==', true)));
    if (!dup.empty) {
      alert('Ya existe un alumno activo con ese nombre.');
      throw new Error("Alumno duplicado"); // Lanzamos un error para ser atrapado por el catch
    }

    const pickDefault = makeNoRepeatPicker(PROFILE_IMAGES_LOCAL);
    const fotoURL = pickDefault();

    // Operaciones de Firebase
    await addDoc(collection(db, 'alumnos'), { nombre, activo: true, fotoURL });
    await updateDoc(doc(db, 'maestros', maestroId), { alumnos: arrayUnion(nombre) });

    // --- 2. TRANSICIÓN A ÉXITO (CHECKMARK) ---
    createBtn.classList.remove('loading');
    createBtn.classList.add('success');

    // --- 3. ESPERAR 1.5 SEGUNDOS Y LUEGO RESETEAR Y CERRAR ---
    setTimeout(() => {
      if (document.body.classList.contains('popup-active')) {
        cargarPerfiles();
      }

      // Limpiamos y cerramos el panel
      addName.value = '';
      addTeacher.value = '';
      addPanel.classList.remove('show');
      addPanel.setAttribute('aria-hidden', 'true');

      // Devolvemos el botón a su estado original
      createBtn.classList.remove('success');
      createBtn.disabled = false;
      cancelBtn.disabled = false;
      addName.disabled = false;
      addTeacher.disabled = false;
    }, 1500); // 1.5 segundos para mostrar el check

  } catch (err) {
    console.error('Error creando alumno:', err);
    // Si hay un error, solo revertimos al estado original sin mostrar el check
    createBtn.classList.remove('loading');
    createBtn.disabled = false;
    cancelBtn.disabled = false;
    addName.disabled = false;
    addTeacher.disabled = false;
  }
}

/* ---- Main Event Listeners ---- */
document.addEventListener('DOMContentLoaded', () => {
  // Login form events
  loginBtn?.addEventListener('click', e => { e.preventDefault(); handleLogin(); });
  usernameInput?.addEventListener('keypress', e => { if (e.key === 'Enter') { e.preventDefault(); handleLogin(); } });

  // Emoji button opens profiles popup
  emojiBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    // Si el panel del alien está abierto, lo cerramos primero
    if (addPanel.classList.contains('show')) {
      addPanel.classList.remove('show');
      addPanel.setAttribute('aria-hidden', 'true');
    }
    cargarPerfiles();
    document.body.classList.toggle('popup-active');
    popup.classList.toggle('show');
  });

  // Alien button opens 'add student' panel
  addBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    // Si el panel de perfiles está abierto, lo cerramos primero
    if (document.body.classList.contains('popup-active')) {
      document.body.classList.remove('popup-active');
      popup.classList.remove('show');
    }
    toggleAddPanel();
  });

  // 'Add student' panel buttons
  cancelBtn?.addEventListener('click', () => { addPanel.classList.remove('show'); addPanel.setAttribute('aria-hidden', 'true'); });
  createBtn?.addEventListener('click', () => createAlumno());
  addName?.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); createAlumno(); } });

  // Global listener to close popups by clicking outside
  document.addEventListener('click', (e) => {
    // Closes profiles popup if click is outside of it
    if (document.body.classList.contains('popup-active') && !e.target.closest('#popup') && !e.target.closest('#emojiBtn')) {
      document.body.classList.remove('popup-active');
      popup.classList.remove('show');
    }
    // Closes 'add student' panel if click is outside of it
    if (addPanel.classList.contains('show') && !e.target.closest('#addPanel') && !e.target.closest('#addBtn')) {
      addPanel.classList.remove('show');
      addPanel.setAttribute('aria-hidden', 'true');
    }
  });
});
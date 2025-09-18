// Firebase modular setup for Firestore – simple helper for saving cotizaciones
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

// Firebase config (provided by user)
const firebaseConfig = {
  apiKey: "AIzaSyAX0_2aSXzeFGDX732mNBKYTnsIzqvHDI4",
  authDomain: "multinivel-c0bcd.firebaseapp.com",
  projectId: "multinivel-c0bcd",
  storageBucket: "multinivel-c0bcd.firebasestorage.app",
  messagingSenderId: "1046991671729",
  appId: "1:1046991671729:web:dfbbdf1cd534952f96ad90",
  measurementId: "G-38CD7R6LGB"
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Save a cotizacion document to the 'cotizaciones' collection.
 * @param {Object} data - The form data to store.
 * @returns {Promise<string>} - The new document id on success.
 */
export async function saveCotizacion(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data for saveCotizacion');
  }

  const payload = {
    ...data,
    createdAt: serverTimestamp()
  };

  const colRef = collection(db, 'cotizaciones');
  const docRef = await addDoc(colRef, payload);
  return docRef.id;
}

export default app;

/**
 * Save a comentario/testimonial to 'comentarios' collection.
 * @param {Object} data
 */
export async function saveComentario(data) {
  if (!data || typeof data !== 'object') throw new Error('Invalid data for saveComentario');
  const payload = {
    ...data,
    createdAt: serverTimestamp()
  };
  const colRef = collection(db, 'comentarios');
  const docRef = await addDoc(colRef, payload);
  return docRef.id;
}

/**
 * Subscribe to comentarios collection in real-time. Calls `onChange` with an array of documents.
 * @param {(docs:Array)=>void} onChange
 * @returns {Function} unsubscribe
 */
export function subscribeComentarios(onChange) {
  const colRef = collection(db, 'comentarios');
  const q = query(colRef, orderBy('createdAt', 'desc'));
  const unsub = onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    onChange(docs);
  });
  return unsub;
}

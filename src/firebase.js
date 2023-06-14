
import {initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
//TODO: Add SDKs for Firebase products that you want to use   https://firebase.google.com/docs/web/setup#available-libraries   -->
import { getFirestore, collection, addDoc, deleteDoc, doc, getDoc, updateDoc,  /*increment, */} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";  // autenticacion -->
 
//import {  } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js"


const firebaseConfig = {
  apiKey: "AIzaSyCCZY1nDDjkpqWJc7LPlwC9nbApIgwLFlY",
  authDomain: "social-network-51f1c.firebaseapp.com",
  projectId: "social-network-51f1c",
  storageBucket: "social-network-51f1c.appspot.com",
  messagingSenderId: "61634618248",
  appId: "1:61634618248:web:5cd97c87778390d0d9503d",
  measurementId: "G-C16EMLGNV9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//obtiene base de datos firestore
export const db = getFirestore(app); 
//anade coleccion de post
export const postsRef = collection(db, 'post');
//resgistro con correo y contrasena
export const saveForm = (email, password) =>
 
addDoc(collection(db, 'login '),{email, password} 
); 
//obtiene autenticaccion
export const auth = getAuth(app);
//cuando existe un cambio en la sesion del usuario se obtiene ese usuario
/*
onAuthStateChanged(auth, async (user) => {
const usuario =user;
console.log(usuario);
})
*/
//agregar a la coleccion post el titulo la ubicacion y el contenido 
export const saveTask = (title, location, content, /*imgen */) => {
  addDoc(collection(db, 'posts'),{title, location, content /*imgen} */});
  }
//se obtienen todos los documentos de la coleccion post
export const getTasks = () => getDocs(collection(db, 'posts'));
// elimina la coeccion asignada a un id
export const deleteTask = id => deleteDoc(doc(db, 'posts', id))
//obtiene una coleccion por id
export const getTask = id => getDoc(doc(db, 'posts', id));
//actualiza un docuemento por id
export const updateTask = (id, newFields) => updateDoc (doc(db, 'posts', id), newFields)





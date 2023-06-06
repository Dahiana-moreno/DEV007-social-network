
import {initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
//TODO: Add SDKs for Firebase products that you want to use   https://firebase.google.com/docs/web/setup#available-libraries   -->
import { getFirestore, collection, addDoc, deleteDoc, doc, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged,  } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";  // autenticacion -->
 
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

export const db = getFirestore(app);

export const saveForm = (email, password) =>
 
addDoc(collection(db, 'login '),{email, password} 
); //recuerde el espacio
//console.log(user, mail);
export const auth = getAuth(app);
onAuthStateChanged(auth, async (user) => {
console.log(user);
})

//INFORMACION DE LOS POST QUE EL USUARIO POSTEA

  export const saveTask = (title, content) => {
  addDoc(collection(db, 'posts'),{title,content});
   // console.log(title,description)
  }
   export const getTasks = () => getDocs(collection(db, 'posts'));
 // export const onGetTask = (callback )=> { addDoc(collection(db, 'posts').onSnapshot(callback))}

 //export const deleteTask = id => console.log(id);
export const deleteTask = id => deleteDoc(doc(db, 'posts', id))

export const getTask = id => getDoc(doc(db, 'posts', id));

export const updateTask = (id, newFields) => updateDoc (doc(db, 'posts', id), newFields)


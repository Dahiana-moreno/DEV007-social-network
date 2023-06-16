
/* eslint-disable import/no-unresolved */
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'; /* /* autenticacion */
import { collection, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

import { auth, saveForm, db } from './firebase.js';
import { setupPosts } from './postList.js';

import './login.js';

window.addEventListener('DOMContentLoaded', () => {
});

/* CREAR CUENTAS
//trae formulario de registro y los valores */
const formLoginup = document.querySelector('#form-loginup');
formLoginup.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  /* console.log(email, password); */
  // guarda email y contrasena
  saveForm(email, password);
  try {
  // createUserWithEmailAndPassword = crea usuario con email y contrasena
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredentials);
  } catch (error) {
    alert(error.message);
    alert(error.code);

    if (error.code) {
      alert(error.message);
    }
  }
  // limpia el formulario luego de su envio
  formLoginup.reset();
});
// PARA CERRAR SESION
const logout = document.querySelector('#logout');
logout.addEventListener('click', async () => {
  // signOut= cierra la sesion de esa autenticacion que se hizo
  await signOut(auth);
  alert('user signed out');
});
// APARECER Y DESARECER VISTAS

import { createUserWithEmailAndPassword, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";  // autenticacion -->
import { collection, onSnapshot} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {auth, saveForm, db} from './firebase.js';
import { setupPosts } from './postList.js';
import './login.js';
window.addEventListener('DOMContentLoaded',()=>{
})

//CREAR CUENTAS
//trae formulario de registro y los valores
const formLoginup = document.querySelector('#form-loginup')
formLoginup.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.querySelector('#email').value;
  const password =document.querySelector('#password').value;
  console.log(email, password);
  //guarda email y contrasena
  saveForm(email, password);
try{
// createUserWithEmailAndPassword = crea usuario con email y contrasena 
  const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
console.log(userCredentials);

} catch (error){
 alert(error.message);
 alert(error.code);

  if (error.code) {
    alert(error.message)   
}
}
 //limpia el formulario luego de su envio
formLoginup.reset(); 

});
//PARA CERRAR SESION 
   const logout = document.querySelector('#logout'); 
logout.addEventListener('click', async () => {
  //signOut= cierra la sesion de esa autenticacion que se hizo
  await signOut(auth);
   alert('user signed out');
})
//APARECER Y DESARECER VISTAS

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in'); // cerrar sesion
const containerArea = document.querySelectorAll('.container-text');
const perfil = document.querySelectorAll('.Perfil');
const vista1 = document.querySelectorAll('#vista1');

// const perfilUsuario = document.querySelectorAll('#perfilUsuario')


const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => { link.style.display = 'block'; });
    loggedOutLinks.forEach((link) => { link.style.display = 'none'; });
    containerArea.forEach((link) => { link.style.display = 'block'; });
    vista1.forEach((link) => { link.style.display = 'none'; });
    // perfilUsuario.forEach(link => link.style.display = 'block')
    perfil.forEach((link) => { link.style.display = 'block'; });
  } else {
    containerArea.forEach((link) => { link.style.display = 'none'; });
    vista1.forEach((link) => { link.style.display = 'block'; });
    // perfilUsuario.forEach(link => link.style.display = 'block')
    loggedInLinks.forEach((link) => { link.style.display = 'none'; });
    loggedOutLinks.forEach((link) => { link.style.display = 'block'; });
    perfil.forEach((link) => { link.style.display = 'none'; });
  }
};

// verifica un evento de sesion
onAuthStateChanged(auth, async (user) => {
  // llama la linea 66 aparecer y desaparecer vistas
  loginCheck(user);
  // un if si se se registro un usuario muestra las publicaciones
  if (user) {
    onSnapshot(collection(db, 'posts'), (querySnapshot) => {
      setupPosts(querySnapshot.docs);
      // de o contrario se muestra vacio
    });
  } else {
    setupPosts([]);
  }
  loginCheck(user);
});

    containerArea.forEach(link => link.style.display = 'block')
   vista1.forEach(link => link.style.display = 'none');

  //perfilUsuario.forEach(link => link.style.display = 'block')
perfil.forEach(link => link.style.display = 'block');
  }else{
    containerArea.forEach(link => link.style.display = 'none')
vista1.forEach(link => link.style.display = 'block');
//perfilUsuario.forEach(link => link.style.display = 'block')
    loggedInLinks.forEach(link => link.style.display = 'none');  
    loggedOutLinks.forEach(link => link.style.display = 'block');  
  perfil.forEach(link => link.style.display = 'none'); 
  
  }}

  
//verifica un evento de sesion
onAuthStateChanged(auth, async (user) => {   
  //llama la linea 66 aparecer y desaparecer vistas
loginCheck(user);
  //un if si se se registro un usuario muestra las publicaciones
  if (user) {
 onSnapshot(collection(db, 'posts'), (querySnapshot) => {
  setupPosts(querySnapshot.docs);
  //de o contrario se muestra vacio
})}else{
 setupPosts([]);
  }
  loginCheck(user)
});







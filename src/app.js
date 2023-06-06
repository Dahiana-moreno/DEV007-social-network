import { createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";  // autenticacion -->
import { collection, onSnapshot} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

import {auth, saveForm, db} from './firebase.js';
import { setupPosts } from './postList.js';

import './login.js';
//import './postList.js'
//import './loginGithub.js';

window.addEventListener('DOMContentLoaded',()=>{
 

})


//CREAR CUENTAS
const formLoginup = document.querySelector('#form-loginup')
formLoginup.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.querySelector('#email').value;
  const password =document.querySelector('#password').value;
  console.log(email, password);
  saveForm(email, password);
try{
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
console.log(userCredentials);

} catch (error){
  console.log(error.message);
  console.log(error.code);

  if (error.code) {
    alert(error.message)   
}
}
formLoginup.reset();  //limpia el formulario luego de su envio

});
//PARA CERRAR SESION
   const logout = document.querySelector('#logout'); 
logout.addEventListener('click', async () => {
   await signOut(auth);
   console.log('user signed out');
})

//APARECER Y DESARECER VISTAS
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');  //cerrar sesion
const containerArea = document.querySelectorAll('.container-text');
const vista1 = document.querySelectorAll('#vista1');
//console.log(loggedInLinks)
//console.log(loggedOutLinks)

const loginCheck = user =>{
  if (user){
    loggedInLinks.forEach(link => link.style.display = 'block');  
    loggedOutLinks.forEach(link => link.style.display = 'none');
    containerArea.forEach(link => link.style.display = 'block')
    vista1.forEach(link => link.style.display = 'none');
  }else{
    containerArea.forEach(link => link.style.display = 'none')
vista1.forEach(link => link.style.display = 'block');
    loggedInLinks.forEach(link => link.style.display = 'none');  
    loggedOutLinks.forEach(link => link.style.display = 'block');  

  }
}



onAuthStateChanged(auth, async (user) => {   
loginCheck(user);
  
  if (user) {
 onSnapshot(collection(db, 'posts'), (querySnapshot) => {
  setupPosts(querySnapshot.docs);


//console.log(querySnapshot.docs); imprime el array con los posts, luego de iniciar sesion
})}else{
 setupPosts([]);
  }
  loginCheck(user)
})





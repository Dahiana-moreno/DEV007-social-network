/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */
import {
  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'; // autenticacion -->

import { auth } from './firebase.js';

// GOOGLE
const googleButton = document.querySelector('#login-google');



//GOOGLE
const googleButton = document.querySelector('#login-google')


googleButton.addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();

  try {
    const credentials = await signInWithPopup(auth, provider);
    console.log(credentials);

    // showMessage('bienvenido '+credentials.user.displayName, 'success')
  } catch (error) {
    console.log(error);
  }
});

// GITHUB
const githubButton = document.querySelector('#login-github');

githubButton.addEventListener('click', async () => {
  const provider = new GithubAuthProvider();

  try {
    const credentials = await signInWithPopup(auth, provider);
    console.log(credentials);

    // showMessage('bienvenido '+credentials.user.displayName, 'success')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
});

// LOGIN SESSIONS

const formLogin = document.querySelector('#form-login');
formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();

  const mail = document.querySelector('#login-email').value;

  const passwordd = document.querySelector('#login-password').value;
  try {
  // signInWithEmailAndPassword = para registrar un usuario con correo y contrasena
    const credentials = await signInWithEmailAndPassword(auth, mail, passwordd);
    console.log(credentials);
  } catch (error) {
    alert(`Se ha producido un error ' ${error.message}`);

    // limpia el formulario luego de su envio
  }
}); formLogin.reset();
=======
  const passwordd=document.querySelector('#login-password').value;
try{

  //signInWithEmailAndPassword = para registrar un usuario con correo y contrasena 
const credentials = await signInWithEmailAndPassword(auth, mail, passwordd)
console.log(credentials);

} catch (error){
 alert("Se ha producido un error " + error.message)   

 //limpia el formulario luego de su envio
}
}); formLogin.reset() 

/*

//previsualizar la imagen 
const postImageInput = document.getElementById("task-url");
const imagePreview = document.getElementById("image-preview");

postImageInput.addEventListener('change', () => {
  const selectedFile = postImageInput.files[0]; // Obtener el archivo seleccionado

  if (selectedFile) {
    const reader = new FileReader(); // Crear un objeto FileReader

    reader.onload = (event) => {
      const imageUrl = event.target.result; // Obtener la URL de la imagen
      const storage = getStorage()
      const storageRef = ref(storage, imageUrl)
      uploadBytes(storageRef, file).then(snaphShot => console.log(snaphShot))
      // Mostrar la imagen en la previsualización
      imagePreview.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
    };

    // Leer el archivo como URL
    reader.readAsDataURL(selectedFile);
  } else {
    // Limpiar la previsualización si no se selecciona ningún archivo
    imagePreview.innerHTML = '';
  }
});
*/


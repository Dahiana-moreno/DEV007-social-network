// TODO LO QUE VIENE DEL TASK FORM PARA PUBLICAR TITULO Y DESCRIPCION
import { collection, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

import { saveTask, deleteTask, getTask, updateTask, auth, db } from "./firebase.js";
// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";  // autenticacion -->
const taskForm = document.getElementById('task-form');
let editStatus = false;
let id = '';

// cuando se llena el formulario asigna el valor de las cajas de texto a las variables respectivas
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = taskForm['task-title'];// donde quedara guardado los datos de los input
  const location = taskForm['task-location'];
  const content = taskForm['task-content'];
  const url = taskForm['task-url'];
  // Bandera- si se guarda o actualiza depende del true o false
  if (!editStatus) {
  // guardar tarea
    saveTask(title.value, location.value, content.value, url.value, new Date())
  } else {
  // actulizar tarea
    updateTask(id, {
      title: title.value,
      location: location.value,
      content: content.value,
      url: url.value,

    });
    editStatus = false;
  }
  taskForm.reset();
});
// auth
// console.log(auth)

// postsRef
// console.log(postsRef)

// post enviados
const postList = document.querySelector('.caja');
// querysanapshot = tiene toda la coleccion
export const setupPosts = (querySnapshot) => {
// longitud de los documentos
// console.log(querySnapshot)
  if (querySnapshot.length) {
    let html = '';
    // forEach recorrertodos losdocumentos ylos almacena para mostrar cada publicacion independiente
    const posts = [];
    querySnapshot.forEach(element => {
      posts.push(element);
    });
    querySnapshot.sort(
      (objA, objB) => Number(objA.date) - Number(objB.date),
    ).forEach( doc => {
      const post = doc.data();
      console.log(post);
      const li = `

//cuando se llena el formulario asigna el valor de las cajas de texto a las variables respectivas
taskForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = taskForm['task-title'] //donde quedara guardado los datos de los input
  const location = taskForm['task-location']
  const content = taskForm['task-content']
 const url = taskForm['task-url']
//Bandera- si se guarda o actualiza depende del true o false
  if(!editStatus){
  //guardar tarea
    saveTask(title.value, location.value, content.value, url.value)
  }else{
  //actulizar tarea
  updateTask(id,{
    title: title.value,
    location : location.value,
    content: content.value,
    url: url.value,

  });
  editStatus = false;
  }
  taskForm.reset();
})
auth
console.log(auth)
//post enviados
const postList = document.querySelector('.caja');
//querysanapshot = tiene toda la coleccion
export  const setupPosts = (querySnapshot) => {
//longitud de los documentos 
if (querySnapshot.length) {
let html = ''
//forEach para recorrer todos los documentos y los almacena para mostrar cada publicacion independiente
    querySnapshot.forEach(doc => {
        const post = doc.data()
        console.log(post) ;
        const li = `

      
        <div class="list-group-item">       
            <h2>${post.title}</h2>
            <p>${post.location}</p>
            <p>${post.content}</p>
         <p> <img id="url" src= ${post.url}></p>
        

            <div class="bottons">                  
            <button Class="likeButton" data-id ="${doc.id}" >
            <img id = "likee" src="./imagenes/imagenes/huellitas.png"  alt=""/>
            </button>                     
            <span class = "likeCount">${post.likes ? post.likes.length : 0} reacciones </span>
            <button class ="btn-delete" data-id ="${doc.id}">Delete</button>
            <button class ="btn-edit" data-id ="${doc.id}">Edit</button>
            </div>
        </div>
      <div class="caja">
     
        `;
      html += li;
    });
    //  <img src= ${post.imgen}></p>
    // html contiene todas las publicaciones y son enviadas al HTML
    postList.innerHTML = html;

    const enlacePerfil = document.getElementById('perfil');
    const seccionPerfil = document.getElementById('perfilUsuario');
    const contenido = document.getElementById('task-form');
    const publicaciones = document.getElementById('cajas');

    // Agrega un evento de clic al enlace "Perfil"
    enlacePerfil.addEventListener('click', function (e) {
      e.preventDefault(); // Evita el comportamiento predeterminado del enlace
      // Muestra u oculta la sección de perfil según su estado actual
      if (seccionPerfil.style.display === 'none') {
      seccionPerfil.style.display = 'block';
      contenido.style.display = 'none';
      publicaciones.style.display = 'none';
    } else {
      seccionPerfil.style.display = 'none';
      contenido.style.display = 'block';
      publicaciones.style.display = 'block';
      }
    });

    // selecciona el bloque de codigo que esta en el html con el id likebutton
    const likeButtons = document.querySelectorAll('.likeButton');

    const likedPosts = [];
    likeButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        try {
          // const postId =  button.dataset.id;
          //  if(!likedPosts.length === 0){
          const postId =  button.dataset.id;
          if (!likedPosts.includes(postId)) {
            const postsQuerySnapshot = await getDocs(collection(db, 'posts'));
            const postDoc = postsQuerySnapshot.docs.find((doc) => doc.id === postId);
            console.log(postDoc.data());
            if (postDoc) {
              if (!postDoc.data().likes) {
                await updateDoc(postDoc.ref, { likes: [auth.currentUser.email] });
              } else {
                if (postDoc.data().likes.includes(auth.currentUser.email)) {
                  await updateDoc(postDoc.ref, { likes: postDoc.data().likes.filter(person => person !== auth.currentUser.email ) }); 
                } else {
            await updateDoc(postDoc.ref, { likes: [...postDoc.data().likes, auth.currentUser.email] });
                }
              }
              likedPosts.push(postId);
            }
          }
        } 

        `
        html += li
    })
  //  <img src= ${post.imgen}></p>
  //html contiene todas las publicaciones y son enviadas al HTML
  postList.innerHTML = html



  const enlacePerfil = document.getElementById('perfil');
  const seccionPerfil = document.getElementById('perfilUsuario');
  
  // Agrega un evento de clic al enlace "Perfil"
  enlacePerfil.addEventListener('click', function(e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del enlace
  
    // Muestra u oculta la sección de perfil según su estado actual
    if (seccionPerfil.style.display === 'none') {
      seccionPerfil.style.display = 'block';
    } else {
      seccionPerfil.style.display = 'none';
    }
  });


  
  //selecciona el bloque de codigo que esta en el html con el id likebutton
const likeButtons = document.querySelectorAll('.likeButton');

let likedPosts = []
likeButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    try {
     // const postId =  button.dataset.id;
    //  if(!likedPosts.length === 0){
        const postId =  button.dataset.id;
          if(!likedPosts.includes(postId)){
      const postsQuerySnapshot = await getDocs(collection(db, 'posts'));
      const postDoc = postsQuerySnapshot.docs.find((doc) => doc.id === postId);
     console.log(postDoc.data())
      if(postDoc){
        if (!postDoc.data().likes) {
          await updateDoc(postDoc.ref, { likes: [auth.currentUser.email] });
        } else {
          if (postDoc.data().likes.includes(auth.currentUser.email)) {
            await updateDoc(postDoc.ref, { likes: postDoc.data().likes.filter(person => person !== auth.currentUser.email ) }); 
          } else {
            await updateDoc(postDoc.ref, { likes: [...postDoc.data().likes, auth.currentUser.email] });
          }
        }
        
      likedPosts.push(postId);

    //  likeButtons.forEach((btn) => {
       
      
    }
  }

    } 

    catch (error) {
      console.error('Error al actualizar los "me gusta":', error);
    }   button.disabled = true;
  });
});     




const btnsDelete = postList.querySelectorAll('.btn-delete');

btnsDelete.forEach(btn => {
  btn.addEventListener('click', ({ target: { dataset } }) => {
    const shouldDelete = confirm('¿Estás seguro de que deseas eliminar esta tarea?');

    if (shouldDelete) {
      deleteTask(dataset.id);
    }
  });
});

//Boton editar, revisar cual boton se seleciono y permite la edicion
const btnsEdit =  postList.querySelectorAll('.btn-edit')
btnsEdit.forEach (btn => {
  btn.addEventListener('click', async(e) => {
  const get = await getTask(e.target.dataset.id);
  const post = get.data();
//el post que le dio editra, guarda los nuevos valores en la caja
  taskForm['task-title'].value = post.title //donde quedara guardado los datos de los input
  taskForm['task-location'].value = post.location
  taskForm['task-content'].value = post.content
  taskForm['task-url'].value = post.url
//bandera, que se pone en true, para que no guarde sino que actualice
  editStatus = true;
  //id de la publicacion que se va a editar
  id = get.id; 
//cambia eltexto del boton guardar por editar
  taskForm['btn-task-save'].innerText = 'Update';  
  })
})
//si no existe ninguna oublicacion debe aparecer este mensesaje 
}else{
   postList.innerHTML = '<h1> </h1>'  
  }
}
 window.addEventListener('DOMContentLoaded', () => {
 })


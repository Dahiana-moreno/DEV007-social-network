// TODO LO QUE VIENE DEL TASK FORM PARA PUBLICAR TITULO Y DESCRIPCION
import { doc,collection, getDocs, updateDoc, increment, } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

import { saveTask, deleteTask, getTask, updateTask, auth, db } from "./firebase.js";
//import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";  // autenticacion -->


const taskForm = document.getElementById('task-form')
let editStatus = false;
let id = '';

taskForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = taskForm['task-title'] //donde quedara guardado los datos de los input
  const location = taskForm['task-location']
  const content = taskForm['task-content']
 // const imgen = taskForm['task-imgen']

  if(!editStatus){
  //  console.log('editando');
  saveTask(title.value, location.value, content.value, /*imgen*/)
  }else{
  updateTask(id,{
    title: title.value,
    location : location.value,
    content: content.value,
  //  imgen: imgen.value,

  });
  editStatus = false;
  }
  taskForm.reset();
})
auth
console.log(auth)

//post enviados
const postList = document.querySelector('.caja');
//console.log()

export  const setupPosts = (querySnapshot) => {
if (querySnapshot.length) {
let html = ''
    querySnapshot.forEach(doc => {
  //   console.log(doc);
        const post = doc.data()
        console.log(post) ;
        const li = `
      
        <div class="list-group-item">       
            <h2>${post.title}</h2>
            <p>${post.location}</p>
            <p>${post.content}</p>
            <p><img src= ${post.imgen}></p>
            <p>${post.user}</p>

            <div class="bottons">                  
            <button Class="likeButton" data-id ="${doc.id}" >Like</button>                     
            <span class = "likeCount">${post.likes}</span>
            <button class ="btn-delete" data-id ="${doc.id}">Delete</button>
            <button class ="btn-edit" data-id ="${doc.id}">Edit</button>
            </div>
        </div>
      <div class="caja">
     
        `
        html += li
    })
  //  <img src= ${post.imgen}></p>
  postList.innerHTML = html
 //console.log(postList);
const likeButtons = document.querySelectorAll('.likeButton');
// Agregar un evento de clic a cada botón
likeButtons.forEach((button, index) => {
  button.addEventListener('click', async () => {

    try {
      // Obtener todos los posts de la colección "posts"
      const postsQuerySnapshot = await getDocs(collection(db, 'posts'));
      // Obtener el post correspondiente al índice del botón
      const postDoc = postsQuerySnapshot.docs[index];
      // Incrementar el contador de "me gusta" en Firebase
      await updateDoc(postDoc.ref, { likes: increment(1) });   
    } catch (error) {
      console.error('Error al actualizar los "me gusta":', error);
    }
  });
});     


//FUNCION PARA ELIMINAR
const btnsDelete =  postList.querySelectorAll('.btn-delete')
//console.log(btnsDelete)
btnsDelete.forEach( btn => {
  btn.addEventListener('click', ({target: { dataset }}) => {
 //console.log(dataset.id)
   deleteTask(dataset.id);
  })
})


//console.log(dataset.id)

const btnsEdit =  postList.querySelectorAll('.btn-edit')
//console.log(btnsDelete)
btnsEdit.forEach (btn => {
  btn.addEventListener('click', async(e) => {
   // console.log(dataset.id)
  const get = await getTask(e.target.dataset.id);
   // console.log(get.data())
  //  console.log(dataset.id)

  // console.log(get)    //editar
   const post = get.data();

  taskForm['task-title'].value = post.title //donde quedara guardado los datos de los input
  taskForm['task-location'].value = post.location
  taskForm['task-content'].value = post.content
 //taskForm['task-image'].value = post.image
 

  editStatus = true;
  //id = e.target.dataset.id;
  id = get.id; //
 // console.log(id);
  taskForm['btn-task-save'].innerText = 'Update';  //cambiar eltexto de guardar por editar
  })
})


}else{
   postList.innerHTML = '<h1> Login to see posts </h1>'  // aparecera luego de cerrar sesion
  }
}
 window.addEventListener('DOMContentLoaded', () => {
 })
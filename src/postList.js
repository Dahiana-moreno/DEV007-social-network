// TODO LO QUE VIENE DEL TASK FORM PARA PUBLICAR TITULO Y DESCRIPCION
import { doc,collection, getDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

import { saveTask, deleteTask, getTask, updateTask, auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";  // autenticacion -->




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
        
            <h3>${post.title}</h3>
            <p>${post.location}</p>
            <p>${post.content}</p>
            <p><img src= ${post.imgen}></p>
            <p>${post.user}</p>
            <diV class="bottons">
          
            <button class ="btn-delete" data-id ="${doc.id}">Delete</button>
            <button Class="likeButton" data-id ="${doc.id}" >Like</button>            
            <span class = "likeCount"  >0</span>

            <button class ="btn-delete" data-id ="${doc.id}">Delete</button>
            <button class ="btn-edit" data-id ="${doc.id}">Edit</button>

</div>
        </div>
      <div class="caja">
     
        `
        html += li
    })

 //             <!-- <button id ="btn-likear" onclick="likePost">like</button> --->


  //  console.log('loop posts');

  //  <img src= ${post.imgen}></p>
  postList.innerHTML = html
 //console.log(postList);
 /*
 async function likePost() {
  // Obtén el ID del post
  try{
const postDocRef = refPost;
  // Actualiza el conteo de likes en Firebase
  await  updateDoc(postDocRef, {
    likes: increment(1)
  });

  // Actualiza el conteo de likes en la interfaz
  const likeCountElement = postList.querySelectorAll(".likeCount");
  const currentCount = parseInt(likeCountElement.innerText);

  likeButton.forEach(btn => {
    btn.addEventListener('click', async(e) => {


 refPost = await updateDoc(e.target.dataset)
     likeCountElement.innerText = currentCount + 1;
})
  })
  // Deshabilita el botón después de dar like
  const likeButton = postList.querySelectorAll(".likeButton");
  likeButton.disabled = true;
}catch (error) {
  alert("Error al dar like: " + error.message);
}
 }
// Agrega el listener de clic al botón
const likeButton = document.querySelectorAll(".likeButton");
likeButton.forEach (btn => {
btn.addEventListener('click', likePost);
console.log(likeButton)
})
*/


/*

const postsRef = collection(db, "posts");

// Obtén referencias a los elementos del DOM
const likeButtons = document.querySelectorAll(".likeButton");
const likeCounts = document.querySelectorAll(".likeCount");

// Agrega el evento de clic a cada botón "Me gusta"
likeButtons.forEach(function (likeButton) {
  likeButton.addEventListener("click", async function () {
    // Comprueba si el usuario ha iniciado sesión
    onAuthStateChanged(auth, async function (user) {
      if (user) {
        // Obtiene el ID del usuario actual
        const userId = user.uid;

        // Obtiene el ID del post asociado al botón "Me gusta"
        const postId = likeButton.dataset.postId;

        // Comprueba si el usuario ya ha dado like al post
        const postRef = doc(db, "posts", postId);
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) {
          const postData = postDoc.data();
          if (postData.likes && postData.likes.includes(userId)) {
            // Si el usuario ya ha dado like, muestra un mensaje
            console.log("Ya le diste like a este post.");
          } else {
            // Agrega el ID del usuario a la lista de likes del post
            await updateDoc(postRef, {
              likes: arrayUnion(userId),
            });
            console.log("¡Le diste like a este post!");
            // Actualiza los conteos de likes
            updateLikeCounts(postId);
          }
        }
      } else {
        // Si el usuario no ha iniciado sesión, muestra un mensaje de error
        console.log("Debes iniciar sesión para dar like.");
      }
    });
  });
});


// Función para actualizar los conteos de likes
async function updateLikeCounts(postId) {
  const postRef = doc(db, "posts", postId);
  const postDoc = await getDoc(postRef);
  if (postDoc.exists()) {
    const postData = postDoc.data();
    const likeCountValue = postData.likes ? postData.likes.length : 0;
    const likeCountElement = document.querySelector(`[data-post-id="${postId}"] .likeCount`);
    if (likeCountElement) {
      likeCountElement.textContent = likeCountValue.toString();
    }
  }
}

*/




                          

const likesRef = () => getDocs(doc(db, "posts"));

const likeButtons = document.querySelectorAll(".likeButton");
const likeCounts = document.querySelectorAll(".likePost");

likeButtons.forEach (function(likeButton) {
  likeButton.addEventListener('click', async function() {
    onAuthStateChanged(auth, async function(user) {
      if(user) {
        const userId = user.id;

        const docSnap = await getDoc(likesRef);
        if(docSnap.exists()) {
          const likesData = docSnap.data();
        if(likesData.likes && likesData.likes.includes(userId)){
          console.log("ya le diste likes");
        }else{
          await updateDoc(likesRef, {
            likes: arrayUnion(userId)

          });
          console.log("le diste like a esta publicacion");

          updateLikeCounts();
        }
      }
    }else {
      console.log("Debes inicia sesion");
    }
    });

  });
});
async function updateLikeCounts() {
const docSnap = await getDoc(likesRef);
if (docSnap.exists()) {
  const likesData = docSnap.data();
  const likeCountValues = likesData.likes ? likesData.likes.length: 0;
  likeCounts.forEach(function(likeCount){
likeCount.textContent = likeCountValues.toString();
  });
  
}
  
}


            



                              /*

const  likesRef =doc(db, "posts", "login");

const likeButton = document.querySelectorAll('.likeButton');
const likeCount = document.querySelectorAll('.likeCount');


likeButton.forEach ( btn => {
  btn.addEventListener('click', async function() {

  onAuthStateChanged(auth, async function(user){

    if(user){
      const userId = user.id;
    
      const docSnap = await getDoc(likesRef);

      if (docSnap.exists()) {
        const likesData = docSnap.data();
        if(likesData.likes && likesData.likes.includes(userId)){
          console.log("ya le diste like");
        }else{
          await updateDoc(likesRef, {
            likes: arrayUnion(userId)
          }); 
        
          console.log("le diste like");
          updateLikeCount()
  }
 
    }
 }else{
  console.log("Debes iniciar sesion para dar like");
 }
 
});//

});

});
*/

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
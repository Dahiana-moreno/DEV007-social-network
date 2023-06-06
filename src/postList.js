// TODO LO QUE VIENE DEL TASK FORM PARA PUBLICAR TITULO Y DESCRIPCION

import { saveTask, deleteTask, getTask, updateTask } from "./firebase.js";

const taskForm = document.getElementById('task-form')
let editStatus = false;
let id = '';

taskForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = taskForm['task-title'] //donde quedara guardado los datos de los input
  const content = taskForm['task-content']

  if(!editStatus){
  //  console.log('editando');
  saveTask(title.value, content.value)
  }else{
  updateTask(id,{
    title: title.value,
    content: content.value,
  });
  editStatus = false;
  }
  taskForm.reset();
  

})




//post enviados
const postList = document.querySelector('.caja');


export  const setupPosts = (querySnapshot) => {
if (querySnapshot.length) {
let html = ''
    querySnapshot.forEach(doc => {
  //   console.log(doc);

        const post = doc.data()
        //console.log(post) ;
        const li = `
      
        <div class="list-group-item">
        
            <h3>${post.title}</h3>
            <p>${post.content}</p>

            <diV class="bottons">
            <button class ="btn-likear" data-id ="">likear</button>

            <button class ="btn-delete" data-id ="${doc.id}">Delete</button>
            <button class ="btn-edit" data-id ="${doc.id}">Edit</button>
</div>
        </div>
      <div class="caja">
     
        `
        html += li
    })
  //  console.log('loop posts');
  postList.innerHTML = html
 //console.log(postList);
const btnsDelete =  postList.querySelectorAll('.btn-delete')
//console.log(btnsDelete)
btnsDelete.forEach( btn => {
  btn.addEventListener('click', ({target: { dataset }}) => {
   // console.log(dataset.id)
   deleteTask(dataset.id);

  })
})

const btnsEdit =  postList.querySelectorAll('.btn-edit')

//console.log(btnsDelete)
btnsEdit.forEach (btn => {
  btn.addEventListener('click', async(e) => {
   // console.log(dataset.id)
  const get = await getTask(e.target.dataset.id);
   // console.log(get.data())
   const post = get.data();

  taskForm['task-title'].value = post.title //donde quedara guardado los datos de los input
  taskForm['task-content'].value = post.content

  editStatus = true;
  //id = e.target.dataset.id;
  id = get.id; //
  taskForm['btn-task-save'].innerText = 'Update';  //cambiar eltexto de guardar por editar
  })
})


}else{

   postList.innerHTML = '<h1> Login to see posts </h1>'  // aparecera luego de cerrar sesion

  }
}
 window.addEventListener('DOMContentLoaded', () => {
 })
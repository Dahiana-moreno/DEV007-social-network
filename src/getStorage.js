/*
import { getDownloadURL } from "firebase/storage";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// Función para subir la imagen
function uploadImage() {
    // Obtener referencia al elemento input de tipo file
    const fileInput = document.getElementById('post-image');
  
    // Obtener archivo seleccionado
    const file = fileInput.files[0];
  
    // Crear referencia al archivo en Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + file.name);
  
    // Subir archivo a Firebase Storage
    const uploadTask = uploadBytes(storageRef, file);
  
    // Manejar eventos de progreso, éxito o error
    uploadTask.on('state_changed',
      (snapshot) => {
        // Manejar progreso de la carga (opcional)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Progreso de carga: ' + progress + '%');
      },
      (error) => {
        // Manejar errores de carga
        console.error('Error al subir la imagen: ', error);
      },
      () => {
        // Manejar éxito de la carga
        console.log('Imagen subida exitosamente.');
  
        // Obtener URL de descarga de la imagen
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('URL de descarga de la imagen:', downloadURL);
          // Aquí puedes realizar cualquier acción adicional, como guardar la URL en una base de datos.
        });
      }
    );
  }
  const button = document.querySelector('button');
button.addEventListener('click', uploadImage);

*/
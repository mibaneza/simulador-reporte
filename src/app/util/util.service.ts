import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  swalStartLoading(){
    Swal.fire({
      title: 'Cargando...',
 
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
    
      
      },
    
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
 
  }
  swalWarning(title:string, text:string= " " ){
    
    Swal.fire(
     {
      title,
      text,
      icon: 'warning',
     }
    )
  }
  swalCreate(message:string){
    Swal.fire({
        title: "Registro Exitoso",
        text: message,
        icon: 'success',
       }
      )
  }
  swalErrorRegistro(message:string){
    Swal.fire({
        title: "No se Registro",
        text: message,
        icon: 'error',
       }
      )
  }
  swalClose(){
    Swal.close();
  }

}

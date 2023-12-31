import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CarreraModel, FormDataModel, HttpService, InstitucionModel } from 'src/app/service/http.service';
import { UtilService } from 'src/app/util/util.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormularioComponent implements OnInit{
  formData: FormDataModel  = {
    p_carrera_interes: '',
    p_celular: '',
    p_cod_carrera_cpe: '',
    p_cod_carrera_proc: '',
    p_cod_instituto: '',
    p_dni: '',
    p_genero: '',
    p_materno: '',
    p_nombres: '',
    p_paterno: '',
    p_sel_autorizo: false,
    p_sel_politica: false
  }

  autorizoCheck = false;
  politicaCheck = false;

  sel_politica = `Declaro conocer la Política de Privacidad de la Universidad Científica del Sur y doy 
  mi consentimiento para el tratamiento de los datos personales consignados en este 
  formulario, los cuales son veraces y acepto que cualquier cambio u omisión de 
  aquellos puede dar lugar a la anulación del registro emitido.`;

  sel_autorizo = `Autorizo a la Universidad Científica del Sur a contactarme y enviarme información 
  de los servicios educativos que ofrecen, eventos, promociones y publicidad general.`;

  list_instituto : InstitucionModel[] = [];
  list_carrera_codigo : CarreraModel[] = [];
  list_carreras : CarreraModel[] = [];
  
  constructor(
    private httpService: HttpService,
    private router: Router, 
    private utilService: UtilService 
    ) {}

  async ngOnInit() {
    this.utilService.swalStartLoading();
  //  await this.getCarreras();
  //  await this.getInstitu();
    this.utilService.swalClose();
  }
  onInputChange(event: any) {
    console.log("onInputChange")
    const input = event.target as HTMLInputElement;
    let newValue =  input.value.replace(/e/gi, '');;

    // Remove leading zeros
     newValue = newValue.replace(/^0+/, '');
 
    input.value = newValue ;
  }
  onKeyPress(event: KeyboardEvent) {
    const forbiddenKeys = ['e', 'E', '+', '-'];

    if (forbiddenKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  getInstitu(){
    return new Promise((resolve, reject)=>{
      const observer = {
        next: (data:InstitucionModel[]) => {
          this.list_instituto = data;
          resolve(data);
          console.log(data)
          },
        error: (err:any) => {
          this.utilService.swalClose();
          
          reject(err);
          console.error(err);
        }
      };
      this.httpService.getInstituciones().subscribe(observer)
    })
  }
  getCarreras(){
    return new Promise((resolve, reject)=>{
      const observer = {
        next: (data:CarreraModel[]) => {
          this.list_carreras = data;
          resolve(data);
          console.log(data)
          },
        error: (err:any) => {
          this.utilService.swalClose();
          reject(err);
          console.error(err);
        }
      };
      this.httpService.getCarreraAll().subscribe(observer)
    })
  }
  getCarrera(codigo:string){
    return new Promise((resolve, reject)=>{
      const observer = {
        next: (data:CarreraModel[]) => {
          this.list_carrera_codigo = data;
          resolve(data);
          console.log(data)
          },
        error: (err:any) => {
          reject(err);
          console.error(err);
        }
      };
      this.httpService.getCarreraByCodInsti(codigo).subscribe(observer)
    })
  }

  submitForm(form:any) {
  
   this.formData["p_sel_autorizo"] = this.politicaCheck;
   this.formData["p_sel_politica"] = this.autorizoCheck;
      if(!this.esDireccionEmailValida(form.form.value.p_carrera_interes)){
    this.utilService.swalWarning("Warning..", "Email invalido.");
    return
  }
    if(String(form.form.value.p_dni).length != 8){
      this.utilService.swalWarning("Warning..", "El dni es invalido.");
      return
    }
    if(String(form.form.value.p_celular).length != 9){
      this.utilService.swalWarning("Warning..", "El celular es invalido.");
      return
    }
 
    if(!this.politicaCheck){
      this.utilService.swalWarning("Warning..", "Es necesario aceptar la política de tratamiento de datos personales.");
      return;
    }
   console.log(form.form.status);
   if(form.form.status == "VALID"){
    this.utilService.swalStartLoading();
    const observer = {
      next: (data:any) => {
        this.utilService.swalClose();
        window.localStorage.setItem("formData",JSON.stringify(this.formData) );
        this.router.navigate(['/report'],{skipLocationChange: true});

        },
      error: (err:any) => {+
        this.utilService.swalClose();
        this.utilService.swalErrorRegistro(err.message)
        console.error(err);
      }
    };
    this.httpService.sendFormValidSolicitudPostulante(this.formData).subscribe(observer)
   }else{
    this.utilService.swalWarning("Warning: Campos Obligatorios.", "Los campos del formulario estan vacios.")
   }
 
  }
    esDireccionEmailValida(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

}

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
    await this.getInstitu();
    await this.getCarreras();
    this.utilService.swalClose();
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
    this.utilService.swalStartLoading();
   this.formData["p_sel_autorizo"] = this.politicaCheck;
   this.formData["p_sel_politica"] = this.autorizoCheck;
   if(form.form.status == "VALID"){
    const observer = {
      next: (data:any) => {
        this.utilService.swalClose();
        window.localStorage.setItem("formData",JSON.stringify(this.formData) );
        this.router.navigate(['/report']);

        },
      error: (err:any) => {+
        this.utilService.swalClose();
        this.utilService.swalErrorRegistro(err.message)
        console.error(err);
      }
    };
    this.httpService.sendFormValidSolicitudPostulante(this.formData).subscribe(observer)
   }
 
  }
 
}

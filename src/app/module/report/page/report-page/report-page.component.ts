import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js'
import { CarreraModel, FormDataModel, HttpService, cabecera1, cabecera2, cabecera3, report } from 'src/app/service/http.service';
import { UtilService } from 'src/app/util/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'] 
})
export class ReportPageComponent implements OnInit {
  carrera:any;
  cabecera1:cabecera1;
  cabecera2:cabecera2;
  cabecera3:cabecera3[][] = [];
  list_carreras : CarreraModel[] = [];
  data:report = {
    "cabecera1": [
        {
            "ape_paterno": "mesi",
            "ape_materno": "casillas",
            "nombres": "lionel",
            "dni": "46147773",
            "cod_instituto": "I001",
            "cod_carrera_proc": "1",
            "cod_carrera_cpe": "7",
            "insituto": "CERTUS",
            "carrera_cpe": "ADMINISTRACIÓN DE EMPRESAS"
        }
    ],
    "cabecera2": [
        {
            "convalidados": "12",
            "total": "41"
        }
    ],
    "cabecera3": [
        {
            "id": "1",
            "ciclo": "1",
            "curso": "Desempeño Universitario y Liderazgo",
            "ciclo_convalidado": "1",
            "convalida": "1"
        },
        {
            "id": "3",
            "ciclo": "1",
            "curso": "Fundamentos de Ciencias Sociales",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "2",
            "ciclo": "1",
            "curso": "Introducción a los Negocios Sostenibles",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "4",
            "ciclo": "1",
            "curso": "Matemática Básica",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "7",
            "ciclo": "2",
            "curso": "Análisis de la Realidad Nacional y Ambiental",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "5",
            "ciclo": "2",
            "curso": "Comunicación y Redacción Científica",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "8",
            "ciclo": "2",
            "curso": "Contabilidad",
            "ciclo_convalidado": "2",
            "convalida": "1"
        },
        {
            "id": "6",
            "ciclo": "2",
            "curso": "Dirección  de  Empresas 1",
            "ciclo_convalidado": "2",
            "convalida": "1"
        },
        {
            "id": "9",
            "ciclo": "3",
            "curso": "Economía",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "11",
            "ciclo": "3",
            "curso": "Estadística",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "10",
            "ciclo": "3",
            "curso": "Marketing",
            "ciclo_convalidado": "3",
            "convalida": "1"
        },
        {
            "id": "12",
            "ciclo": "3",
            "curso": "Matemática Financiera de los Negocios",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "14",
            "ciclo": "4",
            "curso": "Costos y Presupuestos",
            "ciclo_convalidado": "4",
            "convalida": "1"
        },
        {
            "id": "15",
            "ciclo": "4",
            "curso": "Dirección de Empresas 2",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "13",
            "ciclo": "4",
            "curso": "Gestión Organizacional",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "16",
            "ciclo": "4",
            "curso": "Investigación de Mercados",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "20",
            "ciclo": "5",
            "curso": "Análisis Financiero",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "18",
            "ciclo": "5",
            "curso": "Comportamiento del Consumidor 3.0",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "17",
            "ciclo": "5",
            "curso": "Gestión y Desarrollo de Recursos Humanos",
            "ciclo_convalidado": "5",
            "convalida": "1"
        },
        {
            "id": "19",
            "ciclo": "5",
            "curso": "Introducción a la Investigación Académica",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "22",
            "ciclo": "6",
            "curso": "Design Thinking",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "21",
            "ciclo": "6",
            "curso": "Métodos Cuantitativos Aplicados a los Negocioso",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "24",
            "ciclo": "6",
            "curso": "Supply Network Management",
            "ciclo_convalidado": "6",
            "convalida": "1"
        },
        {
            "id": "23",
            "ciclo": "6",
            "curso": "Tecnología y Transformación Digital",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "26",
            "ciclo": "7",
            "curso": "Competencias Gerenciales y Negociación",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "27",
            "ciclo": "7",
            "curso": "Derecho Empresarial y Laboral",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "28",
            "ciclo": "7",
            "curso": "Gestión de Operaciones",
            "ciclo_convalidado": "7",
            "convalida": "1"
        },
        {
            "id": "25",
            "ciclo": "7",
            "curso": "Responsabilidad Socioambiental Empresarial",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "30",
            "ciclo": "8",
            "curso": "Business Intelligence",
            "ciclo_convalidado": "8",
            "convalida": "1"
        },
        {
            "id": "29",
            "ciclo": "8",
            "curso": "Dirección Comercial y de Marketing",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "32",
            "ciclo": "8",
            "curso": "Electivo 1",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "31",
            "ciclo": "8",
            "curso": "Formulación y Evaluación de Proyectos",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "34",
            "ciclo": "9",
            "curso": "Dirección Financiera",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "36",
            "ciclo": "9",
            "curso": "Electivo 2",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "35",
            "ciclo": "9",
            "curso": "Gerencia y Planeamiento Estratégico",
            "ciclo_convalidado": "9",
            "convalida": "1"
        },
        {
            "id": "33",
            "ciclo": "9",
            "curso": "Plan de Negocios",
            "ciclo_convalidado": "9",
            "convalida": "1"
        },
        {
            "id": "40",
            "ciclo": "10",
            "curso": "Electivo 3",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "37",
            "ciclo": "10",
            "curso": "Juego de Negocios",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "39",
            "ciclo": "10",
            "curso": "Lean Startup",
            "ciclo_convalidado": null,
            "convalida": null
        },
        {
            "id": "38",
            "ciclo": "10",
            "curso": "Seminario de Tesis",
            "ciclo_convalidado": null,
            "convalida": null
        }
    ],
    "success": true,
    "message": "Successful"
}
  formData:FormDataModel   ;
  /**
   *
   */
  constructor(  private httpService: HttpService, private utilService: UtilService, private routing: Router ) {
    
    
  }
  async ngOnInit()  {
  //  const dni = window.localStorage.getItem("dni");
    this.formData =  JSON.parse( window.localStorage.getItem("formData"));
    const {p_dni} = this.formData;
    if(p_dni){
        this.utilService.swalStartLoading();
      this.data =  await this.getSimuReport(p_dni);
      this.getCarreras()
      if(!this.data) return
      if(this.data.cabecera1.length > 0){
        this.cabecera1 = this.data.cabecera1[0];
      }
      if(this.data.cabecera2.length > 0){
        this.cabecera2 = this.data.cabecera2[0];
      }
      if(this.data.cabecera3.length > 0){
        this.mapCabecera3();
      }
    } 
     
  }
  mapCabecera3(){
    let cabecera3Sub = {};
    for (let index = 0; index < this.data.cabecera3.length; index++) {
      const element = this.data.cabecera3[index];
      if(!!cabecera3Sub[element.ciclo]){
        cabecera3Sub[element.ciclo].push(element);
      }else{
        cabecera3Sub[element.ciclo] = [element]
      }
    }
    for (const key in cabecera3Sub) {
      if (Object.prototype.hasOwnProperty.call(cabecera3Sub, key)) {
        this.cabecera3.push(cabecera3Sub[key])
      }
    }

    console.log("mapCabecera3", this.cabecera3)
 
  }
  getSimuReport(dni:string) : Promise<report>{
    return new Promise((resolve, reject)=>{
      const observer = {
        next: (data:report) => {
          this.utilService.swalClose();
          resolve(data);
          console.log(data)
          },
        error: (err:any) => {
          this.utilService.swalClose();
          Swal.fire({
            title: 'Opps..',
            text: "Ocurrio un error!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
 
            confirmButtonText: 'ok!'
          }).then((result) => {
            if (result.isConfirmed) {
         //     this.routing.navigate(['/home']);
         //     this.routing.navigate(['/home']);
       
            }
          })
       //   this.routing.navigate(['/home']);
          reject(err);
          console.error(err);
        }
      };
      this.httpService.getSimuReport(dni).subscribe(observer)
    })
  }
  getSimuReportCarrera( codigo: string) : Promise<report>{
    this.utilService.swalStartLoading();
    return new Promise((resolve, reject)=>{
      const {p_dni } =  this.formData;
      const observer = {
        next: (data:report) => {
          this.utilService.swalClose();
          resolve(data);
          console.log(data)
          },
        error: (err:any) => {
          this.utilService.swalClose();
          reject(err);
          console.error(err);
        }
      };
      this.httpService.getSimuReportCarreraID( p_dni, codigo ).subscribe(observer)
    })
  }
  getCarreras(){
    return new Promise((resolve, reject)=>{
      const observer = {
        next: (data:CarreraModel[]) => {
          this.list_carreras = data;
          this.utilService.swalClose();
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

 
  convertirPdf(){
    const options = {
      margin: 0,
      filename: 'documento.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a2', orientation: 'portrait',  }
    };
  
    const element = document.getElementById('contentToConvert');
    html2pdf().set(options).from(element).save();
  }


  sendMail() {
    this.utilService.swalStartLoading();
    const options = {
      margin: 0,
      filename: 'documento.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a2', orientation: 'portrait',  }
    };
    const element = document.getElementById('contentToConvert');
    return new Promise(async(resolve, reject)=>{
      const {p_carrera_interes:mail } =  this.formData;
      const observer = {
        next: (data:report) => {
          this.utilService.swalClose();
          resolve(data);
          console.log("sendEmail",data)
          },
        error: (err:any) => {
          this.utilService.swalClose();
          reject(err);
          console.error(err);
        }
      };
 
      html2pdf().set(options).from(element).outputPdf('blob').then((pdfObject) => {
          // Crear un Blob a partir del contenido binario
          const blob = new Blob([pdfObject], { type: 'application/pdf' });

          let files = new File( [blob] , 'documento.pdf', { type: 'application/pdf' });
          let formData = new FormData();
          formData.append("file", files ); // 0 = only a file
          formData.append("mail", mail);
          console.log("formData",formData)
          this.httpService.sendEmail(formData).subscribe(observer);
      }).catch(error=>{
        console.log(error);
         
      });
     
    })
  }
 PdfToFile():Promise<File[] >{
    const options = {
      margin: 0,
      filename: 'documento.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a2', orientation: 'portrait',  }
    };
  
    const element = document.getElementById('contentToConvert');
   return new Promise((resolve, reject)=>{
    html2pdf().set(options).from(element).outputPdf('blob').then((pdfObject) => {
      const file = new File(pdfObject, 'documento.pdf', { type: 'application/pdf' });
      resolve( [file]);
    }).catch(error=>{
      console.log(error);
      resolve([]);
    });
   });
 

  
  }
}

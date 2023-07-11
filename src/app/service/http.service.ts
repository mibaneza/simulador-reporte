import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  URL = `${environment.HOST}`;
  URL_2 = `${environment.HOST_2}`;

  constructor(private http: HttpClient) { }

  getCarreraAll() { return this.http.get<CarreraModel[]>(this.URL+"/carreras"); }
  getCarreraByCodInsti(inst:string) { return this.http.get<CarreraModel[]>(this.URL+"/carreras/"+inst); }
  getInstituciones() { return this.http.get<InstitucionModel[]>(this.URL+"/carreras"); }
  
  sendFormValidSolicitudPostulante(formData : FormDataModel ){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams() 
    .set('p_paterno', formData['p_paterno'])
    .set('p_materno', formData['p_materno'])
    .set('p_nombres', formData['p_nombres'])
    .set('p_carrera_interes', formData['p_carrera_interes'])
    .set('p_genero', formData['p_genero'])
    .set('p_celular', formData['p_celular'])
    .set('p_dni', formData['p_dni'])
    .set('p_cod_instituto', formData['p_cod_instituto'])
    .set('p_cod_carrera_proc', formData['p_cod_carrera_proc'])
    .set('p_cod_carrera_cpe', formData['p_cod_carrera_cpe'])
    .set('p_sel_politica', formData['p_sel_politica'])
    .set('p_sel_autorizo', formData['p_sel_autorizo']);
     return this.http.post(this.URL+"/postulantes", body.toString(), { headers })
  }

  getSimuReport(dni:string){ 
    return this.http.get<report>(this.URL_2+"/simu/reportes/"+dni); 
  }
  
  
  getSimuReportCarreraID(dni:string, carreraId:string){ 
    return this.http.get<report>(this.URL_2+"/simu/reportes/"+dni+"/"+carreraId); 
  }
  

}

export interface CarreraModel {
  id: string,
  nombre: string,
  cod_carrera: string,
  tab_tipos: string,
  cod_institucion: string
}

export interface InstitucionModel {
  nombre: string,
  codigo: string,
  tab_tipos: string
}

export interface FormDataModel {
  p_paterno : string;
  p_materno : string;
  p_nombres : string;
  p_carrera_interes : string;
  p_genero : string;
  p_celular : string;
  p_dni : string;
  p_cod_instituto : string;
  p_cod_carrera_proc : string;
  p_cod_carrera_cpe : string;
  p_sel_politica : boolean;
  p_sel_autorizo : boolean;
}
export interface cabecera1{
  "ape_paterno": string,
  "ape_materno": string,
  "nombres": string,
  "dni": string,
  "cod_instituto": string,
  "cod_carrera_proc":string,
  "cod_carrera_cpe":string,
  "insituto": string,
  "carrera_cpe": string
}
export interface cabecera2{
  "convalidados": string,
  "total": string
}
export interface cabecera3{
  "id": string,
  "ciclo": string,
  "curso": string,
  "ciclo_convalidado": string|null,
  "convalida": string|null
}
export interface report {
  cabecera1 :cabecera1[];
  cabecera2 : cabecera2[];
  cabecera3 : cabecera3[];
  "success": boolean,
  "message": string
}
import { Component, OnDestroy, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'crtl-asistencias';
  jwt:string="awd"
  jwtOrigin:string="awd"
  isQr:boolean = false;
  constructor( ) {
 
    
  }
  ngOnDestroy(): void {
 
  }
  ngOnInit(): void {
 
  }
  tempVisible(){
    this.isQr = false;
    setTimeout(() => { 
      this.isQr = true;
    }, 100);
  }
}

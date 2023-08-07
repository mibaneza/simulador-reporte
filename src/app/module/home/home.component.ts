import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CarreraModel, FormDataModel, HttpService, InstitucionModel } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  screenWidth?: number ;
  widthImg:number = 300;
  ngOnInit(): void {
   
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(window.innerWidth <= 575 ){
      this.widthImg = 200;
    }
    if(window.innerWidth >= 576   ){
      this.widthImg = 300;
    }
    console.log(this.screenWidth)
  }
}

 

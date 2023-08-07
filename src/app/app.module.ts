import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './module/home/home.module';
import { ReportModule } from './module/report/report.module';
import { NumCelularDirective } from './directive/num-celular.directive';
 
@NgModule({
  declarations: [
    AppComponent,
    NumCelularDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    ReportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

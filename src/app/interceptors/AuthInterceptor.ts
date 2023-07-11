import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { catchError,tap} from 'rxjs/operators';
 
 
/*
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry'; // don't forget the imports
*/

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor( ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = window.localStorage.getItem("token");
    if (token) {
     
      const cloned = request.clone({
        setHeaders: {
          Authorization: "Bearer " + token,
        },
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    } 
   }
  }
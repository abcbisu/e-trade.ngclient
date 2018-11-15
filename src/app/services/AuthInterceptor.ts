import { Core } from "./../Handlers/Core";
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private core: Core) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //select token
    if (this.core.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          token: this.core.getSessionToken()
        }
      });
    }

    let language = this.core.getLanguage();
    //select language
    req = req.clone({ setHeaders: { language: JSON.stringify(language) } });
    return next.handle(req);
  }
}

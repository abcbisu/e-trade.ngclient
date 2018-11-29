import { Core } from "./../Handlers/Core";
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Language } from "../Models/Language";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private core: Core) {}
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.core.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          "eiipl-token": this.core.getSessionToken()
        }
      });
    }

    let otherConfig:any = null;// other-configs
    let language:Language = this.core.getLanguage();
    if (language) {
      if(!otherConfig) {
        otherConfig = {};
      }
      otherConfig.language = {
          Id: language.Id,
          Code: language.Code
        };
    }

    // convert to base64
    if (otherConfig && Object.keys(otherConfig).length > 0) {
      let _btoa:string = btoa(JSON.stringify(otherConfig));
      req = req.clone({ setHeaders: { "eiipl-other-configs": _btoa } });
    }
    return next.handle(req);
  }
}

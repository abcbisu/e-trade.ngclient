import { Core } from 'app/Handlers/Core';
import { LoginData } from "./../Models/LoginData";
import { DataService } from "./data.service";
import {
  NotSupportedException,
  NullReferenceException,
  LoginRequiredException
} from "./../Exceptions/AppException";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { serviceErrorHandler } from "../Handlers/serviceErrorHandler";

@Injectable({
  providedIn: "root"
})
export class AuthService extends DataService {
  private _http: Http;
  private _srvErrHndlr: serviceErrorHandler;
  constructor(http: Http,private core: Core,srvErrHndlr: serviceErrorHandler) {
    super(http, srvErrHndlr);
    this._http = http;
    this._srvErrHndlr = srvErrHndlr;
  }

  public login(userId: string, password: string) {
    return this._http
      .post(this.buildUrl( "citizens/login"), { UserId: userId, Password: password })
      .map(t => {
        this.core.setLoginData(t.json() as LoginData);
        return t.json();
      })
      .catch(this._srvErrHndlr.handleError);
  }

  public logOut() {
    return this._http
      .get(this.buildUrl( "citizens/logout"))
      .map(t => {
        this.core.removeLoginData();
        return t.json();
      })
      .catch(this._srvErrHndlr.handleError);
  }
}

import { Core } from "app/Handlers/Core";
import { UserToken, RspLogin } from "./../Models/LoginData";
import { DataService } from "./data.service";
import { Injectable } from "@angular/core";
import { ServiceErrorHandler } from "../Handlers/serviceErrorHandler";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private core: Core,
    private srvErrHndlr: ServiceErrorHandler,
    private dataSrv: DataService
  ) {}

  public tryTologin(
    identity: string,
    password: string,
    idType: number
  ): Observable<RspLogin> {
    return this.http
      .post<RspLogin>(this.dataSrv.buildUrl("api/v1/users/login"), {
        Idntity: identity,
        Password: password,
        IdType: idType
      })
      .catch(this.srvErrHndlr.handleError);
  }
  public LoginWithOtp(
    otp: string,
    identiy: string,
    idType: number
  ): Observable<UserToken> {
    return this.http
      .post<UserToken>(this.dataSrv.buildUrl("api/v1/users/LoginWithOtp"), {
        Idntity: identiy,
        Otp: otp,
        IdType: idType
      })
      .catch(this.srvErrHndlr.handleError);
  }

  public logOut() {
    return this.http
      .get(this.dataSrv.buildUrl("api/v1/users/logout"))
      .catch(this.srvErrHndlr.handleError);
  }
}

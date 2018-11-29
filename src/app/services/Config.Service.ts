import { Observable } from "rxjs";
import { Language } from "./../Models/Language";
import { Core } from "app/Handlers/Core";
import { DataService } from "./data.service";
import { Injectable } from "@angular/core";
import { ServiceErrorHandler } from "../Handlers/serviceErrorHandler";
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: "root"
})
export class ConfigService {
    constructor(private http: HttpClient,private core: Core,private srvErrHndlr: ServiceErrorHandler,private dataSrv: DataService) { 
    }
    public getSupprotedLanguages(): Observable<Language[]> {
        return this.http
          .get<Language[]>(
            this.dataSrv.buildUrl("api/v1/Configs/SupportedLanguages")
          )
          .catch(this.srvErrHndlr.handleError);
    }
}
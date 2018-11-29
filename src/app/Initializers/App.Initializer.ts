import { DataService } from "./../services/data.service";
import { AppException } from "./../Exceptions/AppException";
import { ConfigService } from "./../services/Config.Service";
import { Core } from "app/Handlers/Core";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Language } from "../Models/Language";
import { reject } from "q";
@Injectable({
    providedIn: "root"
})
export class AppInitializer {
    constructor(private http: HttpClient, private core: Core, private config: ConfigService, private dataSrv: DataService) {

    }
    public init(): Promise<any> {
       return this.config.getSupprotedLanguages()
       .toPromise()
       .then(ls=> {
            this.core.setAvailableLanguages(ls as Language[]);
            let defLanguages: Language[] = (ls as Language[]).filter(t => t.IsNatural === true);
            if (defLanguages.length <= 0) {
                return reject(new AppException("Default Language not found"));
            }
           var previousLang = this.core.getDefaultLanguage();
           if (!previousLang) {
                this.core.setDefaulLanguage(defLanguages[0]);
            }
           return ls;
       })
       .catch(t=> {
                alert("Error while bootstraping configuration: "+(t as AppException).message);
       });
    }
}
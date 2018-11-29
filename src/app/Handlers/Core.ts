import { Language } from "./../Models/Language";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { throwError, observable } from "rxjs";
import { appConfig } from "./../config.app";
import {
    NotSupportedException,
    NullReferenceException,
    LoginRequiredException,
    AppException
} from "./../Exceptions/AppException";
import { LoginData } from "../Models/LoginData";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class Core {
  private _sessionKey: string;
  private _naturalLangKey: string;
  private _availableLanguageskey:string;
  private _this: Core;
  constructor() {
    this._sessionKey = appConfig.appSetting._sessionStorageKey;
    this._naturalLangKey = appConfig.appSetting._naturalLanguageKey;
    this._availableLanguageskey=appConfig.appSetting._availableLanguageskey;
    this._this = this;
  }

  //#region public methods observable obsoleted
  // public isAuthenticated(): Observable<boolean> {
  //   return Observable.create(function(oserver) {
  //     let res: boolean = false;
  //     try {
  //       res = this._isAuthenticated() as boolean;
  //       oserver.next(res);
  //     } catch (e) {
  //       oserver.error(e);
  //     }
  //   });
  // }
  // public getNameOfUser(): Observable<string> {
  //   return Observable.create(function(oserver) {
  //     try {
  //       oserver.next(this._getNameOfUser() as string);
  //     } catch (e) {
  //       oserver.error(e);
  //     }
  //   });
  // }
  // public getSessionToken(): Observable<string> {
  //   return Observable.create(function(oserver) {
  //     try {
  //       oserver.next(this._getSessionToken() as string);
  //     } catch (e) {
  //       oserver.error(e);
  //     }
  //   });
  // }
  // public setLoginData(loginData: LoginData): Observable<boolean> {
  //   return Observable.create(function(oserver) {
  //     try {
  //       oserver.next(this._setLoginData(loginData));
  //     } catch (e) {
  //       oserver.error(e);
  //     }
  //   });
  // }
  // public removeLoginData(): Observable<boolean> {
  //   return Observable.create(function(oserver) {
  //     try {
  //       oserver.next(this._removeLoginData());
  //     } catch (e) {
  //       oserver.error(e);
  //     }
  //   });
  // }
  // public getLanguage(): Observable<Language> {
  //   return Observable.create(function(oserver) {
  //     try {
  //       let langData: Language = this._getNaturalLanguage();
  //       if (this._isAuthenticated()) {
  //         let data = this._getLoginData() as LoginData;
  //         if (data && data.language) {
  //           langData = data.language;
  //         }
  //       }
  //       oserver.next(langData);
  //     } catch (e) {
  //       oserver.error(e);
  //     }
  //   });
  // }
  // public setNaturalLanguage(language: Language): Observable<Language> {
  //   return Observable.create(function(oserver) {
  //     try {
  //       this._setSessionData(this._naturalLangKey, language);
  //       oserver.next(language);
  //     } catch (e) {
  //       oserver.error(language);
  //     }
  //   });
  // }
  //#endregion

  //#region public methods
  public isAuthenticated(): boolean {
    return this._isAuthenticated() as boolean;
  }
  public getNameOfUser(): string {
    return this._getNameOfUser() as string;
  }
  public getSessionToken(): string {
    return this._getSessionToken() as string;
  }
  public setLoginData(loginData: LoginData): boolean {
    return this._setLoginData(loginData);
  }
  public removeLoginData(): Observable<boolean> {
    return Observable.create(function(oserver) {
      try {
        oserver.next(this._removeLoginData());
      } catch (e) {
        oserver.error(e);
      }
    });
  }
  public getLanguage(): Language {
    let langData: Language = this._getNaturalLanguage();
    return langData;
  }
  public setDefaulLanguage(language: Language): void {
    this._setSessionData(this._naturalLangKey, language);
  }
  public getDefaultLanguage(): Language{
    return this._getSessionData$<Language>(this._naturalLangKey,t=>
      {
        if(t) {
          return JSON.parse(t);
        }
        return null;
      });
  } 
  public getAvailableLanguages(): Language[] {
    this._validateSessionSupport();
    return  this._getSessionData$<Language[]>(this._availableLanguageskey,t=>{
      return JSON.parse(t);
    });
  }
  public setAvailableLanguages(languges: Language[]): void {
    this._setSessionData(this._availableLanguageskey, languges);
  }
  //#endregion

  //#region private field
  private _getNaturalLanguage(): Language {
    this._validateSessionSupport();
    return this._getSessionData$<Language>(this._naturalLangKey, t => {
      return JSON.parse(t) as Language;
    });
  }
  private _getLoginData(): LoginData {
    if (typeof sessionStorage == "undefined") {
      throw new NotSupportedException("Web Storage not supported");
    }

    let data = sessionStorage.getItem(this._sessionKey);
    if (data != null) {
      return JSON.parse(data) as LoginData;
    }
    return null;
  }
  private _isAuthenticated(): boolean {
    return !this._isTokenExpried();
  }
  private _isTokenExpried(): boolean {
    let dta = this._getLoginData();
    let curDate = new Date();
    if (dta == null) {
      return true;
    } else {
      if (dta.expiredOn < curDate) {
        return true;
      }
      return false;
    }
  }
  private _getNameOfUser(): string {
    if (this._isAuthenticated()) {
      let dta = this._getLoginData();
      return dta.name;
    }
    throw new LoginRequiredException();
  }
  private _getSessionToken(): string {
    if (this._isAuthenticated()) {
      let dta = this._getLoginData();
      return dta.token;
    }
    throw new LoginRequiredException();
  }
  private _setLoginData(loginData: LoginData): boolean {
    if (loginData == null) {
      throw new NullReferenceException("Login can not be null");
    }
    this._validateSessionSupport();
    this._setSessionData(this._sessionKey, loginData);
    return true;
  }
  private _removeLoginData(): boolean {
    if (typeof sessionStorage == "undefined") {
      throw new NotSupportedException("Web Storage not supported");
    }
    sessionStorage.removeItem(this._sessionKey);
    return true;
  }
  private _validateSessionSupport() {
    if (typeof sessionStorage == "undefined") {
      throw new NotSupportedException("Web Storage not supported");
    }
  }
  private _setSessionData(key: string, value: any) {
    this._validateSessionSupport();
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  private _getSessionData(key: string): string {
    this._validateSessionSupport();
    return sessionStorage.getItem(key);
  }
  private _getSessionData$<T>(key: string, converter: (arg: any) => T) {
    return converter(this._getSessionData(key));
  }
  private _clearSessionData() {
    this._validateSessionSupport();
    return sessionStorage.clear();
  }
  //#endregion
}


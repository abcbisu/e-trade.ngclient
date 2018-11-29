import { ServiceErrorHandler } from "./../Handlers/serviceErrorHandler";
import { appConfig } from "./../config.app";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private server: string = appConfig.hostEndPoint;
  constructor(private http: HttpClient,private srvErrHndlr:ServiceErrorHandler) {}

  public get(url: string) {
    return this.http
      .get(this.buildUrl(url))
      .catch(this.srvErrHndlr.handleError);
  }

  public create(url: string, resource) {
    return this.http
      .post(this.buildUrl(url), JSON.stringify(resource))
      .catch(this.srvErrHndlr.handleError);
  }

  public update(url: string, resource) {
    return this.http
      .patch(this.buildUrl(url), JSON.stringify({ isRead: true }))
      .catch(this.srvErrHndlr.handleError);
  }

  public delete(url: string,id) {
    return this.http
      .delete(this.buildUrl(url))
      .catch(this.srvErrHndlr.handleError);
  }
  public buildUrl(url: string): string {
    // url starts with "/", remove "/"
    if (url.trim().indexOf("/") == 0) {
      url = url.substr(1, url.length);
    }
    // if url ends with "/", remove "/"
    if (this.server.lastIndexOf("/") === this.server.length - 1) {
      this.server = this.server.substring(0, this.server.length - 1);
    }
    return this.server + "/" + url;
  }
}

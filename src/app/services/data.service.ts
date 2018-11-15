import { serviceErrorHandler } from './../Handlers/serviceErrorHandler';
import { appConfig } from './../config.app';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Http } from '@angular/http';

@Injectable({
  providedIn: "root"
})
export class DataService {
  private server: string = appConfig.hostEndPoint;
  constructor(private http: Http,private srvErrHndlr:serviceErrorHandler) {}

  public get(url: string) {
    return this.http
      .get(this.buildUrl(url))
      .map(response => response.json())
      .catch(this.srvErrHndlr.handleError);
  }

  public create(url: string, resource) {
    return this.http
      .post(this.buildUrl(url), JSON.stringify(resource))
      .map(response => response.json())
      .catch(this.srvErrHndlr.handleError);
  }

  public update(url: string, resource) {
    return this.http
      .patch(this.buildUrl(url), JSON.stringify({ isRead: true }))
      .map(response => response.json())
      .catch(this.srvErrHndlr.handleError);
  }

  public delete(url: string,id) {
    return this.http
      .delete(this.buildUrl(url))
      .map(response => response.json())
      .catch(this.srvErrHndlr.handleError);
  }
  public buildUrl(url: string): string {
    //url starts with '/', remove '/'
    if (url.trim().indexOf("/") == 0) {
      url = url.substr(1, url.length);
    }
    //if url ends with '/', remove '/'
    if (this.server.lastIndexOf("/") === this.server.length - 1) {
      this.server = this.server.substring(0, this.server.length - 1);
    }
    return this.server + "/" + url;
  }
  
}

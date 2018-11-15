import { AppException } from './../../Exceptions/AppException';
import { Core } from './../../Handlers/Core';
import { AuthService } from './../../services/Auth.Service';
import { Component, enableProdMode } from '@angular/core';
import { detectBody } from '../../app.helpers';

declare var jQuery:any;

@Component({
  selector: "layout",
  templateUrl: "Layout.template.html",
  host: {
    "(window:resize)": "onResize()"
  }
})
export class LayoutComponent {
  //#region  global variables
  IsAuthenticated: boolean = false;
  //#endregion

  constructor(private _core: Core) {}
  public ngOnInit(): any {
    detectBody();
    try{
    this.IsAuthenticated = this._core.isAuthenticated();
    }catch(e){
      alert('error: '+e);
    }
  }

  public onResize() {
    detectBody();
  }
}
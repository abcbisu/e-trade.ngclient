import { AuthService } from "./../../../services/Auth.Service";
import { Component } from "@angular/core";
import { smoothlyMenu } from "../../../app.helpers";
import { Core } from "app/Handlers/Core";
declare var jQuery: any;

@Component({
  selector: "topnavbar",
  templateUrl: "topnavbar.template.html"
})
export class TopNavbarComponent {
  //#region
  IsAuthenticated: boolean = false;
  //#endregion
  constructor(private auth: AuthService, private core: Core) {}
  public ngOnInit(): any {

    //load is authenticated?
    try{
    this.IsAuthenticated = this.core.isAuthenticated();
  }catch(e){
    alert('error :'+e);
  }
  }
  public toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }
}

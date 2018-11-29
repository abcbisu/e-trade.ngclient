import { Language } from './../../../Models/Language';
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
  //#region global valiables
  public IsAuthenticated: boolean = false;
  public AllAvailableLanguages: Language[] = [];
  public SelectedLanguage: Language = null;
  //#endregion
  constructor(private auth: AuthService, private core: Core) {}
  public ngOnInit(): any {
    this.AllAvailableLanguages = this.core.getAvailableLanguages();
    this.SelectedLanguage = this.core.getDefaultLanguage();
  }
  public onLanguageChange($event):void{
    var selectedLang: Language = this.AllAvailableLanguages.filter(t => t.Id == $event.target.value)[0];
    if (selectedLang){
      this.core.setDefaulLanguage(selectedLang);
      window.location.reload();
    }
  }
  public toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }
}

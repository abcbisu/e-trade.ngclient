import { Core } from "app/Handlers/Core";
import { UserToken, LoginData } from "./../../Models/LoginData";
import { AuthService } from "./../../services/Auth.Service";
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "login.template.html"
})
export class LoginComponent {
  /**
   *
   */
  constructor(private auth: AuthService, private core: Core) {}
  public loading = false;
  public loginError = { hasError: false, errorMsg: "" };
  public activeForm: string = "login";
  public selectedIdType: string = "email";
  public loginForm = new FormGroup({
    Password: new FormControl("", [Validators.required]),
    Identity: new FormControl("", [Validators.required]),
    IdType: new FormControl("", [Validators.required])
  });
  public OTPForm = new FormGroup({
    placeOtp: new FormControl("", [Validators.required])
  });
  public onSubmit(): void {
    this.loading = true;
    this.auth
      .tryTologin(
        this.loginForm.value.Identity,
        this.loginForm.value.Password,
        this.loginForm.value.IdType
      )
      .subscribe(
        r => {
          if (r.HasPendingCommand === true) {
            if (r.PendingCommnad === "vrf-otp") {
              this.toggleToOtpView();
            } else {
              throw "Command: " + r.PendingCommnad + " not supproted";
            }
          } else if (r.HasPendingCommand === false && r.Exec === true) {
            // login successfull
            this.onSuccessfullLogin(r.Result as UserToken);
          }
        },
        t => {
          console.log(t);
        }
      );
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  }
  public onLoginViaOtp(): void {
    var otp: string = this.OTPForm.value.placeOtp;
    var idntity: string = this.loginForm.value.Identity;
    var idType: number = this.loginForm.value.IdType;
    this.auth.LoginWithOtp(otp, idntity, idType).subscribe(t => {
      this.onSuccessfullLogin(t);
    });
    console.log(this.OTPForm);
  }
  private toggleToOtpView(): void {
    this.activeForm = "otp";
  }
  public onSuccessfullLogin(tok: UserToken): void {
    let loginData: LoginData = new LoginData();
    loginData.expiredOn = tok.ExpiredOn;
    loginData.token = tok.Token;
    this.core.setLoginData(loginData);
    console.log("logged in successfully");
  }
  public onChangeIdType($event):void{
    this.selectedIdType=$event.target.value;
  }
}

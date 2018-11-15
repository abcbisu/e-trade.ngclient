import { AuthService } from './../../services/Auth.Service';
import { Component } from "@angular/core";
import {  FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "login.template.html"
})
export class LoginComponent {
  /**
   *
   */
  constructor(private auth: AuthService) {}
  public loading = false;
  public loginError={hasError:false,errorMsg:""};
  loginForm = new FormGroup({
    password: new FormControl("", [Validators.required]),
    userId: new FormControl("", [Validators.required])
  });

  public onSubmit(): void {
    this.loading = true;
    this.auth.login(this.loginForm.value.userId, this.loginForm.value.password)
    .subscribe(r=>{
      if(!r){
        
      }
    });
    setTimeout(() => {

      this.loading=false;
    }, 5000);
  }
}

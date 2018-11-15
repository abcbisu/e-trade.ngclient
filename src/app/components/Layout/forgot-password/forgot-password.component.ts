import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent  {
  public activeForm="s";//s=>sendOtp, r=>recover form
  public sendCodeType="true";
  passMatcher: any;
  checkStatus: boolean = false;
  public SendOtpToMobile = new FormGroup({
    mobileNo:new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)
      , Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  });
  public SendOtpToEmail = new FormGroup({
    emailAddress:new FormControl("",[Validators.required,Validators.email]),
  });
  public RecoverPass=new FormGroup({
    placeOtp:new FormControl("",[Validators.required]),
    newPassword:new FormControl("",[Validators.required, Validators.minLength(5)]),
    confPassword:new FormControl("",[Validators.required])
  });
  public nextBtn={
    waiting:true
  };
  public SendOtpFormState={
    waiting:true
  };
  //#region private methods helpers
  private toggleForm() {
    this.activeForm=this.activeForm==="s"?"r":"s";
    if(this.activeForm==="r") {
      let x:any=this;
      setTimeout(() => {
        x.SendOtpFormState.waiting=false;
      }, 4000);
      x.SendOtpFormState.waiting=true;
    }
  }
  get mobileNo() {
    return this.SendOtpToMobile.get("mobileNo");
  }
  get email() {
    return this.SendOtpToEmail.get("emailAddress");
  }
  get otp() {
    return this.RecoverPass.get("placeOtp");
  }
  get password() {
    return this.RecoverPass.get("newPassword");
  }
  get confirmPassword() {
    return this.RecoverPass.get("confPassword");
  }
  checkPassword() {
    this.RecoverPass.get("newPassword").value === this.RecoverPass.get("confPassword").value ?
      this.passMatcher = true : this.passMatcher = false;
      if(this.passMatcher === false ){
        this.RecoverPass.get("confPassword").setErrors({MatchPassword: true});
      } 
  };
  changeNextBtnWtngState(){
    let x:any=this;
    if (x.SendOtpToMobile.status === "VALID" || x.SendOtpToEmail.status === "VALID"){
      x.nextBtn.waiting=false;
    }
    if (x.SendOtpToMobile.status === "INVALID" && x.SendOtpToEmail.status === "INVALID"){
      x.nextBtn.waiting=true;
    }
  }
  //#endregion
  //#region envent hadlers
  sendOTPToMobile() {
    //next button disable
     setTimeout(() => {
       let curDate:Date=new Date();
      let expiredOn:Date=new Date();
      expiredOn.setHours(expiredOn.getHours()+1);//add one houre
      let NextResend:Date=new Date();
      NextResend.setMinutes(NextResend.getMinutes()+1);//add one minute
      let reult={
        isSent:true,
        expiredOn:expiredOn,
        nextResend:NextResend
       };
       //toggle form to input otp
       this.toggleForm();
       //disable resend otp buttton
       setTimeout(() => {
         //enable resend otp buttton
       },reult.nextResend.getTime()-curDate.getTime());
     }, 2000);
  };
  sendOTPToEmail() {
    setTimeout(() => {
      this.toggleForm();
    }, 2000);
  };
  recoverPassWord(){
    if (this.RecoverPass.status === "INVALID") {
      this.checkStatus = true;
    }
    else {
      this.checkStatus = false;
    }
  };
  //#endregion
  setsendCodeType(sendcode: string) {
    this.sendCodeType = sendcode;
  }

}

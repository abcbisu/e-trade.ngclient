import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  public Registration: FormGroup;
  passMatcher: any;
  docTypeVal = "0";
  checkStatus: boolean = false;
  languages = [
    { id: 1, lang: "English" },
    { id: 2, lang: "Bengali" },
  ];
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.Registration = this._fb.group({
      mobileNo: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)
        , Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      email: new FormControl("", [Validators.email]),
      documentTypeDropDwn: new FormControl("", []),
      documentNo: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl("", [Validators.required]),
      fullNames: this._fb.array([])
    });
    let control: FormArray = <FormArray>this.Registration.controls.fullNames;
    let fb: FormBuilder = this._fb;
    this.languages.forEach(function (vald) {
      let obj: any = {};
      obj.fullName = new FormControl("", [Validators.required]);
      obj.langid = new FormControl(vald.id, []);
      let frmGroup: FormGroup = fb.group(obj);
      control.push(frmGroup);
    });
  }
  //#region ligacy codes

  isValidFullName(langId: number): boolean {
    let xx: FormGroup = (this.Registration.controls.fullNames as FormArray).controls.filter(t => {
      let dd: FormGroup = t as FormGroup;
      if (dd.value.langid === langId) {
        return true;
      }
    })[0] as FormGroup;
    let ctrl: FormControl = xx.controls.fullName as FormControl;
    return ctrl.touched && ctrl.invalid;
  }
  checkPassword() {
    this.Registration.get("password").value === this.Registration.get("confirmPassword").value ?
      this.passMatcher = true : this.passMatcher = false;
      if(this.passMatcher === false ){
        this.Registration.get("confirmPassword").setErrors({MatchPassword: true});
      } 
  };
  docDrpChngEvnt(event) {
    this.docTypeVal = event.target.value;
  };
  registerUser() {
    console.log(this.Registration);
    if (this.Registration.status === "INVALID") {
      this.checkStatus = true;
    }
    else {
      this.checkStatus = false;
    }
  };
  get fullName() {
    return this.Registration.get("fullName");
  }
  get mobileNo() {
    return this.Registration.get("mobileNo");
  }
  get email() {
    return this.Registration.get("email");
  }
  get documentTypeDropDwn() {
    return this.Registration.get("documentTypeDropDwn");
  }
  get documentNo() {
    return this.Registration.get("documentNo");
  }
  get password() {
    return this.Registration.get("password");
  }
  get confirmPassword() {
    return this.Registration.get("confirmPassword");
  }
  //#endregion

  //#region localization
  selectedLangugeId = 2;
  localizedSource = {
    "L001": {
      label: {
          "1": {
            "1": "full name english L",
            "2": "full name bengali L"
          },
          2: {
            1: "পূর্ণ নাম (english) L",
            2: "পূর্ণ নাম (বাংলা) L",
          }
      }, placeholder: {
          "1": {
            "1": "full name english p",
            "2": "full name bengali p"
          },
          2: {
            1: "পূর্ণ নাম (english) p",
            2: "পূর্ণ নাম (বাংলা) p",
          }
      }
    }
  }
getLocalText(code:string,holderType:string,currLangId:number,expressionLangId:number):string{
  return this.localizedSource["L001"][holderType][currLangId][expressionLangId];
}
//#endregion

}

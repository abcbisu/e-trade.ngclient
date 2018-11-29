import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.css']
})
export class NewApplicationComponent implements OnInit {

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  checkStatus: boolean = false;
  public NewApplication: FormGroup;
  public NewApplicationDocuments: FormGroup;
  public activeForm = "details";
  loading: boolean = false;
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  languages = [
    { id: 1, lang: "English" },
    { id: 2, lang: "Bengali" },
  ];
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.NewApplication = this._fb.group({
      issuingAuthority: new FormControl("", [Validators.required]),
      tradeNames: this._fb.array([]),
      holdingNos: this._fb.array([]),
      addresses: this._fb.array([]),
      roads: this._fb.array([]),
      businessRegion: new FormControl("", [Validators.required]),
      businessWard: new FormControl("", [Validators.required]),
      businessLocation: new FormControl("", [Validators.required]),
      marketName: new FormControl("", []),
      floorNo: new FormControl("", []),
      shopNo: new FormControl("", []),
      // businessStartDt: new FormControl("", [Validators.required]),
      businessNature: new FormControl("", [Validators.required]),
      businessType: new FormControl("", [Validators.required]),
      businessSubType: new FormControl("", [Validators.required]),
      signbrdLnth: new FormControl("", []),
      signbrdWidth: new FormControl("", []),
      isIndustry: new FormControl("", [Validators.required]),
      isChemOrExplosv: new FormControl("", [Validators.required]),
      isGovOrPrivt: new FormControl("", [Validators.required]),
      isCommercialOrResidential: new FormControl("", [Validators.required]),
      isRentedOrOwnership: new FormControl("", [Validators.required]),
      isWholesalerOrRetailer: new FormControl("", [Validators.required]),
      businessDescription: new FormControl("", [Validators.required])
    });
    let control: FormArray = <FormArray>this.NewApplication.controls.tradeNames;
    let controlHolding: FormArray = <FormArray>this.NewApplication.controls.holdingNos;
    let controlAddress: FormArray = <FormArray>this.NewApplication.controls.addresses;
    let controlRoad: FormArray = <FormArray>this.NewApplication.controls.roads;
    let fb: FormBuilder = this._fb;
    let fb1: FormBuilder = this._fb;
    let fb2: FormBuilder = this._fb;
    let fb3: FormBuilder = this._fb;
    this.languages.forEach(function (vald) {
      let obj: any = {};
      obj.tradeName = new FormControl("", [Validators.required]);
      obj.langid = new FormControl(vald.id, []);
      let frmGroup: FormGroup = fb.group(obj);
      control.push(frmGroup);
    });
    this.languages.forEach(function (vald) {
      let obj: any = {};
      obj.holdingNo = new FormControl("", [Validators.required]);
      obj.langid = new FormControl(vald.id, []);
      let frmGroup: FormGroup = fb1.group(obj);
      controlHolding.push(frmGroup);
    });
    this.languages.forEach(function (vald) {
      let obj: any = {};
      obj.address = new FormControl("", [Validators.required]);
      obj.langid = new FormControl(vald.id, []);
      let frmGroup: FormGroup = fb2.group(obj);
      controlAddress.push(frmGroup);
    });
    this.languages.forEach(function (vald) {
      let obj: any = {};
      obj.road = new FormControl("", [Validators.required]);
      obj.langid = new FormControl(vald.id, []);
      let frmGroup: FormGroup = fb3.group(obj);
      controlRoad.push(frmGroup);
    });
    this.NewApplicationDocuments = this._fb.group({
      docType: new FormControl("", [Validators.required]),
      docName: new FormControl("", [Validators.required]),
      docUpload: new FormControl("", [Validators.required])
    });
  }

  //#region ligacy codes
  private toggleForm() {
    this.activeForm = this.activeForm === "details" ? "docs" : "details";
  }
  isValidTradeName(langId: number): boolean {
    let xx: FormGroup = (this.NewApplication.controls.tradeNames as FormArray).controls.filter(t => {
      let dd: FormGroup = t as FormGroup;
      if (dd.value.langid === langId) {
        return true;
      }
    })[0] as FormGroup;
    let ctrl: FormControl = xx.controls.tradeName as FormControl;
    return ctrl.touched && ctrl.invalid;
  }
  isValidHoldingNo(langId: number): boolean {
    let xx: FormGroup = (this.NewApplication.controls.holdingNos as FormArray).controls.filter(h => {
      let dd: FormGroup = h as FormGroup;
      if (dd.value.langid === langId) {
        return true;
      }
    })[0] as FormGroup;
    let ctrl: FormControl = xx.controls.holdingNo as FormControl;
    return ctrl.touched && ctrl.invalid;
  }
  isValidAddress(langId: number): boolean {
    let xx: FormGroup = (this.NewApplication.controls.addresses as FormArray).controls.filter(a => {
      let dd: FormGroup = a as FormGroup;
      if (dd.value.langid === langId) {
        return true;
      }
    })[0] as FormGroup;
    let ctrl: FormControl = xx.controls.address as FormControl;
    return ctrl.touched && ctrl.invalid;
  }
  isValidRoad(langId: number): boolean {
    let xx: FormGroup = (this.NewApplication.controls.roads as FormArray).controls.filter(r => {
      let dd: FormGroup = r as FormGroup;
      if (dd.value.langid === langId) {
        return true;
      }
    })[0] as FormGroup;
    let ctrl: FormControl = xx.controls.road as FormControl;
    return ctrl.touched && ctrl.invalid;
  }
  newapplication() {
    console.log(this.NewApplication);
    if (this.NewApplication.status === "INVALID") {
      this.checkStatus = true;
    }
    else {
      this.checkStatus = false;
      this.toggleForm();
    }
    this.toggleForm();
  };
  newapplicationDocs() {
    console.log(this.NewApplicationDocuments);
    if (this.NewApplicationDocuments.status === "INVALID") {
      this.checkStatus = true;
    }
    else {
      this.checkStatus = false;
    }
  };
  get businessDescription() {
    return this.NewApplication.get("businessDescription");
  }
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      console.log(file);
      reader.onload = () => {
        this.NewApplicationDocuments.get("docUpload").setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.toString().split(',')[1]
        });
      };
    }
  }
  onUpload() {
    const formModel = this.NewApplicationDocuments.value;
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    setTimeout(() => {
      console.log(formModel.docName);
      console.log(formModel.docUpload.filename);
      this.newAttribute.docName = formModel.docName;
      this.newAttribute.filename = formModel.docUpload.filename;
      this.addFieldValue();
      alert("Upload Success!");
      this.loading = false;
    }, 2000);
    // console.log(this.counter);
    // console.log(formModel.docUpload.docType);
    // console.log(formModel.docUpload.filename);
  }
  clearFile() {
    this.NewApplicationDocuments.get("docUpload").setValue(null);
    //this.fileInput.nativeElement.value = '';
  }
  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }
  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }
  //#endregion
  //#region localization
  selectedLangugeId = 1;
  localizedSource = {
    "L001": {
      label: {
        "1": {
          "1": "Trade Name (English) L",
          "2": "Trade Name (Bengali) L"
        },
        2: {
          1: "প্রতিষ্ঠানের নাম  (English) L",
          2: "প্রতিষ্ঠানের নাম  (বাংলা) L",
        },
      }, placeholder: {
        "1": {
          "1": "Trade Name (English) p",
          "2": "Trade Name Bengali p"
        },
        2: {
          1: "প্রতিষ্ঠানের নাম  (English) p",
          2: "প্রতিষ্ঠানের নাম  (বাংলা) p",
        },
      }
    },
    "L002": {
      label: {
        1: {
          "1": "Holding No (English) L",
          "2": "Holding No (Bengali) L"
        },
        2: {
          1: "হোল্ডিং নং   (English) L",
          2: "হোল্ডিং নং   (বাংলা) L",
        }
      }, placeholder: {
        "1": {
          "1": "Holding No (English) p",
          "2": "Holding No (Bengali) p"
        },
        2: {
          1: "হোল্ডিং নং  (English) p",
          2: "হোল্ডিং নং  (বাংলা) p",
        }
      }
    },
    "L003": {
      label: {
        1: {
          "1": "Address (English) L",
          "2": "Address (Bengali) L"
        },
        2: {
          1: "ঠিকানা   (English) L",
          2: "ঠিকানা   (বাংলা) L",
        }
      }, placeholder: {
        "1": {
          "1": "Address (English) p",
          "2": "Address (Bengali) p"
        },
        2: {
          1: "ঠিকানা  (English) p",
          2: "ঠিকানা  (বাংলা) p",
        }
      }
    },
    "L004": {
      label: {
        1: {
          "1": "Road (English) L",
          "2": "Road (Bengali) L"
        },
        2: {
          1: "রোড    (English) L",
          2: "রোড    (বাংলা) L",
        }
      }, placeholder: {
        "1": {
          "1": "Road (English) p",
          "2": "Road (Bengali) p"
        },
        2: {
          1: "রোড   (English) p",
          2: "রোড   (বাংলা) p",
        }
      }
    }
  }
  getLocalText(code: string, holderType: string, currLangId: number, expressionLangId: number): string {
    return this.localizedSource["L001"][holderType][currLangId][expressionLangId];
  }
  getLocalTextForHoldingNo(code: string, holderType: string, currLangId: number, expressionLangId: number): string {
    return this.localizedSource["L002"][holderType][currLangId][expressionLangId];
  }
  getLocalTextForAddress(code: string, holderType: string, currLangId: number, expressionLangId: number): string {
    return this.localizedSource["L003"][holderType][currLangId][expressionLangId];
  }
  getLocalTextForRoad(code: string, holderType: string, currLangId: number, expressionLangId: number): string {
    return this.localizedSource["L004"][holderType][currLangId][expressionLangId];
  }
//#endregion
}

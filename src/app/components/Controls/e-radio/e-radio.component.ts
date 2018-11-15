import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "e-radio",
  templateUrl:"./e-radio.component.html",
  styleUrls: ["./e-radio.component.css"]
})
export class ERadioComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
  //#region  input and output parameters
  @Input("checked") public Checked: boolean = false;
  @Input("name") public Name: string = "";
  @Input("id") public Id: string = "";
  @Input("value") public Value: string = "";
  @Input("disabled") public Disabled: boolean = false;
  @Output("onChange") public onChange_Out = new EventEmitter();
  //#endregion

  //#region global variables
  public Hovered: boolean = false;
  //#endregion

  //#region internal events
  public onMouseEntered(event: Event): void {
    if (this.Disabled) {
      return;
    }
    this.Hovered = true;
  }
  public onMouseLeaved(event: Event): void {
    if (this.Disabled) {
      return;
    }
    this.Hovered = false;
  }
  public onChanged(event: Event): void {
    if (this.Disabled) {
      return;
    }
    let outVal = {
      sender: event,
      evtArgs: { checked: !this.Checked, isCanceled: false }
    };
    this.onChange_Out.emit(outVal);
    if (outVal.evtArgs.isCanceled === false) {
      this.Checked = !this.Checked;
    }
  }
  //#endregion
}

import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "e-checkbox",
  styleUrls: ["./e-checkBox.component.css"],
  template: `
    <div class="i-checks">
      <label [attr.for]="Id">
        <div
          class="icheckbox_square-green"
          [ngClass]="{ hover: Hovered, checked: Checked, disabled: Disabled }"
          style="position: relative;">
          <input
            type="checkbox"
            (mouseenter)="onMouseEntered($event); $event.stopPropagation()"
            (mouseleave)="onMouseLeaved($event); $event.stopPropagation()"
            (change)="onChanged($event)"
            [checked]="Checked"
            [disabled]="Disabled"
            style="position: absolute; opacity: 0;"
            [attr.id]="Id"
            [attr.name]="Name"
            [attr.value]="Value"
          />
          <i></i>
        </div>
        <ng-content></ng-content>
      </label>
    </div>
  `
})
export class ECheckBoxComponent implements OnInit {
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ERadioComponent } from './e-radio.component';

describe('ERadioComponent', () => {
  let component: ERadioComponent;
  let fixture: ComponentFixture<ERadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ERadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ERadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

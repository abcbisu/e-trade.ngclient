import { ERadioComponent } from "./../Controls/e-radio/e-radio.component";
import { ECheckBoxComponent } from "../Controls/e-checkBox/e-checkBox.component";
import {Er404Component } from "./Errors/Er404.component";
import {LoginComponent } from "./login.component";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {BsDropdownModule} from "ngx-bootstrap";
import {LayoutComponent} from "./Layout.component";
import {TopNavbarComponent} from "./topnavbar/topnavbar.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {FooterComponent} from "./footer/footer.component";
import {TopNavigationNavbarComponent} from "./topnavbar/topnavigationnavbar.component";
import {ReactiveFormsModule } from "@angular/forms";
import {NgxLoadingModule } from "ngx-loading";
import {WelcomeComponent } from "./welcome/welcome.component";
import {SignUpComponent } from "./sign-up/sign-up.component";
import {ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

@NgModule({
  declarations: [
    FooterComponent,
    LayoutComponent,
    NavigationComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent,
    LoginComponent,
    Er404Component,
    WelcomeComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ECheckBoxComponent,
    ERadioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    NgxLoadingModule
  ],
  exports: [
    FooterComponent,
    LayoutComponent,
    NavigationComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent,
    ECheckBoxComponent,
    ERadioComponent
  ]
})
export class LayoutsModule {}

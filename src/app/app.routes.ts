import { SignUpComponent } from "./components/Layout/sign-up/sign-up.component";
import { WelcomeComponent } from "./components/Layout/welcome/welcome.component";
import { Er404Component } from "./components/Layout/Errors/Er404.component";
import { LoginComponent } from "./components/Layout/login.component";
import { Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./components/Layout/forgot-password/forgot-password.component";

// main redirect
// handle all other routes
export const ROUTES: Routes = [
  { path: "", redirectTo: "welcome", pathMatch: "full"},
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignUpComponent},
  { path: "forgot-password",component:ForgotPasswordComponent},
  { path: "er404", component: Er404Component },
  { path: "welcome", component: WelcomeComponent },
  { path: "**", redirectTo: "er404"}
];

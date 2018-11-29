import { AppInitializer } from "./Initializers/App.Initializer";
import { GlobalExceptionHandler } from "./Handlers/GlobalExceptionHandler";
import { LayoutsModule } from "./components/Layout/layouts.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler, APP_INITIALIZER } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import {RouterModule} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {ROUTES} from "./app.routes";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LayoutsModule,
    RouterModule.forRoot(ROUTES)
  ],
  // user hash location strategy
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },// enable hashlocation strategy
    { provide: ErrorHandler, useClass: GlobalExceptionHandler },// inject app initializer
    {
      "provide": APP_INITIALIZER,
      "useFactory": init_app,
      "deps": [AppInitializer],
      "multi": true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
export function init_app(appLoadService: AppInitializer) {
  return () => appLoadService.init();
}


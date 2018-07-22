import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AmplifyAngularModule, AmplifyService } from "aws-amplify-angular";
import { AuthComponent } from "./auth/auth.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuardService } from "src/app/auth-guard.service";

@NgModule({
  declarations: [AppComponent, AuthComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, AmplifyAngularModule],
  providers: [AmplifyService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}

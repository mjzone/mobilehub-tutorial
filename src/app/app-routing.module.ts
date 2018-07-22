import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "src/app/auth/auth.component";
import { HomeComponent } from "src/app/home/home.component";
import { AuthGuardService } from "src/app/auth-guard.service";

const routes: Routes = [
  { path: "", component: AuthComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

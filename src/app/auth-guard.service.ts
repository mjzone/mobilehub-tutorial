import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AmplifyService } from "aws-amplify-angular";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private amplifyService: AmplifyService,
    private _router: Router
  ) {}

  canActivate() {
    console.log("AuthGuard#canActivate called");
    return this.amplifyService
      .auth()
      .currentAuthenticatedUser()
      .then(user => true)
      .catch(err => {
        this._router.navigateByUrl("");
        return false;
      });
  }
}

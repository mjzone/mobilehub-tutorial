import { Component, OnInit } from "@angular/core";
import { AmplifyService } from "aws-amplify-angular/lib/providers/amplify.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  constructor(private amplifyService: AmplifyService, private _router: Router) {
    this.amplifyService = amplifyService;

    this.amplifyService.authStateChange$.subscribe(authState => {
      if (authState.state === "signedIn") {
        this._router.navigateByUrl("/home");
      }
    });
  }

  ngOnInit() {}
}

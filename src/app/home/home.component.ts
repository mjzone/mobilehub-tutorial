import { Component, OnInit } from "@angular/core";
import { AmplifyService } from "aws-amplify-angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  username: string;

  constructor(private amplifyService: AmplifyService, private _router: Router) {
    this.amplifyService
      .auth()
      .currentAuthenticatedUser()
      .then(user => {
        this.username = user.username;
      });
  }

  logOut() {
    this.amplifyService
      .auth()
      .signOut()
      .then(() => {
        this._router.navigateByUrl("");
      })
      .catch(err => {
        return false;
      });
  }

  ngOnInit() {}
}

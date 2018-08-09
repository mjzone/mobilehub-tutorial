import { Component, OnInit } from "@angular/core";
import { AmplifyService } from "aws-amplify-angular";
import { Router } from "@angular/router";
import { UUID } from "angular2-uuid";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  username: string;
  pendingTodos: string[];
  completedTodos: string[];

  constructor(private amplifyService: AmplifyService, private _router: Router) {
    this.amplifyService
      .auth()
      .currentAuthenticatedUser()
      .then(user => {
        this.username = user.username;
      });
  }

  addTodo(todo, idx) {
    if (todo.value.length) {
      this.pendingTodos.push(todo.value);
      todo.value = "";
    }
  }

  completeTodo(todo, idx) {
    this.completedTodos.push(todo);
    this.pendingTodos.splice(idx, 1);
  }

  deleteTodo(todo, idx) {
    this.pendingTodos.splice(idx, 1);
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
  ngOnInit() {
    this.pendingTodos = [];
    this.completedTodos = [];
  }
}

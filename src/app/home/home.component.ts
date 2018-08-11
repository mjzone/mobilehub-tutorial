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
  todos: any[];

  constructor(private amplifyService: AmplifyService, private _router: Router) {
    this.amplifyService
      .auth()
      .currentAuthenticatedUser()
      .then(user => {
        this.username = user.username;
      });
  }

 async addTodo(text, idx) {
    if (text.value.length) {
      let item = {
        todoId: UUID.UUID(),
        todo: text.value,
        status: "todo"
      }
      this.todos.push(item);
      
      try {
      // posting to the database table
      let payload = {
        body: item
      }
      // calling the post api endpoint from amplify library
      //await this.amplifyService.api().post("mytodosCRUD", "/mytodos", payload);

      text.value = "";

      } catch(err){
        console.log(err)
      }
    }
  }

  async completeTodo(item, idx) {
    item.status = "completed"
    let payload = {
      body: {
        todoId: item.todoId,
        todo: item.todo,
        status: "completed"
      }
    }
    //await this.amplifyService.api().put("mytodosCRUD", "/mytodos", payload);
  }

  deleteTodo(item, idx) {
    this.todos.splice(idx, 1);
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

  loadTodos() {
    return  this.amplifyService.api().get("mytodosCRUD", "/mytodos", null);
  }

  ngOnInit() {
    // this.loadTodos().then(todos => {
    //   this.todos = todos;
    // });
  }
}

import { Component, OnInit } from "@angular/core";
import { UserService } from "../../utility/user.service";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-friendrequest",
  templateUrl: "./friendrequest.component.html",
  styleUrls: ["./friendrequest.component.css"]
})
export class FriendrequestComponent implements OnInit {
  users: any = [];
  constructor(public userService: UserService, private http: HttpClient) {
    this.userService.getvalue.subscribe(() => [this.friendList()]);
  }

  ngOnInit() {
    this.friendList();
  }
  friendList() {
    this.http
      .get<any>("http://localhost:3000/dashboard/get")
      .subscribe(data => {
        this.users = data.newRequest.map(val => {
          let obj = {
            name: val,
            status: false
          };
          return obj;
        });
        console.log(this.users);
      });
  }
  approve(u) {
    u.status = !u.status;
    console.log(u);
    console.log(u.name);
    localStorage.setItem("accepted", u.name);
    if (u.status === true) {
      this.http
        .post("http://localhost:3000/dashboard/accept", u.name)
        .subscribe(data => {
          console.log(data);
        });
    }
  }
}

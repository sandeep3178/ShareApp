import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { UserService } from "../../utility/user.service";
import { Url } from "url";
@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.css"]
})
export class AllUsersComponent implements OnInit {
  img: any = [];
  constructor(private http: HttpClient, private userservice: UserService) {
    this.userservice.getuser.subscribe(data => [this.getUser()]);
  }

  ngOnInit() {
    this.getUser();
  }
  activeUser: any;
  imgurl: any = [];
  ni;
  getUser() {
    this.http.get(environment.url + "/getUsers").subscribe(data => {
      console.log(data);
      this.activeUser = data;
      for (let i = 0; i < this.activeUser.length; i++) {
        this.imgurl.push(this.activeUser[i].img);
      }
      console.log(this.imgurl);
      for (let i = 0; i < this.imgurl.length; i++) {
        this.http
          .get(environment.url + "/getImage/" + this.imgurl[i])
          .subscribe(
            data => {},
            err => {
              this.img.push(err.url);
            }
          );
      }
      console.log(this.img);
    });
  }
  approve(u) {
    u.active = !u.active;
    console.log(u.active);
    console.log(u._id);

    if (u.active === false) {
      this.http
        .post(environment.url + "/block/" + u._id, u._id)
        .subscribe(data => {
          console.log(data);
        });
      // alert("user blocked");
    }
  }
  unapprove(u) {
    u.active = !u.active;
    console.log(u.active);
    console.log(u._id);
    if (u.active === true) {
      this.http
        .post(environment.url + "/unblock/" + u._id, u._id)
        .subscribe(data => {
          console.log(data);
        });
      // alert("user unblocked");
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { UserService } from "../../utility/user.service";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-findfriend",
  templateUrl: "./findfriend.component.html",
  styleUrls: ["./findfriend.component.css"]
})
export class FindfriendComponent implements OnInit {
  name: any;
  email: any;
  newkeys: any;
  newdatas1: any = {};
  constructor(private userService: UserService, private http: HttpClient) {
    this.userService.searchUser.subscribe(data => [this.addfriend(data)]);
  }
  addfriend(data) {
    this.newdatas1 = data;
    this.newkeys = Object.keys(this.newdatas1);
    this.name = this.newdatas1[this.newkeys[0]];
    this.email = this.newdatas1[this.newkeys[1]];
  }
  ngOnInit() {}
  clicks = 0;
  friendRequest() {
    this.clicks += 1;
    if (this.clicks > 1) {
      alert(
        "you have already sent friend request or try again by refreshing the page"
      );
    } else {
      var change = document.getElementById("myButton1");
      console.log(typeof this.clicks);
      var newrequest = localStorage.getItem("key");
      console.log(newrequest);
      localStorage.setItem("reqcounter", newrequest);
      this.http
        .post("http://localhost:3000/dashboard/addfriend", newrequest)
        .subscribe(data => {
          console.log(data);
          if (data == "retreat") {
            alert(" you can't send friend request to yourself");
          }
        });

      alert("Friend Request sent");
      if (change.innerHTML == "request sent") {
        change.innerHTML = "add friend";
      } else {
        change.innerHTML = "request sent";
      }
    }
  }
}

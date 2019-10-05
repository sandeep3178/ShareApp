import { Component, OnInit } from "@angular/core";
import { UserService } from "../../utility/user.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-myfriend",
  templateUrl: "./myfriend.component.html",
  styleUrls: ["./myfriend.component.css"]
})
export class MyfriendComponent implements OnInit {
  myfriends = [];
  constructor(private userService: UserService, private http: HttpClient) {
    this.userService.friendList.subscribe(() => [this.myFriends()]);
  }
  imgurl = [];
  myFriends() {
    this.http
      .get<any>("http://localhost:3000/dashboard/friendlist")
      .subscribe(data => {
        this.myfriends = data.friends.map(val => {
          var obj = {
            name: val
          };
          return obj;
        });

        for (let i = 0; i < this.myfriends.length; i++) {
          this.http
            .get(environment.url + "/myfriendImg/" + this.myfriends[i].name)
            .subscribe(
              data => {},
              err => {
                this.imgurl.push(err.url);
              }
            );
        }
        console.log(this.imgurl);
      });
  }
  ngOnInit() {
    this.myFriends();
  }
}

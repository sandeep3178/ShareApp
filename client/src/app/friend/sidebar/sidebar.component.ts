import { Component, OnInit } from "@angular/core";
import { UserService } from "../../utility/user.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}
  friendList() {
    this.userService.friendList.emit();
  }
  newfunc() {
    this.userService.getvalue.emit();
  }
  newfunc1() {
    this.userService.getfile.emit();
  }
}

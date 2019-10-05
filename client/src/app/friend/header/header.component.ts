import { Component, OnInit, Input } from "@angular/core";
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../utility/auth.service";
import { HttpClient } from "@angular/common/http";
import { cors } from "cors";
import { UserService } from "../../utility/user.service";
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Input() headerImgURL;
  faSearch = faSearch;
  faCaretDown = faCaretDown;
  userName: any;
  searchUser: FormGroup;
  userFound: any;
  constructor(
    private authservice: AuthService,
    private http: HttpClient,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.searchUser = this.fb.group({
      search: [""]
    });
  }

  getusername() {
    this.userName = localStorage.getItem("key");
    console.log(this.userName);
  }
  logout() {
    localStorage.removeItem("key");
    this.authservice.logout();
  }

  ngOnInit() {
    this.getusername();
  }

  newfunc2() {
    console.log(this.searchUser.value.search);
    // var searchuser = this.searchUser.value;
    // this.userService.searchUser.emit();
    // this.searchuser = this.searchUser.value;
    localStorage.setItem(
      "searchuser",
      JSON.stringify(this.searchUser.value.search)
    );
    this.http
      .post(
        "http://localhost:3000/dashboard/search",
        this.searchUser.value.search
      )
      .subscribe(data => {
        console.log(data);

        this.userFound = data;
        this.addFriend(this.userFound);
      });
  }
  addFriend(userdata) {
    this.userFound = userdata;
    this.userService.searchUser.emit(this.userFound);
    // return this.userFound;
  }
}

import { Component, OnInit } from "@angular/core";
import {
  faUser,
  faLock,
  faCampground,
  faDharmachakra,
  faDiceD20
} from "@fortawesome/free-solid-svg-icons";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../../utility/auth.service";
@Component({
  selector: "app-loginuser",
  templateUrl: "./loginuser.component.html",
  styleUrls: ["./loginuser.component.css"]
})
export class LoginuserComponent implements OnInit {
  loginForm: FormGroup;
  faUser = faUser;
  faLock = faLock;
  faCampground = faCampground;
  faDharmachakra = faDharmachakra;
  faDiceD20 = faDiceD20;
  formval: any = [];
  loginVal: any = [];
  submitted = false;
  userName: any;
  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authservice: AuthService
  ) {
    this.loginForm = this.formbuilder.group({
      username: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ]
      ], //formfields with validations
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8) /* Validators.pattern('(?=.*[A-Z])') */
        ]
      ]
    });
  }
  ngOnInit() {}

  //function to get username

  loginauth(logindata) {
    this.formval = logindata;
    this.http
      .post("http://localhost:3000/login", this.formval)
      .subscribe(data => {
        if (data["message"] == "success") {
          this.authservice.login();
          this.router.navigateByUrl("dashboard");
        } else {
          alert("oops!! that didn't work");
        }
      });
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.loginForm.value) {
      this.submitted = true;

      this.loginauth(this.loginForm.value);
      this.userName = JSON.stringify(this.loginForm.value.username);

      console.log(this.userName); //// containing the value of active user
      this.authservice.getUserName(this.userName);
    } else {
      alert("invalid form");
    }
  }
}

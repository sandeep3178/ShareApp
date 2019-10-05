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
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.css"]
})
export class AdminLoginComponent implements OnInit {
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

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (
      this.loginForm.valid &&
      this.loginForm.value.email === "sandeep.sarswat@mail.vinove.com" &&
      this.loginForm.value.password === "adminpass"
    ) {
      this.submitted = true;
      console.log(this.loginForm.value);
      this.router.navigateByUrl("adminDashboard");
    } else {
      alert("invalid login");
    }
  }
}

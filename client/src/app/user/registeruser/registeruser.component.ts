import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MustMatch } from "./MustMatch";
import { Url } from "url";
@Component({
  selector: "app-registeruser",
  templateUrl: "./registeruser.component.html",
  styleUrls: ["./registeruser.component.css"]
})
export class RegisteruserComponent implements OnInit {
  Registration: FormGroup;
  Submitted = false;
  formval: any;

  constructor(
    public formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.Registration = formbuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", Validators.required],
        address1: ["", Validators.required],
        image: [""],
        phone: ["", Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "confirmPassword") // mustmatch function to match password and confirm password fields
      }
    );
  }
  message: any;
  imagePath: any;
  imgURL: any;
  imgfile: any;
  privew(files) {
    if (files.length === 0) return;
    console.log(files[0]);
    this.imgfile = files[0];
    console.log(this.imgfile);
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "only images are supported";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.imgURL = reader.result;
    };
  }
  ngOnInit() {}

  sendData(data) {
    const formdata = new FormData();
    formdata.append("firstName", data.firstName);
    formdata.append("lastName", data.lastName);
    formdata.append("email", data.email);
    formdata.append("address1", data.address1);
    formdata.append("phone", data.phone);
    formdata.append("password", data.password);
    formdata.append("confirmPassword", data.confirmPassword);
    formdata.append("image", this.imgfile);
    this.formval = formdata;
    console.log(formdata.get(data.imgfile));
    console.log(this.formval);
    this.http
      .post<any>("http://localhost:3000/register", this.formval)
      .subscribe(data => {
        alert("Registration Successful");
        this.router.navigateByUrl("/login");
      });
  }

  onSubmit() {
    if (this.Registration.valid) {
      this.Submitted = true;
      this.sendData(this.Registration.value);

      console.log(this.Registration.value);
    } else {
      alert("Incomplete Details");
    }
  }
}

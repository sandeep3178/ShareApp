import { Component, OnInit, EventEmitter } from "@angular/core";
import { AuthService } from "../../utility/auth.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  HttpClient,
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { UserService } from "../../utility/user.service";
import { Observable } from "rxjs";
import { Url } from "url";

const URL = "http://localhost:3000/dashboard";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  myfriends: any = [];

  keys: any;
  userValue: any;
  headerImg: Url;

  profileUpdate: FormGroup;
  profileimage: any;
  renderimg: string;
  public imagePath;
  imgURL: any;
  public message: string;
  users: any = [];
  privew(files) {
    if (files.length === 0) return;
    console.log(files[0]);
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

    const formData = new FormData();
    formData.append("image", files[0]);

    console.log(formData + "line 52d");
    this.postImageDb(formData);
  }

  constructor(
    private authservice: AuthService,
    private http: HttpClient,
    private formbuilder: FormBuilder,
    private userService: UserService
  ) {
    this.profileUpdate = this.formbuilder.group({
      image: [""]
    });
  }
  obj: any;
  postImageDb(newimage) {
    this.profileimage = newimage;
    console.log(this.profileimage);
    this.http
      .post<any>("http://localhost:3000/dashboard", this.profileimage)
      .subscribe(data => {
        console.log(data);
        this.obj = data;
        console.log(this.obj.filename);

        this.http
          .get<any>("http://localhost:3000/file/" + this.obj.filename)
          .subscribe(
            data => {
              console.log(data);
            },
            err => {
              console.log(err.url);
              this.headerImg = err.url;
            }
          );
        alert("profile pic submitted successfully");
      });
  }

  ngOnInit() {
    this.profilepic();
  }
  newvar;
  newvarid: any;
  profilepic() {
    this.http.get("http://localhost:3000/dashboard").subscribe(data => {
      console.log(data);
      this.newvar = data;
      console.log(this.newvar._id);
      this.newvarid = this.newvar._id;

      this.http.get("http://localhost:3000/profile/" + this.newvarid).subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err.url);
          this.headerImg = err.url;
        }
      );
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { UserService } from "../../utility/user.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
@Component({
  selector: "app-myfile",
  templateUrl: "./myfile.component.html",
  styleUrls: ["./myfile.component.css"]
})
export class MyfileComponent implements OnInit {
  newdata: any = [];
  constructor(
    private http: HttpClient,
    private userservice: UserService,
    private router: Router
  ) {
    this.userservice.getfile.subscribe(() => [this.myfile()]);
  }

  ngOnInit() {
    this.myfile();
  }
  myfile() {
    this.http.get(environment.url + "/download").subscribe(data => {
      console.log(data);
      this.newdata = data;
    });
  }
  file: any;
  delete(d) {
    this.file = d;
    console.log(this.file);
    localStorage.setItem("filepath", this.file);
    this.http.post(environment.url + "/delete", d).subscribe(data => {
      console.log(data);
      alert("file deleted");
      this.router.navigateByUrl("/dashboard");
    });
  }
}

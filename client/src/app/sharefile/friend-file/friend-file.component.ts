import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-friend-file",
  templateUrl: "./friend-file.component.html",
  styleUrls: ["./friend-file.component.scss"]
})
export class FriendFileComponent implements OnInit {
  sharefile: FormGroup;
  formval: any;

  constructor(
    private http: HttpClient,
    private formbuilder: FormBuilder,
    private router: Router
  ) {
    this.sharefile = this.formbuilder.group({
      email: [""],
      multiImage: [""]
    });
  }

  urls = new Array<string>();
  onSubmit(event) {
    this.urls = [];
    let files = event.target.files;
    console.log(files);
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }

    const formData = new FormData();

    for (let img of files) {
      formData.append("multiImage", img);
      console.log();
    }
    console.log(formData);
    formData.append("email", this.sharefile.value.email);
    this.http
      .post("http://localhost:3000/sharefile", formData)
      .subscribe(data => {
        alert("Files shared successfully");
      });
  }
  ngOnInit() {}

  /* API FOR POSTING FORMDATA CONTAINING MUTLIFILES USED FOR SENDING TO REQUIRED USERS FROM CURRENT USER */
}

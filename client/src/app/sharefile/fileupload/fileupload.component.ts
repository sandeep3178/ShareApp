import { Component, OnInit, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { FileUploader, FileLikeObject } from "ng2-file-upload";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-fileupload",
  templateUrl: "./fileupload.component.html",
  styleUrls: ["./fileupload.component.scss"]
})
export class FileuploadComponent implements OnInit {
  multifile: FormGroup;
  public imagePath;
  imgURL: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.multifile = this.fb.group({
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
    this.http
      .post("http://localhost:3000/fileupload", formData)
      .subscribe(data => {
        alert("Files Uploaded successfully");
      });
  }

  ngOnInit() {}
}

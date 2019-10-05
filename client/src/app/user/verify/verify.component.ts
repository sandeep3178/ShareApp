import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  verify: FormGroup;
  Submitted = false
  formval: any = []
  constructor(private http: HttpClient, private formbuilder: FormBuilder, private router: Router) {
    this.verify = formbuilder.group({
      token: ['', Validators.required],
      email: ['', Validators.required]

    })
  }

  verifyToken(formvalue) {
    this.formval = formvalue
    this.http.post('http://localhost:3000/verify', this.formval).subscribe(data => {
      console.log(data)
      if (data["message"] == "success") {
        alert("user authentication successful")
        this.router.navigateByUrl("login")
      }
    })
  }

  ngOnInit() {
  }
  onSubmit() {
    if (this.verify.valid) {
      this.Submitted = true
      console.log(this.verify.value)
      this.verifyToken(this.verify.value)
    }

  }

}

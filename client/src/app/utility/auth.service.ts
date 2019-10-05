import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  login() {
    localStorage.setItem("Access_Token", "access");
  }
  loggedin() {
    return !!localStorage.getItem("Access_Token");
  }
  logout() {
    localStorage.removeItem("Access_Token");
  }

  userName: string;
  constructor() {}
  getUserName(newuser) {
    this.userName = newuser;
    console.log(this.userName);
    localStorage.setItem("key", this.userName);
  }
}

import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor() {}
  getvalue = new EventEmitter<any>();
  searchUser = new EventEmitter<any>();
  friendList = new EventEmitter<any>();
  getuser = new EventEmitter<any>();
  getfile = new EventEmitter<any>();
}

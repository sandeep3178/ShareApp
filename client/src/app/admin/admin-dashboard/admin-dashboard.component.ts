import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../utility/auth.service'
import{Router} from '@angular/router';
import {UserService} from '../../utility/user.service'
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private authservice:AuthService,private router:Router,private userservice:UserService) { }

  ngOnInit() {
  }
  logOut() {
    localStorage.removeItem("key");
    this.authservice.logout();
    this.router.navigateByUrl("home")
  }
  getuser(){
    this.userservice.getuser.emit();
  }

}

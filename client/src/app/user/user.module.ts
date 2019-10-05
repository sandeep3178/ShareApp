import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RegisteruserComponent } from "./registeruser/registeruser.component";
import { LoginuserComponent } from "./loginuser/loginuser.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UserRoutingModule } from "../user/user-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { Router, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { VerifyComponent } from "./verify/verify.component";
import { AuthService } from "../utility/auth.service";
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

@NgModule({
  declarations: [
    RegisteruserComponent,
    LoginuserComponent,
    HomeComponent,
    VerifyComponent,
    AboutUsComponent,
    TermsConditionsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    UserRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [AuthService]
})
export class UserModule {}

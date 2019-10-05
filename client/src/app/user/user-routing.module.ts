import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginuserComponent } from "./loginuser/loginuser.component";
import { RegisteruserComponent } from "./registeruser/registeruser.component";
import { HomeComponent } from "./home/home.component";
import { VerifyComponent } from "./verify/verify.component";
import { AdminLoginComponent } from "../admin/admin-login/admin-login.component";
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

const routes: Routes = [
  { path: "login", component: LoginuserComponent },
  { path: "register", component: RegisteruserComponent },
  { path: "verify", component: VerifyComponent },
  {path:"aboutUs",component:AboutUsComponent},
  {path:"termsConditions",component:TermsConditionsComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}

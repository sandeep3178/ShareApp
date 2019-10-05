import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";


import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../utility/auth.service";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AllUsersComponent } from './all-users/all-users.component';
@NgModule({
  declarations: [AdminLoginComponent, AdminDashboardComponent, AllUsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [AuthService]
})
export class AdminModule {}

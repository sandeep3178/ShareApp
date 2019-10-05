import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {AdminLoginComponent} from './admin-login/admin-login.component'
import { AllUsersComponent } from './all-users/all-users.component';


const routes: Routes = [
  { path: "admin", component: AdminLoginComponent },
  {path:"adminDashboard", component:AdminDashboardComponent,
  children:[
  {path:"allUsers",component:AllUsersComponent},
 

]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

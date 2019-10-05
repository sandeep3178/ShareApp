import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "../user/home/home.component";
import { AuthGuard } from "../utility/auth.guard";
import { MyfriendComponent } from "./myfriend/myfriend.component";
import { FriendrequestComponent } from "./friendrequest/friendrequest.component";
import { FindfriendComponent } from "./findfriend/findfriend.component";
import { MyfileComponent } from "../sharefile/myfile/myfile.component";
import { FileuploadComponent } from "../sharefile/fileupload/fileupload.component";
import { FriendFileComponent } from "../sharefile/friend-file/friend-file.component";

const routes: Routes = [
  { path: "fileupload", component: FileuploadComponent },
  { path: "sharefile", component: FriendFileComponent },

  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "myfriend",
        component: MyfriendComponent
      },
      {
        path: "request",
        component: FriendrequestComponent
      },
      {
        path: "findfriend",
        component: FindfriendComponent
      },
      { path: "myfile", component: MyfileComponent },
      { path: "friendfile", component: FriendFileComponent }
    ]
  },
  { path: "home", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendRoutingModule {}

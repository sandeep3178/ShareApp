import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserModule } from "./user/user.module";
import { FriendModule } from "./friend/friend.module";
import { SharefileModule } from "./sharefile/sharefile.module";
import { AdminModule } from "./admin/admin.module";
import { FakepathComponent } from './friend/fakepath/fakepath.component';
const routes: Routes = [
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    UserModule,
    FriendModule,
    SharefileModule,
    AdminModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

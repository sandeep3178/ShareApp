import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FriendRoutingModule } from "./friend-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthService } from "../utility/auth.service";
import { FileUploadModule } from "ng2-file-upload";
import { HttpClientModule } from "@angular/common/http";
import { UserService } from "../utility/user.service";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MyfriendComponent } from "./myfriend/myfriend.component";
import { FriendrequestComponent } from "./friendrequest/friendrequest.component";
import { FindfriendComponent } from "./findfriend/findfriend.component";
import { FakepathComponent } from "./fakepath/fakepath.component";

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MyfriendComponent,
    FriendrequestComponent,
    FindfriendComponent,
    FakepathComponent
  ],
  imports: [
    CommonModule,
    FriendRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpClientModule
  ],
  providers: [AuthService, UserService]
})
export class FriendModule {}

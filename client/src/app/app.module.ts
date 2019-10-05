import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { UserModule } from "./user/user.module";
import { FriendModule } from "./friend/friend.module";
import { HeaderInterceptor } from "./utility/token.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharefileModule } from "./sharefile/sharefile.module";
import { AdminModule } from "./admin/admin.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // FontAwesomeModule,
    UserModule,
    FriendModule,
    SharefileModule,
    AdminModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

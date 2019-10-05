import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharefileRoutingModule } from "./sharefile-routing.module";
import { FileuploadComponent } from "./fileupload/fileupload.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MyfileComponent } from "./myfile/myfile.component";
import { FriendFileComponent } from "./friend-file/friend-file.component";

@NgModule({
  declarations: [FileuploadComponent, MyfileComponent, FriendFileComponent],
  imports: [
    CommonModule,

    SharefileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SharefileModule {}

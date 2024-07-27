import {NgModule} from "@angular/core";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";

@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    InputTextModule,
    TableModule,
  ],
  exports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    InputTextModule,
    TableModule,
  ]
})
export class PrimeNgImportModule {
}

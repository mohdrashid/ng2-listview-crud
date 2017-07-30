
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { Ng2ListViewCRUDComponent} from './listview-crud.component';
import {Ng2ListViewCRUDProperty} from "listview-crud";
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Ng2ListViewCRUDComponent
  ],
  exports: [
    Ng2ListViewCRUDComponent
  ]
})
export class Ng2ListViewCRUD {
}
export { Ng2ListViewCRUDProperty }

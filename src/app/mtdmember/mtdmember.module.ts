import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MtdmemberPageRoutingModule } from './mtdmember-routing.module';
import { MtdmemberPage } from './mtdmember.page';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import {IonicSelectableModule} from 'ionic-selectable';
import { TabsModule } from 'ngx-bootstrap/tabs';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtdmemberPageRoutingModule,ReactiveFormsModule,AutoCompleteModule,Ng2SearchPipeModule,Ionic4DatepickerModule,IonicSelectableModule, TabsModule.forRoot()
  ],
  declarations: [MtdmemberPage]
})
export class MtdmemberPageModule {}

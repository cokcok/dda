import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MtdsupplierPageRoutingModule } from './mtdsupplier-routing.module';
import { MtdsupplierPage } from './mtdsupplier.page';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,Ng2SearchPipeModule,
    MtdsupplierPageRoutingModule,AutoCompleteModule
  ],
  declarations: [MtdsupplierPage]
})
export class MtdsupplierPageModule {}

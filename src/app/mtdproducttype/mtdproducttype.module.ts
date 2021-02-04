import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MtdproducttypePageRoutingModule } from './mtdproducttype-routing.module';
import { MtdproducttypePage } from './mtdproducttype.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    MtdproducttypePageRoutingModule,Ng2SearchPipeModule
  ],
  declarations: [MtdproducttypePage]
})
export class MtdproducttypePageModule {}

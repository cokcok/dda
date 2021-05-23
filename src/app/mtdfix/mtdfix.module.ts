import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MtdfixPageRoutingModule } from './mtdfix-routing.module';
import { MtdfixPage } from './mtdfix.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtdfixPageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule
  ],
  declarations: [MtdfixPage]
})
export class MtdfixPageModule {}
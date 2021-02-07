import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MtdproductdetailPageRoutingModule } from './mtdproductdetail-routing.module';

import { MtdproductdetailPage } from './mtdproductdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtdproductdetailPageRoutingModule
  ],
  declarations: [MtdproductdetailPage]
})
export class MtdproductdetailPageModule {}

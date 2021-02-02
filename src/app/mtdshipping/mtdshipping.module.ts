import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MtdshippingPageRoutingModule } from './mtdshipping-routing.module';

import { MtdshippingPage } from './mtdshipping.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtdshippingPageRoutingModule
  ],
  declarations: [MtdshippingPage]
})
export class MtdshippingPageModule {}

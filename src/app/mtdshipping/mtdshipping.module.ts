import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MtdshippingPageRoutingModule } from './mtdshipping-routing.module';
import { MtdshippingPage } from './mtdshipping.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtdshippingPageRoutingModule,Ng2SearchPipeModule,ReactiveFormsModule
  ],
  declarations: [MtdshippingPage]
})
export class MtdshippingPageModule {}

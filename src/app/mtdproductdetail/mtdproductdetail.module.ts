import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MtdproductdetailPageRoutingModule } from './mtdproductdetail-routing.module';

import { MtdproductdetailPage } from './mtdproductdetail.page';
import { IonicSelectableModule } from 'ionic-selectable';
import {PipesCommonModule} from '../pipes/pipes-common/pipes-common.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtdproductdetailPageRoutingModule,ReactiveFormsModule,IonicSelectableModule,PipesCommonModule
  ],
  declarations: [MtdproductdetailPage]
})
export class MtdproductdetailPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MtdnumberdetailPageRoutingModule } from './mtdnumberdetail-routing.module';
import { MtdnumberdetailPage } from './mtdnumberdetail.page';
import { IonicSelectableModule } from 'ionic-selectable';
import {PipesCommonModule} from '../pipes/pipes-common/pipes-common.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    MtdnumberdetailPageRoutingModule,IonicSelectableModule,
    PipesCommonModule,TabsModule
   
  ],
  declarations: [MtdnumberdetailPage]
})
export class MtdnumberdetailPageModule {}

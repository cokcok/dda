import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MtdproductPageRoutingModule } from './mtdproduct-routing.module';
import { MtdproductPage } from './mtdproduct.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {IonicSelectableModule} from 'ionic-selectable';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtdproductPageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule,IonicSelectableModule,TabsModule
  ],
  declarations: [MtdproductPage]
})
export class MtdproductPageModule {}

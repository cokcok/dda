import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MtdnumberPageRoutingModule } from './mtdnumber-routing.module';
import { MtdnumberPage } from './mtdnumber.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtdnumberPageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule
  ],
  declarations: [MtdnumberPage]
})
export class MtdnumberPageModule {}

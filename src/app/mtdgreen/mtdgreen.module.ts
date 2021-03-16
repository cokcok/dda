import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MtdgreenPageRoutingModule } from './mtdgreen-routing.module';
import { MtdgreenPage } from './mtdgreen.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtdgreenPageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule,IonicSelectableModule
  ],
  declarations: [MtdgreenPage]
})
export class MtdgreenPageModule {}

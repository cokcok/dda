import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MtdcompanyPageRoutingModule } from './mtdcompany-routing.module';
import { MtdcompanyPage } from './mtdcompany.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { AutoCompleteModule } from 'ionic4-auto-complete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,AutoCompleteModule
    ,MtdcompanyPageRoutingModule,ReactiveFormsModule,IonicSelectableModule
  ],
  declarations: [MtdcompanyPage]
})
export class MtdcompanyPageModule {}

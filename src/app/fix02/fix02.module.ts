import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Fix02PageRoutingModule } from './fix02-routing.module';
import { Fix02Page } from './fix02.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Fix02PageRoutingModule,IonicSelectableModule,Ionic4DatepickerModule,Ng2SearchPipeModule,ReactiveFormsModule
  ],
  declarations: [Fix02Page]
})
export class Fix02PageModule {}

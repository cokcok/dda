import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Po02PageRoutingModule } from './po02-routing.module';
import { Po02Page } from './po02.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,Ng2SearchPipeModule,
    Po02PageRoutingModule,IonicSelectableModule,Ionic4DatepickerModule
  ],
  declarations: [Po02Page]
})
export class Po02PageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Po04PageRoutingModule } from './po04-routing.module';
import { Po04Page } from './po04.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Po04PageRoutingModule,ReactiveFormsModule,IonicSelectableModule,Ionic4DatepickerModule,Ng2SearchPipeModule
  ],
  declarations: [Po04Page]
})
export class Po04PageModule {}

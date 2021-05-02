import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Od02PageRoutingModule } from './od02-routing.module';
import { Od02Page } from './od02.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Od02PageRoutingModule,ReactiveFormsModule,IonicSelectableModule,Ionic4DatepickerModule,Ng2SearchPipeModule
  ],
  declarations: [Od02Page]
})
export class Od02PageModule {}

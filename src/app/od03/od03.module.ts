import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Od03PageRoutingModule } from './od03-routing.module';
import { Od03Page } from './od03.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Od03PageRoutingModule,ReactiveFormsModule,IonicSelectableModule,Ionic4DatepickerModule,Ng2SearchPipeModule
  ],
  declarations: [Od03Page]
})
export class Od03PageModule {}

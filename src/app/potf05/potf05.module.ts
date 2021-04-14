import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Potf05PageRoutingModule } from './potf05-routing.module';
import { Potf05Page } from './potf05.page';
import {Ionic4DatepickerModule} from '@logisticinfotech/ionic4-datepicker';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Potf05PageRoutingModule,ReactiveFormsModule,Ionic4DatepickerModule,Ng2SearchPipeModule
  ],
  declarations: [Potf05Page]
})
export class Potf05PageModule {}

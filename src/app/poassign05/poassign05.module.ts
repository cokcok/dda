import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Poassign05PageRoutingModule } from './poassign05-routing.module';
import { Poassign05Page } from './poassign05.page';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Poassign05PageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule,Ionic4DatepickerModule,IonicSelectableModule
  ],
  declarations: [Poassign05Page]
})
export class Poassign05PageModule {}

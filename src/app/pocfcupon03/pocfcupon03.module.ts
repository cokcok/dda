import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Pocfcupon03PageRoutingModule } from './pocfcupon03-routing.module';
import { Pocfcupon03Page } from './pocfcupon03.page';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pocfcupon03PageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule,Ionic4DatepickerModule,IonicSelectableModule
  ],
  declarations: [Pocfcupon03Page]
})
export class Pocfcupon03PageModule {}
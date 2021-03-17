import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Pocfcupon02PageRoutingModule } from './pocfcupon02-routing.module';
import { Pocfcupon02Page } from './pocfcupon02.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pocfcupon02PageRoutingModule,Ng2SearchPipeModule
  ],
  declarations: [Pocfcupon02Page]
})
export class Pocfcupon02PageModule {}

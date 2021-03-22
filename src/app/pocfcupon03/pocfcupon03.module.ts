import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pocfcupon03PageRoutingModule } from './pocfcupon03-routing.module';

import { Pocfcupon03Page } from './pocfcupon03.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pocfcupon03PageRoutingModule
  ],
  declarations: [Pocfcupon03Page]
})
export class Pocfcupon03PageModule {}

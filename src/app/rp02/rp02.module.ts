import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rp02PageRoutingModule } from './rp02-routing.module';

import { Rp02Page } from './rp02.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rp02PageRoutingModule
  ],
  declarations: [Rp02Page]
})
export class Rp02PageModule {}

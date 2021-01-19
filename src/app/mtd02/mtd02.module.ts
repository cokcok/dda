import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Mtd02PageRoutingModule } from './mtd02-routing.module';

import { Mtd02Page } from './mtd02.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Mtd02PageRoutingModule
  ],
  declarations: [Mtd02Page]
})
export class Mtd02PageModule {}

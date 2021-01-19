import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Mtd01PageRoutingModule } from './mtd01-routing.module';

import { Mtd01Page } from './mtd01.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Mtd01PageRoutingModule
  ],
  declarations: [Mtd01Page]
})
export class Mtd01PageModule {}

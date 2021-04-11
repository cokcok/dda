import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Potf05PageRoutingModule } from './potf05-routing.module';

import { Potf05Page } from './potf05.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Potf05PageRoutingModule
  ],
  declarations: [Potf05Page]
})
export class Potf05PageModule {}

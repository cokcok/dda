import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Potf08PageRoutingModule } from './potf08-routing.module';

import { Potf08Page } from './potf08.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Potf08PageRoutingModule
  ],
  declarations: [Potf08Page]
})
export class Potf08PageModule {}

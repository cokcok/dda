import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Po01PageRoutingModule } from './po01-routing.module';

import { Po01Page } from './po01.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Po01PageRoutingModule
  ],
  declarations: [Po01Page]
})
export class Po01PageModule {}

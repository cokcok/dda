import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MtdsizePageRoutingModule } from './mtdsize-routing.module';

import { MtdsizePage } from './mtdsize.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtdsizePageRoutingModule
  ],
  declarations: [MtdsizePage]
})
export class MtdsizePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MtdareaPageRoutingModule } from './mtdarea-routing.module';

import { MtdareaPage } from './mtdarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtdareaPageRoutingModule
  ],
  declarations: [MtdareaPage]
})
export class MtdareaPageModule {}

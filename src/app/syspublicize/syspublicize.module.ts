import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SyspublicizePageRoutingModule } from './syspublicize-routing.module';

import { SyspublicizePage } from './syspublicize.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SyspublicizePageRoutingModule
  ],
  declarations: [SyspublicizePage]
})
export class SyspublicizePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SysgroupPageRoutingModule } from './sysgroup-routing.module';

import { SysgroupPage } from './sysgroup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SysgroupPageRoutingModule
  ],
  declarations: [SysgroupPage]
})
export class SysgroupPageModule {}

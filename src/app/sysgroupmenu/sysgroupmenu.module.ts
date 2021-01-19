import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SysgroupmenuPageRoutingModule } from './sysgroupmenu-routing.module';

import { SysgroupmenuPage } from './sysgroupmenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SysgroupmenuPageRoutingModule
  ],
  declarations: [SysgroupmenuPage]
})
export class SysgroupmenuPageModule {}

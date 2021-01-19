import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SyssubmenuPageRoutingModule } from './syssubmenu-routing.module';

import { SyssubmenuPage } from './syssubmenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SyssubmenuPageRoutingModule
  ],
  declarations: [SyssubmenuPage]
})
export class SyssubmenuPageModule {}

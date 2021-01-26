import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainddaPageRoutingModule } from './maindda-routing.module';

import { MainddaPage } from './maindda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainddaPageRoutingModule
  ],
  declarations: [MainddaPage]
})
export class MainddaPageModule {}

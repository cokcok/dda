import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Mtd01PageRoutingModule } from './mtd01-routing.module';
import { Mtd01Page } from './mtd01.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({ 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Mtd01PageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule,IonicSelectableModule
  ],
  declarations: [Mtd01Page]
})
export class Mtd01PageModule {}

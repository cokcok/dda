import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Potf02PageRoutingModule } from './potf02-routing.module';
import { Potf02Page } from './potf02.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Potf02PageRoutingModule,Ng2SearchPipeModule,IonicSelectableModule,ReactiveFormsModule
  ],
  declarations: [Potf02Page]
})
export class Potf02PageModule {}

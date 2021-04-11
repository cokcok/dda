import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Potf04PageRoutingModule } from './potf04-routing.module';
import { Potf04Page } from './potf04.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Potf04PageRoutingModule,Ng2SearchPipeModule,ReactiveFormsModule
  ],
  declarations: [Potf04Page]
})
export class Potf04PageModule {}

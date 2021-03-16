import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Poassign04PageRoutingModule } from './poassign04-routing.module';
import { Poassign04Page } from './poassign04.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Poassign04PageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule
  ],
  declarations: [Poassign04Page]
})
export class Poassign04PageModule {}

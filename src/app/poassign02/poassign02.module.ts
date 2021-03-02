import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Poassign02PageRoutingModule } from './poassign02-routing.module';
import { Poassign02Page } from './poassign02.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Poassign02PageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule
  ],
  declarations: [Poassign02Page]
})
export class Poassign02PageModule {}

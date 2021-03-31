import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Pocfgreen02PageRoutingModule } from './pocfgreen02-routing.module';
import { Pocfgreen02Page } from './pocfgreen02.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pocfgreen02PageRoutingModule,Ng2SearchPipeModule
  ],
  declarations: [Pocfgreen02Page]
})
export class Pocfgreen02PageModule {}

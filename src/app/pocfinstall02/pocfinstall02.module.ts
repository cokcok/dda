import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Pocfinstall02PageRoutingModule } from './pocfinstall02-routing.module';
import { Pocfinstall02Page } from './pocfinstall02.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pocfinstall02PageRoutingModule,Ng2SearchPipeModule
  ],
  declarations: [Pocfinstall02Page]
})
export class Pocfinstall02PageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Search01PageRoutingModule } from './search01-routing.module';
import { Search01Page } from './search01.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Search01PageRoutingModule,ReactiveFormsModule,IonicSelectableModule,Ng2SearchPipeModule
  ],
  declarations: [Search01Page]
})
export class Search01PageModule {}

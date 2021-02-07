import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MtdnumberdetailPageRoutingModule } from './mtdnumberdetail-routing.module';
import { MtdnumberdetailPage } from './mtdnumberdetail.page';

import { IonicSelectableModule } from 'ionic-selectable';
//import { MySearchPipe } from '../pipes/pipes-common/my-search.pipe';
// import {MySearchPipe} from '../01pipe/my-search-pipe.pipe';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {PipesCommonModule} from '../pipes/pipes-common/pipes-common.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    MtdnumberdetailPageRoutingModule,IonicSelectableModule,
    //Ng2SearchPipeModule, MySearchPipe
    PipesCommonModule
   
  ],
  declarations: [MtdnumberdetailPage]
})
export class MtdnumberdetailPageModule {}

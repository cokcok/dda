import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Po05PageRoutingModule } from './po05-routing.module';
import { Po05Page } from './po05.page';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Po05PageRoutingModule,Ng2SearchPipeModule
  ],
  declarations: [Po05Page]
})
export class Po05PageModule {}

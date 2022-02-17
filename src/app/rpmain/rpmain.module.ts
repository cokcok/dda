import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RpmainPageRoutingModule } from './rpmain-routing.module';
import { RpmainPage } from './rpmain.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RpmainPageRoutingModule,Ng2SearchPipeModule
  ],
  declarations: [RpmainPage]
})
export class RpmainPageModule {}

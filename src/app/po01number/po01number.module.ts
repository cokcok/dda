import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Po01numberPageRoutingModule } from './po01number-routing.module';
import { Po01numberPage } from './po01number.page';
import {IonicSelectableModule} from 'ionic-selectable';
import {PipesCommonModule} from '../pipes/pipes-common/pipes-common.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,PipesCommonModule,
    Po01numberPageRoutingModule,ReactiveFormsModule,IonicSelectableModule,TabsModule
  ],
  declarations: [Po01numberPage]
})
export class Po01numberPageModule {}

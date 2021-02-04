import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MtdareaPageRoutingModule } from './mtdarea-routing.module';
import { MtdareaPage } from './mtdarea.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,Ng2SearchPipeModule,
    MtdareaPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [MtdareaPage]
})
export class MtdareaPageModule {}

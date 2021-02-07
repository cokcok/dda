import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySearchPipe } from './my-search.pipe';



@NgModule({
  declarations: [MySearchPipe],
  imports: [
    CommonModule
  ],
  exports:[
    MySearchPipe
  ]
})
export class PipesCommonModule { }

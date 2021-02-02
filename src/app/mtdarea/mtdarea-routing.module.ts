import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtdareaPage } from './mtdarea.page';

const routes: Routes = [
  {
    path: '',
    component: MtdareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtdareaPageRoutingModule {}

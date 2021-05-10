import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtdfixPage } from './mtdfix.page';

const routes: Routes = [
  {
    path: '',
    component: MtdfixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtdfixPageRoutingModule {}

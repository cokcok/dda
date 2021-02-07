import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtdproductdetailPage } from './mtdproductdetail.page';

const routes: Routes = [
  {
    path: '',
    component: MtdproductdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtdproductdetailPageRoutingModule {}

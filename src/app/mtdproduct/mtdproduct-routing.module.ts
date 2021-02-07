import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtdproductPage } from './mtdproduct.page';

const routes: Routes = [
  {
    path: '',
    component: MtdproductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtdproductPageRoutingModule {}

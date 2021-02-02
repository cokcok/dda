import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtdproducttypePage } from './mtdproducttype.page';

const routes: Routes = [
  {
    path: '',
    component: MtdproducttypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtdproducttypePageRoutingModule {}

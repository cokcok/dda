import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtdsupplierPage } from './mtdsupplier.page';

const routes: Routes = [
  {
    path: '',
    component: MtdsupplierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtdsupplierPageRoutingModule {}

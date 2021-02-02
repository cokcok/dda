import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtdshippingPage } from './mtdshipping.page';

const routes: Routes = [
  {
    path: '',
    component: MtdshippingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtdshippingPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtdnumberdetailPage } from './mtdnumberdetail.page';

const routes: Routes = [
  {
    path: '',
    component: MtdnumberdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtdnumberdetailPageRoutingModule {}

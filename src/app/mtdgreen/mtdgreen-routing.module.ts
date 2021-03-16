import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtdgreenPage } from './mtdgreen.page';

const routes: Routes = [
  {
    path: '',
    component: MtdgreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtdgreenPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtdcompanyPage } from './mtdcompany.page';

const routes: Routes = [
  {
    path: '',
    component: MtdcompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtdcompanyPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Po05Page } from './po05.page';

const routes: Routes = [
  {
    path: '',
    component: Po05Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Po05PageRoutingModule {}

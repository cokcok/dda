import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Poassign05Page } from './poassign05.page';

const routes: Routes = [
  {
    path: '',
    component: Poassign05Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Poassign05PageRoutingModule {}

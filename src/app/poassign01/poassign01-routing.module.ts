import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Poassign01Page } from './poassign01.page';

const routes: Routes = [
  {
    path: '',
    component: Poassign01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Poassign01PageRoutingModule {}

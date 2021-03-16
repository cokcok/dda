import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Poassign04Page } from './poassign04.page';

const routes: Routes = [
  {
    path: '',
    component: Poassign04Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Poassign04PageRoutingModule {}

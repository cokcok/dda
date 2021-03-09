import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Poassign03Page } from './poassign03.page';

const routes: Routes = [
  {
    path: '',
    component: Poassign03Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Poassign03PageRoutingModule {}

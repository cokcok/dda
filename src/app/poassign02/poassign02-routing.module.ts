import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Poassign02Page } from './poassign02.page';

const routes: Routes = [
  {
    path: '',
    component: Poassign02Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Poassign02PageRoutingModule {}

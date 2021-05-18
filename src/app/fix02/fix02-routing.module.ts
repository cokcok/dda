import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Fix02Page } from './fix02.page';

const routes: Routes = [
  {
    path: '',
    component: Fix02Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Fix02PageRoutingModule {}

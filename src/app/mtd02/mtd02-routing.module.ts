import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Mtd02Page } from './mtd02.page';

const routes: Routes = [
  {
    path: '',
    component: Mtd02Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Mtd02PageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Mtd01Page } from './mtd01.page';

const routes: Routes = [
  {
    path: '',
    component: Mtd01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Mtd01PageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pocfgreen01Page } from './pocfgreen01.page';

const routes: Routes = [
  {
    path: '',
    component: Pocfgreen01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pocfgreen01PageRoutingModule {}

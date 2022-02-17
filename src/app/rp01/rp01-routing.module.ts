import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rp01Page } from './rp01.page';

const routes: Routes = [
  {
    path: '',
    component: Rp01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rp01PageRoutingModule {}

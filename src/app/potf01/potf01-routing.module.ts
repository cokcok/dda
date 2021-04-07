import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Potf01Page } from './potf01.page';

const routes: Routes = [
  {
    path: '',
    component: Potf01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Potf01PageRoutingModule {}

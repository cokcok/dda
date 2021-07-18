import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Potf06Page } from './potf06.page';

const routes: Routes = [
  {
    path: '',
    component: Potf06Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Potf06PageRoutingModule {}

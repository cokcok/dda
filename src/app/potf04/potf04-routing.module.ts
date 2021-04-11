import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Potf04Page } from './potf04.page';

const routes: Routes = [
  {
    path: '',
    component: Potf04Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Potf04PageRoutingModule {}

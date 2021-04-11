import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Potf05Page } from './potf05.page';

const routes: Routes = [
  {
    path: '',
    component: Potf05Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Potf05PageRoutingModule {}

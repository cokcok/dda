import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Potf03Page } from './potf03.page';

const routes: Routes = [
  {
    path: '',
    component: Potf03Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Potf03PageRoutingModule {}

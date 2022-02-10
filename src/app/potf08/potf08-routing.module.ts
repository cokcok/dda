import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Potf08Page } from './potf08.page';

const routes: Routes = [
  {
    path: '',
    component: Potf08Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Potf08PageRoutingModule {}

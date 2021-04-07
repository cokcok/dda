import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Potf02Page } from './potf02.page';

const routes: Routes = [
  {
    path: '',
    component: Potf02Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Potf02PageRoutingModule {}

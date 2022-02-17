import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rp02Page } from './rp02.page';

const routes: Routes = [
  {
    path: '',
    component: Rp02Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rp02PageRoutingModule {}

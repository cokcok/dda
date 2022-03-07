import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rp03Page } from './rp03.page';

const routes: Routes = [
  {
    path: '',
    component: Rp03Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rp03PageRoutingModule {}

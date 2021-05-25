import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Po03Page } from './po03.page';

const routes: Routes = [
  {
    path: '',
    component: Po03Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Po03PageRoutingModule {}

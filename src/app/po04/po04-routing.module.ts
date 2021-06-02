import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Po04Page } from './po04.page';

const routes: Routes = [
  {
    path: '',
    component: Po04Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Po04PageRoutingModule {}

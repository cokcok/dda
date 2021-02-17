import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Po02Page } from './po02.page';

const routes: Routes = [
  {
    path: '',
    component: Po02Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Po02PageRoutingModule {}

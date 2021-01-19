import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Po01Page } from './po01.page';

const routes: Routes = [
  {
    path: '',
    component: Po01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Po01PageRoutingModule {}

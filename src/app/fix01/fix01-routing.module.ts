import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Fix01Page } from './fix01.page';

const routes: Routes = [
  {
    path: '',
    component: Fix01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Fix01PageRoutingModule {}

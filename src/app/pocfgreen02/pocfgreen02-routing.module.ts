import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pocfgreen02Page } from './pocfgreen02.page';

const routes: Routes = [
  {
    path: '',
    component: Pocfgreen02Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pocfgreen02PageRoutingModule {}

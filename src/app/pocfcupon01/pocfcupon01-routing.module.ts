import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pocfcupon01Page } from './pocfcupon01.page';

const routes: Routes = [
  {
    path: '',
    component: Pocfcupon01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pocfcupon01PageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pocfcupon02Page } from './pocfcupon02.page';

const routes: Routes = [
  {
    path: '',
    component: Pocfcupon02Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pocfcupon02PageRoutingModule {}

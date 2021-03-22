import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pocfcupon03Page } from './pocfcupon03.page';

const routes: Routes = [
  {
    path: '',
    component: Pocfcupon03Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pocfcupon03PageRoutingModule {}

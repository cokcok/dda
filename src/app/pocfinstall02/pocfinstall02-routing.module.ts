import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pocfinstall02Page } from './pocfinstall02.page';

const routes: Routes = [
  {
    path: '',
    component: Pocfinstall02Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pocfinstall02PageRoutingModule {}

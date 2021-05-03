import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Od03Page } from './od03.page';

const routes: Routes = [
  {
    path: '',
    component: Od03Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Od03PageRoutingModule {}

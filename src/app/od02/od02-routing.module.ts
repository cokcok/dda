import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Od02Page } from './od02.page';

const routes: Routes = [
  {
    path: '',
    component: Od02Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Od02PageRoutingModule {}

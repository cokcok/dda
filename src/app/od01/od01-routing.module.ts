import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Od01Page } from './od01.page';

const routes: Routes = [
  {
    path: '',
    component: Od01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Od01PageRoutingModule {}

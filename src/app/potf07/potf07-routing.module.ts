import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Potf07Page } from './potf07.page';

const routes: Routes = [
  {
    path: '',
    component: Potf07Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Potf07PageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainddaPage } from './maindda.page';

const routes: Routes = [
  {
    path: '',
    component: MainddaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainddaPageRoutingModule {}

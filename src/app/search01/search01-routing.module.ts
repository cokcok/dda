import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Search01Page } from './search01.page';

const routes: Routes = [
  {
    path: '',
    component: Search01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Search01PageRoutingModule {}

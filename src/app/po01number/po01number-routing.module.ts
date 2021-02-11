import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Po01numberPage } from './po01number.page';

const routes: Routes = [
  {
    path: '',
    component: Po01numberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Po01numberPageRoutingModule {}

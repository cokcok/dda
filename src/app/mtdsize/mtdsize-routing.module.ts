import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtdsizePage } from './mtdsize.page';

const routes: Routes = [
  {
    path: '',
    component: MtdsizePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtdsizePageRoutingModule {}

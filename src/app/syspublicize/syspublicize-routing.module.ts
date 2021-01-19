import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SyspublicizePage } from './syspublicize.page';

const routes: Routes = [
  {
    path: '',
    component: SyspublicizePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyspublicizePageRoutingModule {}

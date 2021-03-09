import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    //redirectTo: 'folder/Inbox',
    redirectTo: 'poassign03',
   // redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'mtd01',
    loadChildren: () => import('./mtd01/mtd01.module').then( m => m.Mtd01PageModule)
  },
  {
    path: 'mtd02',
    loadChildren: () => import('./mtd02/mtd02.module').then( m => m.Mtd02PageModule)
  },
  {
    path: 'syspublicize',
    loadChildren: () => import('./syspublicize/syspublicize.module').then( m => m.SyspublicizePageModule)
  },
  {
    path: 'po01',
    loadChildren: () => import('./po01/po01.module').then( m => m.Po01PageModule)
  },
  {
    path: 'sysmenu',
    loadChildren: () => import('./sysmenu/sysmenu.module').then( m => m.SysmenuPageModule)
  },
  {
    path: 'syssubmenu',
    loadChildren: () => import('./syssubmenu/syssubmenu.module').then( m => m.SyssubmenuPageModule)
  },
  {
    path: 'sysgroup',
    loadChildren: () => import('./sysgroup/sysgroup.module').then( m => m.SysgroupPageModule)
  },
  {
    path: 'sysgroupmenu',
    loadChildren: () => import('./sysgroupmenu/sysgroupmenu.module').then( m => m.SysgroupmenuPageModule)
  },
  {
    path: 'sysgroupmenu01',
    loadChildren: () => import('./sysgroupmenu01/sysgroupmenu01.module').then( m => m.Sysgroupmenu01PageModule)
  },
  {
    path: 'chpass',
    loadChildren: () => import('./chpass/chpass.module').then( m => m.ChpassPageModule)
  },
  {
    path: 'maindda',
    loadChildren: () => import('./maindda/maindda.module').then( m => m.MainddaPageModule)
  },
  {
    path: 'mtdcompany',
    loadChildren: () => import('./mtdcompany/mtdcompany.module').then( m => m.MtdcompanyPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'mtdarea',
    loadChildren: () => import('./mtdarea/mtdarea.module').then( m => m.MtdareaPageModule)
  },
  {
    path: 'mtdproducttype',
    loadChildren: () => import('./mtdproducttype/mtdproducttype.module').then( m => m.MtdproducttypePageModule)
  },
  {
    path: 'mtdsize',
    loadChildren: () => import('./mtdsize/mtdsize.module').then( m => m.MtdsizePageModule)
  },
  {
    path: 'mtdshipping',
    loadChildren: () => import('./mtdshipping/mtdshipping.module').then( m => m.MtdshippingPageModule)
  },
  {
    path: 'mtdsupplier',
    loadChildren: () => import('./mtdsupplier/mtdsupplier.module').then( m => m.MtdsupplierPageModule)
  },
  {
    path: 'mtdproduct',
    loadChildren: () => import('./mtdproduct/mtdproduct.module').then( m => m.MtdproductPageModule)
  },
  {
    path: 'mtdproductdetail',
    loadChildren: () => import('./mtdproductdetail/mtdproductdetail.module').then( m => m.MtdproductdetailPageModule)
  },
  {
    path: 'mtdnumber',
    loadChildren: () => import('./mtdnumber/mtdnumber.module').then( m => m.MtdnumberPageModule)
  },
  {
    path: 'mtdnumberdetail',
    loadChildren: () => import('./mtdnumberdetail/mtdnumberdetail.module').then( m => m.MtdnumberdetailPageModule)
  },
  {
    path: 'po01number',
    loadChildren: () => import('./po01number/po01number.module').then( m => m.Po01numberPageModule)
  },
  {
    path: 'po02',
    loadChildren: () => import('./po02/po02.module').then( m => m.Po02PageModule)
  },
  {
    path: 'mtdmember',
    loadChildren: () => import('./mtdmember/mtdmember.module').then( m => m.MtdmemberPageModule)
  },
  {
    path: 'poassign01',
    loadChildren: () => import('./poassign01/poassign01.module').then( m => m.Poassign01PageModule)
  },
  {
    path: 'poassign02',
    loadChildren: () => import('./poassign02/poassign02.module').then( m => m.Poassign02PageModule)
  },
  {
    path: 'poassign03',
    loadChildren: () => import('./poassign03/poassign03.module').then( m => m.Poassign03PageModule)
  }
];

@NgModule({
  imports: [   
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

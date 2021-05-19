import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    //redirectTo: 'folder/Inbox',
    redirectTo: 'poassign03',
    //redirectTo: 'signin',
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
  },
  {
    path: 'poassign04',
    loadChildren: () => import('./poassign04/poassign04.module').then( m => m.Poassign04PageModule)
  },
  {
    path: 'mtdgreen',
    loadChildren: () => import('./mtdgreen/mtdgreen.module').then( m => m.MtdgreenPageModule)
  },
  {
    path: 'pocfcupon01',
    loadChildren: () => import('./pocfcupon01/pocfcupon01.module').then( m => m.Pocfcupon01PageModule)
  },
  {
    path: 'pocfcupon02',
    loadChildren: () => import('./pocfcupon02/pocfcupon02.module').then( m => m.Pocfcupon02PageModule)
  },
  {
    path: 'pocfcupon03',
    loadChildren: () => import('./pocfcupon03/pocfcupon03.module').then( m => m.Pocfcupon03PageModule)
  },
  {
    path: 'poassign05',
    loadChildren: () => import('./poassign05/poassign05.module').then( m => m.Poassign05PageModule)
  },
  {
    path: 'pocfgreen01',
    loadChildren: () => import('./pocfgreen01/pocfgreen01.module').then( m => m.Pocfgreen01PageModule)
  },
  {
    path: 'pocfgreen02',
    loadChildren: () => import('./pocfgreen02/pocfgreen02.module').then( m => m.Pocfgreen02PageModule)
  },
  {
    path: 'pocfinstall01',
    loadChildren: () => import('./pocfinstall01/pocfinstall01.module').then( m => m.Pocfinstall01PageModule)
  },
  {
    path: 'pocfinstall02',
    loadChildren: () => import('./pocfinstall02/pocfinstall02.module').then( m => m.Pocfinstall02PageModule)
  },
  {
    path: 'potf01',
    loadChildren: () => import('./potf01/potf01.module').then( m => m.Potf01PageModule)
  },
  {
    path: 'potf02',
    loadChildren: () => import('./potf02/potf02.module').then( m => m.Potf02PageModule)
  },
  {
    path: 'potf03',
    loadChildren: () => import('./potf03/potf03.module').then( m => m.Potf03PageModule)
  },
  {
    path: 'potf04',
    loadChildren: () => import('./potf04/potf04.module').then( m => m.Potf04PageModule)
  },
  {
    path: 'potf05',
    loadChildren: () => import('./potf05/potf05.module').then( m => m.Potf05PageModule)
  },
  {
    path: 'od01',
    loadChildren: () => import('./od01/od01.module').then( m => m.Od01PageModule)
  },
  {
    path: 'od02',
    loadChildren: () => import('./od02/od02.module').then( m => m.Od02PageModule)
  },
  {
    path: 'od03',
    loadChildren: () => import('./od03/od03.module').then( m => m.Od03PageModule)
  },
  {
    path: 'mtdfix',
    loadChildren: () => import('./mtdfix/mtdfix.module').then( m => m.MtdfixPageModule)
  },
  {
    path: 'fix01',
    loadChildren: () => import('./fix01/fix01.module').then( m => m.Fix01PageModule)
  },
  {
    path: 'fix02',
    loadChildren: () => import('./fix02/fix02.module').then( m => m.Fix02PageModule)
  }
];

@NgModule({
  imports: [   
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

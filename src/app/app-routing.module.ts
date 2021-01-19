import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    //redirectTo: 'folder/Inbox',
    redirectTo: 'syspublicize',    
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
  }
];

@NgModule({
  imports: [   
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

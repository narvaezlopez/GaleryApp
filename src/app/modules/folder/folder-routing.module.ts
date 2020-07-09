import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage,
    children:[
      {
        path: 'galery',
        loadChildren: () => import('../galery/galery.module').then( m => m.GaleryPageModule)
      },
      {
        path: 'works',
        loadChildren: () => import('../works/works.module').then( m => m.WorksPageModule)
      },
      {
        path: 'contactform',
        loadChildren: () => import('../contactform/contactform.module').then( m => m.ContactformPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('../map/map.module').then( m => m.MapPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}

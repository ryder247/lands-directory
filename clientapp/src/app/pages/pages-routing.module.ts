import { LandFileListComponent } from './land-file-list/land-file-list.component';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddLandFileComponent } from './add-land-file/add-land-file.component';
import { ViewLandFileComponent } from './view-land-file/view-land-file.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: LandFileListComponent,
      },

      {
        path: 'add',
        component: AddLandFileComponent,
      },

      {
        path: 'edit/:id',
        component: AddLandFileComponent,
      },

      {
        path: 'view/:id',
        component: ViewLandFileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'label/All/All',
    pathMatch: 'full',
  },
  {
    path: 'label/:id/:name',
    loadChildren: () =>
      import('./label/label.module').then((m) => m.LabelPageModule),
  },
  {
    path: 'details/:hash',
    loadChildren: () =>
      import('./details/details.module').then((m) => m.DetailsPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

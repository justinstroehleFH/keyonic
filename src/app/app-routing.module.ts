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
      import('./passwords/passwords.module').then((m) => m.PasswordsPageModule),
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabelPage } from './label.page';

const routes: Routes = [
  {
    path: '',
    component: LabelPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabelPageRoutingModule {}

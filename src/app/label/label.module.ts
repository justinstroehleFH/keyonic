import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabelPageRoutingModule } from './label-routing.module';

import { LabelPage } from './label.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LabelPageRoutingModule],
  declarations: [LabelPage],
})
export class LabelPageModule {}

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage-angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { ContextLabelComponent } from './components/context-label/context-label.component';
import { ModalLabelComponent } from './components/modal-label/modal-label.component';

@NgModule({
  declarations: [AppComponent, ContextLabelComponent, ModalLabelComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

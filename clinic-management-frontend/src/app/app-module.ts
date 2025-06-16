import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';


import { CoreModule } from './core/core-module';
import { SharedModule } from './shared/shared-module';
import { LayoutModule } from './layout/layout-module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Chat } from './features/chat/chat';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} }; // Adjust URL to your backen

@NgModule({
  declarations: [
    App,
    Chat,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    LayoutModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }

//Placeholder Components




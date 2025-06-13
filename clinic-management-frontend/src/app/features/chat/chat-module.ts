// src/app/features/chat/chat.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel in chat input
import { SharedModule } from '../../shared/shared-module'; // For app-card, app-button

import { ChatRoutingModule } from './chat-routing-module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule, // <--- Add FormsModule
    SharedModule, // <--- Add SharedModule
    ChatRoutingModule
  ]
})
export class ChatModule { }
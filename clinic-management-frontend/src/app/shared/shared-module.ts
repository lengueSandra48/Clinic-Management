// src/app/shared/shared.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Make sure this is here
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Spinner } from './components/spinner/spinner';
import { Button } from './components/button/button';
import { InputField } from './components/input-field/input-field';
import { Modal } from './components/modal/modal';
import { Alert } from './components/alert/alert';
import { Card } from './components/card/card';
import { Pagination } from './components/pagination/pagination';
import { PermissionCheck } from './directives/permission-check';
import { DebounceClick } from './directives/debounce-click';
import { AutoFocus } from './directives/auto-focus';
import { HighlightInvalid } from './directives/highlight-invalid';
import { InputMask } from './directives/input-mask';
import { AgePipe } from './pipes/age-pipe';
import { PhoneNumberPipe } from './pipes/phone-number-pipe';
import { TruncatePipe } from './pipes/truncate-pipe';
import { SafeHtmlPipe } from './pipes/safe-html-pipe';
import { InitialsPipe } from './pipes/initials-pipe';
import { TitleCasePipe } from './pipes/title-case-pipe';


// Import your shared components, directives, pipes here

@NgModule({
  declarations: [
    // Add other shared components, directives, pipes here

    //Components
    Spinner,
    Button,
    InputField,
    Modal,
    Alert,
    Card,
    Pagination,

    //Directives
    PermissionCheck,
    DebounceClick,
    AutoFocus,
    HighlightInvalid,
    InputMask,

    //Pipes
    AgePipe,
    PhoneNumberPipe,
    TruncatePipe,
    SafeHtmlPipe,
    InitialsPipe,
    TitleCasePipe,

  ],
  imports: [
    CommonModule,
    FormsModule,          // For ngModel, etc.
    ReactiveFormsModule,  // For reactive forms
    RouterModule          // If shared components use routerLink
  ],
  exports: [
    CommonModule,         // <--- MUST be here (so other modules get access to ngIf, ngClass etc.)
    FormsModule,
    ReactiveFormsModule,

    //Components
    Spinner,
    Button,
    InputField,
    Modal,
    Alert,
    Card,
    Pagination,

    //Directives
    PermissionCheck,
    DebounceClick,
    AutoFocus,
    HighlightInvalid,
    InputMask,

    //Pipes
    AgePipe,
    PhoneNumberPipe,
    TruncatePipe,
    SafeHtmlPipe,
    InitialsPipe,
    TitleCasePipe,
  ]
})
export class SharedModule { }
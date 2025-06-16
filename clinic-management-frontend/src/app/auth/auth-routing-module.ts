import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import the new auth components
import { Login } from './login/login';
import { Register } from './register/register';
import { ForgotPassword } from './forgot-password/forgot-password';
import { ResetPassword } from './reset-password/reset-password';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default for /auth -> /auth/login
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'reset-password', component: ResetPassword },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use forChild() for feature modules
  exports: [RouterModule]
})
export class AuthRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./Pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'new-recipient', loadChildren: () => import('./Pages/new-recipient/new-recipient.module').then(m => m.NewRecipientModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

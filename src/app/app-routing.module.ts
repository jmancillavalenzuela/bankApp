import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/record' },
  {
    path: 'new-recipient',
    loadChildren: () =>
      import('./Pages/new-recipient/new-recipient.module').then(
        (m) => m.NewRecipientModule
      ),
  },
  {
    path: 'transaction',
    loadChildren: () =>
      import('./Pages/transaction/transaction.module').then(
        (m) => m.TransactionModule
      ),
  },
  {
    path: 'record',
    loadChildren: () =>
      import('./Pages/record/record.module').then(
        (m) => m.RecordModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'transaksi',
    pathMatch: 'full',
  },

  {
    path: 'transaksi',
    loadChildren: () =>
      import('./transaksi/transaksi.module').then((m) => m.TransaksiPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

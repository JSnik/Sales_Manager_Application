import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./Modules/Auth/auth.module').then(m => m.AuthModule) },
  { path: 'products', loadChildren: () => import('./Modules/Products/products.module').then(m => m.ProductsModule) },
  { path: 'sales-managers', loadChildren: () => import('./Modules/Sales-Managers/sales-managers.module').then(m => m.SalesManagersModule) },
  { path: 'sold-products', loadChildren: () => import('./Modules/Sold-products/sold-products.module').then(m => m.SoldProductsModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

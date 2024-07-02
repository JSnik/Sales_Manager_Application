import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./Guards/auth.guard";

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./Modules/Auth/auth.module').then(m => m.AuthModule)},
  { path: 'products', loadChildren: () => import('./Modules/Products/products.module').then(m => m.ProductsModule), canActivate: [AuthGuard] },
  { path: 'sales-managers', loadChildren: () => import('./Modules/Sales-Managers/sales-managers.module').then(m => m.SalesManagersModule), canActivate: [AuthGuard] },
  { path: 'sold-products', loadChildren: () => import('./Modules/Sold-products/sold-products.module').then(m => m.SoldProductsModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: 'products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SoldProductsComponent} from "./sold-products/sold-products.component";
import {RouterModule} from "@angular/router";

const routes = [
  { path: '', component: SoldProductsComponent },
]

@NgModule({
  declarations: [SoldProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SoldProductsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./products/products.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../Shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ProductsService} from "../../Services/Products/products.service";

const routes: Routes = [
  { path: '',  component: ProductsComponent }
];

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }

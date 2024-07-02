import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SoldProductsComponent} from "./sold-products/sold-products.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../Shared/shared.module";
import {SoldProductsService} from "../../Services/SoldProducts/sold-products.service";

const routes = [
  { path: '', component: SoldProductsComponent },
]

@NgModule({
  declarations: [SoldProductsComponent],
  imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      MatPaginatorModule,
      MatTableModule,
      ReactiveFormsModule,
      SharedModule
  ],
  providers: [
    SoldProductsService
  ]
})
export class SoldProductsModule { }

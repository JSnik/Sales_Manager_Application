import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesManagersComponent } from './sales-managers/sales-managers.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../Shared/shared.module";
import {SalesManagersService} from "../../Services/SalesManagers/sales-managers.service";

const routes: Routes = [
  { path: '',  component: SalesManagersComponent }
];

@NgModule({
  declarations: [
    SalesManagersComponent
  ],
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
    SalesManagersService
  ]
})
export class SalesManagersModule { }

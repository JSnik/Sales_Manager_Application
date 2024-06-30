import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesManagersComponent } from './sales-managers/sales-managers.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '',  component: SalesManagersComponent }
];

@NgModule({
  declarations: [
    SalesManagersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SalesManagersModule { }

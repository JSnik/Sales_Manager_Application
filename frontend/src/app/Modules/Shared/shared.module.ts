import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import {HeaderComponent} from "./header/header.component";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    ModalComponent,
    InputComponent,
    ButtonComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    ModalComponent,
    InputComponent,
    ButtonComponent,
    HeaderComponent
  ]
})
export class SharedModule { }

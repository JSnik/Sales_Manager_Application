import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import {HeaderComponent} from "./header/header.component";
import {RouterLink} from "@angular/router";
import { ToolbarComponent } from './toolbar/toolbar.component';
import {ReactiveFormsModule} from "@angular/forms";
import {LoaderComponent} from "./loader/loader.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    ModalComponent,
    InputComponent,
    ButtonComponent,
    HeaderComponent,
    ToolbarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ModalComponent,
    InputComponent,
    ButtonComponent,
    HeaderComponent,
    ToolbarComponent,
    LoaderComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from "./Modules/Auth/auth.module";
import {ProductsModule} from "./Modules/Products/products.module";
import {SalesManagersModule} from "./Modules/Sales-Managers/sales-managers.module";
import {SharedModule} from "./Modules/Shared/shared.module";
import {AuthInterceptor} from "./Interceptors/login.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthGuard} from "./Guards/auth.guard";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoadingInterceptor} from "./Interceptors/loading.interceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ProductsModule,
    SalesManagersModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

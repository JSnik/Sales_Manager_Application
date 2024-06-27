import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from "./Modules/Auth/auth.module";
import {ProductsModule} from "./Modules/Products/products.module";
import {SalesManagersModule} from "./Modules/Sales-Managers/sales-managers.module";
import {SharedModule} from "./Modules/Shared/shared.module";

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

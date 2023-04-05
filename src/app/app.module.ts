import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { HeaderComponent } from './components/header/header.component';

import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {provide : HTTP_INTERCEPTORS , useClass : TimeInterceptor, multi : true},
    {provide : HTTP_INTERCEPTORS , useClass : TokenInterceptor , multi : true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

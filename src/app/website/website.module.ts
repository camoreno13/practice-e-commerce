import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';

import { HomeComponent } from '../pages/home/home.component';
import { MyCartComponent } from '../pages/my-cart/my-cart.component';
import { RegisterComponent } from '../pages/register/register.component';
import { RecoveryComponent } from '../pages/recovery/recovery.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { LoginInitComponent } from '../pages/login-init/login-init.component';
import { ProductDetailComponent } from '../pages/product-detail/product-detail.component';

import { ProductComponent } from '../components/product/product.component';
import { ProductsComponent } from '../components/products/products.component';
import { HeaderComponent } from '../components/header/header.component';
import { LoginComponent } from '../components/login/login.component';

import { LayoutComponent } from './components/layout/layout.component';
import { QuicklinkModule } from 'ngx-quicklink';


@NgModule({
  declarations: [
    LayoutComponent, 
    HomeComponent,
    MyCartComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    LoginInitComponent,
    ProductDetailComponent,
    ProductComponent,
    ProductsComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    QuicklinkModule
  ],
  exports : [
    ProductsComponent
  ]
})
export class WebsiteModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';

import { CategoryComponent } from '../../pages/category/category.component';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { WebsiteModule } from 'src/app/website/website.module';


@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    WebsiteModule
  ]
})
export class CategoryModule { }

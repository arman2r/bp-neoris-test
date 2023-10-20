import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { TableProductsComponent } from '../components/table-products/table-products.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TableProductsComponent
  ]
})
export class ProductsModule { }

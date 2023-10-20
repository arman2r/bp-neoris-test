import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "products",
    pathMatch: 'full'
  },
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'new-product',
    component: ProductComponent
  },
  {
    path: 'product-edit/:id',
    component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

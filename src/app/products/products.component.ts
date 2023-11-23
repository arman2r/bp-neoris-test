import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  productList!: Product[];

  constructor(private productService: ProductoService){}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productService.getProductList().subscribe((productList: any) => {
      this.productList = productList
    }, (error: any) => {
      //console.log('llego error',error)
    })
  }

  removeItem(newItem: boolean) {
    if(newItem){
      this.getProducts()
    }
  }

}

import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(private productService: ProductoService){}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productService.getProductList().subscribe((productList: any) => {
      console.log('productList', productList)
    })
  }

}

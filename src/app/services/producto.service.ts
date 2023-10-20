import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get(`${environment.API_URL}/bp/products`)
  }

  setProduct(product: Product) {
    return this.http.post(`${environment.API_URL}/bp/products`, product)
  }
}

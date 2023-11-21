import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

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

  updateProduct(product: Product) {
    return this.http.put(`${environment.API_URL}/bp/products`, product)
  }

  verifyIdProduct(id: any) {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this.http.get(`${environment.API_URL}/bp/products/verification?id=`+id.toString(), requestOptions)
  }

  deleteProduct(id: any): Observable<any>  {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this.http.delete(`${environment.API_URL}/bp/products?id=`+id.toString(), requestOptions)
  }
}

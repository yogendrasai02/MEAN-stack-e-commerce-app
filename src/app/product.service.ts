import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './modelClasses/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts(categoryId: number):Observable<any> {
    return this.httpClient.get<Product[]>("product/getProducts/" + categoryId);
  }

  getAllProducts(): Observable<any> {
    return this.httpClient.get<Product[]>("product/getAllProducts");
  }

  getProduct(prodId: number): Observable<any>{
    return this.httpClient.get("product/getProduct/" + prodId);
  }

  addProduct(productObj: Product): Observable<any> {
    return this.httpClient.post("product/addProduct", productObj);
  }

  updateProduct(productObj: Product): Observable<any>{
    return this.httpClient.put("product/updateProduct", productObj);
  }

  updateForSale(obj: { prodId: number, forSale: boolean }): Observable<any>{
    return this.httpClient.put("product/updateForSale", obj);
  }

  updateStock(obj: { prodId: number, stock: number }): Observable<any>{
    return this.httpClient.put("product/updateStock", obj);
  }

  deleteProduct(prodId: number): Observable<any>{
    return this.httpClient.delete("product/deleteProduct/" + prodId);
  }

}

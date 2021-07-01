import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './modelClasses/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }
  
  getCategories():Observable<any> {
    return this.httpClient.get<Category[]>("product/getCategories");
  }

  getCategoryData(id: number): Observable<any> {
    return this.httpClient.get(`/product/getCategoryData/${id}`);
  }

  addCategory(categoryObj: Category): Observable<any> {
    return this.httpClient.post("product/addCategory", categoryObj);
  }

  updateCategory(id: number, newCategoryObj:Category): Observable<any> {
    return this.httpClient.put("product/updateCategory/" + id, newCategoryObj);
  }

  deleteCategory(categoryId:number): Observable<any> {
    return this.httpClient.delete("product/deleteCategory/" + categoryId);
  }

}

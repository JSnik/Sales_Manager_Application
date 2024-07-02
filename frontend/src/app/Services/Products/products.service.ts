import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseUrl} from "../../../../environment/env.prod";
import {productModel, ProductsModel} from "../../Models/products.model";

@Injectable()

export class ProductsService {
  private url = `${baseUrl}product`
  constructor(private _http: HttpClient) { }

  getProducts(): Observable<ProductsModel> {
    return this._http.get<ProductsModel>(`${this.url}?amount[gte]=1`)
  }

  sellProduct(productId: string, body: { user: string, amount: number }): Observable<{ status: string }> {
    const url = `${this.url}/${productId}`;
    return this._http.patch<{ status: string }>(url, body)
  }

  addProduct(body: any): Observable<productModel> {
    return this._http.post<productModel>(this.url, body)
  }

  editProduct(productId: string, body: any): Observable<productModel> {
    const url = `${this.url}/${productId}`;
    return this._http.put<productModel>(url, body)
  }

  deleteProduct(productId: string,): Observable<null> {
    const url = `${this.url}/${productId}`;
    return this._http.delete<null>(url)
  }
}

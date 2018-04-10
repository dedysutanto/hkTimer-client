import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';

import { Http, Response } from '@angular/http';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const API_URL = environment.apiUrl;

@Injectable()
export class ProductService {

  constructor(
    private http: Http
  ) { }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get(API_URL + '/product').map(response => {
      const products = response.json();
      return products.map((product) => new Product(product));
    }).catch(this.handleError);
  }

  public getProductById(product_id: number): Observable<Product> {
    return this.http.get(API_URL + '/product/' + product_id).map(response => {
      return new Product(response.json());
    }).catch(this.handleError);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put(API_URL + '/product/' + product.id, product).map(response => {
      return new Product(response.json());
    }).catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ProductService::handleError', error);
    return Observable.throw(error);
  }

}

import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import { Http, Response } from '@angular/http';
import { ProductCounter } from './product-counter';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const API_URL = environment.apiUrl;

@Injectable()
export class ProductCounterService {

  constructor(
    private http: Http
  ) { }

  public addProductCounter(productcounter: ProductCounter): Observable<ProductCounter> {
    return this.http
      .post(API_URL + '/productcounter', productcounter)
      .map(response => {
        return new ProductCounter(response.json());
      }).catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ProductCounterService::handleError', error);
    return Observable.throw(error);
  }

}

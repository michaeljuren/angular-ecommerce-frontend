import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = environment.luv2shopApiUrl + '/orders';

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(theEmail: string) :Observable<GetResponseOrderHistory> {

    // build URL based on customer email passed in
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;

    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl); // return Observable<GetResponseOrderHistory>
  }
}

interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[];
  }
}

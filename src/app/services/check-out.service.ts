import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  private purchaseUrl = environment.luv2shopApiUrl + '/checkout/purchase';

  constructor(private httpClient: HttpClient) { }


  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post(this.purchaseUrl, purchase);
  }
}

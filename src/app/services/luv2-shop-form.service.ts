import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    // start at current month and loop for next 12 months
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    // start at current year and loop for next 10 years
    const startYear: number = new Date().getFullYear();
    for (let theYear = startYear; theYear <= startYear + 10; theYear++) {
      data.push(theYear);
    }
    return of(data);
  }
}

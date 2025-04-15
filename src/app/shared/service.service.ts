import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  
  private url = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to=EUR%2CGBP';
  private options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'b9582841femsh73cd7f0f0b0182ap1f92b4jsnf62833dd78ee',
      'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
    }
  };

  constructor(private http: HttpClient) {}

  async getRates(): Promise<any> {
    const response = await fetch(this.url, this.options);
    const result = await response.json();
    return result;
  }

  
  

}

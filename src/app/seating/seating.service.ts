import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SeatingService {
  private baseUrl = 'https://api.pos.lodge.hotelierpune.in/api/hotel/SeatingSection/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Tenant': 'HAD'
  });

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl + 'GetAll', { headers: this.headers });
  }

  create(data: any) {
    return this.http.post(this.baseUrl + 'Create', data, { headers: this.headers });
  }

  update(data: any) {
    return this.http.put(this.baseUrl + 'Update', data, { headers: this.headers });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'DeleteById?id=' + id, { headers: this.headers });
  }
}

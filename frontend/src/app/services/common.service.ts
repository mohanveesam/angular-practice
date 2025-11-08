import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  roles = [ { id: 1, name: 'Admin' },  { id: 2, name: 'Manager' },  { id: 3, name: 'User' }]; 

  public apiUrl = 'http://localhost:5204/api';
  
  constructor(private http:HttpClient){}

  getAll(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  post(entity: string, data: any) {
    return this.http.post(`${this.apiUrl}/${entity}`, data);
  }

  put(entity: string, id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${entity}/${id}`, data);
  }

  delete(entity: string, id: string) {
    return this.http.delete(`${this.apiUrl}/${entity}/${id}`);
  }

  // 🔐 Login
  login(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  // 🔁 Reset Password
  resetPassword(data: any) {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, data);
  }
}

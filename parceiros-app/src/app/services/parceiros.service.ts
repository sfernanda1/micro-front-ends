// services/company.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parceiros } from '../components/parceiro.model';

@Injectable({
  providedIn: 'root'
})
export class ParceirosService {
  private apiUrl = 'https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Parceiros[]> {
    return this.http.get<Parceiros[]>(this.apiUrl);
  }

  addParceiros(company: Parceiros): Observable<Parceiros> {
    return this.http.post<Parceiros>(this.apiUrl, company);
  }

  updateParceiros(id: string, company: Parceiros): Observable<Parceiros> {
    return this.http.put<Parceiros>(`${this.apiUrl}/${id}`, company);
  }

  deleteParceiros(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

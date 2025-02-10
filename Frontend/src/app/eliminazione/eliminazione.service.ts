import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EliminazioneService {

  private loginUrl = 'http://localhost:3000/api/eliminazione';  // URL del tuo backend

  constructor(private http: HttpClient) { }

  eliminazione(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera il token dal localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.loginUrl, { id }, { headers });
  }
}

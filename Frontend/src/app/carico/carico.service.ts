import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CaricoService {

  private loginUrl = environment.api+"/carico";  // URL del tuo backend

  constructor(private http: HttpClient) { }

  carico(id: number,quantita: number): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera il token dal localStorage
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.loginUrl, {id ,quantita},{headers});
  }
}

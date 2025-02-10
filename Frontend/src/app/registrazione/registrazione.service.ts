import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrazioneService {

  private loginUrl = 'http://localhost:3000/api/registrazione';  // URL del tuo backend

  constructor(private http: HttpClient) { }

  registrazione(cognome: string,nome: string ,email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { nome, cognome, email, password});
  }
}

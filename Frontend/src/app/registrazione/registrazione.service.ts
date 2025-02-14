import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegistrazioneService {

  private loginUrl = environment.api+"/registrazione";  // URL del tuo backend

  constructor(private http: HttpClient) { }

  registrazione(cognome: string,nome: string ,email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { nome, cognome, email, password});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api';  // URL del tuo backend
  private loggedInSource = new BehaviorSubject<boolean>(this.isLoggedIn());  // Stato del login

  loggedIn$ = this.loggedInSource.asObservable();  // Observable per i componenti

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserData(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${this.getToken()}`
    });
    return this.http.get(`${this.apiUrl}/utente`, { headers });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSource.next(false);  // Aggiorna lo stato del login

  }

  setLoginStatus(status: boolean): void {
    this.loggedInSource.next(status);
  }

}
//versione antecedente
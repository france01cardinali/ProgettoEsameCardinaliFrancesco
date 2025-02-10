import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Movimento {
  id: number;
  prodotto_id: any;
  quantita: number;
  utente_id: any;
}



@Component({
  selector: 'app-visualizzamovimenti',
  imports: [CommonModule],
  templateUrl: './visualizzamovimenti.component.html',
  styleUrl: './visualizzamovimenti.component.scss'
})
export class VisualizzamovimentiComponent {

  httpClient = inject(HttpClient);
  movimenti: Movimento[] = [];
  
  constructor() {
    this.fetchMovimenti(); // Spostato dentro l'unico constructor
  }
  
  fetchMovimenti() {
    const token = localStorage.getItem('token'); // Recupera il token dal localStorage
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.httpClient.get<Movimento[]>('http://localhost:3000/api/visualizzazionemovimeti', { headers })
      .subscribe({
        next: (risultato) => {
          this.movimenti = risultato;
        },
        error: (err) => {
          console.log('Errore: ', err);
        }
      });
  }
  



}

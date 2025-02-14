import { Component, inject } from '@angular/core';
import {RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';


interface Prodotto {
  id: number;
  nome: string;
  codice: string;
  quantita: number;
}

@Component({
  selector: 'app-visualizzazione',
  standalone: true,
  imports: [ CommonModule,RouterLink ],
  templateUrl: './visualizzazione.component.html',
  styleUrl: './visualizzazione.component.scss'
})
export class VisualizzazioneComponent {
  idprodottoSelezionato: number | null = null;
  modalInstance: any;

httpClient = inject(HttpClient);
prodotti: Prodotto[] = [];

constructor(private router: Router) {
  this.fetchProdotti(); // Spostato dentro l'unico constructor
}


fetchProdotti() {
  const token = localStorage.getItem('token'); // Recupera il token dal localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.httpClient.get<Prodotto[]>(environment.api+'/visualizzazione', { headers })
    .subscribe({
      next: (risultato) => {
        this.prodotti = risultato;
      },
      error: (err) => {
        console.log('Errore: ', err);
      }
    });
}



apriPopup(item: any) {
  this.idprodottoSelezionato = item;

  const modalElement = document.getElementById('caricoScaricoModal');
  if (modalElement) {
    this.modalInstance = new bootstrap.Modal(modalElement);
    this.modalInstance.show();
  }
}

// Naviga alla pagina scelta con i dati del prodotto
vaiAllaPagina(azione: string) {
  if (this.idprodottoSelezionato) {
    this.router.navigate([`/${azione}`], { 
      queryParams: { id: this.idprodottoSelezionato} 
    });
  }
  this.chiudiPopup();
}

// Chiudi il popup
chiudiPopup() {
  if (this.modalInstance) {
    this.modalInstance.hide();
  }
}


}

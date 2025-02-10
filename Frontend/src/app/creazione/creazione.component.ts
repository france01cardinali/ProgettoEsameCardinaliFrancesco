import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CreazioneService } from './creazione.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-creazione',
  templateUrl: './creazione.component.html',
  styleUrls: ['./creazione.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CreazioneComponent {
  nome: string = '';
  codice: string = '';
  quantita: number = 0;
  errorMessage: string = '';
  successModal: any; // Variabile per salvare il riferimento al modal

  constructor(private creazione: CreazioneService, private router: Router) { }

  onCreazione(): void {
    // Controllo se i campi sono vuoti o non validi
  if (!this.nome.trim() || !this.codice.trim() || this.quantita <= 0) {
    this.errorMessage = 'Tutti i campi sono obbligatori e la quantità deve essere maggiore di zero!';
    return;
  }

    this.creazione.creazione(this.nome, this.codice,this.quantita).subscribe(
      response => {
        // Gestisci la risposta in caso di login riuscito
        console.log('Registrazione successful:', response);
        this.showSuccessModal();

      },
      error => {
        // Gestisci l'errore in caso di login fallito
        this.errorMessage = 'Registrazione failed: ' + error.error.message;
      }
    );
  }

  showSuccessModal() {
    // Mostra il modal Bootstrap dopo la creazione
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      this.successModal = new bootstrap.Modal(modalElement);
      this.successModal.show();
    }
  }

  goToVisualizzazione() {
    if (this.successModal) {
      this.successModal.hide(); // Chiude il popup
    }
    // Naviga alla pagina di visualizzazione dei prodotti
    this.router.navigate(['/visualizzazione']);
  }

  continueCreating() {
    if (this.successModal) {
      this.successModal.hide(); // Chiude il popup
    }
    // Resetta i campi del form per continuare a creare
    this.nome = '';
    this.codice = '';
    this.quantita = 0;
  }

}

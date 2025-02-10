import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { EliminazioneService } from './eliminazione.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'eliminazione-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './eliminazione.component.html',
  styleUrl: './eliminazione.component.scss'
})
export class EliminazioneComponent {

    id: number = 0;
    errorMessage: string = '';
    successModal: any; 


    constructor(private eliminazione: EliminazioneService,  private router: Router) { }
public onEliminazione(): void {

    if (this.id <= 0) {
        this.errorMessage = 'Tutti i campi sono obbligatori e la quantità deve essere maggiore di zero!';
        return;
      }

    this.eliminazione.eliminazione(this.id).subscribe(
      response => {
        // Gestisci la risposta in caso di login riuscito
        console.log('Eliminazione successful:', response);
        this.showSuccessModal();
      },
      error => {
        // Gestisci l'errore in caso di login fallito
        this.errorMessage = 'Eliminazione failed: ' + error.error.message;
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
  
    continueDelete() {
      if (this.successModal) {
        this.successModal.hide(); // Chiude il popup
      }
      
      this.id = 0;
    }

}

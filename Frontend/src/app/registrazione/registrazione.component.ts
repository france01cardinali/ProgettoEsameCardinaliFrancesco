import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RegistrazioneService } from './registrazione.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegistrazioneComponent {
  cognome: string = '';
  nome: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successModal: any; 


  constructor(private registrazione: RegistrazioneService, private router: Router) { }

  onRegistrazione(): void {
    this.registrazione.registrazione(this.nome, this.cognome,this.email, this.password).subscribe(
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
      
        goToLogin() {
          if (this.successModal) {
            this.successModal.hide(); // Chiude il popup
          }
          // Naviga alla pagina di visualizzazione dei prodotti
          this.router.navigate(['/login']);
        }
      





}

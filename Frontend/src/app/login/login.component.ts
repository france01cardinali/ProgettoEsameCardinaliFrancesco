import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successModal: any; 


  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        // Gestisci la risposta in caso di login riuscito
        console.log('Login successful:', response);
        // Salva il token JWT per sessioni future
        localStorage.setItem('token', response.token);
        this.authService.setLoginStatus(true);  // Aggiorna lo stato di login nel service

        this.showSuccessModal();
      },
      error => {
        // Gestisci l'errore in caso di login fallito
        this.errorMessage = 'Login failed: ' + error.error.message;
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
    
      
  




}
//versione antecedente
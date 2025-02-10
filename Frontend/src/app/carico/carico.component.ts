import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { CaricoService } from './carico.service';

@Component({
  selector: 'app-carico',
  imports: [FormsModule, CommonModule],
  templateUrl: './carico.component.html',
  styleUrl: './carico.component.scss'
})
export class CaricoComponent implements OnInit {
  id:any;
  
  quantita: number = 0;
  errorMessage: string = '';
  successModal: any; 


  constructor(private route: ActivatedRoute, private carico: CaricoService, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params;
      console.log('Dati ricevuti:', this.id);
    });
  }

  public onCarico(): void {
    if (this.quantita <= 0) {
      this.errorMessage = 'Tutti i campi sono obbligatori e la quantità deve essere maggiore di zero!';
      return;
    }
    console.log(this.id.id);
    // Esegui il carico
    this.carico.carico(this.id.id, this.quantita).subscribe(
      response => {
        console.log('Carico eseguito con successo:', response);
        this.showSuccessModal();
      },
      error => {
        this.errorMessage = 'Carico fallito: '+ error.error.message;
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

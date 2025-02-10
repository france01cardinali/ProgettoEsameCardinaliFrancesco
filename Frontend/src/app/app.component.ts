import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './login/auth.service';
import{ Router} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoggedIn: boolean = false;
  isHomePage: boolean = true;
  constructor(private authService: AuthService, private router: Router) {
   
  }

  ngOnInit(): void{

    this.authService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  // Funzione per il logout
  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  // Funzione per navigare alla pagina di login
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Funzione per navigare alla pagina di registrazione
  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  

}

//versione antecedente
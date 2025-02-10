import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Importa Bootstrap per rendere disponibili i modali e altri componenti JS
import * as bootstrap from 'bootstrap';

// Rendi Bootstrap accessibile globalmente
(window as any).bootstrap = bootstrap;

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

 
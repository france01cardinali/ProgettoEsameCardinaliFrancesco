import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { VisualizzazioneComponent } from './visualizzazione/visualizzazione.component';
import { CreazioneComponent } from './creazione/creazione.component';
import { EliminazioneComponent } from './eliminazione/eliminazione.component';
import { CaricoComponent } from './carico/carico.component';
import { ScaricoComponent } from './scarico/scarico.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [

    

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'registrazione',
        component: RegistrazioneComponent
    },
    {
        path: 'visualizzazione',
        component: VisualizzazioneComponent
       
    },
    {
        path: 'creazione',
        component: CreazioneComponent
    },
    {
        path: 'eliminazione',
        component: EliminazioneComponent
    },
    {
        path: 'carico',
        component: CaricoComponent
    },
    {
        path: 'scarico',
        component: ScaricoComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
];

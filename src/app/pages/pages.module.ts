/**
 * Modules
 */
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';

/**
 * Pipes
 */
import { PipesModule } from '../pipes/pipes.module';

/**
 * Pages
 */
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';

/**
 * Components
 */
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { SearchComponent } from '../components/search/search.component';

/**
 * Custom Directives
 */
import { MatchHeightDirective } from './profile/match-height.directive';

/**
 * Routes
 */
import { PAGES_ROUTES } from './pages.routes';
import { ProfileComponent } from './profile/profile.component';
import { DoctorComponent } from './doctors/doctor.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        HospitalsComponent,
        DoctorsComponent,
        ModalUploadComponent,
        DoctorComponent,
        SearchComponent,
        MatchHeightDirective,
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        SearchComponent,
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        BrowserModule,
        PipesModule,
    ]
})

export class PagesModule {}
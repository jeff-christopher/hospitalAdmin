import {  RouterModule , Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            {path: 'dashboard', component: DashboardComponent,data: {title: 'Dashboard'}},
            {path: 'progress', component: ProgressComponent,data: {title: 'Progress'}},
            {path: 'graficas1', component: Graficas1Component,data: {title: 'Charts'}},
            {path: 'account-settings', component: AccountSettingsComponent,data: {title: 'Personal Themes'}},
            {path: 'promesas', component: PromesasComponent,data: {title: 'Promises'}},
            {path: 'rxjs', component: RxjsComponent, data: {title: 'RxJs Library'}},
            {path: 'profile', component: ProfileComponent, data: {title: 'My profile'}},
            
            /**
             * Maintenances
             */
            {path: 'users', component: UsersComponent, data: {title: 'Users Maintenance'}},
            {path: 'hospitals', component: HospitalsComponent, data: {title: 'Hospitals Maintenance'}},
            {path: 'doctors', component: DoctorsComponent, data: {title: 'Doctors Maintenance'}},
            {path: 'doctor/:id', component: DoctorComponent, data: {title: 'Doctor Maintenance'}},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    },
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)
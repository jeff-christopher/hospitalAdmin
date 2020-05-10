import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {  titulo: 'My Themes', url: '/account-settings' },
        {  titulo: 'Dashboard', url: '/dashboard' },
        {  titulo: 'ProgressBar', url: '/progress' },
        {  titulo: 'Charts', url: '/graficas1' },
        { titulo: 'Promises', url: '/promesas' },
        { titulo: 'Rxjs', url: '/rxjs' },
      ]
    },
    {
      titulo: 'Maintenances',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Users', url: '/users'},
        { titulo: 'Hospitals', url: '/hospitals'},
        { titulo: 'Doctors', url: '/doctors'},
      ]
    }
  ];

  constructor() { }
}

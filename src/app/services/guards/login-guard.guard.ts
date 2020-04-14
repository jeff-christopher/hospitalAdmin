import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  
  constructor( public userService: UserService,
               public router: Router
              ) {}


  canActivate(){

    if(this.userService.isItLogged()){
      console.log('Passed by the Guard');
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}

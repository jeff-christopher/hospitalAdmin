import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from 'src/app/models/user.model';

declare function initPlugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  user: User;
  email: string;
  rememberMe: boolean = false;

  auth2: any;

  constructor(public router: Router,
              public userService: UserService,
              public ngZone: NgZone) { }

  ngOnInit() {

    initPlugins();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1){
      this.rememberMe = true;
    } else {
      this.rememberMe = false;
    }

    this.googleInit();

  }

  googleInit(){

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init(
        {
          client_id : '457078845809-dg7ej9i1l441a02shtaha5q3c1fo4m6n.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        }
      );
      
      this.attachSigIn( document.getElementById('btnGoogle') );

    });

  }

  attachSigIn( element ){

    this.auth2.attachClickHandler(element, {}, (googleUser) => {
         
        const token = googleUser.getAuthResponse().id_token;

        // this.userService.googleLogin( token ).subscribe( () => this.ngZone.run(
        //   () => this.router.navigate(['/dashboard'])
        // ));

        this.userService.googleLogin( token ).subscribe( () => window.location.href = '#/dashboard');

    });

  }

  login(form: NgForm){

    if(form.invalid) {
      return;
    }

    this.user = new User(null, form.value.email, form.value.password);

    this.userService.login(this.user, this.rememberMe).subscribe(
      (res) => this.router.navigate(['/dashboard']) );

  }

}

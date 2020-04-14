import { Injectable } from '@angular/core';
import { HttpClient, JsonpInterceptor } from '@angular/common/http'; 
import { User } from 'src/app/models/user.model';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
      this.loadStorage();
   }

  saveStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    this.user = user;
    this.token = token;
  }

  loadStorage(){

    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.user =  JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = null;
      this.user = null;
    }

  }

  isItLogged(){
    return (this.token) ? true : false;
  }
   
   createUser(user: User) {
      
    const URL = URL_SERVICES + 'user';

    return this.http.post(URL, user)
              .pipe(
                map((res:any) => {

                  swal('User created', res.user.email, 'success');
                  return res.user;

                }
              ));
   }

   googleLogin( token: string ) {
  
    const URL = URL_SERVICES + 'login/google';

    return this.http.post(URL, { token })
              .pipe(
                map((res: any) => {
                  console.log(res);
                  this.saveStorage(res.id, res.token, res.user);
                  return true;
                })
              );

   }

   login(user: User, rememberMe: boolean = false){

    const URL = URL_SERVICES + 'login';

    this.rememberMe(user.email, rememberMe);

    return this.http.post(URL, user)
               .pipe(
                 map((res:any) => {
                   this.saveStorage(res.id, res.token, res.user);
                   return true;
                 })
               );
   }

   logOut(){
     this.user = null;
     this.token = null;
     localStorage.removeItem('token');
     localStorage.removeItem('user'); 
     this.router.navigate(['/login']);
   }

   private rememberMe(email: string, rememberMe: boolean){
       if (rememberMe){
          localStorage.setItem('email', email);
       } else {
          localStorage.removeItem('email');
       }
   }


}

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'; 
import { User } from 'src/app/models/user.model';
import { URL_SERVICES } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UploadDocService } from '../uploadDoc/upload-doc.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    private http: HttpClient,
    public router: Router,
    private uploadService: UploadDocService,
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

                },
                catchError(
                  err => {
                    swal('Error', err.error.message , 'error');
                    return throwError(err);
                  }
                )
              ));
   }

   googleLogin( token: string ) {
  
    const URL = URL_SERVICES + 'login/google';

    return this.http.post(URL, { token })
              .pipe(
                map((res: any) => {
                  this.saveStorage(res.id, res.token, res.user);
                  return true;
                }),
                catchError(
                  err => {
                    swal('Error', err.error.message , 'error');
                    return throwError(err);
                  }
                )
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
                 }),
                 catchError( err => {
                    swal('Error', err.error.message , 'error');
                    return throwError(err);
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

   updateUser( user: User ){
      
    const URL = URL_SERVICES + `user/${user._id}?token=${this.token}`;

    return  this.http.put( URL, user)
              .pipe(
                map(( res:any ) => {
                  
                  if(user._id === this.user._id){
                    const userUpdate = res.user;
                    this.saveStorage(userUpdate._id, this.token, userUpdate);
                  }
                  swal('User updated', user.name, 'success');

                  return true;

                })
              );

   }

   changeImage(file: File, id: string){
      
      this.uploadService.uploadFile(file, 'users', id)
            .then(
              (res: any ) => {
                this.user.image = res.user.image;
                this.saveStorage(id, this.token, this.user);
                swal('Image updated', this.user.name, 'success');
              }
            )
            .catch(
              (error) => {
              console.log(error);
              }
            );

   }

   loadUsers(from: number = 0){
    const URL = URL_SERVICES + `user?from=${from}`;
    
    return this.http.get(URL);

   }

   searchUsers(search: string){
     const URL = URL_SERVICES + `search/collection/users/${search}`;

     return this.http.get(URL)
              .pipe(
                map(
                  (res: any) => res.users
                )
              );
   }

   deleteUser(id: string){

    const URL = URL_SERVICES + `user/${id}?token=${this.token}`;
    return this.http.delete(URL)
              .pipe(
                map(
                  (res: any) => {
                    return true;
                  }
                )
              );

   }


}

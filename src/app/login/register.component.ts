import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import swal from 'sweetalert';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
})
export class RegisterComponent implements OnInit {

  form: FormGroup

  constructor(public userService: UserService,
              public router: Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      agreeTerms: new FormControl(false),
    }, { validators: this.areEquals('password', 'confirmPassword') });
  
    this.form.setValue({
      name : 'test',
      email: 'test@test.com',
      password: '1234',
      confirmPassword: '1234',
      agreeTerms: true,
    })

  }

  /**
   * Functions
   */

  registerUser() {

    if(this.form.invalid){
      return;
    }

    if(!this.form.value.agreeTerms){
      swal('Important!', 'You must accept the terms and conditions to continue.', 'warning'); 
      return;
    }
    
    const user = new User(
      this.form.value.name, 
      this.form.value.email, 
      this.form.value.password
      );
    
    this.userService.createUser(user).subscribe( 
      res => this.router.navigate(['/login'])
      );

  }



  areEquals(field1: string, field2: string){
    
    return ( group: FormGroup) => {
  
      const value1 = group.controls[field1].value;
      const value2 = group.controls[field2].value;

      if(value1 === value2){
        return null;
      }

      return {
        areEqual: true,
      };

    } 
  
  }



}

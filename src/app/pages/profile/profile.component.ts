import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/service.index';
import swal from 'sweetalert';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit, AfterViewInit {
  user: User;
  @ViewChild('userProfile', null) userProfileElement: ElementRef; 
  @ViewChild('userPicture', null) userPictureElement: ElementRef;
  imageLoad: File;
  imageTemp: string | ArrayBuffer;
  userPictureHeight: number;
  userProfileHeight: number;
    

  constructor(public userService: UserService) { 

    this.user = this.userService.user;


  }

  ngOnInit() {
   
  }


  ngAfterViewInit() {

    
  }

  save( user: User ) {

    if (!this.user.google) {
      this.user.email = user.email;
    }

    this.user.name = user.name;

    this.userService.updateUser(this.user).subscribe();

  }

  selectImage(imageFile: File){
    
    if (!imageFile) {
      this.imageLoad = null;
      return;
    }

    if (imageFile.type.indexOf('image') < 0){
      this.imageLoad = null;
      swal('Only Images', 'Selected file is not an image', 'error');
      return;
    }

    this.imageLoad = imageFile;


    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(imageFile);

    reader.onload = () => this.imageTemp = reader.result;

  }

  changeImage(){

    this.userService.changeImage(this.imageLoad, this.user._id);

  }

  setUserElementsHeigth() {

  

  }

}

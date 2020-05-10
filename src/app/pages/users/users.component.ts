import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/service.index';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { SearchService } from '../../components/search/search.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[];
  from: number;
  usersTotal: number;
  loading: boolean;

  constructor(private userService: UserService,
              public _modalUploadService: ModalUploadService,
              private searchService: SearchService) {
    this.from = 0;
    this.usersTotal = 0;
    this.users = [];
    this.loading = true;
   }

  ngOnInit() {
    this.loadUsers();
    this._modalUploadService.notification.subscribe( res => this.loadUsers() );
    this.searchService.collection = 'users';
    this.searchService.notification.subscribe(
      (res: any) => {
        this.users = res.users;
        this.usersTotal = this.users.length;
        console.log(res);
      }
    );
  }

  loadUsers(){
    this.loading = true;
    this.userService.loadUsers(this.from)
          .subscribe((res: any) => {
            this.loading = false;
            this.users = res.users;
            this.usersTotal = res.total;
          });

  }

  changeFrom(value: number){

    this.from = this.from + value;
    
    if(this.from < 0 || this.from > this.usersTotal){
      if( this.from < 0){
        this.from = 0;
      } else{
        this.from = this.usersTotal - 5;
      }
      return;
    }
    
    this.loading = true;
    this.loadUsers();
      
  }

  // searchUser(search: string){

  //   if(!search){
  //     this.from = 0;
  //     this.loadUsers();
  //     return;
  //   }

  //   this.userService.searchUsers(search)
  //         .subscribe(
  //           (res: any) => {
  //             this.users = res;
  //           }
  //         );

  // }

  deleteUser(user: User){
    
    if(this.userService.user._id === user._id){
      swal('User not deleted', 'You cannot delete yourself', 'warning');
      return;
    }

    
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: [true],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.userService.deleteUser(user._id)
          .subscribe(
            (res:any) => {
              swal('Deleted', `The user ${user.name} has been deleted`, 'success');
              this.from = 0;
              this.loadUsers();
            }
          );
      }
    });

  }

  updateRole(user: User){
  
    this.userService.updateUser(user)
      .subscribe();
  
  }

  showModal( id:string ){
    this._modalUploadService.showModal('users', id);
  }

}

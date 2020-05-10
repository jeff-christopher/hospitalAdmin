import { Component, OnInit } from '@angular/core';
import { UploadDocService } from '../../services/uploadDoc/upload-doc.service';
import { ModalUploadService } from './modal-upload.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imageLoad: File;
  imageTemp: string | ArrayBuffer;

  constructor(public _uploadDocService: UploadDocService,
              public _modalUploadService: ModalUploadService,
              ) { 
  }

  ngOnInit() {
  }

  selectImage(imageFile: File) {
    
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
    reader.readAsDataURL(this.imageLoad);

    reader.onload = () => this.imageTemp = reader.result;

  }

  uploadImage(){
    
    this._uploadDocService.uploadFile(this.imageLoad, this._modalUploadService.type, this._modalUploadService.id)
          .then(
            (res) => {
              this._modalUploadService.notification.emit(res);
              this.closeModal();
            }
          )
          .catch(
            (err) => {
              console.log(err);
            }
          );

  }

  closeModal(){
    this.imageTemp = null;
    this.imageLoad = null;

    this._modalUploadService.hideModal();
  }

}

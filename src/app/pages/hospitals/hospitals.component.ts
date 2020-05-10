import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { SearchService } from '../../components/search/search.service';


@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[];
  hospitalsTotal: number;
  loading: boolean;

  constructor(
    public hospitalService: HospitalService,
    private modalUploadService: ModalUploadService,
    private searchService: SearchService,
  ) { 

    this.hospitalsTotal = 0;
    this.loading = true;

  }

  ngOnInit() {
    this.loadHospitals();
    this.searchService.collection = 'hospitals';
    this.modalUploadService.notification.subscribe(
      () => this.loadHospitals()
    );
    this.searchService.notification.subscribe(
      ((res: any) => {
        console.log(this.searchService.emptyBar);
        if( this.searchService.emptyBar ){
          this.loadHospitals();
        } else {
          this.hospitals = res.hospitals;
          this.hospitalsTotal = this.hospitals.length;
        }
      })
    );

  }

  /**
   * Hospital Functions
   */

  loadHospitals() {
    
    this.hospitalService.loadHospitals()
    .subscribe(
      (res: any) => {
        this.hospitalsTotal = res.total;
        this.hospitals = res.hospitals;
        this.loading = false;
      }
    );

  }

  searchHospital(search: string){

    if(!search) {
      this.loadHospitals();
      return;
    }

    this.hospitalService.searchHospital(search)
        .subscribe(
          (res: any) => {
            this.hospitals = res;
            this.hospitalsTotal = res.length;
          }
        );

  }

  createHospital() {
  
    this.modalNewHospital()
        .then(
          (hospitalName: string) => {
            if(!hospitalName){
              return;
            }
            this.hospitalService.createHospital(hospitalName).subscribe();
            this.loadHospitals();
          }
        )
        .catch(
          (err) => {
            return;
          }
        );

  }

   deleteHospital(hospitalID: string) {
      
    this.hospitalService.deleteHospital(hospitalID)
          .subscribe();
    this.loadHospitals();

   }

   updateHospital(hospital: Hospital, newName: string){
 
     if ((!newName) || (hospital.name === newName)) {
      
      console.log('got here');
      return;
      
      }
      
     hospital.name = newName;

     this.hospitalService.updateHospital(hospital)
          .subscribe();

   }

   /**
    * Utility functions
    */

    modalNewHospital(): Promise<any> {
      
       return swal("Enter the name of new Hospital:", {
        content: {
          element: 'input',
          attributes: {
            placeholder: "Hospital ...",
          }
        }
      });
    }

    showModal(hospitalID: string){
      
      this.modalUploadService.showModal('hospitals', hospitalID);

    }

}

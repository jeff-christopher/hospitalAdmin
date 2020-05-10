import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from 'src/app/services/service.index';
import { UploadDocService } from '../uploadDoc/upload-doc.service';
import { map } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient,
              private userService: UserService,
              private uploadService: UploadDocService
              ) { }

  loadHospitals(): Observable<any> {

    const URL = URL_SERVICES + 'hospital';

    return this.http.get(URL);

  }

  getHospital(id: string): Observable<any>{
    
    const URL = URL_SERVICES + `hospital/${id}`;

    return this.http.get(URL)
              .pipe(
                map(
                  (res: any) => {
                    console.log(res);
                  }
                )
              );

  }

  deleteHospital(id: string): Observable<any>{
    
    const URL = URL_SERVICES + `hospital/${id}?token=${this.userService.token}`;

    return this.http.delete(URL)
              .pipe(
                map(
                  (res: any) => {
                    swal('Hospital deleted', res.hospital.name, 'success');
                  }
                )
              );

  }

  createHospital(name: string): Observable<any>{

    const URL = URL_SERVICES + `hospital?token=${this.userService.token}`;
    const hospital = new Hospital(name);

    return this.http.post(URL, hospital)
              .pipe(
                map(
                  (res: any) => {
                    swal('Hospital created', res.hospital.name, 'success');
                  }
                )
              );

  }

  searchHospital(search: string): Observable<any>{

    const URL = URL_SERVICES + `search/collection/hospitals/${search}`;
    
    return this.http.get(URL)
              .pipe(
                map(
                  (res: any) => {
                    console.log(res);
                    return res.hospitals;
                  }
                )
              );

  }

  updateHospital(hospital: Hospital): Observable<any>{

    const URL = URL_SERVICES + `hospital/${hospital._id}?token=${this.userService.token}`;

    return this.http.put(URL, hospital)
              .pipe(
                map(
                  (res: any) => {
                    swal('Hospital updated', `New name ${res.hospital.name}`, 'success');
                  }
                )
              );

  }

}

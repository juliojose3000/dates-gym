import { Injectable, Inject, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule.model';
import { Reservation } from '../model/reservation.model';
import { environment } from '../../environments/environment';
import { environment_variables } from "src/environments/environment.variables";

@Injectable()
export class ReserveService {

  private url: string;

  constructor(private http: HttpClient) {
    if(environment.production)
      this.url = `${environment_variables.azure_url}/reservation`;
    else
      this.url = `${environment_variables.environment}/reservation`;
  }

  make(reservation: Reservation, headers){
    let header = new HttpHeaders().set(
      "Authorization",
      headers
    );
    return this.http.post(this.url+'/make', reservation, {headers:header});
  }


  cancel(reservation: Reservation, headers){
    let header = new HttpHeaders().set(
      "Authorization",
      headers
    );
    return this.http.post(this.url+'/cancel', reservation, {headers:header});
  }



}
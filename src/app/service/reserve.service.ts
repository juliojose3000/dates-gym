import { Injectable, Inject, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule.model';
import { Reservation } from '../model/reservation.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ReserveService {

  private url = `${environment.localEnviroment}/reservation`;

  constructor(private http: HttpClient) {
  }

  make(reservation: Reservation, headers){
    let header = new HttpHeaders().set(
      "Authorization",
      headers
    );
    return this.http.post(this.url+'/make', reservation, {headers:header});
  }

}
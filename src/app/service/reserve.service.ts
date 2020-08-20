import { Injectable, Inject, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule.model';
import { Reservation } from '../model/reservation.model';


@Injectable()
export class ReserveService {

  private url = 'http://localhost:8086/gymcachi/reservation';

  constructor(private http: HttpClient) {
  }

  make(reservation: Reservation){
    return this.http.post(this.url+'/make', reservation).toPromise().then();
  }

}
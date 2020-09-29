import { Injectable, Inject, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule.model';
import { Reservation } from '../model/reservation.model';
import { environment } from '../../environments/environment';
import { Authentication } from '../model/authentication.model';
import { Token } from '../model/token.model';

@Injectable()
export class LoginService {

  private url = `${environment.localEnviroment}/authentication`;

  constructor(private http: HttpClient) {
  }

  authenticate(auth: Authentication) {
    let header = new HttpHeaders();
    header.set("Content-Type","application/json");
    header.set("Access-Control-Allow-Origin", "*");
    header.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    header.set("Access-Control-Allow-Headers", "x-requested-with, authorization, content-type");

    return this.http.post(this.url, auth);
  }

}
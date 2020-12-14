import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Authentication } from '../model/authentication.model';


@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    return of(true);
  }

  authenticate(authentication: Authentication){
    return this.http.post<any>(`${environment.url}/authenticate`, authentication);
  }

}
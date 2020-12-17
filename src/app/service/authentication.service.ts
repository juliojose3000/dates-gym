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
import { environment_variables } from 'src/environments/environment.variables';


@Injectable()
export class AuthenticationService {

  private url: string;

  constructor(private http: HttpClient) {
    if(environment.production)
      this.url = `${environment_variables.azure_url}`;
    else
      this.url = `${environment_variables.environment}`;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    return of(true);
  }

  authenticate(authentication: Authentication){
    return this.http.post<any>(this.url+'/authenticate', authentication);
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// const API_URL = 'http://testimatch-env.eba-rpfae3g3.eu-central-1.elasticbeanstalk.com/';
const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(id:number): Observable<any> {
    return this.http.get(API_URL + 'user/' + id, { responseType: 'text' });
  }

  getPlayerBoard(id:number): Observable<any> {
    return this.http.get(API_URL + 'player/' + id, { responseType: 'text' });
  }

  getTrainerBoard(id:number): Observable<any> {
    return this.http.get(API_URL + 'trainer/' + id, { responseType: 'text' });
  }

  getOwnerBoard(id:number): Observable<any> {
    return this.http.get(API_URL + 'owner/' + id, { responseType: 'text' });
  }
}
